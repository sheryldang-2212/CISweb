import React, { useState } from 'react';
import { X, Monitor, Mail, MessageSquare, Info, Check } from 'lucide-react';
import './EditNotificationModal.css';

interface EditClinicNotificationModalProps {
  notification: {
    event: string;
    category: string;
    trigger: string;
    channels: string[];
    recipients: string;
  };
  onClose: () => void;
  onSave: () => void;
}

export default function EditClinicNotificationModal({ notification, onClose, onSave }: EditClinicNotificationModalProps) {
  const [portalEnabled, setPortalEnabled] = useState(notification.channels.includes('Portal'));
  const [emailEnabled, setEmailEnabled] = useState(notification.channels.includes('Email'));
  const [smsEnabled, setSmsEnabled] = useState(notification.channels.includes('SMS'));
  
  const initialRecipients = notification.recipients.split(', ');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(initialRecipients);
  
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN');
  
  // Default values for clinic from the image
  const [portalTitle, setPortalTitle] = useState('LIS sync failed');
  const [portalMessage, setPortalMessage] = useState('Results from LIS could not be synced. Check the LIS connection.');
  const [emailSubject, setEmailSubject] = useState('LIS sync failed');
  const [emailMessage, setEmailMessage] = useState('Health Hub could not sync results from LIS. Please check the LIS connection. New results may be delayed until the sync is restored.');

  const toggleRecipient = (role: string) => {
    setSelectedRecipients(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const recipientRoles = ['Receptionist', 'Doctors', 'Technicians', 'Clinic Admin'];

  return (
    <div className="modal-overlay">
      <div className="modal-content notification-modal" style={{ width: '800px', maxWidth: '95vw', padding: 0 }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Edit notification</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', padding: '24px', backgroundColor: '#f8fafc', maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Event Section */}
            <div className="settings-section">
              <h3 className="section-title">Event</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div className="field-label">Notification</div>
                  <div className="field-value">{notification.event}</div>
                </div>
                <div>
                  <div className="field-label">Category</div>
                  <div className="field-value">{notification.category}</div>
                </div>
                <div>
                  <div className="field-label">Trigger event</div>
                  <div className="field-value">{notification.trigger}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', padding: '12px 16px', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#3b82f6', fontSize: '13px' }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Sent to all users with the selected roles in the clinic.</span>
              </div>
            </div>

            {/* Recipients Section */}
            <div className="settings-section">
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Recipients <span className="required" style={{ color: '#ef4444' }}>*</span>
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {recipientRoles.map(role => {
                  const isActive = selectedRecipients.includes(role);
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRecipient(role)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: isActive ? '1px solid #d97706' : '1px solid #e2e8f0',
                        backgroundColor: isActive ? '#fef3c7' : 'white',
                        color: isActive ? '#0f172a' : '#64748b',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ 
                        width: '16px', height: '16px', borderRadius: '4px', 
                        border: isActive ? 'none' : '1px solid #cbd5e1',
                        backgroundColor: isActive ? '#d97706' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {isActive && <Check size={12} color="white" />}
                      </div>
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Channels Section */}
            <div className="settings-section">
              <h3 className="section-title">Channels</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                
                <div className={`channel-card ${portalEnabled ? 'active' : ''}`}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Monitor size={16} color={portalEnabled ? '#d97706' : '#64748b'} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="channel-title">Web portal</div>
                      <div className="channel-desc">Portal notification centre</div>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={portalEnabled} onChange={e => setPortalEnabled(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className={`channel-card ${emailEnabled ? 'active' : ''}`}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Mail size={16} color={emailEnabled ? '#d97706' : '#64748b'} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="channel-title">Email</div>
                      <div className="channel-desc">To the user's work email</div>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={emailEnabled} onChange={e => setEmailEnabled(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className={`channel-card ${smsEnabled ? 'active' : ''}`}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <MessageSquare size={16} color={smsEnabled ? '#d97706' : '#64748b'} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="channel-title">SMS</div>
                      <div className="channel-desc">To the user's work mobile</div>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={smsEnabled} onChange={e => setSmsEnabled(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>

              </div>
            </div>

            {/* Message Section */}
            <div className="settings-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="section-title" style={{ margin: 0 }}>Message</h3>
                <div className="language-tabs">
                  <button className={language === 'EN' ? 'active' : ''} onClick={() => setLanguage('EN')}>English</button>
                  <button className={language === 'TH' ? 'active' : ''} onClick={() => setLanguage('TH')}>ไทย</button>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label>Portal title ({language}) <span className="required" style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" value={portalTitle} onChange={e => setPortalTitle(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Portal message ({language}) <span className="required" style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" value={portalMessage} onChange={e => setPortalMessage(e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Email subject ({language}) <span className="required" style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
              </div>
              
              <div className="form-group">
                <label>Email message ({language}) <span className="required" style={{ color: '#ef4444' }}>*</span></label>
                <textarea rows={4} value={emailMessage} onChange={e => setEmailMessage(e.target.value)}></textarea>
              </div>
            </div>
            
          </div>

          {/* Right Column: Preview */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>PREVIEW</h3>
            
            <div className="preview-container">
              
              {/* Push Preview */}
              {portalEnabled && (
                <div className="push-preview">
                  <div className="push-header">
                    CIS web portal
                  </div>
                  <div className="push-title">{portalTitle}</div>
                  <div className="push-message">{portalMessage}</div>
                </div>
              )}

              {/* Email Preview */}
              {emailEnabled && (
                <div className="email-preview">
                  <div className="email-label">Email</div>
                  <div className="email-subject">{emailSubject}</div>
                  <div className="email-body">{emailMessage}</div>
                </div>
              )}
              
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ backgroundColor: '#d97706', borderColor: '#d97706' }} onClick={onSave}>Save</button>
        </div>
        
      </div>
    </div>
  );
}
