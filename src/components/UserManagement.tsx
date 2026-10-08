import { useState, useEffect } from 'react';
import { Download, Search, Eye, PowerOff, Mail, XCircle, UserPlus, Play, Shield, Key, Edit, Settings, Lock } from 'lucide-react';
import UserDetailsDrawer from './UserDetailsDrawer';
import InviteStaffDrawer from './InviteStaffDrawer';
import UserFormModal from './UserFormModal';
import './UserManagement.css';

const MOCK_USERS = [
  { id: '1', name: 'Robert Clark', email: 'robert.clark@innotechlab.net', phone: '+66 097-2077', clinic: 'All Clinics', role: ['Clinic Admin'], status: 'Active', lastLogin: 'May 6, 2026\n11:11', hasKey: false },
  { id: '2', name: 'Malee Srikul', email: 'malee.srikul@innotechlab.net', phone: '+66 024-2154', clinic: 'Chiang Mai Health Hub', role: ['Clinic Admin'], status: 'Active', lastLogin: 'Jun 11, 2026\n14:22', hasKey: false },
  { id: '3', name: 'Susan Moore', email: 'susan.moore@innotechlab.net', phone: '+66 871-2231', clinic: 'Sathorn Family Clinic', additionalClinics: '+1 more', role: ['Clinic Admin'], status: 'Active', lastLogin: 'Jan 16, 2026\n17:33', hasKey: false },
  { id: '4', name: 'Orawan Petchara', email: 'orawan.petchara@innotechlab.net', phone: '+66 838-2305', clinic: 'Phuket Wellness Center', role: ['Clinic Admin'], status: 'Inactive', lastLogin: 'Feb 21, 2026\n10:44', hasKey: false },
  { id: '5', name: 'Daniel Srisawat', email: 'daniel.srisawat@innotechlab.net', phone: '+66 079-2539', clinic: 'Ekkamai Dental & Medical', role: ['Doctor'], status: 'Active', lastLogin: 'May 8, 2026\n09:17', hasKey: false },
  { id: '7', name: 'Alice Tan', email: 'alice.tan@innotechlab.net', phone: '-', clinic: 'Platform', role: ['Receptionist'], status: 'Pending Invitation', lastLogin: '-', hasKey: false },
  { id: '8', name: 'James Doe', email: 'james.doe@innotechlab.net', phone: '-', clinic: 'Platform', role: ['Technician'], status: 'Invitation Expired', lastLogin: '-', hasKey: false },
];

interface UserManagementProps {
  currentRole?: string;
  currentClinic?: any;
  mockClinics?: any[];
}

