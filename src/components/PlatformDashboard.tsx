import { 
  RefreshCw, Building2, ShieldCheck, Settings, PauseCircle, AlertTriangle, ChevronRight, 
  Users, Activity, UserPlus, Plus, Mail, FileText, Calendar, Clock, Package,
  MoreVertical
} from 'lucide-react';
import './Dashboard.css';

interface PlatformDashboardProps {
  setActiveTab?: (tab: string) => void;
}

export default function PlatformDashboard({}: PlatformDashboardProps) {
  return (
    <div className="admin-dashboard-container" style={{ padding: '24px', backgroundColor: '#f8fafc', height: '100%', overflowY: 'auto' }}>
      
      {/* HEADER */}
      <div className="admin-dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>Platform Overview</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0', fontSize: '14px' }}>Monitor clinic operations, setup progress, and platform users</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#475569', cursor: 'pointer' }}>
            <Calendar size={16} /> Last 30 days <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
          </div>

        </div>
      </div>

      {/* PLATFORM OPERATION SECTION */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "24px" }}>
          <span style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "12px" }}>Platform Operation</span>
        </h2>

      {/* QUICK ACTIONS ROW */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ width: '4px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '20px', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Configure Package</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Manage module access</div>
              </div>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </button>
          
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '20px', backgroundColor: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Review Audit Logs</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Track platform changes</div>
              </div>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </button>
        </div>
      </div>


        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Platform Users */}
          <div className="admin-section-card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}>
              <Users size={18} color="#3b82f6" />
              Platform Users
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <Users size={24} color="#3b82f6" />
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Total Users</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>1,284</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>Across all clinics</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                <Activity size={24} color="#16a34a" />
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Active Users (30d)</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>942</div>
                  <div style={{ fontSize: '10px', color: '#16a34a' }}>73% engagement rate</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
                <UserPlus size={24} color="#3b82f6" />
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>New Registrations</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1' }}>56</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>In the last 7 days</div>
                </div>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '12px' }}>User Distribution by Role</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '100px', fontSize: '12px', color: '#475569', fontWeight: 500 }}>Clinic Admin</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '24%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ width: '60px', fontSize: '11px', color: '#64748b', textAlign: 'right' }}>310 (24%)</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '100px', fontSize: '12px', color: '#475569', fontWeight: 500 }}>Doctor</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '49%', height: '100%', backgroundColor: '#10b981', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ width: '60px', fontSize: '11px', color: '#64748b', textAlign: 'right' }}>624 (49%)</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '100px', fontSize: '12px', color: '#475569', fontWeight: 500 }}>Technician</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '17%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ width: '60px', fontSize: '11px', color: '#64748b', textAlign: 'right' }}>215 (17%)</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '100px', fontSize: '12px', color: '#475569', fontWeight: 500 }}>Receptionist</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '11%', height: '100%', backgroundColor: '#a855f7', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ width: '60px', fontSize: '11px', color: '#64748b', textAlign: 'right' }}>135 (11%)</span>
                </div>
              </div>
            </div>
          </div>
          

          {/* Recent Activity */}
          <div className="admin-section-card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <FileText size={18} color="#3b82f6" />
                Recent Activity
              </h2>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                View all <ChevronRight size={14} />
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 500 }}>Time</th>
                    <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 500 }}>Event</th>
                    <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 500 }}>Details</th>
                    <th style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 500 }}>User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>24 Aug 2026 08:32</td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={14} color="#16a34a" />
                        <span style={{ fontWeight: 500, color: '#334155' }}>Clinic created</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px', color: '#475569' }}>Phuket Clinic</td>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>System</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>23 Aug 2026 14:10</td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mail size={14} color="#3b82f6" />
                        <span style={{ fontWeight: 500, color: '#334155' }}>Admin invited</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px', color: '#475569' }}>Invitation sent to <span style={{ color: '#2563eb' }}>dr.narin@clinic.com</span></td>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>Somsak T.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>22 Aug 2026 11:24</td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={14} color="#ef4444" />
                        <span style={{ fontWeight: 500, color: '#334155' }}>Admin invitation expired</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px', color: '#475569' }}>Sukhumvit Clinic</td>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>System</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>21 Aug 2026 16:18</td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Settings size={14} color="#64748b" />
                        <span style={{ fontWeight: 500, color: '#334155' }}>Feature package updated</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px', color: '#475569' }}>Bangkok Wellness Center<br/><span style={{ fontSize: '10px', color: '#94a3b8' }}>Upgraded to Premium</span></td>
                    <td style={{ padding: '12px 8px', color: '#64748b' }}>Siri W.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          

        </div>
      </div>

      {/* CLINIC OPERATION SECTION */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "24px" }}>
          <span style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "12px" }}>Clinic Operation</span>
        </h2>

      {/* CLINIC QUICK ACTIONS */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "4px", height: "16px", backgroundColor: "#3b82f6", borderRadius: "2px" }}></div>
          Clinic Actions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
