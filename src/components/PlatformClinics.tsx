import { useState } from 'react';
import { Search, Plus, Building2, MoreVertical, CheckCircle2, X, AlertTriangle, UserPlus, Edit2, Clock, Activity } from 'lucide-react';
import EmailDemoModal from './EmailDemoModal';
import PlatformClinicDetail from './PlatformClinicDetail';
import './PlatformAdmin.css';

const INITIAL_CLINICS = [
  { id: 'C-001', code: 'BKK001', name: 'Bangkok Wellness Clinic', address: 'Bangkok, Thailand', status: 'Active', adminName: 'Suda Klinprasert', adminEmail: 'suda@bkkwellness.co.th', staffCount: 42, createdDate: 'Jan 15, 2024', createdAgo: '10 months ago' },
  { id: 'C-002', code: 'CNX002', name: 'Chiang Mai Health Center', address: 'Chiang Mai, Thailand', status: 'Pending Setup', adminName: 'Anan Wongchai', adminEmail: 'anan@cmhealth.co.th', staffCount: 18, createdDate: 'Mar 3, 2024', createdAgo: '8 months ago' },
  { id: 'C-003', code: 'HKT003', name: 'Phuket Care Clinic', address: 'Phuket, Thailand', status: 'Active', adminName: 'Kanyarat Thongdee', adminEmail: 'kanyarat@phuketcare.co.th', staffCount: 27, createdDate: 'Feb 20, 2024', createdAgo: '8 months ago' },
  { id: 'C-004', code: 'PTY004', name: 'Pattaya Medical', address: 'Pattaya, Thailand', status: 'Suspended', adminName: 'Somchai Rattanakul', adminEmail: 'somchai@pattayamed.co.th', staffCount: 0, createdDate: 'Nov 10, 2023', createdAgo: '1 year ago' },
];

