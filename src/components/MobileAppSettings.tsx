import { useState } from 'react';
import { Smartphone, LayoutDashboard, Activity, FileQuestion, Bell, LifeBuoy, ShieldCheck, Eye, Save, Plus, Trash2, Edit2, CheckCircle2, ChevronRight, Globe, AlertTriangle, Phone, Search } from 'lucide-react';
import './Settings.css';

export default function MobileAppSettings() {
  const [activeTab, setActiveTab] = useState('Questionnaire');
  const [configStatus, setConfigStatus] = useState('Draft');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Not saved yet');

  const tabs = [
    { id: 'Phone code', icon: Phone },
    { id: 'Questionnaire', icon: FileQuestion },
    { id: 'Notifications', icon: Bell },
    { id: 'Help & Support', icon: LifeBuoy },
    { id: 'Consent Content', icon: ShieldCheck }
  ];

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setConfigStatus('Draft');
      setLastSaved(new Date().toLocaleTimeString());
    }, 800);
  };

  const handlePublish = () => {
    if (confirm('Are you sure you want to publish these configurations to the live Mobile App?')) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setConfigStatus('Published');
        alert('Configuration published successfully!');
      }, 1000);
    }
  };

  // Mock data for Questionnaires
  const [questions] = useState([
    { id: 'q1', qId: 'Q001', en: 'Do you smoke?', th: 'คุณสูบบุหรี่หรือไม่?', type: 'Single choice', required: 'Yes', section: 'Lifestyle', status: 'Active' },
  ]);

  // Mock data for Notifications
  const [notifications] = useState([
    { id: 'n1', event: 'LAB_ORDER_CREATED', title: 'Order Created', template: 'Your lab order has been created.', status: 'Active' },
    { id: 'n2', event: 'RESULT_AVAILABLE', title: 'Results Ready', template: 'Your lab result is now available.', status: 'Active' },
  ]);

  return (
    <div className="settings-container" style={{ border: 'none', background: 'transparent', height: '100%', overflow: 'hidden' }}>
      <div className="settings-sidebar premium-sidebar" style={{ width: '260px' }}>
        <h2 className="settings-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', marginBottom: '8px' }}>
          <Smartphone size={20} style={{ color: 'var(--primary)' }} /> Mobile App Config
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Status: 
          <span style={{ 
            fontWeight: 600, 
            color: configStatus === 'Draft' ? 'var(--warning)' : 'var(--success)',
            backgroundColor: configStatus === 'Draft' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            padding: '2px 8px',
            borderRadius: '12px'
          }}>
            {configStatus}
          </span>
        </div>

        <nav className="settings-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`premium-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} className="settings-icon" />
              <span>{tab.id}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="settings-content" style={{ border: 'none', borderRadius: '0', padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h3 className="section-header">{activeTab}</h3>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              {activeTab === 'Phone code' && 'Select allowed country codes for phone number input on the mobile app.'}
              {activeTab === 'Questionnaire' && 'Manage questions asked during patient registration and profile updates.'}
              {activeTab === 'Notifications' && 'Configure push notification and in-app message content by event.'}
              {activeTab === 'Help & Support' && 'Manage contact information and frequently asked questions.'}
              {activeTab === 'Consent Content' && 'Configure text for T&C, Privacy Policy, and Data Sharing explanations.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>

            {activeTab === 'Phone code' && (
              <div className="search-container" style={{ position: 'relative', width: '240px', display: 'flex', alignItems: 'center' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} />
                <input type="text" placeholder="Search country or code..." style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
              </div>
            )}
            <button className="btn-secondary" onClick={handleSaveDraft} disabled={isSaving}>
              <Save size={16} style={{ marginRight: '8px' }} /> 
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>

          </div>
        </div>

        
        {/* Phone Code */}
        {activeTab === 'Phone code' && (
          <div className="fadeIn">
            <div className="table-container premium-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px', textAlign: 'center' }}>
                      <input type="checkbox" defaultChecked />
                    </th>
                    <th>Country Name</th>
                    <th>Country Code</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>Vietnam</td>
                    <td>+84</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>United States</td>
                    <td>+1</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>Thailand</td>
                    <td>+66</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>Singapore</td>
                    <td>+65</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                    <td style={{ fontWeight: 600 }}>United Kingdom</td>
                    <td>+44</td>
                    <td><span className="status-pill status-pending" style={{ color: '#64748b', background: '#f1f5f9' }}>Inactive</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                    <td style={{ fontWeight: 600 }}>Australia</td>
                    <td>+61</td>
                    <td><span className="status-pill status-pending" style={{ color: '#64748b', background: '#f1f5f9' }}>Inactive</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Questionnaire */}
        {activeTab === 'Questionnaire' && (
          <div className="fadeIn">


            <div className="premium-alert warning" style={{ marginBottom: '24px' }}>
              <AlertTriangle size={20} style={{ color: 'var(--warning)', flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Data Retention Rule Active</h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Questions with existing patient answers cannot be hard deleted; they may only be deactivated. Modifying answer types of existing questions will trigger a data migration warning.
                </p>
              </div>
            </div>
            
            <div className="table-container premium-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Question (EN)</th>
                    <th>Type</th>
                    <th>Section</th>
                    <th>Required</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>{q.qId}</td>
                      <td style={{ fontWeight: 600 }}>{q.en}</td>
                      <td>{q.type}</td>
                      <td>{q.section}</td>
                      <td>{q.required}</td>
                      <td><span className="status-pill status-ready">{q.status}</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'Notifications' && (
          <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notifications.map((notif) => (
              <div key={notif.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 8px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-secondary)', display: 'inline-block', marginBottom: '8px' }}>
                      EVENT: {notif.event}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{notif.title}</h4>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked={notif.status === 'Active'} />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Body Template (EN)</label>
                    <textarea rows={2} defaultValue={notif.template} style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Body Template (TH)</label>
                    <textarea rows={2} placeholder="Thai translation..." style={{ resize: 'vertical' }}></textarea>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button className="btn-secondary-small">Save Template</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help & Support */}
        {activeTab === 'Help & Support' && (
          <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="security-card" style={{ marginBottom: 0, backgroundColor: '#fafafa' }}>
              <div className="security-card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Contact Information</h4>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Support Email</label>
                  <input type="email" defaultValue="support@healthhub.com" />
                </div>
                <div className="form-group">
                  <label>Support Phone</label>
                  <input type="text" defaultValue="+66 2 123 4567" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Operating Hours (Display String)</label>
                <input type="text" defaultValue="Mon-Fri, 9:00 AM - 6:00 PM ICT" />
              </div>
            </div>

            <div className="security-card" style={{ marginBottom: 0 }}>
              <div className="security-card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>FAQ Content</h4>
                <button className="btn-secondary-small"><Plus size={14} style={{ marginRight: '4px' }} /> Add FAQ</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'How is my health score calculated?',
                  'How do I view past lab results?',
                  'Is my health data secure?'
                ].map((q, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{q}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="icon-btn"><Edit2 size={16} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Consent Content */}
        {activeTab === 'Consent Content' && (
          <div className="fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {['Terms & Conditions', 'Privacy Policy', 'Data Sharing Consent'].map(doc => (
              <div key={doc} className="security-card" style={{ marginBottom: 0, backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{doc}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>v2.4 (Published 14 Sep 2026)</span>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
                  <button style={{ background: 'none', border: 'none', borderBottom: '2px solid var(--primary)', padding: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}>English</button>
                  <button style={{ background: 'none', border: 'none', padding: '0 0 8px 0', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer' }}>Thai (ภาษาไทย)</button>
                </div>

                <div className="form-group">
                  <textarea 
                    rows={5}
                    style={{ fontFamily: 'monospace', fontSize: '13px', resize: 'vertical' }}
                    defaultValue={`This is the standard content for ${doc}...`}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button className="btn-secondary-small">Save Text Content</button>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}