import React, { useState } from 'react';
import { X, Edit2, User, Stethoscope, Microscope, Shield, ChevronUp, ChevronDown, Calendar, Mail, Phone } from 'lucide-react';
import { PERMISSION_MODULES } from './RolesPermissionsData';
import './UserFormModal.css';

interface UserFormModalProps {
  user: any;
  onClose: () => void;
  initialTab?: 'profile' | 'permissions' | 'security';
}

export default function UserFormModal({ user, onClose, initialTab = 'profile' }: UserFormModalProps) {
  const isEdit = !!user;
  const [activeTab, setActiveTab] = useState<'profile' | 'permissions' | 'security'>(initialTab);
  
  // Accordion state
  const initialRoles = user?.role 
    ? (Array.isArray(user.role) ? user.role : [user.role]).map((r: string) => r === 'Admin' ? 'Clinic Admin' : r)
    : ['Receptionist'];
  const [assignedRoles, setAssignedRoles] = useState<string[]>(initialRoles);
  const [expandedRole, setExpandedRole] = useState<string | null>(initialRoles[0] || null);

  const [isMultiRoleOpen, setIsMultiRoleOpen] = useState(false);
  const [newRoles, setNewRoles] = useState<string[]>(['Receptionist']);

  const toggleNewRole = (role: string) => {
    setNewRoles(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const toggleRole = (role: string) => {
    setAssignedRoles(prev => {
      const isSelected = prev.includes(role);
      let newRoles;
      if (isSelected) {
        newRoles = prev.filter(r => r !== role);
        if (expandedRole === role) setExpandedRole(null);
      } else {
        newRoles = [...prev, role];
        setExpandedRole(role); // Auto-expand newly assigned role
      }
      return newRoles;
    });
  };

  const roleOptions = [
    { name: 'Receptionist', icon: User },
    { name: 'Technician', icon: Microscope },
    { name: 'Doctor', icon: Stethoscope },
    { name: 'Clinic Admin', icon: Shield }
  ];
  
  const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'AM';

  return (
    <div className="um-modal-overlay" onClick={onClose}>
      <div className="um-modal-content" onClick={e => e.stopPropagation()} style={!isEdit ? { maxWidth: '480px' } : {}}>
        <div className="um-modal-header" style={!isEdit ? { borderBottom: 'none', paddingBottom: 0 } : {}}>
          <h2>{isEdit ? 'User Details' : 'Add New User'}</h2>
          <button className="um-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isEdit ? (
          <>
            <div className="um-top-profile">
              <div className="um-top-profile-info">
                <div className="um-avatar-large">{initials}</div>
                <div className="um-profile-name-group">
                  <span className="um-profile-name">
                    {user?.name || 'Ananda Meesuk'}
                    <span className="um-clinic-badge active">Active</span>
                  </span>
                  <span className="um-profile-email">{user?.email || 'ananda.m@innotech.co.th'}</span>
                </div>
              </div>
              <button className="um-btn-outline">
                <Edit2 size={14} /> Edit Profile
              </button>
            </div>

            <div className="um-detail-tabs">
              <button 
                className={`um-detail-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button 
                className={`um-detail-tab ${activeTab === 'permissions' ? 'active' : ''}`}
                onClick={() => setActiveTab('permissions')}
              >
                Role & Permissions
              </button>
              <button 
                className={`um-detail-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                Security & Sessions
              </button>
            </div>

            <div className="um-modal-body">
              {activeTab === 'profile' && (
                <div className="um-profile-tab-content">
                  <h3 className="um-section-title">Personal Information</h3>
                  <div className="um-form-grid">
                    <div className="um-form-group">
                      <label>First Name</label>
                      <div className="um-input-wrapper">
                        <User size={16} className="um-input-icon" style={{ color: '#9ca3af' }} />
                        <input type="text" className="um-form-input with-icon" defaultValue={user?.name ? user.name.split(' ')[0] : "Ananda"} disabled style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }} />
                      </div>
                    </div>
                    <div className="um-form-group">
                      <label>Last Name</label>
                      <div className="um-input-wrapper">
                        <User size={16} className="um-input-icon" style={{ color: '#9ca3af' }} />
                        <input type="text" className="um-form-input with-icon" defaultValue={user?.name ? user.name.split(' ').slice(1).join(' ') : "Meesuk"} disabled style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }} />
                      </div>
                    </div>
                    <div className="um-form-group">
                      <label>Date of Birth</label>
                      <div className="um-input-wrapper">
                        <Calendar size={16} className="um-input-icon" style={{ color: '#9ca3af' }} />
                        <input type="date" className="um-form-input with-icon" defaultValue="1990-05-15" disabled style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }} />
                      </div>
                    </div>
                    <div className="um-form-group">
                      <label>Gender</label>
                      <select className="um-form-select" disabled style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="um-section-title" style={{ marginTop: '24px' }}>Contact Information</h3>
                  <div className="um-form-grid">
                    <div className="um-form-group">
                      <label>Email Address</label>
                      <div className="um-input-wrapper">
                        <Mail size={16} className="um-input-icon" style={{ color: '#9ca3af' }} />
                        <input type="email" className="um-form-input with-icon" defaultValue={user?.email || "ananda.m@innotech.co.th"} disabled style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }} />
                      </div>
                    </div>
                    <div className="um-form-group">
                      <label>Phone Number</label>
                      <div className="um-input-wrapper">
                        <Phone size={16} className="um-input-icon" />
                        <input type="tel" className="um-form-input with-icon" defaultValue={user?.phone || "+66 82 123 4567"} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div>
                  <div className="um-roles-selection">
                    <div className="um-roles-label">Assigned Roles</div>
                    <div className="um-roles-grid">
                      {roleOptions.map(role => {
                        const Icon = role.icon;
                        const isSelected = assignedRoles.includes(role.name);
                        return (
                          <label key={role.name} className={`um-role-checkbox-card ${isSelected ? 'selected' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={isSelected} 
                              onChange={() => toggleRole(role.name)} 
                            />
                            <Icon size={14} className="um-role-icon" />
                            <span className="um-role-name">{role.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {assignedRoles.length > 0 && (
                    <div className="um-roles-label">Detailed Permissions Configuration</div>
                  )}
                  
                  {assignedRoles.map(roleName => {
                    const isExpanded = expandedRole === roleName;
                    const RoleIcon = roleOptions.find(r => r.name === roleName)?.icon || User;
                    
                    return (
                      <div key={roleName} className="um-role-accordion">
                        <div className="um-role-accordion-header" onClick={() => setExpandedRole(isExpanded ? null : roleName)}>
                          <div className="um-role-accordion-header-left">
                            <RoleIcon size={18} />
                            <span>{roleName} Role Permissions</span>
                          </div>
                          {isExpanded ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                        </div>
                        
                        {isExpanded && (
                          <div className="um-permissions-table-container">
                            <table className="um-perm-table">
                              <thead>
                                <tr>
                                  <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Permission</th>
                                  <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Code</th>
                                  <th style={{ textAlign: 'left', padding: '8px 16px', color: '#6b7280', fontSize: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Dependency</th>
                                </tr>
                              </thead>
                              <tbody>
                                {PERMISSION_MODULES.map(module => {
                                  const roleId = roleName.toLowerCase().replace(' ', '_');
                                  const availablePerms = module.permissions.filter(p => p.roles.includes(roleId));
                                  if (availablePerms.length === 0) return null;

                                  const ModIcon = module.icon;

                                  return (
                                    <React.Fragment key={module.id}>
                                      <tr className="um-perm-cat-row">
                                        <td className="um-perm-cat-cell" colSpan={3}>
                                          <input type="checkbox" className="um-perm-checkbox" defaultChecked />
                                          <ModIcon size={18} className="um-perm-cat-icon" />
                                          <span className="um-perm-cat-title">{module.name}</span>
                                          <span className="um-perm-cat-count">{availablePerms.length} of {availablePerms.length} selected</span>
                                        </td>
                                      </tr>
                                      {availablePerms.map(perm => (
                                        <tr key={perm.code} className="um-perm-detail-row">
                                          <td className="um-perm-detail-cell um-perm-name-cell">
                                            <input type="checkbox" className="um-perm-checkbox" defaultChecked style={{ marginRight: '8px' }} />
                                            {perm.name}
                                          </td>
                                          <td className="um-perm-detail-cell um-perm-code-cell">{perm.code}</td>
                                          <td className="um-perm-detail-cell">
                                            {perm.dependency ? (
                                              <span className="um-perm-rule-badge">{perm.dependency}</span>
                                            ) : (
                                              '—'
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </React.Fragment>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'security' && (
                <div style={{ maxWidth: '500px' }}>
                  <div className="um-toggle-group">
                    <span className="um-toggle-label">Active User</span>
                    <label className="um-toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="um-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              )}
              
            </div>

            <div className="um-modal-footer">
              <div className="um-unsaved-notice">
                <span style={{ color: '#d97706', fontSize: '24px', lineHeight: '12px' }}>•</span>
                <div>
                  <div style={{ fontWeight: 600 }}>You have unsaved changes</div>
                  <div style={{ fontSize: '0.75rem' }}>Don't forget to save your changes.</div>
                </div>
              </div>
              <div className="um-footer-actions">
                <button className="um-btn-outline" onClick={onClose}>Discard</button>
                <button className="um-btn-primary" onClick={onClose}>Save Changes</button>
              </div>
            </div>
          </>
        ) : (
          <div className="um-add-user-form">
            <div className="um-form-group">
              <label>Full Name *</label>
              <input type="text" className="um-form-input" placeholder="Enter full name" />
            </div>
            
            <div className="um-form-group">
              <label>Email Address *</label>
              <input type="email" className="um-form-input" placeholder="Enter email address" />
            </div>

            <div className="um-form-group">
              <label>Phone Number *</label>
              <input type="tel" className="um-form-input" placeholder="Enter phone number" />
            </div>

            <div className="um-form-group">
              <label>Role *</label>
              <div className="um-multi-select-container">
                <div 
                  className="um-form-input um-multi-select-header" 
                  onClick={() => setIsMultiRoleOpen(!isMultiRoleOpen)}
                >
                  <span className="um-multi-select-text">
                    {newRoles.length > 0 ? newRoles.join(', ') : 'Select roles...'}
                  </span>
                  <ChevronDown size={16} color="#6b7280" />
                </div>
                {isMultiRoleOpen && (
                  <div className="um-multi-select-dropdown">
                    {['Receptionist', 'Doctor', 'Technician', 'Admin'].map(role => (
                      <label key={role} className="um-multi-select-option">
                        <input 
                          type="checkbox" 
                          checked={newRoles.includes(role)} 
                          onChange={() => toggleNewRole(role)}
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="um-form-group">
              <label>Clinic</label>
              <input 
                type="text" 
                className="um-form-input" 
                value="Downtown Medical Center" 
                disabled 
                style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }}
              />
            </div>

            <div className="um-section-divider"></div>

            <h3 className="um-section-subtitle">Security Settings</h3>
            <div className="um-toggle-group">
              <span className="um-toggle-label" style={{ fontWeight: 500, fontSize: '0.875rem' }}>Active User</span>
              <label className="um-toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="um-toggle-slider"></span>
              </label>
            </div>

            <div className="um-form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
              <button className="um-btn-outline" onClick={onClose}>Cancel</button>
              <button className="um-btn-primary" onClick={onClose}>Add User</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
