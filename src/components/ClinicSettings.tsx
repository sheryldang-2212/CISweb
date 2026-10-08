import { useState, useRef, useEffect } from 'react';
import { 
  Building2, Clock, 
  Lock, Phone, Mail, Plus, Trash2,
  Activity, Users, Database, ChevronDown, Truck
} from 'lucide-react';
import './ClinicSettings.css';



const ROLES_OPTIONS = ['Doctor', 'Receptionist', 'Technician', 'Admin', 'All Clinic Staff', 'Platform Admin'];

const MultiSelectDropdown = ({ selected, onChange }: { selected: string[], onChange: (newSelection: string[]) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (role: string) => {
    if (selected.includes(role)) {
      onChange(selected.filter(r => r !== role));
    } else {
      onChange([...selected, role]);
    }
  };

  return (
    <div className="table-multi-select" ref={dropdownRef}>
      <div className="table-multi-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="table-multi-select-value">{selected.join(', ') || 'Select recipients'}</span>
        <ChevronDown size={14} />
      </div>
      {isOpen && (
        <div className="table-multi-select-menu">
          {ROLES_OPTIONS.map(role => (
            <label key={role} className="table-multi-select-option">
              <input type="checkbox" checked={selected.includes(role)} onChange={() => toggleOption(role)} />
              <span>{role}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const NotificationRow = ({ event, index }: { event: any, index: number }) => {
  const [recipients, setRecipients] = useState(event.recipients);
  const [inApp, setInApp] = useState(event.inApp);

  return (
    <tr>
      <td className="notif-index">{index + 1}</td>
      <td className="notif-event-name">{event.name}</td>
      <td>
        <MultiSelectDropdown selected={recipients} onChange={setRecipients} />
      </td>
      <td>
        <label className="setting-toggle small">
          <input type="checkbox" checked={inApp} onChange={e => setInApp(e.target.checked)} />
          <span className="toggle-bg"></span>
        </label>
      </td>
    </tr>
  );
};

export default function ClinicSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [hoursTab, setHoursTab] = useState('standard');

  // Mock Business Hours
  const [businessHours, setBusinessHours] = useState([
    { day: 'Monday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Tuesday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Wednesday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Thursday', isOpen: true, slots: [{ start: '08:00', end: '17:00' }] },
    { day: 'Friday', isOpen: true, slots: [{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }] },
    { day: 'Saturday', isOpen: false, slots: [] },
    { day: 'Sunday', isOpen: false, slots: [] },
  ]);

  const toggleDay = (index: number) => {
    const newHours = [...businessHours];
    newHours[index].isOpen = !newHours[index].isOpen;
    if (newHours[index].isOpen && newHours[index].slots.length === 0) {
      newHours[index].slots = [{ start: '08:00', end: '17:00' }];
    }
    setBusinessHours(newHours);
  };

  const tabs = [
    { id: 'general', label: 'General Information', icon: Building2 },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'operations', label: 'Delivery Scheduling', icon: Truck },
  ];

  return (
    <div className="clinic-settings-container">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Clinic Settings</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Manage clinic details, business hours, and operational configurations.</p>
      </div>

      {/* Horizontal Tabs */}
      <div className="pd-tabs-new">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`pd-tab-new ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="settings-content">
        
        {/* TAB 1: General Information */}
        {activeTab === 'general' && (
          <div className="settings-panel">
            <h2 className="settings-section-title">General Information</h2>
            
            <div className="settings-form-grid">
              <div className="settings-form-group">
                <label className="settings-label">
                  Clinic Name <Lock size={12} className="text-muted" />
                </label>
                <input type="text" className="settings-input" value="Downtown Clinic" disabled />
              </div>
              
              <div className="settings-form-group">
                <label className="settings-label">
                  Clinic Code <Lock size={12} className="text-muted" />
                </label>
                <input type="text" className="settings-input" value="CLN-DT-001" disabled />
              </div>

              <div className="settings-form-group">
                <label className="settings-label">License Number</label>
                <input type="text" className="settings-input" defaultValue="LIC-2023-89012" />
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Primary Phone</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input type="text" className="settings-input" defaultValue="+84 28 3822 5555" />
                </div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">Support Email</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input type="email" className="settings-input" defaultValue="support@downtownclinic.com" />
                </div>
              </div>

              <div className="settings-form-group full-width" style={{ marginTop: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#374151', margin: '0 0 16px 0' }}>Address Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                  <div className="settings-form-group" style={{ gap: '6px' }}>
                    <label className="settings-label" style={{ fontWeight: 600, color: '#1e3a5f' }}>Country</label>
                    <select className="settings-select" defaultValue="th">
                      <option value="th">Thailand</option>
                      <option value="vn">Vietnam</option>
                    </select>
                  </div>
                  
                  <div className="settings-form-group" style={{ gap: '6px' }}>
                    <label className="settings-label" style={{ fontWeight: 600, color: '#1e3a5f' }}>Address</label>
                    <input type="text" className="settings-input" placeholder="Enter details" />
                  </div>

                  <div className="settings-form-group" style={{ gap: '6px' }}>
                    <label className="settings-label" style={{ fontWeight: 600, color: '#1e3a5f' }}>Sub-District / District / Province / Postal Code</label>
                    <select className="settings-select" defaultValue="">
                      <option value="" disabled>Please select</option>
                      <option value="1">Example Region</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* TAB 3: Business Hours */}
        {activeTab === 'hours' && (
          <div className="settings-panel">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <button 
                onClick={() => setHoursTab('standard')}
                style={{ 
                  padding: '12px 24px', 
                  background: 'none', 
                  border: 'none', 
                  borderBottom: hoursTab === 'standard' ? '2px solid #c09867' : '2px solid transparent',
                  color: hoursTab === 'standard' ? '#c09867' : '#6b7280',
                  fontWeight: hoursTab === 'standard' ? 600 : 500,
                  cursor: 'pointer',
                  fontSize: '15px'
                }}>
                Standard Hours
              </button>
              <button 
                onClick={() => setHoursTab('holidays')}
                style={{ 
                  padding: '12px 24px', 
                  background: 'none', 
                  border: 'none', 
                  borderBottom: hoursTab === 'holidays' ? '2px solid #c09867' : '2px solid transparent',
                  color: hoursTab === 'holidays' ? '#c09867' : '#6b7280',
                  fontWeight: hoursTab === 'holidays' ? 600 : 500,
                  cursor: 'pointer',
                  fontSize: '15px'
                }}>
                Holidays & Special Hours
              </button>
            </div>

            {hoursTab === 'standard' && (
              <div>
                <p className="text-muted" style={{ marginBottom: '24px', fontSize: '14px' }}>Configure standard operating hours. You can add multiple time slots for split shifts (e.g., morning and afternoon).</p>
                
                <div className="schedule-list">
                  {businessHours.map((day, index) => (
                    <div className="schedule-row" key={day.day}>
                      <div className="schedule-day">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={day.isOpen} 
                            onChange={() => toggleDay(index)} 
                          />
                          <span className="toggle-slider"></span>
                        </label>
                        {day.day}
                      </div>
                      
                      <div className="schedule-times">
                        {day.isOpen ? (
                          <>
                            {day.slots.map((slot, sIndex) => (
                              <div className="time-slot" key={sIndex}>
                                <input type="time" className="time-input" defaultValue={slot.start} />
                                <span className="time-separator">-</span>
                                <input type="time" className="time-input" defaultValue={slot.end} />
                                <button className="btn-icon" title="Remove slot">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                            <button className="btn-add-text">+ Add hours</button>
                          </>
                        ) : (
                          <span className="closed-text">Closed</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hoursTab === 'holidays' && (
              <div>
                <div className="holidays-header">
                  <h2 className="settings-section-title" style={{ border: 'none', margin: 0, padding: 0 }}>Holidays & Special Hours</h2>
                  <button className="btn-primary-small">
                    <Plus size={16} /> Add New Exception
                  </button>
                </div>
                
                <div className="holiday-list">
                  <div className="holiday-card">
                    <div className="holiday-date-box">
                      <div className="holiday-month">Sep</div>
                      <div className="holiday-day">02</div>
                    </div>
                    <div className="holiday-info">
                      <h4 className="holiday-name">National Day</h4>
                      <span className="holiday-type">Public Holiday</span>
                    </div>
                    <div>
                      <span className="holiday-badge closure">Full Closure</span>
                    </div>
                  </div>

                  <div className="holiday-card">
                    <div className="holiday-date-box">
                      <div className="holiday-month">Dec</div>
                      <div className="holiday-day">24</div>
                    </div>
                    <div className="holiday-info">
                      <h4 className="holiday-name">Christmas Eve</h4>
                      <span className="holiday-type">Company Policy</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span className="holiday-badge special">Special Hours</span>
                      <span className="text-muted" style={{ fontSize: '12px', fontWeight: 500 }}>08:00 - 12:00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Sample Operations */}
        {activeTab === 'operations' && (
          <div className="settings-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Truck size={20} />
              <h2 className="settings-section-title" style={{ border: 'none', margin: 0, padding: 0 }}>Delivery Scheduling</h2>
            </div>
            <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px' }}>
              Set courier pickup days and time windows for this clinic.
            </p>

            <div className="settings-form-group full-width" style={{ marginBottom: '20px' }}>
              <label className="settings-label">Pickup Days</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                  const isSelected = ['Mon', 'Wed', 'Fri'].includes(day);
                  return (
                    <button 
                      key={day} 
                      style={{ 
                        padding: '6px 16px', 
                        borderRadius: '6px', 
                        border: '1px solid #e5e7eb',
                        backgroundColor: isSelected ? '#c09867' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#374151',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: 500
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div className="settings-form-group" style={{ margin: 0 }}>
                <label className="settings-label">Pickup Time Window</label>
                <input type="text" className="settings-input" defaultValue="14:00 - 16:00" />
              </div>
              
              <div className="settings-form-group" style={{ margin: 0 }}>
                <label className="settings-label">Courier Notes</label>
                <input type="text" className="settings-input" defaultValue="Optional notes" />
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
