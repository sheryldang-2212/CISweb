import { useState } from 'react';
import EditNotificationModal from './EditNotificationModal';
import EditClinicNotificationModal from './EditClinicNotificationModal';
import { Smartphone, Monitor, FlaskConical, HeartPulse, Activity, MessageSquare, Shield, Mail, Edit2, Users, LifeBuoy, Zap, Settings } from 'lucide-react';

export default function PlatformNotificationSettings() {
  const [activeTab, setActiveTab] = useState('patient');
  const [editingNotification, setEditingNotification] = useState<any>(null);

  return (
    <div className="admin-section-card fadeIn" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '24px', minHeight: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Notification Settings</h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>Edit the message content and recipients of platform notifications.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('patient')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', 
            borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            backgroundColor: activeTab === 'patient' ? '#f8fafc' : 'transparent',
            border: activeTab === 'patient' ? '1px solid #e2e8f0' : '1px solid transparent',
            color: activeTab === 'patient' ? '#0f172a' : '#64748b'
          }}
        >
          <Smartphone size={16} /> For Patient (Mobile)
        </button>
        <button 
          onClick={() => setActiveTab('clinic')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', 
            borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            backgroundColor: activeTab === 'clinic' ? '#f8fafc' : 'transparent',
            border: activeTab === 'clinic' ? '1px solid #e2e8f0' : '1px solid transparent',
            color: activeTab === 'clinic' ? '#0f172a' : '#64748b'
          }}
        >
          <Monitor size={16} /> For Clinic & Ops (Web)
        </button>
      </div>

      {activeTab === 'patient' && (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#0f172a' }}>Patient notifications</h2>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 24px 0' }}>Edit the channels and message for each event.</p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ color: '#64748b', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '35%' }}>EVENT</th>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '40%' }}>TRIGGER</th>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '20%' }}>CHANNELS</th>
                <th style={{ padding: '12px 0', width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Category: Lab reports */}
              <tr>
                <td colSpan={4} style={{ padding: '24px 0 12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FlaskConical size={14} />
                    </div>
                    Lab reports
                  </div>
                </td>
              </tr>
              <NotificationRow event="Lab report ready" trigger="Lab report published" channels={['App']} category="Lab reports" onEdit={() => setEditingNotification({ event: "Lab report ready", category: "Lab reports", trigger: "Lab report published", channels: ['App'] })} />
              <NotificationRow event="Lab report updated" trigger="Published report amended by clinic" channels={['App']} category="Lab reports" onEdit={() => setEditingNotification({ event: "Lab report updated", category: "Lab reports", trigger: "Published report amended by clinic", channels: ['App'] })} />
              <NotificationRow event="Lab report status change" trigger="Report status changed" channels={['App']} category="Lab reports" onEdit={() => setEditingNotification({ event: "Lab report status change", category: "Lab reports", trigger: "Report status changed", channels: ['App'] })} />

              {/* Category: Health check results */}
              <tr>
                <td colSpan={4} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HeartPulse size={14} />
                    </div>
                    Health check results
                  </div>
                </td>
              </tr>
              <NotificationRow event="Annual health check result ready" trigger="Annual health check result published" channels={['App']} category="Health check results" onEdit={() => setEditingNotification({ event: "Annual health check result ready", category: "Health check results", trigger: "Annual health check result published", channels: ['App'] })} />
              <NotificationRow event="Pre-employment check result ready" trigger="Pre-employment check result published" channels={['App']} category="Health check results" onEdit={() => setEditingNotification({ event: "Pre-employment check result ready", category: "Health check results", trigger: "Pre-employment check result published", channels: ['App'] })} />

              {/* Category: Health insights */}
              <tr>
                <td colSpan={4} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={14} />
                    </div>
                    Health insights
                  </div>
                </td>
              </tr>
              <NotificationRow event="Health score updated" trigger="AI health score recalculated" channels={['App']} category="Health insights" onEdit={() => setEditingNotification({ event: "Health score updated", category: "Health insights", trigger: "AI health score recalculated", channels: ['App'] })} />
              <NotificationRow event="Wearable not syncing" trigger="No wearable data received for [X] days" channels={['App']} category="Health insights" onEdit={() => setEditingNotification({ event: "Wearable not syncing", category: "Health insights", trigger: "No wearable data received for [X] days", channels: ['App'] })} />

              {/* Category: Messages & support */}
              <tr>
                <td colSpan={4} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageSquare size={14} />
                    </div>
                    Messages & support
                  </div>
                </td>
              </tr>
              <NotificationRow event="New message" trigger="New message received" channels={['App']} category="Messages & support" onEdit={() => setEditingNotification({ event: "New message", category: "Messages & support", trigger: "New message received", channels: ['App'] })} />
              <NotificationRow event="Support reply" trigger="Support team replied to an Email support Team message" channels={['App']} category="Messages & support" onEdit={() => setEditingNotification({ event: "Support reply", category: "Messages & support", trigger: "Support team replied to an Email support Team message", channels: ['App'] })} />

              {/* Category: Account & security */}
              <tr>
                <td colSpan={4} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield size={14} />
                    </div>
                    Account & security
                  </div>
                </td>
              </tr>
              <NotificationRow event="Password changed" trigger="Password changed or reset" channels={['App']} category="Account & security" onEdit={() => setEditingNotification({ event: "Password changed", category: "Account & security", trigger: "Password changed or reset", channels: ['App'] })} />
              <NotificationRow event="Login method added" trigger="Social or email login linked to the account" channels={['App']} category="Account & security" onEdit={() => setEditingNotification({ event: "Login method added", category: "Account & security", trigger: "Social or email login linked to the account", channels: ['App'] })} />
              <NotificationRow event="Terms or Privacy Policy updated" trigger="New version of a consent document published" channels={['App']} category="Account & security" onEdit={() => setEditingNotification({ event: "Terms or Privacy Policy updated", category: "Account & security", trigger: "New version of a consent document published", channels: ['App'] })} />
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'clinic' && (
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#0f172a' }}>Clinic & Ops notifications</h2>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 24px 0' }}>Edit the channels, recipients and message for each event.</p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ color: '#64748b', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '25%' }}>EVENT</th>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '30%' }}>TRIGGER</th>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '20%' }}>RECIPIENTS</th>
                <th style={{ padding: '12px 0', fontWeight: 600, width: '20%' }}>CHANNELS</th>
                <th style={{ padding: '12px 0', width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Category: Lab results & reports */}
              <tr>
                <td colSpan={5} style={{ padding: '24px 0 12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FlaskConical size={14} />
                    </div>
                    Lab results & reports
                  </div>
                </td>
              </tr>
              <ClinicNotificationRow event="New lab result received" trigger="Result received from LIS" recipients="Doctors" channels={['Portal']} category="Lab results & reports" onEdit={() => setEditingNotification({ event: 'New lab result received', category: 'Lab results & reports', trigger: 'Result received from LIS', channels: ['Portal'] })} />
              <ClinicNotificationRow event="Report awaiting review" trigger="Report not reviewed within [X] hours" recipients="Doctors" channels={['Portal']} category="Lab results & reports" onEdit={() => setEditingNotification({ event: 'Report awaiting review', category: 'Lab results & reports', trigger: 'Report not reviewed within [X] hours', channels: ['Portal'] })} />
              <ClinicNotificationRow event="Report publish failed" trigger="Publishing a report to the Patient App failed" recipients="Clinic Admin" channels={['Portal']} category="Lab results & reports" onEdit={() => setEditingNotification({ event: 'Report publish failed', category: 'Lab results & reports', trigger: 'Publishing a report to the Patient App failed', channels: ['Portal'] })} />
              <ClinicNotificationRow event="Critical result flagged" trigger="Result outside the critical range (rule TBC)" recipients="Doctors, Technicians" channels={['Portal']} category="Lab results & reports" onEdit={() => setEditingNotification({ event: 'Critical result flagged', category: 'Lab results & reports', trigger: 'Result outside the critical range (rule TBC)', channels: ['Portal'] })} />

              {/* Category: Patients & accounts */}
              <tr>
                <td colSpan={5} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={14} />
                    </div>
                    Patients & accounts
                  </div>
                </td>
              </tr>
              <ClinicNotificationRow event="New patient registered" trigger="Patient account created" recipients="Receptionist" channels={['Portal']} category="Patients & accounts" onEdit={() => setEditingNotification({ event: 'New patient registered', category: 'Patients & accounts', trigger: 'Patient account created', channels: ['Portal'] })} />
              <ClinicNotificationRow event="Patient account locked" trigger="Account locked after failed log ins or suspended" recipients="Clinic Admin" channels={['Portal']} category="Patients & accounts" onEdit={() => setEditingNotification({ event: 'Patient account locked', category: 'Patients & accounts', trigger: 'Account locked after failed log ins or suspended', channels: ['Portal'] })} />

              {/* Category: Support */}
              <tr>
                <td colSpan={5} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LifeBuoy size={14} />
                    </div>
                    Support
                  </div>
                </td>
              </tr>
              <ClinicNotificationRow event="New support message" trigger="Email Support Team message received" recipients="Clinic Admin" channels={['Portal']} category="Support" onEdit={() => setEditingNotification({ event: 'New support message', category: 'Support', trigger: 'Email Support Team message received', channels: ['Portal'] })} />
              <ClinicNotificationRow event="Support message overdue" trigger="No reply within [X] hours" recipients="Clinic Admin" channels={['Portal']} category="Support" onEdit={() => setEditingNotification({ event: 'Support message overdue', category: 'Support', trigger: 'No reply within [X] hours', channels: ['Portal'] })} />

              {/* Category: Integrations & system */}
              <tr>
                <td colSpan={5} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={14} />
                    </div>
                    Integrations & system
                  </div>
                </td>
              </tr>
              <ClinicNotificationRow event="LIS integration error" trigger="LIS sync failed" recipients="Clinic Admin, Technicians" channels={['Portal']} category="Integrations & system" onEdit={() => setEditingNotification({ event: 'LIS integration error', category: 'Integrations & system', trigger: 'LIS sync failed', channels: ['Portal'] })} />
              <ClinicNotificationRow event="Notification delivery failed" trigger="Email, SMS or push delivery failures above threshold" recipients="Clinic Admin" channels={['Portal']} category="Integrations & system" onEdit={() => setEditingNotification({ event: 'Notification delivery failed', category: 'Integrations & system', trigger: 'Email, SMS or push delivery failures above threshold', channels: ['Portal'] })} />
              <ClinicNotificationRow event="External service unavailable" trigger="Wearable or AI health score service not responding" recipients="Clinic Admin" channels={['Portal']} category="Integrations & system" onEdit={() => setEditingNotification({ event: 'External service unavailable', category: 'Integrations & system', trigger: 'Wearable or AI health score service not responding', channels: ['Portal'] })} />

              {/* Category: Configuration */}
              <tr>
                <td colSpan={5} style={{ padding: '24px 0 12px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Settings size={14} />
                    </div>
                    Configuration
                  </div>
                </td>
              </tr>
              <ClinicNotificationRow event="Platform Admin setting changed" trigger="Notification or FAQ settings saved or published" recipients="Clinic Admin" channels={['Portal']} category="Configuration" onEdit={() => setEditingNotification({ event: 'Platform Admin setting changed', category: 'Configuration', trigger: 'Notification or FAQ settings saved or published', channels: ['Portal'] })} />
            </tbody>
          </table>
        </div>

      )}
      {editingNotification && activeTab === 'patient' && (
        <EditNotificationModal
          notification={editingNotification}
          onClose={() => setEditingNotification(null)}
          onSave={() => setEditingNotification(null)}
        />
      )}
      {editingNotification && activeTab === 'clinic' && (
        <EditClinicNotificationModal
          notification={editingNotification}
          onClose={() => setEditingNotification(null)}
          onSave={() => setEditingNotification(null)}
        />
      )}
    </div>
  );
}

function NotificationRow({ event, trigger, channels, category, onEdit }: { event: string, trigger: string, channels: string[], category: string, onEdit: () => void }) {
  return (
    <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
      <td style={{ padding: '16px 0', color: '#334155', fontWeight: 500 }}>{event}</td>
      <td style={{ padding: '16px 0', color: '#64748b' }}>{trigger}</td>
      <td style={{ padding: '16px 0' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ChannelBadge type="App" active={channels.includes('App')} />
          <ChannelBadge type="Email" active={channels.includes('Email')} />
          <ChannelBadge type="SMS" active={channels.includes('SMS')} />
        </div>
      </td>
      <td style={{ padding: '16px 0', textAlign: 'right' }}>
        <button onClick={onEdit} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <Edit2 size={14} />
        </button>
      </td>
    </tr>
  );
}

function ChannelBadge({ type, active }: { type: 'App' | 'Portal' | 'Email' | 'SMS', active: boolean }) {
  let icon = null;
  if (type === 'App') icon = <Smartphone size={12} />;
  if (type === 'Portal') icon = <Monitor size={12} />;
  if (type === 'Email') icon = <Mail size={12} />;
  if (type === 'SMS') icon = <MessageSquare size={12} />;

  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', gap: '4px', 
      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
      backgroundColor: active ? '#fef3c7' : '#f8fafc',
      color: active ? '#d97706' : '#cbd5e1',
      border: active ? '1px solid #fde68a' : '1px solid #e2e8f0'
    }}>
      {icon} {type}
    </div>
  );
}

function ClinicNotificationRow({ event, trigger, recipients, channels, category, onEdit }: { event: string, trigger: string, recipients: string, channels: string[], category: string, onEdit: () => void }) {
  return (
    <tr style={{ borderBottom: '1px dashed #e2e8f0' }}>
      <td style={{ padding: '16px 0', color: '#334155', fontWeight: 500 }}>{event}</td>
      <td style={{ padding: '16px 0', color: '#64748b' }}>{trigger}</td>
      <td style={{ padding: '16px 0', color: '#475569', fontSize: '12px' }}>{recipients}</td>
      <td style={{ padding: '16px 0' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ChannelBadge type="Portal" active={channels.includes('Portal')} />
          <ChannelBadge type="Email" active={channels.includes('Email')} />
          <ChannelBadge type="SMS" active={channels.includes('SMS')} />
        </div>
      </td>
      <td style={{ padding: '16px 0', textAlign: 'right' }}>
        <button onClick={onEdit} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <Edit2 size={14} />
        </button>
      </td>
    </tr>
  );
}
