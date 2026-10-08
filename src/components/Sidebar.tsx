import { LayoutGrid, Users, FlaskConical, PanelLeftClose, Settings, Shield, Lock, Box, Activity, FileKey, Database, BarChart2, Bell } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentClinic: any;
  currentRole: string;
}

const getNavGroups = (role: string) => {
  if (role === 'Platform Admin') {
    return [
      {
        groupName: null,
        items: [
          { name: 'Platform Dashboard', icon: LayoutGrid },
          { name: 'Reporting', icon: BarChart2 }
        ]
      },
      {
        groupName: 'CLINIC MANAGEMENT',
        items: [
          { name: 'Clinic Management', icon: Box },
          { name: 'User Management', icon: Users }
        ]
      },

      {
        groupName: 'PATIENT DATA MANAGEMENT',
        items: [
          { name: 'Patient Data', icon: Users }
        ]
      },
      {
        groupName: 'CONFIGURATION',
        items: [
          { name: 'Platform Settings', icon: Settings },
          { name: 'Global Test Master', icon: Database }
        ]
      },
      {
        groupName: 'MONITORING & LOGS',
        items: [
          { name: 'Platform Audit Logs', icon: FileKey }
        ]
      }
    ];
  }

  // Let's assume Admin role has the new structure as requested
  if (role === 'Admin' || role === 'Clinic Admin') {
    return [
      {
        groupName: null,
        items: [
          { name: 'Dashboard', icon: LayoutGrid },
          { name: 'Reporting', icon: BarChart2 }
        ]
      },
      {
        groupName: 'People & Access',
        items: [
          { name: 'User Management', icon: Users },
          { name: 'Roles & Permissions', icon: Shield }
        ]
      },
      {
        groupName: 'PATIENT DATA MANAGEMENT',
        items: [
          { name: 'Patient Data', icon: Database }
        ]
      },
      {
        groupName: 'CLINIC MANAGEMENT',
        items: [
          { name: 'Clinic Settings', icon: Settings },
          { name: 'Services & Packages', icon: Box }
        ]
      },
      {
        groupName: 'SECURITY & COMPLIANCE',
        items: [
          { name: 'Staff Security', icon: Lock },
          { name: 'Audit Logs', icon: FileKey }
        ]
      }
    ];
  }
  
  if (role === 'Technician') {
    return [
      {
        groupName: null,
        items: [
          { name: 'Dashboard', icon: LayoutGrid },
          { name: 'Sample Collection Queue', icon: FlaskConical },
          { name: 'Lab Order Tracking', icon: Activity },
        ]
      }
    ];
  }

  if (role === 'Doctor') {
    return [
      {
        groupName: null,
        items: [
          { name: 'Dashboard', icon: LayoutGrid },
          { name: 'Lab Results', icon: FlaskConical },
          { name: 'Patients', icon: Users },
        ]
      }
    ];
  }

  // Default Role
  return [
    {
      groupName: null,
      items: [
        { name: 'Dashboard', icon: LayoutGrid },
        { name: 'Patients', icon: Users },
        { name: 'Lab Orders', icon: FlaskConical },
      ]
    }
  ];
};

export default function Sidebar({ 
  activeTab, 
  setActiveTab,
  currentClinic,
  currentRole
}: SidebarProps) {

  const navGroups = getNavGroups(currentRole);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V4M12 20V22M4 12H2M22 12H20M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="var(--primary)" strokeWidth="2" />
            </svg>
          </div>
          <span className="logo-text">HEALTH HUB</span>
        </div>
      </div>
      
      <nav className="sidebar-nav mt-4">
        {navGroups.map((group, idx) => (
          <div key={idx} className="sidebar-group">
            {group.groupName && (
              <div className="sidebar-group-title">{group.groupName}</div>
            )}
            <ul>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <li key={item.name}>
                    <button 
                      className={`nav-item ${isActive ? 'active' : ''} ${(item as any).locked ? 'locked' : ''}`}
                      onClick={() => !(item as any).locked && setActiveTab(item.name)}
                      disabled={(item as any).locked}
                    >
                      <Icon size={20} className="nav-icon" />
                      <span className="nav-text">{item.name}</span>
                      {(item as any).locked && <span className="nav-locked-badge">Coming Soon</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-context-info">
          <span className="sidebar-context-clinic">{currentClinic.name}</span>
          <span className="sidebar-context-role">{currentRole}</span>
        </div>
        <button className="collapse-btn">
          <PanelLeftClose size={20} />
        </button>
      </div>
    </div>
  );
}