export default function UserManagement({ currentRole, currentClinic, mockClinics }: UserManagementProps) {
  const [showUserForm, setShowUserForm] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<'profile' | 'permissions' | 'security'>('profile');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewUser, setViewUser] = useState<any>(null);
  const [viewUserTab, setViewUserTab] = useState<'information' | 'permissions' | 'history'>('information');
  const [selectedClinicId, setSelectedClinicId] = useState<string>(currentClinic?.id || 'all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);
  const [usersList, setUsersList] = useState(MOCK_USERS);

  const handleEditUser = (user: any, tab: 'profile' | 'permissions' | 'security' = 'profile') => {
    setSelectedUser(user);
    setActiveFormTab(tab);
    setShowUserForm(true);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Temporarily bypass clinic filtering to show mock data
  let filteredUsers = usersList;

  // Custom stats based on screenshot
  const stats = [
    { label: 'Clinic Admin', value: 6 },
    { label: 'Doctor', value: 12 },
    { label: 'Technician', value: 6 },
    { label: 'Receptionist', value: 5 },
  ];



  const handleInviteStaff = (invitedUsers: any[]) => {
    console.log(`[AUDIT] ${currentRole || 'Admin'} invited staff:`, invitedUsers);
    const newUsers = invitedUsers.map(u => ({
      id: `inv-${Date.now()}-${Math.random()}`,
      name: u.name || '-',
      email: u.email,
      phone: u.phone || '-',
      clinic: u.clinic || currentClinic?.name || 'Current Clinic',
      role: Array.isArray(u.role) ? u.role : [u.role],
      status: 'Pending Invitation',
      lastLogin: '-',
      hasKey: false
    }));
    setUsersList([...newUsers, ...usersList]);
    setShowInviteDrawer(false);
  };

  const handleResendInvite = (userId: string) => {
    console.log('[AUDIT] Invitation resent to user ID', userId);
    setOpenMenuId(null);
    alert('Invitation resent successfully.');
  };

  const handleCancelInvite = (userId: string) => {
    console.log('[AUDIT] Invitation cancelled for user ID', userId);
    setUsersList(usersList.filter(u => u.id !== userId));
    setOpenMenuId(null);
  };

  const handleDeactivate = (userId: string) => {
    console.log('[AUDIT] User deactivated:', userId);
    setUsersList(usersList.map(u => u.id === userId ? { ...u, status: 'Inactive' } : u));
    setOpenMenuId(null);
  };

  const handleReactivate = (userId: string) => {
    console.log('[AUDIT] User reactivated:', userId);
    setUsersList(usersList.map(u => u.id === userId ? { ...u, status: 'Active' } : u));
    setOpenMenuId(null);
  };

  return (
    <div className="um-container">
      <div className="um-header">
        <div className="um-title-section">
          <h1>User Management</h1>
          <p>Manage clinic staff accounts, invitations, roles, and account status.</p>
        </div>
        
        {currentRole === 'Platform Admin' && mockClinics && (
          <div style={{ marginLeft: 'auto', marginRight: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Clinic:</span>
            <select 
              value={selectedClinicId}
              onChange={(e) => setSelectedClinicId(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }}
            >
              <option value="all">All Clinics</option>
              {mockClinics.map((clinic: any) => (
                <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="um-actions">
          <button className="um-btn-secondary">
            <Download size={16} /> Export Users
          </button>
          <button className="um-btn-primary" onClick={() => setShowInviteDrawer(true)}>
            <UserPlus size={16} /> Add User
          </button>
        </div>
      </div>

      <div className="um-stats-grid">
            {stats.map(stat => (
              <div key={stat.label} className="um-stat-card">
                <span className="um-stat-value">{stat.value}</span>
                <span className="um-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="um-section">
            <div className="um-toolbar">
              <div className="um-search">
                <Search size={16} className="um-search-icon" />
                <input type="text" placeholder="Search by name or email" />
              </div>
              <div className="um-filters">
                <div className="um-filter-group">
                  <label>Role:</label>
                  <select className="um-filter-select"><option>All</option></select>
                </div>
                <div className="um-filter-group">
                  <label>Status:</label>
                  <select className="um-filter-select"><option>All</option></select>
                </div>
                <button className="um-btn-reset">Reset</button>
              </div>
            </div>

            <div className="um-table-container">
              <table className="um-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}><input type="checkbox" className="um-user-checkbox" /></th>
                    <th>STAFF NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th style={{ width: 40 }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td><input type="checkbox" className="um-user-checkbox" /></td>
                      <td>
                        <div className="um-user-details">
                          <span className="um-user-name">
                            {user.hasKey && <Key size={14} className="um-key-icon" />}
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="um-cell-text">{user.email}</span>
                      </td>
                      <td>
                        <span className="um-cell-text">{user.phone}</span>
                      </td>
                      <td>
                        <div className="um-roles-cell">
                          {user.role.slice(0, 1).map(r => (
                            <span key={r} className={`um-badge um-badge-role um-role-${r.replace(/\s+/g, '').toLowerCase()}`}>{r}</span>
                          ))}
                        </div>
                      </td>
                      <td><span className={`um-badge um-badge-status-${user.status.replace(/\s+/g, '').toLowerCase()}`}>{user.status}</span></td>
                      <td style={{ position: 'relative' }}>
                        <div className="um-table-actions">
                          <button 
                            className="um-action-btn-more"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === user.id ? null : user.id);
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </button>
                          
                          {openMenuId === user.id && (
                            <div className="um-action-menu" onClick={(e) => e.stopPropagation()}>
                              {(user.status === 'Pending Invitation' || user.status === 'Invitation Expired') && (
                                <button className="um-action-item" onClick={() => { setOpenMenuId(null); alert('Invitation resent successfully!'); }}>
                                  <Mail size={14} className="um-action-icon" /> Resend Invitation
                                </button>
                              )}
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); setViewUserTab('information'); setViewUser(user); }}>
                                <Eye size={14} className="um-action-icon" /> View detail
                              </button>
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); setViewUserTab('information'); setViewUser(user); }}>
                                <Edit size={14} className="um-action-icon" /> Edit user
                              </button>
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); setViewUserTab('permissions'); setViewUser(user); }}>
                                <Settings size={14} className="um-action-icon" /> Manager Permission
                              </button>
                              <button className="um-action-item" onClick={() => { setOpenMenuId(null); }}>
                                <Lock size={14} className="um-action-icon" /> Reset password
                              </button>
                              <button className="um-action-item" onClick={() => handleDeactivate(user.id)}>
                                <XCircle size={14} className="um-action-icon" /> Deactivate
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="um-pagination">
              <span className="um-pagination-info">Showing 1 - 10 of 29 users</span>
              <div className="um-pagination-controls">
                <button className="um-page-btn">&lt;</button>
                <button className="um-page-btn active">1</button>
                <button className="um-page-btn">2</button>
                <button className="um-page-btn">3</button>
                <button className="um-page-btn">&gt;</button>
              </div>
            </div>
          </div>
      
      {showUserForm && (
        <UserFormModal
          user={selectedUser}
          initialTab={activeFormTab}
          onClose={() => setShowUserForm(false)}
        />
      )}

      {viewUser && (
        <UserDetailsDrawer 
          user={viewUser} 
          initialTab={viewUserTab}
          onClose={() => setViewUser(null)} 
          onEdit={() => handleEditUser(viewUser)}
        />
      )}
      
      {showInviteDrawer && (
        <InviteStaffDrawer
          onClose={() => setShowInviteDrawer(false)}
          currentRole={currentRole}
          currentClinic={currentClinic}
          mockClinics={mockClinics}
          existingUsers={usersList}
          onInvite={handleInviteStaff}
        />
      )}
    </div>
  );
}
