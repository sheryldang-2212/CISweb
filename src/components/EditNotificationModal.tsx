import React, { useState } from 'react';
import { X, Smartphone, Mail, MessageSquare, Info } from 'lucide-react';
import './EditNotificationModal.css';

interface EditNotificationModalProps {
  notification: {
    event: string;
    category: string;
    trigger: string;
    channels: string[];
  };
  onClose: () => void;
  onSave: () => void;
}

export default function EditNotificationModal({ notification, onClose, onSave }: EditNotificationModalProps) {
  const [appEnabled, setAppEnabled] = useState(notification.channels.includes('App'));
  const [emailEnabled, setEmailEnabled] = useState(notification.channels.includes('Email'));
  const [smsEnabled, setSmsEnabled] = useState(notification.channels.includes('SMS'));
  
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN');
  
  const [pushTitle, setPushTitle] = useState('Your annual health check results are ready');
  const [pushMessage, setPushMessage] = useState('Open Health Hub to view them.');
  const [emailSubject, setEmailSubject] = useState('Your annual health check results are ready');
  const [emailMessage, setEmailMessage] = useState('Hello {patient_name}, your {item_name} results from {clinic_name} are ready. Open the Health Hub app to view them.');

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
                <span>Sent only to the patient related to this event (for example, the patient whose results were published).</span>
              </div>
            </div>

            {/* Channels Section */}
            <div className="settings-section">
              <h3 className="section-title">Channels</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                
                <div className={`channel-card ${appEnabled ? 'active' : ''}`}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Smartphone size={16} color={appEnabled ? '#d97706' : '#64748b'} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="channel-title">App</div>
                      <div className="channel-desc">Notification Center and push</div>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={appEnabled} onChange={e => setAppEnabled(e.target.checked)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className={`channel-card ${emailEnabled ? 'active' : ''}`}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Mail size={16} color={emailEnabled ? '#d97706' : '#64748b'} style={{ marginTop: '2px' }} />
                    <div>
                      <div className="channel-title">Email</div>
                      <div className="channel-desc">To the patient's contact email</div>
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
                      <div className="channel-desc">To the patient's contact mobile</div>
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
              
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                You can use: {'{patient_name}'}, {'{item_name}'}, {'{clinic_name}'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label>Push title ({language}) <span className="required">*</span></label>
                  <input type="text" value={pushTitle} onChange={e => setPushTitle(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Push message ({language}) <span className="required">*</span></label>
                  <input type="text" value={pushMessage} onChange={e => setPushMessage(e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Email subject ({language}) <span className="required">*</span></label>
                <input type="text" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
              </div>
              
              <div className="form-group">
                <label>Email message ({language}) <span className="required">*</span></label>
                <textarea rows={4} value={emailMessage} onChange={e => setEmailMessage(e.target.value)}></textarea>
              </div>
            </div>
            
          </div>

          {/* Right Column: Preview */}
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>PREVIEW</h3>
            
            <div className="preview-container">
              
              {/* Push Preview */}
              {appEnabled && (
                <div className="push-preview">
                  <div className="push-header">
                    HEALTH HUB • now
                  </div>
                  <div className="push-title">{pushTitle}</div>
                  <div className="push-message">{pushMessage}</div>
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
