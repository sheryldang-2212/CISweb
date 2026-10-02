import { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle, XCircle, AlertTriangle, Send, User, Mail, Phone, Shield, Building2, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import './InviteStaffDrawer.css';

interface InviteStaffDrawerProps {
  onClose: () => void;
  currentRole?: string;
  currentClinic?: any;
  mockClinics?: any[];
  existingUsers: any[];
  onInvite: (users: any[]) => void;
}

const VALID_ROLES = ['Clinic Admin', 'Doctor', 'Technician', 'Receptionist'];

export default function InviteStaffDrawer({ onClose, currentRole, currentClinic, mockClinics, existingUsers, onInvite }: InviteStaffDrawerProps) {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  
  // Single Invite State
  const [singleName, setSingleName] = useState('');
  const [singleEmail, setSingleEmail] = useState('');
  const [singlePhone, setSinglePhone] = useState('');
  const [singleRoles, setSingleRoles] = useState<string[]>([]);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [singleClinic, setSingleClinic] = useState(currentRole === 'Clinic Admin' ? currentClinic?.id : '');
  const [singleError, setSingleError] = useState('');

  // Bulk Invite State
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bulkResult, setBulkResult] = useState<any>(null); // { total, sent, failed, skipped }
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation Logic
  const validateUser = (user: any, allParsed: any[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!user.name?.trim()) return { status: 'invalid', error: 'Missing full name' };
    if (!user.email?.trim()) return { status: 'invalid', error: 'Email is required' };
    if (!emailRegex.test(user.email)) return { status: 'invalid', error: 'Invalid email format' };
    
    if (!user.role?.trim()) return { status: 'invalid', error: 'Role is required' };
    if (!VALID_ROLES.includes(user.role)) return { status: 'invalid', error: 'Role does not exist' };

    if (currentRole === 'Platform Admin' && !user.clinicCode?.trim()) {
      return { status: 'invalid', error: 'Clinic Code is required' };
    }

    const emailCountInUpload = allParsed.filter(u => u.email === user.email).length;
    if (emailCountInUpload > 1) {
      return { status: 'duplicate', error: 'Duplicate email in uploaded file' };
    }

    const existing = existingUsers.find(u => u.email === user.email);
    if (existing) {
      // In a real app we'd also check if they are in the same clinic. For MVP we assume global email uniqueness or check clinic.
      if (existing.status === 'Active') return { status: 'existing', error: 'Email already active in this clinic' };
      if (existing.status === 'Pending Invitation') return { status: 'warning', error: 'Email already pending invitation (Resend available)' };
      return { status: 'existing', error: 'User exists with status: ' + existing.status };
    }

    return { status: 'valid', error: '' };
  };

  // --- Single Invite Handlers ---
  const handleSingleInvite = () => {
    setSingleError('');
    if (!singleName.trim()) { setSingleError('Full Name cannot be empty.'); return; }
    if (!singleEmail.trim()) { setSingleError('Email is required.'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(singleEmail)) { setSingleError('Email must be valid format.'); return; }
    if (singleRoles.length === 0) { setSingleError('At least one role must be selected.'); return; }
    if (currentRole === 'Platform Admin' && !singleClinic) { setSingleError('Platform Admin must select a clinic.'); return; }

    const existing = existingUsers.find(u => u.email === singleEmail);
    if (existing) {
      if (existing.status === 'Active') {
        setSingleError('This staff member already exists in this clinic.');
        return;
      }
      if (existing.status === 'Pending Invitation') {
        setSingleError('This staff member already has a pending invitation. Please resend from the table.');
        return;
      }
    }

    const clinicName = currentRole === 'Platform Admin' 
      ? mockClinics?.find(c => c.id === singleClinic)?.name || 'Selected Clinic'
      : currentClinic?.name || 'Current Clinic';

    const newUser = {
      name: singleName,
      email: singleEmail,
      phone: singlePhone,
      role: singleRoles,
      clinic: clinicName
    };

    onInvite([newUser]);
    alert('Invitation sent successfully.');
  };

  // --- Bulk Invite Handlers ---
  const handleDownloadTemplate = () => {
    const headers = currentRole === 'Platform Admin' 
      ? ["Full Name", "Email", "Phone Number", "Role", "Clinic Code"]
      : ["Full Name", "Email", "Phone Number", "Role"];
      
    const sampleData = currentRole === 'Platform Admin'
      ? { "Full Name": "John Doe", "Email": "john@example.com", "Phone Number": "1234567890", "Role": "Doctor", "Clinic Code": "CL01" }
      : { "Full Name": "John Doe", "Email": "john@example.com", "Phone Number": "1234567890", "Role": "Doctor" };

    const ws = XLSX.utils.json_to_sheet([sampleData], { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Staff_Invitation_Template.xlsx");
  };

  const processExcelContent = (data: ArrayBuffer) => {
    setIsProcessing(true);
    setBulkResult(null);
    try {
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet);

      if (!json || json.length === 0) {
        alert('File is empty.');
        setIsProcessing(false);
        return;
      }

      const parsed = json.map((row: any, i: number) => {
        const clinicCode = row['Clinic Code'] || row['clinic code'] || row['Clinic'] || '';
        return {
          id: `parsed-${i}`,
          name: row['Full Name'] || row['full_name'] || row['Name'] || '',
          email: row['Email'] || row['email'] || '',
          phone: row['Phone Number'] || row['phone_number'] || row['Phone'] || '',
          role: row['Role'] || row['role'] || '',
          clinicCode: clinicCode ? String(clinicCode) : ''
        };
      });

      const validated = parsed.map(user => ({
        ...user,
        ...validateUser(user, parsed)
      }));

      setPreviewData(validated);
    } catch (err) {
      alert('Error parsing Excel file. Make sure it is a valid .xlsx file.');
    }
    setIsProcessing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.xlsx')) {
      alert('Only .xlsx files are supported.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as ArrayBuffer;
      processExcelContent(data);
    };
    reader.readAsArrayBuffer(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendBulkInvites = () => {
    const validUsers = previewData.filter(u => u.status === 'valid');
    const invalidUsers = previewData.filter(u => u.status !== 'valid');
    
    const sentCount = validUsers.length;
    const failedCount = previewData.filter(u => u.status === 'invalid').length;
    const skippedCount = previewData.filter(u => u.status === 'duplicate' || u.status === 'existing' || u.status === 'warning').length;

    if (sentCount > 0) {
      const usersToInvite = validUsers.map(u => {
        let clinicName = currentClinic?.name || 'Current Clinic';
        if (currentRole === 'Platform Admin') {
          // Resolve clinicCode to clinic name if possible, or just use code
          const found = mockClinics?.find(c => c.id === u.clinicCode || c.name === u.clinicCode);
          if (found) clinicName = found.name;
          else clinicName = u.clinicCode;
        }

        return {
          name: u.name,
          email: u.email,
          phone: u.phone,
          role: u.role,
          clinic: clinicName
        };
      });
      onInvite(usersToInvite);
      alert('Invitations sent successfully.');
    }
    
    if (failedCount > 0 || skippedCount > 0) {
      alert('Some invitations could not be sent. Please review the failed rows.');
    }

    setBulkResult({
      total: previewData.length,
      sent: sentCount,
      failed: failedCount,
      skipped: skippedCount
    });

    // Keep invalid rows visible
    setPreviewData(invalidUsers);
  };

  const validCount = previewData.filter(u => u.status === 'valid').length;

  return (
    <div className="isd-overlay">
      <div className="isd-drawer">
        <div className="isd-header">
          <div>
            <h2>Invite Staff</h2>
            <p>Send email invitations to new staff members. They will become Active after accepting.</p>
          </div>
          <button className="isd-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="isd-main-tabs">
          <button className={`isd-main-tab ${activeTab === 'single' ? 'active' : ''}`} onClick={() => setActiveTab('single')}>Single Invite</button>
          <button className={`isd-main-tab ${activeTab === 'bulk' ? 'active' : ''}`} onClick={() => setActiveTab('bulk')}>Bulk Invite</button>
        </div>

        <div className="isd-body">
          {activeTab === 'single' && (
            <div className="isd-single-form">
              {singleError && (
                <div className="isd-error-banner">
                  <AlertTriangle size={16} /> {singleError}
                </div>
              )}
              
              <div className="isd-form-group">
                <label>Full Name <span className="isd-req">*</span></label>
                <div className="isd-input-wrap">
                  <User size={16} />
                  <input type="text" placeholder="John Doe" value={singleName} onChange={e => setSingleName(e.target.value)} />
                </div>
              </div>
              <div className="isd-form-group">
                <label>Email <span className="isd-req">*</span></label>
                <div className="isd-input-wrap">
                  <Mail size={16} />
                  <input type="email" placeholder="john@example.com" value={singleEmail} onChange={e => setSingleEmail(e.target.value)} />
                </div>
              </div>
              <div className="isd-form-group">
                <label>Phone Number</label>
                <div className="isd-input-wrap">
                  <Phone size={16} />
                  <input type="text" placeholder="+1 234 567 8900" value={singlePhone} onChange={e => setSinglePhone(e.target.value)} />
                </div>
              </div>
              <div className="isd-form-group">
                <label>Role <span className="isd-req">*</span></label>
                <div className="isd-input-wrap">
                  <Shield size={16} />
                  <div 
                    className="isd-multi-select" 
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  >
                    {singleRoles.length === 0 ? 'Select Roles...' : singleRoles.join(', ')}
                  </div>
                  {isRoleDropdownOpen && (
                    <div className="isd-multi-select-dropdown">
                      {VALID_ROLES.map(r => (
                        <label key={r} className="isd-multi-select-option">
                          <input 
                            type="checkbox" 
                            checked={singleRoles.includes(r)}
                            onChange={(e) => {
                              if (e.target.checked) setSingleRoles([...singleRoles, r]);
                              else setSingleRoles(singleRoles.filter(role => role !== r));
                            }}
                          />
                          {r}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {currentRole === 'Platform Admin' && (
                <div className="isd-form-group">
                  <label>Clinic <span className="isd-req">*</span></label>
                  <div className="isd-input-wrap">
                    <Building2 size={16} />
                    <select value={singleClinic} onChange={e => setSingleClinic(e.target.value)}>
                      <option value="">Select Clinic...</option>
                      {mockClinics?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="isd-bulk-form">
              <div className="isd-bulk-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1e293b' }}>Bulk Invite Staff</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Download the template, fill in staff information, then upload the completed Excel file.</p>
                </div>
                <button className="isd-btn-secondary" onClick={handleDownloadTemplate} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: 500 }}>
                  <Download size={16} /> Download Excel Template
                </button>
              </div>

              <div className="isd-input-section">
                <div className="isd-upload-area" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={24} className="isd-upload-icon" />
                  <p>Upload Completed Excel File</p>
                  <small>Supported format: .xlsx only</small>
                  <input type="file" accept=".xlsx" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                </div>
              </div>

              {bulkResult && (
                <div className="isd-bulk-result">
                  <h4>Invitation Summary</h4>
                  <div className="isd-result-grid">
                    <div className="isd-res-item"><span className="label">Total rows uploaded:</span> <span className="val">{bulkResult.total}</span></div>
                    <div className="isd-res-item"><span className="label text-success">Valid invitations sent:</span> <span className="val text-success">{bulkResult.sent}</span></div>
                    <div className="isd-res-item"><span className="label text-error">Failed rows:</span> <span className="val text-error">{bulkResult.failed}</span></div>
                    <div className="isd-res-item"><span className="label text-warning">Skipped rows:</span> <span className="val text-warning">{bulkResult.skipped}</span></div>
                  </div>
                </div>
              )}

              {previewData.length > 0 && (
                <div className="isd-preview-section">
                  <h3>Validation Preview</h3>
                  <div className="isd-table-wrapper">
                    <table className="isd-table">
                      <thead>
                        <tr>
                          <th>Row No.</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Role</th>
                          <th>Clinic</th>
                          <th>Validation Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((user, idx) => (
                          <tr key={user.id} className={`isd-row-${user.status === 'warning' ? 'duplicate' : user.status}`}>
                            <td className="text-muted">{idx + 1}</td>
                            <td>{user.name || '-'}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || '-'}</td>
                            <td>{user.role}</td>
                            <td>{user.clinicCode || currentClinic?.name || 'Current Clinic'}</td>
                            <td>
                              <div className="isd-status-cell">
                                {user.status === 'valid' && <><CheckCircle size={14} className="isd-success"/> Valid</>}
                                {user.status === 'invalid' && <><XCircle size={14} className="isd-error"/> Error: {user.error}</>}
                                {user.status === 'duplicate' && <><AlertTriangle size={14} className="isd-warning"/> Error: {user.error}</>}
                                {user.status === 'existing' && <><AlertTriangle size={14} className="isd-warning"/> Error: {user.error}</>}
                                {user.status === 'warning' && <><AlertTriangle size={14} className="isd-warning"/> Warning: {user.error}</>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="isd-footer">
          <button className="isd-btn-cancel" onClick={onClose}>Cancel</button>
          
          {activeTab === 'single' ? (
            <button className="isd-btn-primary" onClick={handleSingleInvite}>
              <Send size={16} /> Send Invitation
            </button>
          ) : (
            <button 
              className="isd-btn-primary" 
              disabled={validCount === 0 || isProcessing || (currentRole === 'Platform Admin' && !singleClinic)}
              onClick={handleSendBulkInvites}
            >
              <Send size={16} /> Send Invitations ({validCount} valid)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