export default function PlatformClinics() {
  const [clinics, setClinics] = useState(INITIAL_CLINICS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<any | null>(null);
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState<{clinic: any, newStatus: string} | null>(null);
  const [showEditModal, setShowEditModal] = useState<any | null>(null);
  const [showAssignAdminModal, setShowAssignAdminModal] = useState<any | null>(null);
  const [demoEmailData, setDemoEmailData] = useState<{email: string, clinic: any} | null>(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Filter States
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [dateFilter, setDateFilter] = useState<string>('All Dates');

  // Form State
  const [newClinic, setNewClinic] = useState({ 
    type: 'Clinic', name: '', legalName: '', address: '', street: '', city: '', state: '', zip: '', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', contactEmail: '', contactPhone: ''
  });
  const [editClinicData, setEditClinicData] = useState({ name: '', code: '', address: '' });
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [suspendReason, setSuspendReason] = useState('');

  // Flow 2 State
  const [isCreating, setIsCreating] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleNewClinicChange = (field: string, value: string) => {
    setNewClinic({...newClinic, [field]: value});
    setIsDirty(true);
  };

  const checkDuplicates = () => {
    const name = newClinic.name.trim().toLowerCase();
    
    // Check against existing clinics
    return clinics.some(c => 
      c.name.toLowerCase() === name || 
      // Simulated checks for legalName, email, phone assuming they were in the data structure
      (c.code === name) // Fallback generic check
    );
  };

  const filteredClinics = clinics.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter !== 'All Statuses') {
      matchesStatus = c.status === statusFilter;
    }

    let matchesDate = true; // Placeholder for date filtering logic

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClinic.name.trim() || !newClinic.legalName.trim() || !newClinic.street.trim() || !newClinic.city.trim()) return;
    
    if (!duplicateWarning && checkDuplicates()) {
      setDuplicateWarning(true);
      return;
    }
    
    proceedCreation();
  };

  const proceedCreation = () => {
    setIsCreating(true);
    
    // Simulate network request
    setTimeout(() => {
      // Auto-generate unique code (simulate backend generation CLN-XXXXXX)
      const newCode = `CLN-${String(clinics.length + 1).padStart(6, '0')}`;
      
      const clinic = {
        id: `C-${String(clinics.length + 1).padStart(3, '0')}`,
        code: newCode,
        type: newClinic.type,
        name: newClinic.name.trim(),
        legalName: newClinic.legalName.trim(), 
        address: `${newClinic.street.trim()}, ${newClinic.city.trim()}, ${newClinic.state.trim()} ${newClinic.zip.trim()}`.replace(/^[,\s]+|[,\s]+$/g, '').replace(/,\s*,/g, ','),
        contactEmail: newClinic.contactEmail.trim().toLowerCase(),
        contactPhone: newClinic.contactPhone.trim(),
        country: newClinic.country,
        timezone: newClinic.timezone,
        language: newClinic.language,
        status: 'Setup Pending',
        admin: 'Not Assigned',
        activeAdmins: 0,
        pendingAdmins: 0,
        created: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        firstActivatedDate: null,
        lastStatusChangedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: 'Current User',
        adminName: 'Not Assigned',
        adminEmail: '',
        staffCount: 0,
        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdAgo: 'Just now'
      };
      
      setClinics([clinic, ...clinics]);
      setShowCreateModal(false);
      setNewClinic({ type: 'Clinic', name: '', legalName: '', address: '', street: '', city: '', state: '', zip: '', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', contactEmail: '', contactPhone: '' });
      setIsDirty(false);
      setDuplicateWarning(false);
      setIsCreating(false);
      
      // Auto navigate to detail view
      setSelectedClinic(clinic);
    }, 1500);
  };

  const handleCloseCreateModal = () => {
    if (isDirty) {
      setShowUnsavedChangesModal(true);
    } else {
      setShowCreateModal(false);
    }
  };

  const handleStatusChange = () => {
    if (!showStatusConfirmModal) return;
    const { clinic, newStatus } = showStatusConfirmModal;
    
    if (newStatus === 'Suspended' && !suspendReason.trim()) {
      alert("A reason is required to suspend a clinic.");
      return;
    }

    setClinics(clinics.map(c => 
      c.id === clinic.id ? { ...c, status: newStatus } : c
    ));
    
    // Also update selectedClinic if it's currently open
    if (selectedClinic && selectedClinic.id === clinic.id) {
      setSelectedClinic({ ...selectedClinic, status: newStatus });
    }
    
    setShowStatusConfirmModal(null);
    setSuspendReason('');
  };

  const openEditModal = (clinic: any) => {
    setEditClinicData({ name: clinic.name, code: clinic.code, address: clinic.address });
    setShowEditModal(clinic);
    setShowActionMenu(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal) return;

    setClinics(clinics.map(c => 
      c.id === showEditModal.id 
        ? { ...c, name: editClinicData.name, code: editClinicData.code, address: editClinicData.address }
        : c
    ));
    setShowEditModal(null);
  };



  const handleAssignAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAssignAdminModal) return;

    setClinics(clinics.map(c => 
      c.id === showAssignAdminModal.id 
        ? { ...c, admin: newAdminEmail || 'Not Assigned' }
        : c
    ));
    
    if (selectedClinic && selectedClinic.id === showAssignAdminModal.id) {
      setSelectedClinic({ ...selectedClinic, admin: newAdminEmail || 'Not Assigned' });
    }

    setDemoEmailData({ email: newAdminEmail, clinic: showAssignAdminModal });
    setShowAssignAdminModal(null);
  };

  // If a clinic is selected, show the detail view
  if (selectedClinic) {
    return (
      <PlatformClinicDetail 
        clinic={selectedClinic}
        onUpdateClinic={(updatedClinic) => {
          setClinics(clinics.map(c => c.id === updatedClinic.id ? updatedClinic : c));
          setSelectedClinic(updatedClinic);
        }}
        onBack={() => setSelectedClinic(null)} 
        onUpdateStatus={(clinicId, newStatus) => {
          setShowStatusConfirmModal({ clinic: clinics.find(c => c.id === clinicId), newStatus });
        }}
      />
    );
  }

  return (
    <div className="dashboard-container h-full flex flex-col relative animate-fadeIn">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl font-bold">Clinic Management</h1>
          <p className="text-muted">Manage tenant clinics, their statuses, and administrators.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} className="mr-2" />
            Create Clinic
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
            <Building2 size={24} className="text-blue-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Clinics</div>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↑ +3</span>
              <span className="text-gray-400 ml-1">vs. last month</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mr-4">
            <CheckCircle2 size={24} className="text-green-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Active Clinics</div>
            <div className="text-2xl font-bold text-gray-900">18</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↑ +2</span>
              <span className="text-gray-400 ml-1">vs. last month</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mr-4">
            <Clock size={24} className="text-orange-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Pending Setup</div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-400 flex items-center mt-1">
              <span className="mr-1">0</span>
              <span className="text-gray-400 ml-1">vs. last month</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4">
            <X size={24} className="text-red-500" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Suspended Clinics</div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-xs text-red-500 flex items-center mt-1">
              <span className="mr-1">~ +1</span>
              <span className="text-gray-400 ml-1">vs. last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-4 mt-6">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
          <div className="search-bar" style={{ width: '100%', maxWidth: '400px' }}>
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search clinic code or name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select 
            className="form-input text-sm h-[42px] w-48" 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Setup">Pending Setup</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Created Date</label>
          <select 
            className="form-input text-sm h-[42px] w-48" 
            value={dateFilter} 
            onChange={e => setDateFilter(e.target.value)}
          >
            <option value="All Dates">All Dates</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
        </div>

        <button 
          className="btn-secondary h-[42px] ml-auto px-6 text-sm"
          onClick={() => {
            setSearchTerm('');
            setStatusFilter('All Statuses');
            setDateFilter('All Dates');
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="flex justify-between items-center mt-6 py-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">Showing 1-{filteredClinics.length} of {filteredClinics.length} clinics</span>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show</span>
          <select className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <span>per page</span>
        </div>
      </div>

      <div className="table-container mt-2 flex-1 rounded-lg border border-gray-200">
        <table className="data-table w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="py-3 px-4 border-b border-gray-200 font-medium whitespace-nowrap">Clinic Code <span className="ml-1 text-[10px]">↕</span></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium whitespace-nowrap">Clinic Name <span className="ml-1 text-[10px]">↕</span></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium whitespace-nowrap">Status <span className="ml-1 text-[10px]">↕</span></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium whitespace-nowrap">Primary Admin <span className="ml-1 text-[10px]">↕</span></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium whitespace-nowrap">Staff Count <span className="ml-1 text-[10px]">↕</span></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium whitespace-nowrap">Created Date <span className="ml-1 text-[10px]">↕</span></th>
              <th className="py-3 px-4 border-b border-gray-200 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClinics.map(clinic => (
              <tr key={clinic.id} onClick={() => setSelectedClinic(clinic)} className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900" onClick={(e) => { e.stopPropagation(); setSelectedClinic(clinic); }}>
                  {clinic.code}
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-indigo-700">{clinic.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{clinic.address}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${clinic.status === 'Active' ? 'bg-green-100 text-green-800' : clinic.status === 'Suspended' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                    {clinic.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="font-medium text-gray-900">{clinic.adminName}</div>
                  <div className="text-xs text-gray-500">{clinic.adminEmail}</div>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {clinic.staffCount}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-gray-900">{clinic.createdDate}</div>
                  <div className="text-xs text-gray-500">{clinic.createdAgo}</div>
                </td>
                <td className="py-3 px-4 text-right" style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                  <div className="flex justify-center items-center gap-4 text-gray-400">
                    <button 
                      className="hover:text-indigo-600 transition-colors"
                      onClick={() => setShowActionMenu(showActionMenu === clinic.id ? null : clinic.id)}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  {/* Action Menu Dropdown */}
                  {showActionMenu === clinic.id && (
                    <div className="dropdown-menu mt-2 right-4 shadow-lg border border-gray-100 z-10 w-48 bg-white rounded-md">
                      <button className="dropdown-item w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center" onClick={() => { setSelectedClinic(clinic); setShowActionMenu(null); }}>
                        <Search size={14} className="mr-2" /> View Details
                      </button>
                      
                      <button className="dropdown-item w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center" onClick={() => openEditModal(clinic)}>
                        <Edit2 size={14} className="mr-2" /> Edit Information
                      </button>
                      
                      <div className="border-t border-gray-100 my-1"></div>

                      {clinic.status === 'Pending Setup' && (
                        <button 
                          className="dropdown-item success w-full text-left px-4 py-2 hover:bg-green-50 text-green-600 text-sm flex items-center"
                          onClick={() => {
                            setShowStatusConfirmModal({ clinic, newStatus: 'Active' });
                            setShowActionMenu(null);
                          }}
                        >
                          <CheckCircle2 size={14} className="mr-2" /> Activate Clinic
                        </button>
                      )}

                      {clinic.status === 'Active' && (
                        <button 
                          className="dropdown-item danger w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center"
                          onClick={() => {
                            setShowStatusConfirmModal({ clinic, newStatus: 'Suspended' });
                            setShowActionMenu(null);
                          }}
                        >
                          <AlertTriangle size={14} className="mr-2" /> Suspend Clinic
                        </button>
                      )}

                      {clinic.status === 'Suspended' && (
                        <button 
                          className="dropdown-item success w-full text-left px-4 py-2 hover:bg-green-50 text-green-600 text-sm flex items-center"
                          onClick={() => {
                            setShowStatusConfirmModal({ clinic, newStatus: 'Active' });
                            setShowActionMenu(null);
                          }}
                        >
                          <Activity size={14} className="mr-2" /> Reactivate Clinic
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredClinics.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  No clinics found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination placeholder matching image */}
        <div className="flex justify-end items-center py-4 px-6 gap-1 border-t border-gray-200">
           <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-sm">{"<"}</button>
           <button className="w-8 h-8 flex items-center justify-center rounded border border-indigo-600 bg-indigo-600 text-white font-medium text-sm">1</button>
           <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-sm">{">"}</button>
        </div>
      </div>

      {/* Overlay for closing action menu or filter menu */}
      {(showActionMenu || filterMenuOpen) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => { setShowActionMenu(null); setFilterMenuOpen(false); }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 }}
        />
      )}

      {/* Create Clinic Modal (Extended) */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCloseCreateModal}>
          <div className="modal-content !max-w-2xl" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h2><Building2 size={20} className="text-indigo-700" /> Create New Organization</h2>
              <button onClick={handleCloseCreateModal} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                
                {duplicateWarning && (
                  <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <AlertTriangle style={{ color: '#d97706', marginRight: '12px', flexShrink: 0, marginTop: '2px' }} size={20} />
                    <div>
                      <h4 style={{ color: '#92400e', fontWeight: 700, fontSize: '14px', margin: '0 0 4px 0' }}>Potential Duplicate Detected</h4>
                      <p style={{ color: '#b45309', fontSize: '12px', margin: 0 }}>A potentially matching organization already exists based on Name, Email, or Phone. Please review it before creating a new organization.</p>
                    </div>
                  </div>
                )}
                
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Organization Type</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Type *</label>
                    <select className="form-input" value={newClinic.type} onChange={(e) => handleNewClinicChange('type', e.target.value)}>
                      <option value="Clinic">Clinic</option>
                      <option value="Hospital">Hospital</option>
                    </select>
                  </div>
                </div>

                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Basic Information</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0">
                    <label className="form-label">Legal Name *</label>
                    <input type="text" required className="form-input" value={newClinic.legalName} onChange={(e) => handleNewClinicChange('legalName', e.target.value)} placeholder="Official registered entity name" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Display Name *</label>
                    <input type="text" required className="form-input" value={newClinic.name} onChange={(e) => handleNewClinicChange('name', e.target.value)} placeholder="e.g. City General Hospital" />
                  </div>
                </div>
                
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Location & Localization</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Street Address *</label>
                    <input type="text" required className="form-input" value={newClinic.street} onChange={(e) => handleNewClinicChange('street', e.target.value)} placeholder="123 Wellness Ave, Building B" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">City *</label>
                    <input type="text" required className="form-input" value={newClinic.city} onChange={(e) => handleNewClinicChange('city', e.target.value)} placeholder="Bangkok" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">State / Province</label>
                    <input type="text" className="form-input" value={newClinic.state} onChange={(e) => handleNewClinicChange('state', e.target.value)} placeholder="Bangkok" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Postal Code</label>
                    <input type="text" className="form-input" value={newClinic.zip} onChange={(e) => handleNewClinicChange('zip', e.target.value)} placeholder="10110" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Country (Locked for MVP) *</label>
                    <select className="form-input bg-gray-100 cursor-not-allowed" value={newClinic.country} disabled style={{ backgroundColor: '#f3f4f6' }}>
                      <option value="Thailand">Thailand</option>
                    </select>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Timezone (Locked for MVP) *</label>
                    <select className="form-input bg-gray-100 cursor-not-allowed" value={newClinic.timezone} disabled style={{ backgroundColor: '#f3f4f6' }}>
                      <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                    </select>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Default Language *</label>
                    <select className="form-input" value={newClinic.language} onChange={(e) => handleNewClinicChange('language', e.target.value)}>
                      <option value="English">English</option>
                      <option value="Thai">Thai</option>
                    </select>
                  </div>
                </div>

                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: 0 }}>Contact Details</h3>
                <div className="detail-grid" style={{ marginBottom: '24px', gap: '16px' }}>
                  <div className="form-group mb-0">
                    <label className="form-label">Contact Email *</label>
                    <input type="email" required className="form-input" value={newClinic.contactEmail} onChange={(e) => handleNewClinicChange('contactEmail', e.target.value)} placeholder="info@clinic.com" />
                    <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', margin: '4px 0 0 0' }}>General contact email. Not the admin account.</p>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Contact Phone *</label>
                    <input type="tel" required className="form-input" value={newClinic.contactPhone} onChange={(e) => handleNewClinicChange('contactPhone', e.target.value)} placeholder="+66..." />
                    <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', margin: '4px 0 0 0' }}>International format (e.g. +66812345678)</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={handleCloseCreateModal} className="btn-secondary" disabled={isCreating}>Cancel</button>
                
                {duplicateWarning ? (
                  <button type="button" onClick={proceedCreation} className="btn-primary bg-amber-600 hover:bg-amber-700 border-amber-600" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Proceed Anyway'}
                  </button>
                ) : (
                  <button type="submit" className="btn-primary" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Organization'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedChangesModal && (
        <div className="modal-overlay" onClick={() => setShowUnsavedChangesModal(false)} style={{ zIndex: 1000 }}>
          <div className="modal-content !max-w-md" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className="flex items-start gap-4">
                <div className="modal-icon-warning">
                  <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Discard unsaved changes?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    You have entered information for a new organization. If you close this window, all unsaved information will be lost.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowUnsavedChangesModal(false)} className="btn-secondary">Keep Editing</button>
              <button 
                onClick={() => {
                  setShowUnsavedChangesModal(false);
                  setShowCreateModal(false);
                  setIsDirty(false);
                  setDuplicateWarning(false);
                  setNewClinic({ type: 'Clinic', name: '', legalName: '', address: '', street: '', city: '', state: '', zip: '', country: 'Thailand', timezone: 'Asia/Bangkok', language: 'English', contactEmail: '', contactPhone: '' });
                }} 
                className="btn-primary" 
                style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Clinic Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Edit2 size={20} className="text-blue-600" /> Edit Clinic Details</h2>
              <button onClick={() => setShowEditModal(null)} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Clinic Name *</label>
                  <input type="text" required className="form-input" value={editClinicData.name} onChange={(e) => setEditClinicData({...editClinicData, name: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Clinic Code (Cannot be changed)</label>
                  <input type="text" disabled className="form-input mono bg-gray-100 cursor-not-allowed" value={editClinicData.code} />
                </div>
                
                <div className="form-group mb-0">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-input" value={editClinicData.address} onChange={(e) => setEditClinicData({...editClinicData, address: e.target.value})} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowEditModal(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Admin Modal */}
      {showAssignAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAssignAdminModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><UserPlus size={20} className="text-indigo-700" /> Assign Clinic Admin</h2>
              <button onClick={() => setShowAssignAdminModal(null)} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAssignAdminSubmit}>
              <div className="modal-body">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Assigning a new administrator for <strong>{showAssignAdminModal.name}</strong>.</p>
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Admin Email Address *</label>
                  <input type="email" required className="form-input" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} placeholder="admin@clinic.com" />
                  <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-xs rounded-r-md">
                    An invitation link will be sent to this email address.
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAssignAdminModal(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Confirmation Modal */}
      {showStatusConfirmModal && (
        <div className="modal-overlay" onClick={() => {
          setShowStatusConfirmModal(null);
          setSuspendReason('');
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className="flex items-start gap-4">
                <div className={
                  showStatusConfirmModal.newStatus === 'Suspended'
                  ? 'modal-icon-warning' 
                  : 'modal-icon-success'
                }>
                  {showStatusConfirmModal.newStatus === 'Suspended'
                    ? <AlertTriangle size={24} /> 
                    : <CheckCircle2 size={24} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {showStatusConfirmModal.newStatus === 'Suspended' && 'Suspend Clinic?'}
                    {showStatusConfirmModal.newStatus === 'Active' && 'Activate Clinic?'}
                  </h3>
                  
                  <div className="text-sm text-gray-600 leading-relaxed mb-4">
                    {showStatusConfirmModal.newStatus === 'Suspended' && (
                      <p className="mb-2">Are you sure you want to suspend <strong>{showStatusConfirmModal.clinic.name}</strong>?</p>
                    )}
                    {showStatusConfirmModal.newStatus === 'Active' && (
                      <p>Activate <strong>{showStatusConfirmModal.clinic.name}</strong>? Clinic staff will gain access to the platform.</p>
                    )}
                  </div>

                  {showStatusConfirmModal.newStatus === 'Suspended' && (
                    <div className="form-group mb-0">
                      <label className="form-label">Reason Required *</label>
                      <textarea 
                        required
                        className="form-input" 
                        rows={3} 
                        placeholder="Please provide a reason for the audit log..."
                        value={suspendReason}
                        onChange={(e) => setSuspendReason(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => {
                setShowStatusConfirmModal(null);
                setSuspendReason('');
              }} className="btn-secondary">Cancel</button>
              <button 
                onClick={handleStatusChange} 
                className="btn-primary" 
                style={{ backgroundColor: showStatusConfirmModal.newStatus === 'Suspended' ? '#dc2626' : '#16a34a' }}
              >
                {showStatusConfirmModal.newStatus === 'Suspended' && 'Suspend Clinic'}
                {showStatusConfirmModal.newStatus === 'Active' && 'Activate Clinic'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Email Modal */}
      {demoEmailData && (
        <EmailDemoModal 
          email={demoEmailData.email}
          subject={`Invitation to administer ${demoEmailData.clinic.name}`}
          greeting="Dear Administrator,"
          body1={<>You have been invited to serve as the <strong>Clinic Administrator</strong> for <strong>{demoEmailData.clinic.name}</strong> on the Health Hub Platform.</>}
          body2="To accept this invitation and access the clinic's management dashboard, please set up your account credentials and two-factor authentication."
          buttonText="Accept Invitation & Setup Account"
          onClose={() => setDemoEmailData(null)}
          onAccept={() => setDemoEmailData(null)}
        />
      )}
    </div>
  );
}
