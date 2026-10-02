import { useState } from 'react';
import { Search, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './GlobalTestMaster.css';

const MOCK_TESTS = [
  { code: '15694', test: '(1,3)-β-d-glucan (BDG)', category: 'Out lab', specimens: 'Serum' },
  { code: '13058', test: '(ยกเลิก ใช้15342แทน) Cholinesterase in Erythrocyte', category: 'Out lab', specimens: 'EDTA blood' },
  { code: '15187', test: '(ยกเลิก) Diazepam (Valium)', category: 'Immunology', specimens: 'Serum' },
  { code: '17034', test: '(ยกเลิก) Multiplex PCR for beta-thalassemia (13 common mutations)', category: 'Out lab', specimens: 'EDTA sterile blood' },
  { code: '17066', test: '(ยกเลิก)Multiplex PCR for beta-thalassemia (21 types)', category: 'Out lab', specimens: 'EDTA sterile blood' },
  { code: '17039', test: '(ยกเลิก)Thalassemia-beta Mutation', category: 'Out lab', specimens: 'EDTA blood' },
  { code: 'S062', test: '(ยกเลิก)เบิกชุดเก็บ Cortisol (Salivary) (รามา)', category: 'Supply', specimens: 'N/A' },
  { code: 'C094', test: '10q LOH [Hitech]', category: 'Pathology', specimens: 'N/A' },
];

export default function GlobalTestMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const filteredTests = MOCK_TESTS.filter(t => 
    t.test.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="gtm-wrapper fadeIn">
      <p className="gtm-top-text">
        Every test the LIS publishes, as of the last sync. Enabling tests per clinic is not built yet — receptionists currently see the whole catalogue.
      </p>

      <div className="gtm-main-card">
        {/* Header */}
        <div className="gtm-header">
          <div className="gtm-header-info">
            <h2 className="gtm-title">LIS test catalogue</h2>
            <p className="gtm-subtitle">Last synced 2026-10-01 03:00 - 1786 tests</p>
          </div>
          <button 
            className="gtm-sync-btn" 
            onClick={handleSync} 
            disabled={isSyncing}
          >
            <RefreshCw size={16} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync now'}
          </button>
        </div>

        {/* Toolbar */}
        <div className="gtm-toolbar">
          <div className="gtm-search-wrapper">
            <Search size={16} className="gtm-search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or code..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gtm-search-input"
            />
          </div>
          
          <div className="gtm-toolbar-right">
            <span className="gtm-test-count">1786 tests</span>
            <div className="gtm-select-wrapper">
              <span className="gtm-select-label">Category:</span>
              <select className="gtm-select">
                <option>All categories</option>
                <option>Out lab</option>
                <option>Immunology</option>
                <option>Supply</option>
                <option>Pathology</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="gtm-table-container">
          <table className="gtm-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Code</th>
                <th>Test</th>
                <th style={{ width: '25%' }}>Category</th>
                <th style={{ width: '25%' }}>Specimens</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((t, idx) => (
                <tr key={idx}>
                  <td>{t.code}</td>
                  <td>{t.test}</td>
                  <td style={{ color: '#64748b' }}>{t.category}</td>
                  <td style={{ color: '#64748b' }}>{t.specimens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="gtm-footer">
          <div className="gtm-pagination-wrapper">
            <span className="gtm-rows-text">Rows per page</span>
            <select className="gtm-rows-select">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            
            <span className="gtm-page-info">Page 1 of 90</span>
            
            <div className="gtm-pagination-controls">
              <button className="gtm-page-btn" disabled><ChevronsLeft size={16} /></button>
              <button className="gtm-page-btn" disabled><ChevronLeft size={16} /></button>
              <button className="gtm-page-btn"><ChevronRight size={16} /></button>
              <button className="gtm-page-btn"><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