<button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '20px', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Add Clinic</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Create clinic profile</div>
              </div>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </button>
          
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '20px', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserPlus size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Invite Clinic Admin</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Send setup invitation</div>
              </div>
            </div>
            <ChevronRight size={16} color="#cbd5e1" />
          </button>
          
                  </div>
      </div>

      {/* ALERTS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fff', border: '1px solid #fecaca', borderRadius: '12px', boxShadow: '0 1px 2px rgba(239,68,68,0.05)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444' }}>2 clinics</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>No Active Admin</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Clinics without an active administrator</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fff', border: '1px solid #fed7aa', borderRadius: '12px', boxShadow: '0 1px 2px rgba(249,115,22,0.05)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f97316' }}>1 clinic</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Missing Clinic Admin</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Assign an administrator to continue setup</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fff', border: '1px solid #bfdbfe', borderRadius: '12px', boxShadow: '0 1px 2px rgba(59,130,246,0.05)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#3b82f6' }}>3 admins</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Invitation Pending</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Invitations not yet accepted</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#fff', border: '1px solid #fecaca', borderRadius: '12px', boxShadow: '0 1px 2px rgba(239,68,68,0.05)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444' }}>1 clinic</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Setup Overdue</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Setup not completed within expected time</div>
          </div>
        </div>
      </div>


      {/* METRICS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Total Clinics</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2, margin: '4px 0' }}>12</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>All registered clinics</div>
            </div>
          </div>
          <ChevronRight size={16} color="#cbd5e1" />
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Active</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2, margin: '4px 0' }}>8</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Clinics online (67%)</div>
            </div>
          </div>
          <ChevronRight size={16} color="#cbd5e1" />
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>In Setup</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2, margin: '4px 0' }}>2</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Setup in progress (17%)</div>
            </div>
          </div>
          <ChevronRight size={16} color="#cbd5e1" />
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PauseCircle size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Suspended</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2, margin: '4px 0' }}>2</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Temporarily suspended (17%)</div>
            </div>
          </div>
          <ChevronRight size={16} color="#cbd5e1" />
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Clinics with Issues</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2, margin: '4px 0' }}>3</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Require attention (25%)</div>
            </div>
          </div>
          <ChevronRight size={16} color="#cbd5e1" />
        </div>
      </div>


        <div style={{ display: "grid", gridTemplateColumns: "65% 1fr", gap: "24px" }}>
          {/* Clinic Operational Status Table */}
          <div className="admin-section-card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <Building2 size={18} color="#3b82f6" />
                Clinic Operational Status
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="Search clinics..." style={{ padding: '6px 12px 6px 32px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', width: '200px' }} />
                  <svg style={{ position: 'absolute', left: '10px', top: '8px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569' }}>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>In Setup</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Clinic Name</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Package</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Clinic Admin</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Setup Status</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Users</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500 }}>Last Activity</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 500 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Bangkok Wellness Center', loc: 'Bangkok, Thailand', status: 'Active', pkg: 'Premium', adminStatus: 'Assigned', adminName: 'Dr. Somchai R.', setup: 'Completed', setupColor: '#16a34a', users: 326, date: '24 Aug 2026', time: '08:32', action: 'View' },
                    { name: 'Sukhumvit Clinic', loc: 'Bangkok, Thailand', status: 'In Setup', pkg: 'Standard', adminStatus: 'Pending', adminName: 'No admin', setup: 'In Progress', setupColor: '#f97316', users: 42, date: '23 Aug 2026', time: '14:10', action: 'Continue Setup' },
                    { name: 'Rama 9 Clinic', loc: 'Bangkok, Thailand', status: 'Active', pkg: 'Premium', adminStatus: 'Assigned', adminName: 'Dr. Sirin K.', setup: 'Pending Admin', setupColor: '#f97316', users: 218, date: '24 Aug 2026', time: '07:15', action: 'Assign Admin' },
                    { name: 'Chiang Mai Clinic', loc: 'Chiang Mai, Thailand', status: 'Suspended', pkg: 'Basic', adminStatus: 'Assigned', adminName: 'Nurse Aom', setup: 'Limited Access', setupColor: '#ef4444', users: 95, date: '24 Aug 2026', time: '16:42', action: 'Review Setup' },
                  ].map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{c.loc}</div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, backgroundColor: c.status === 'Active' ? '#dcfce7' : c.status === 'In Setup' ? '#ffedd5' : '#fee2e2', color: c.status === 'Active' ? '#16a34a' : c.status === 'In Setup' ? '#f97316' : '#ef4444' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                          {c.status}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#475569' }}>{c.pkg}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <UserPlus size={14} color={c.adminStatus === 'Assigned' ? '#64748b' : '#f97316'} />
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: c.adminStatus === 'Assigned' ? '#475569' : '#f97316' }}>{c.adminStatus}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.adminName}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, backgroundColor: c.setup === 'Completed' ? '#dcfce7' : '#fff7ed', color: c.setupColor }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                          {c.setup}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#475569', fontWeight: 500 }}>{c.users}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ color: '#475569' }}>{c.date}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.time}</div>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <button style={{ padding: '4px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', background: 'white', color: '#2563eb', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                            {c.action}
                          </button>
                          <MoreVertical size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Showing 4 of 12 clinics</div>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                View all clinics <ChevronRight size={14} />
              </button>
            </div>
          </div>


          {/* Clinic Status & Setup Progress */}
          <div className="admin-section-card" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0' }}>
              <Building2 size={18} color="#3b82f6" />
              Clinic Status
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <div style={{ 
                position: 'relative', width: '120px', height: '120px', borderRadius: '50%', 
                background: 'conic-gradient(#ef4444 0% 17%, #f97316 17% 34%, #16a34a 34% 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <div style={{ 
                  position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px', backgroundColor: 'white', borderRadius: '50%',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>12</span>
                  <span style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Clinics</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }}></div>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Active</span>
                  </div>
                  <span style={{ color: '#64748b' }}>8 (67%)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
                    <span style={{ color: '#475569', fontWeight: 500 }}>In Setup</span>
                  </div>
                  <span style={{ color: '#64748b' }}>2 (17%)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Suspended</span>
                  </div>
                  <span style={{ color: '#64748b' }}>2 (17%)</span>
                </div>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Settings size={16} color="#64748b" /> Setup Progress
                </h3>
                <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  View all <ChevronRight size={14} />
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Sukhumvit Clinic</span>
                    <span style={{ color: '#64748b' }}>70%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '70%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Thonglor Clinic</span>
                    <span style={{ color: '#64748b' }}>45%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '45%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Phuket Clinic</span>
                    <span style={{ color: '#64748b' }}>25%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '25%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
}
