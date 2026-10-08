const fs = require('fs');
const file = 'src/components/PlatformNotificationSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Create a new ClinicNotificationRow component
const clinicNotificationRowComponent = `
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
`;

// 2. Add 'Portal' to ChannelBadge
content = content.replace(
  "type: 'App' | 'Email' | 'SMS'",
  "type: 'App' | 'Portal' | 'Email' | 'SMS'"
);
content = content.replace(
  "if (type === 'App') icon = <Smartphone size={12} />;",
  "if (type === 'App') icon = <Smartphone size={12} />;\n  if (type === 'Portal') icon = <Monitor size={12} />;"
);

// 3. Add the component at the end of the file
content += clinicNotificationRowComponent;

// 4. Update imports to add Users, LifeBuoy, Zap, Settings if needed for category icons
content = content.replace(
  "import { Smartphone, Monitor, FlaskConical, HeartPulse, Activity, MessageSquare, Shield, Mail, Edit2 } from 'lucide-react';",
  "import { Smartphone, Monitor, FlaskConical, HeartPulse, Activity, MessageSquare, Shield, Mail, Edit2, Users, LifeBuoy, Zap, Settings } from 'lucide-react';"
);

// 5. Build the Clinic tab content
const clinicTabContent = `
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
`;

// Replace the placeholder
content = content.replace(
  '<div style={{ border: \'1px solid #e2e8f0\', borderRadius: \'12px\', padding: \'24px\', textAlign: \'center\', color: \'#64748b\' }}>\n          Clinic & Ops notification settings will be displayed here.\n        </div>',
  clinicTabContent
);

fs.writeFileSync(file, content);
console.log('Done!');
