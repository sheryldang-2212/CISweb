import { useState } from 'react';
import { X, Edit, User, Stethoscope, Shield, ChevronUp, LayoutDashboard, Users, FlaskConical, PenTool, Search, Calendar, Edit2, Plus, ArrowRight } from 'lucide-react';
import './UserDetailsDrawer.css';

interface UserDetailsDrawerProps {
  user: any;
  initialTab?: 'information' | 'permissions' | 'history';
  onClose: () => void;
  onEdit: () => void;
}

export default function UserDetailsDrawer({ user, initialTab = 'information', onClose, onEdit }: UserDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'information' | 'permissions' | 'history'>(initialTab);
  
  const defaultRole = user?.role?.[0] || user?.role || 'Clinic Admin';
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    Array.isArray(user?.role) ? user.role : [typeof defaultRole === 'string' ? defaultRole : 'Clinic Admin']
  );
  
  const [viewingRole, setViewingRole] = useState<string>(
    typeof defaultRole === 'string' ? defaultRole : 'Clinic Admin'
  );

  const toggleRole = (role: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
      setViewingRole(role); // also switch view to the newly checked role
    }
  };

  if (!user) return null;

  const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="ud-drawer-overlay" onClick={onClose}>
      <div className="ud-drawer-content" onClick={e => e.stopPropagation()}>
        <div className="ud-drawer-header">
          <h2>User detail</h2>
          <button className="ud-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="ud-drawer-tabs-wrapper">
          <div className="ud-drawer-tabs">
            <button 
              className={`ud-tab ${activeTab === 'information' ? 'active' : ''}`}
              onClick={() => setActiveTab('information')}
            >
              Information
            </button>
            <button 
              className={`ud-tab ${activeTab === 'permissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('permissions')}
            >
              Permissions
            </button>
            <button 
              className={`ud-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History Log
            </button>
          </div>
        </div>

        <div className="ud-drawer-body">
          {activeTab === 'information' && (
            <div className="ud-info-card">
              <div className="ud-profile-header">
                <div className="ud-avatar" style={{ backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa' }}>
                  {initials}
                </div>
                <div className="ud-profile-info">
                  <div className="ud-profile-name">{user.name}</div>
                  <div className="ud-profile-email">{user.email}</div>
                </div>
              </div>

              <div className="ud-details-list">
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Phone Number</span>
                  <span className="ud-detail-value">{user.phone || '(+66) 1234567890'}</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Email Address</span>
                  <span className="ud-detail-value">{user.email}</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Role</span>
                  <div className="ud-detail-value">
                    <span className={`um-badge um-badge-role um-role-${(user.role[0] || 'receptionist').replace(/\s+/g, '').toLowerCase()}`}>
                      {user.role[0] || 'Receptionist'}
                    </span>
                  </div>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Status</span>
                  <div className="ud-detail-value">
                    <span className={`um-badge um-badge-status-${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Created date</span>
                  <span className="ud-detail-value">Feb 4, 2026, 02:07</span>
                </div>
                <div className="ud-detail-item">
                  <span className="ud-detail-label">Last login</span>
                  <span className="ud-detail-value" style={{ whiteSpace: 'pre-line' }}>{user.lastLogin || 'May 15, 2026, 08:30'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="ud-permissions-content">
              
              <div className="ud-permissions-section">
                <h3 className="ud-section-title">Assigned Roles</h3>
                <div className="ud-roles-grid">
                  <div className={`ud-role-card ${viewingRole === 'Receptionist' ? 'active' : ''}`} onClick={() => setViewingRole('Receptionist')} style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedRoles.includes('Receptionist')} onChange={() => {}} onClick={(e) => toggleRole('Receptionist', e)} />
                    <User size={16} /> Receptionist
                  </div>
                  <div className={`ud-role-card ${viewingRole === 'Technician' ? 'active' : ''}`} onClick={() => setViewingRole('Technician')} style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedRoles.includes('Technician')} onChange={() => {}} onClick={(e) => toggleRole('Technician', e)} />
                    <PenTool size={16} /> Technician
                  </div>
                  <div className={`ud-role-card ${viewingRole === 'Doctor' ? 'active' : ''}`} onClick={() => setViewingRole('Doctor')} style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedRoles.includes('Doctor')} onChange={() => {}} onClick={(e) => toggleRole('Doctor', e)} />
                    <Stethoscope size={16} /> Doctor
                  </div>
                  <div className={`ud-role-card ${viewingRole === 'Clinic Admin' ? 'active' : ''}`} onClick={() => setViewingRole('Clinic Admin')} style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={selectedRoles.includes('Clinic Admin')} onChange={() => {}} onClick={(e) => toggleRole('Clinic Admin', e)} />
                    <Shield size={16} /> Clinic Admin
                  </div>
                </div>
              </div>

              <div className="ud-permissions-section" style={{ marginTop: '24px' }}>
                <h3 className="ud-section-title">Detailed Permissions Configuration</h3>
                
                <div className="ud-permissions-accordion">
                  <div className="ud-accordion-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937' }}>
                      <Shield size={18} />
                      <strong style={{ fontSize: '0.95rem' }}>{viewingRole} Role Permissions</strong>
                    </div>
                    <ChevronUp size={18} style={{ color: '#6b7280' }} />
                  </div>
                  
                  <div className="ud-permissions-table">
                    <div className="ud-pt-header">
                      <div className="ud-pt-col-main">Permission</div>
                      <div className="ud-pt-col">Dependency</div>
                    </div>
                    
                    {/* Group 1 */}
                    <div className="ud-pt-group">
                      <div className="ud-pt-row parent">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <LayoutDashboard size={16} style={{ color: '#4b5563' }} />
                          <span style={{ fontWeight: 600, color: '#1f2937' }}>Dashboard</span>
                          <span className="ud-pt-selected-text">2 of 2 selected</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>View Dashboard</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>View Analytics</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                    </div>

                    {/* Group 2 */}
                    <div className="ud-pt-group">
                      <div className="ud-pt-row parent">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <Users size={16} style={{ color: '#4b5563' }} />
                          <span style={{ fontWeight: 600, color: '#1f2937' }}>Patient Management</span>
                          <span className="ud-pt-selected-text">6 of 6 selected</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>View Patient List</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>Search Patient</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>View Patient Detail</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>Register Patient</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>Edit Patient</span>
                        </div>
                        <div className="ud-pt-col">
                          <span className="ud-pt-badge-warning">Requires View Detail</span>
                        </div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>Delete Patient</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                    </div>

                    {/* Group 3 */}
                    <div className="ud-pt-group">
                      <div className="ud-pt-row parent">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <FlaskConical size={16} style={{ color: '#4b5563' }} />
                          <span style={{ fontWeight: 600, color: '#1f2937' }}>Lab Orders</span>
                          <span className="ud-pt-selected-text">9 of 9 selected</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child">
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>View Lab Order List</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                      <div className="ud-pt-row child" style={{ borderBottom: 'none' }}>
                        <div className="ud-pt-col-main">
                          <input type="checkbox" defaultChecked readOnly />
                          <span>Search Lab Orders</span>
                        </div>
                        <div className="ud-pt-col"></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="ud-history-content">
              
              <div className="ud-history-filters">
                <div className="ud-search-input">
                  <Search size={16} />
                  <input type="text" placeholder="Search" />
                </div>
                <div className="ud-date-input">
                  <input type="text" placeholder="Date range" />
                  <Calendar size={16} />
                </div>
              </div>

              <div className="ud-timeline">
                
                <div className="ud-timeline-item">
                  <div className="ud-timeline-icon edit">
                    <Edit2 size={14} />
                  </div>
                  <div className="ud-timeline-content">
                    <h4>Update status</h4>
                    <div className="ud-timeline-changes">
                      <span className="ud-change-label">Status : </span>
                      <span className="ud-change-old">Inactive</span>
                      <ArrowRight size={14} className="ud-arrow" />
                      <span className="ud-change-new">Active</span>
                    </div>
                    <div className="ud-timeline-meta">
                      by Platform Admin <span className="ud-meta-divider">|</span> 05 Jan 2026 • 09:00 AM
                    </div>
                  </div>
                </div>

                <div className="ud-timeline-item">
                  <div className="ud-timeline-icon edit">
                    <Edit2 size={14} />
                  </div>
                  <div className="ud-timeline-content">
                    <h4>Edit User</h4>
                    <div className="ud-timeline-changes">
                      <span className="ud-change-label">Clinic Access : </span>
                      <span className="ud-change-old">Thonglor Health Hub</span>
                      <ArrowRight size={14} className="ud-arrow" />
                      <span className="ud-change-new">Sukhumvit Wellness Clinic</span>
                    </div>
                    <div className="ud-timeline-changes" style={{ marginTop: '4px' }}>
                      <span className="ud-change-label">Phone Number : </span>
                      <span className="ud-change-old">+66 871-2231</span>
                      <ArrowRight size={14} className="ud-arrow" />
                      <span className="ud-change-new">+66 871-1234</span>
                    </div>
                    <div className="ud-timeline-meta">
                      by Platform Admin <span className="ud-meta-divider">|</span> 05 Jan 2026 • 09:00 AM
                    </div>
                  </div>
                </div>

                <div className="ud-timeline-item last">
                  <div className="ud-timeline-icon create">
                    <Plus size={14} />
                  </div>
                  <div className="ud-timeline-content">
                    <h4>User created</h4>
                    <div className="ud-timeline-meta" style={{ marginTop: '8px' }}>
                      by Platform Admin <span className="ud-meta-divider">|</span> 05 Jan 2026 • 09:00 AM
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        <div className="ud-drawer-footer">
          <button className="ud-btn-outline" onClick={() => { onClose(); onEdit(); }}>
            <Edit size={14} /> Edit user
          </button>
        </div>
      </div>
    </div>
  );
}
