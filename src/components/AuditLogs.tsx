import { useState } from 'react';
import { Search, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './AuditLogs.css';

const MOCK_LOGS = [
  { id: 1, timestamp: '2026-08-03 14:30:22', actor: 'Dr. Narong Phanich', role: 'Doctor', module: 'Laboratory', action: 'Approve & Release', objectId: 'ORD004', ipDevice: '10.0.0.15 / Win10', details: 'Reviewed critical values. Authorized release.', status: 'Success' },
  { id: 2, timestamp: '2026-08-03 14:15:05', actor: 'System (LIS)', role: 'Integration', module: 'Laboratory', action: 'Receive Results', objectId: 'ORD004', ipDevice: '10.0.0.99 / API', details: 'HL7 ORU message received. 1 critical value.', status: 'Success' },
  { id: 3, timestamp: '2026-08-03 13:45:10', actor: 'Dr. Apinya Chamroenuk', role: 'Doctor', module: 'Laboratory', action: 'Reject Results', objectId: 'ORD003', ipDevice: '10.0.0.22 / Mac', details: 'Sample hemolyzed. Requested recollection.', status: 'Failure' },
  { id: 4, timestamp: '2026-08-03 11:20:00', actor: 'Preecha Suthiwong', role: 'Technician', module: 'Laboratory', action: 'Update Sample Status', objectId: 'ORD004', ipDevice: '192.168.1.88 / iOS', details: 'Batch transferred to Central Lab.', status: 'Success' },
  { id: 5, timestamp: '2026-08-03 10:45:12', actor: 'Sarah Chen', role: 'Platform Admin', module: 'Security', action: 'Modify Permissions', objectId: 'ROLE_DOC', ipDevice: '192.168.1.45 / Win11', details: 'Granted "Approve Lab" permission.', status: 'Success' },
  { id: 6, timestamp: '2026-08-03 09:10:00', actor: 'John Smith', role: 'Clinic Admin', module: 'Patient Mgt', action: 'Cancel Order', objectId: 'ORD005', ipDevice: '192.168.1.45 / Win11', details: 'Patient requested cancellation.', status: 'Success' },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [showExportConfirm, setShowExportConfirm] = useState(false);

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.objectId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;
    const matchesRole = roleFilter === 'All' || log.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    
    return matchesSearch && matchesModule && matchesRole && matchesStatus;
  });

  const handleExport = () => {
    setShowExportConfirm(false);
    alert('Audit logs exported successfully.');
  };

  return (
    <div className="al-wrapper fadeIn">
      <div className="al-header">
        <h1 className="al-title">Audit Logs</h1>
        <p className="al-subtitle">Review user and system activities for compliance.</p>
      </div>

      <div className="al-filters-row">
        <div className="al-search-box">
          <Search size={16} className="al-search-icon" />
          <input 
            type="text" 
            placeholder="Search user, MRN, order ID, event..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="al-select">
          <option value="All">Module</option>
          <option value="Security">Security</option>
          <option value="Patient Mgt">Patient Mgt</option>
          <option value="Laboratory">Laboratory</option>
        </select>

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="al-select">
          <option value="All">Role</option>
          <option value="Platform Admin">Platform Admin</option>
          <option value="Clinic Admin">Clinic Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Technician">Technician</option>
          <option value="Integration">Integration</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="al-select">
          <option value="All">Status</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>

        <select className="al-select">
          <option>Date Range</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>

        <button className="al-btn-export" onClick={() => setShowExportConfirm(true)}>
          <Download size={16} /> Export
        </button>
      </div>

      <div className="al-table-container">
        <table className="al-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Role</th>
              <th>Module</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td className="al-cell-time">{log.timestamp}</td>
                <td className="al-cell-bold">{log.actor}</td>
                <td className="al-cell-muted">{log.role}</td>
                <td><span className="al-badge-gray">{log.module}</span></td>
                <td className="al-cell-bold">{log.action}</td>
                <td>
                  <span className={`al-status-badge ${log.status === 'Success' ? 'success' : 'failure'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="al-empty-state">No logs found matching criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="al-pagination">
          <span className="al-page-text">Showing {filteredLogs.length} entries</span>
          <div className="al-page-controls">
            <button className="al-page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="al-page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="al-modal-overlay">
          <div className="al-modal">
            <div className="al-modal-header">
              <h2>Audit Event Details</h2>
              <button className="al-modal-close" onClick={() => setSelectedLog(null)}><X size={20} /></button>
            </div>
            <div className="al-modal-body">
              <div className="al-detail-group">
                <label>Action</label>
                <div className="al-detail-value">{selectedLog.action}</div>
              </div>
              <div className="al-detail-group">
                <label>Details</label>
                <div className="al-detail-box">{selectedLog.details}</div>
              </div>
              <div className="al-detail-grid">
                <div>
                  <label>Actor</label>
                  <div className="al-detail-value">{selectedLog.actor}</div>
                </div>
                <div>
                  <label>Role</label>
                  <div className="al-detail-value">{selectedLog.role}</div>
                </div>
                <div>
                  <label>Object ID</label>
                  <div className="al-detail-mono">{selectedLog.objectId}</div>
                </div>
                <div>
                  <label>Timestamp</label>
                  <div className="al-detail-mono">{selectedLog.timestamp}</div>
                </div>
                <div>
                  <label>IP / Device</label>
                  <div className="al-detail-mono">{selectedLog.ipDevice}</div>
                </div>
                <div>
                  <label>Status</label>
                  <div className={`al-status-badge ${selectedLog.status === 'Success' ? 'success' : 'failure'}`} style={{ display: 'inline-flex' }}>
                    {selectedLog.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExportConfirm && (
        <div className="al-modal-overlay">
          <div className="al-modal" style={{ maxWidth: '400px' }}>
            <div className="al-modal-header">
              <h2>Export Audit Logs</h2>
              <button className="al-modal-close" onClick={() => setShowExportConfirm(false)}><X size={20}/></button>
            </div>
            <div className="al-modal-body">
              <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#475569' }}>
                You are about to export {filteredLogs.length} audit records. This action will be recorded in the system audit trail.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="al-btn-secondary" onClick={() => setShowExportConfirm(false)}>Cancel</button>
                <button className="al-btn-export" onClick={handleExport}>Confirm Export</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
