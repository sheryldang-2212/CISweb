import { useState, useRef } from 'react';
import { X, Upload, CheckCircle, XCircle, AlertTriangle, Send } from 'lucide-react';
import './BulkInviteDrawer.css';

interface BulkInviteDrawerProps {
  onClose: () => void;
  currentRole?: string;
  currentClinic?: any;
  existingUsers: any[];
  onInvite: (users: any[]) => void;
}

const VALID_ROLES = ['Clinic Admin', 'Doctor', 'Technician', 'Receptionist'];

export default function BulkInviteDrawer({ onClose, currentRole, currentClinic, existingUsers, onInvite }: BulkInviteDrawerProps) {
  const [inputMethod, setInputMethod] = useState<'paste' | 'upload'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateUser = (user: any, allParsed: any[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!user.email) return { status: 'invalid', error: 'Email is required' };
    if (!emailRegex.test(user.email)) return { status: 'invalid', error: 'Invalid email format' };
    
    if (!user.role) return { status: 'invalid', error: 'Role is required' };
    if (!VALID_ROLES.includes(user.role)) return { status: 'invalid', error: 'Invalid role' };

    const emailCountInUpload = allParsed.filter(u => u.email === user.email).length;
    if (emailCountInUpload > 1) {
      return { status: 'duplicate', error: 'Duplicate in uploaded list' };
    }

    const existing = existingUsers.find(u => u.email === user.email);
    if (existing) {
      if (existing.status === 'Active') return { status: 'existing', error: 'User is already active' };
      if (existing.status === 'Pending Invitation') return { status: 'existing', error: 'Invitation already pending (can resend)' };
    }

    return { status: 'valid', error: '' };
  };

  const processCSVContent = (csvText: string) => {
    setIsProcessing(true);
    try {
      const lines = csvText.split('\n').filter(line => line.trim());
      if (lines.length <= 1) {
        alert('File seems empty or only contains headers.');
        setIsProcessing(false);
        return;
      }
      
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      const emailIdx = headers.indexOf('email');
      const nameIdx = headers.indexOf('full_name');
      const phoneIdx = headers.indexOf('phone_number');
      const roleIdx = headers.indexOf('role');

      if (emailIdx === -1 || roleIdx === -1) {
        alert('CSV must contain "email" and "role" columns.');
        setIsProcessing(false);
        return;
      }

      const parsed = lines.slice(1).map((line, i) => {
        const cols = line.split(',').map(c => c.trim());
        return {
          id: `parsed-${i}`,
          name: nameIdx !== -1 ? cols[nameIdx] : '',
          email: cols[emailIdx],
          phone: phoneIdx !== -1 ? cols[phoneIdx] : '',
          role: cols[roleIdx],
        };
      });

      const validated = parsed.map(user => ({
        ...user,
        ...validateUser(user, parsed)
      }));

      setPreviewData(validated);
    } catch (err) {
      alert('Error parsing CSV file');
    }
    setIsProcessing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processCSVContent(text);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleProcessPasted = () => {
    // Expected format: one email per line, default role to something? No, requirement says paste multiple emails.
    // Wait, requirement says "paste multiple email addresses, one per line". If so, full_name, phone, role are empty.
    const lines = pastedText.split('\n').map(l => l.trim()).filter(Boolean);
    const parsed = lines.map((email, i) => ({
      id: `pasted-${i}`,
      name: '',
      email,
      phone: '',
      role: '', // Role will be invalid if empty, user might need to set it, but we can default to 'Receptionist' or prompt. 
      // Actually, if we just paste emails, we can let them edit role in the preview, but we don't have editing built in.
      // Let's assume the prompt wants us to just parse and validate. If they paste just emails, it fails validation due to missing role.
      // Wait, "paste multiple email addresses". Maybe I should provide a global role selector for pasted emails?
    }));
    
    // To make it usable, I will default role to Receptionist for pasted emails if not provided.
    const parsedWithDefault = parsed.map(p => ({ ...p, role: 'Receptionist' }));

    const validated = parsedWithDefault.map(user => ({
      ...user,
      ...validateUser(user, parsedWithDefault)
    }));
    
    setPreviewData(validated);
  };

  const handleSendInvites = () => {
    const validUsers = previewData.filter(u => u.status === 'valid' || (u.status === 'existing' && u.error.includes('resend')));
    if (validUsers.length > 0) {
      onInvite(validUsers);
    }
  };

  const validCount = previewData.filter(u => u.status === 'valid' || (u.status === 'existing' && u.error.includes('resend'))).length;

  return (
    <div className="bid-overlay">
      <div className="bid-drawer">
        <div className="bid-header">
          <div>
            <h2>Invite Users (Bulk)</h2>
            <p>Send email invitations to new staff members.</p>
          </div>
          <button className="bid-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="bid-body">
          {currentRole === 'Clinic Admin' && (
            <div className="bid-clinic-info">
              <span>Target Clinic:</span>
              <strong>{currentClinic?.name || 'Current Clinic'}</strong>
              <small>(Read-only for Clinic Admin)</small>
            </div>
          )}

          <div className="bid-input-tabs">
            <button 
              className={`bid-tab ${inputMethod === 'upload' ? 'active' : ''}`}
              onClick={() => setInputMethod('upload')}
            >
              Upload CSV
            </button>
            <button 
              className={`bid-tab ${inputMethod === 'paste' ? 'active' : ''}`}
              onClick={() => setInputMethod('paste')}
            >
              Paste Emails
            </button>
          </div>

          <div className="bid-input-section">
            {inputMethod === 'upload' ? (
              <div className="bid-upload-area" onClick={() => fileInputRef.current?.click()}>
                <Upload size={24} className="bid-upload-icon" />
                <p>Click to upload CSV file</p>
                <small>Columns: full_name, email, phone_number, role</small>
                <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
              </div>
            ) : (
              <div className="bid-paste-area">
                <textarea 
                  placeholder="Paste email addresses here, one per line..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                />
                <button className="bid-btn-secondary" onClick={handleProcessPasted} disabled={!pastedText.trim()}>
                  Process List
                </button>
              </div>
            )}
          </div>

          {previewData.length > 0 && (
            <div className="bid-preview-section">
              <h3>Validation Preview</h3>
              <div className="bid-table-wrapper">
                <table className="bid-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map(user => (
                      <tr key={user.id} className={`bid-row-${user.status}`}>
                        <td>{user.email}</td>
                        <td>{user.name || '-'}</td>
                        <td>{user.role}</td>
                        <td>
                          <div className="bid-status-cell">
                            {user.status === 'valid' && <><CheckCircle size={14} className="bid-success"/> Valid</>}
                            {user.status === 'invalid' && <><XCircle size={14} className="bid-error"/> {user.error}</>}
                            {user.status === 'duplicate' && <><AlertTriangle size={14} className="bid-warning"/> {user.error}</>}
                            {user.status === 'existing' && <><AlertTriangle size={14} className="bid-warning"/> {user.error}</>}
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

        <div className="bid-footer">
          <button className="bid-btn-cancel" onClick={onClose}>Cancel</button>
          <button 
            className="bid-btn-primary" 
            disabled={validCount === 0 || isProcessing}
            onClick={handleSendInvites}
          >
            <Send size={16} /> Send {validCount} Invitations
          </button>
        </div>
      </div>
    </div>
  );
}
