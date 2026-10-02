import React, { useState } from 'react';
import { Search, Check, Plus, Edit2, Trash2, X, Package, FileText, Barcode, FlaskConical, ChevronDown, RotateCcw } from 'lucide-react';
import { useClinicConfig } from '../context/ClinicConfigContext';
import './ServicesAndPackages.css';

export default function ServicesAndPackages({ currentRole }: { currentRole?: string }) {
  const { categories, packages, setPackages } = useClinicConfig();

  const INITIAL_REFERENCE_RANGES = [
    { id: '1', test: 'Glucose', parameter: 'Fasting Glucose', unit: 'mg/dL', maleRange: '70 - 99', femaleRange: '70 - 99', ageRange: '—', notes: 'Fasting required' },
    { id: '2', test: 'HbA1c', parameter: 'HbA1c', unit: '%', maleRange: '< 5.7', femaleRange: '< 5.7', ageRange: '—', notes: '—' },
    { id: '3', test: 'CBC', parameter: 'Hemoglobin', unit: 'g/dL', maleRange: '13.5 - 17.5', femaleRange: '12.0 - 15.5', ageRange: '—', notes: '—' },
    { id: '4', test: 'Lipid Profile', parameter: 'LDL', unit: 'mg/dL', maleRange: '< 100', femaleRange: '< 100', ageRange: '—', notes: '—' }
  ];
  
  const [activeTab, setActiveTab] = useState<'tests' | 'packages' | 'reference' | 'sync_history'>('tests');

  const SYNC_HISTORY = [
    { id: 1, started: '2026-10-01 03:00', trigger: 'Scheduled', by: '—', status: 'Succeeded', duration: '1.5 s', fetched: 1786, error: '' },
    { id: 2, started: '2026-09-30 03:00', trigger: 'Scheduled', by: '—', status: 'Succeeded', duration: '3.5 s', fetched: 1786, error: '' },
    { id: 3, started: '2026-09-29 03:00', trigger: 'Scheduled', by: '—', status: 'Succeeded', duration: '3.4 s', fetched: 1786, error: '' },
    { id: 4, started: '2026-09-28 10:35', trigger: 'Sync now', by: 'platform@admin.test', status: 'Succeeded', duration: '3.6 s', fetched: 1786, error: '' },
    { id: 5, started: '2026-09-28 03:00', trigger: 'Scheduled', by: '—', status: 'Succeeded', duration: '1.2 s', fetched: 1786, error: '' },
    { id: 6, started: '2026-09-27 03:00', trigger: 'Scheduled', by: '—', status: 'Succeeded', duration: '3.3 s', fetched: 1786, error: '' },
    { id: 7, started: '2026-09-26 03:00', trigger: 'Scheduled', by: '—', status: 'Succeeded', duration: '5.4 s', fetched: 1786, error: '' },
    { id: 8, started: '2026-09-25 17:03', trigger: 'Sync now', by: 'platform@admin.test', status: 'Succeeded', duration: '1.4 s', fetched: 1786, error: '' },
    { id: 9, started: '2026-09-25 17:02', trigger: 'Sync now', by: 'platform@admin.test', status: 'Succeeded', duration: '4.2 s', fetched: 1786, error: '' },
    { id: 10, started: '2026-09-25 13:22', trigger: 'Sync now', by: 'platform@admin.test', status: 'Succeeded', duration: '1.6 s', fetched: 1786, error: '' },
    { id: 11, started: '2026-09-25 11:09', trigger: 'Startup', by: '—', status: 'Succeeded', duration: '6.1 s', fetched: 1786, error: '' },
  ];
  
  // State for Categories and Tests
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name || '');
  const [enabledTests, setEnabledTests] = useState<string[]>(['CBC', 'Hemoglobin', 'Glucose', 'HbA1c', 'TSH']);
  const [searchQuery, setSearchQuery] = useState('');

  // State for Packages
  const [showDrawer, setShowDrawer] = useState(false);
  
  // New Package Form State
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgCode, setNewPkgCode] = useState('');
  const [newPkgTests, setNewPkgTests] = useState<string[]>([]);
  const [activeNewPkgCategory, setActiveNewPkgCategory] = useState(categories[0]?.name || '');
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  
  // Custom Searchable Dropdown State (Create Package)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');

  // Custom Searchable Dropdown State (Main View)
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [mainDropdownSearch, setMainDropdownSearch] = useState('');

  // Reference Ranges State
  const [referenceRanges, setReferenceRanges] = useState(INITIAL_REFERENCE_RANGES);
  const [showRefModal, setShowRefModal] = useState(false);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [newRefData, setNewRefData] = useState({ test: '', parameter: '', unit: '', maleRange: '', femaleRange: '', ageRange: '', notes: '' });
  const allTests = categories.flatMap(cat => cat.tests);

  // Initialize activeNewPkgCategory with the first category that has enabled tests
  React.useEffect(() => {
    if (showDrawer) {
      const firstValidCat = categories.find(cat => cat.tests.some(t => enabledTests.includes(t)));
      if (firstValidCat) setActiveNewPkgCategory(firstValidCat.name);
    }
  }, [showDrawer, categories, enabledTests]);

  // Auto-generate package code based on name
  React.useEffect(() => {
    if (!editingPackageId) {
      if (newPkgName) {
        const initials = newPkgName
          .split(' ')
          .filter(w => w.length > 0)
          .map(w => w.charAt(0).toUpperCase())
          .join('')
          .substring(0, 3);
        const nextId = String(packages.length + 1).padStart(3, '0');
        setNewPkgCode(`${initials ? initials + '-' : 'PKG-'}${nextId}`);
      } else {
        setNewPkgCode('');
      }
    }
  }, [newPkgName, packages.length, editingPackageId]);

  // --- Handlers ---
  const toggleTest = (testName: string) => {
    setEnabledTests(prev => 
      prev.includes(testName) ? prev.filter(t => t !== testName) : [...prev, testName]
    );
  };

  const toggleNewPkgTest = (testName: string) => {
    setNewPkgTests(prev => 
      prev.includes(testName) ? prev.filter(t => t !== testName) : [...prev, testName]
    );
  };

  const handleEditPackage = (pkg: any) => {
    setEditingPackageId(pkg.id);
    setNewPkgName(pkg.name);
    setNewPkgCode(pkg.code);
    setNewPkgTests(pkg.tests);
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setEditingPackageId(null);
    setNewPkgName('');
    setNewPkgCode('');
    setNewPkgTests([]);
  };

  const handleSavePackage = () => {
    if (!newPkgName.trim() || !newPkgCode.trim()) return;
    
    if (editingPackageId) {
      setPackages(packages.map(p => 
        p.id === editingPackageId 
          ? { ...p, name: newPkgName, code: newPkgCode, tests: newPkgTests }
          : p
      ));
    } else {
      const newPkg = {
        id: `pkg-${Date.now()}`,
        name: newPkgName,
        code: newPkgCode,
        tests: newPkgTests
      };
      setPackages([...packages, newPkg]);
    }
    handleCloseDrawer();
  };

  const handleEditRef = (ref: any) => {
    setEditingRefId(ref.id);
    setNewRefData({
      test: ref.test, parameter: ref.parameter, unit: ref.unit,
      maleRange: ref.maleRange, femaleRange: ref.femaleRange,
      ageRange: ref.ageRange, notes: ref.notes
    });
    setShowRefModal(true);
  };

  const handleDeleteRef = (id: string) => {
    setReferenceRanges(referenceRanges.filter(r => r.id !== id));
  };

  const handleSaveRef = () => {
    if (!newRefData.test || !newRefData.parameter) return;
    if (editingRefId) {
      setReferenceRanges(referenceRanges.map(r => r.id === editingRefId ? { ...r, ...newRefData } : r));
    } else {
      setReferenceRanges([...referenceRanges, { id: `ref-${Date.now()}`, ...newRefData }]);
    }
    setShowRefModal(false);
    setEditingRefId(null);
    setNewRefData({ test: '', parameter: '', unit: '', maleRange: '', femaleRange: '', ageRange: '', notes: '' });
  };

  // --- Filtered Data ---
  const filteredCategories = categories.map(cat => ({
    ...cat,
    tests: cat.tests.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(cat => cat.tests.length > 0 || cat.name === activeCategory); // Keep active category even if empty so we can add tests


  return (
    <div className="services-packages-container">
      {/* Horizontal Tabs */}
      <div className="sp-tabs">
        <button 
          className={`sp-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FlaskConical size={14} /> Test Availability
        </button>
        <button 
          className={`sp-tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Package size={14} /> Health Packages
        </button>
        <button 
          className={`sp-tab-btn ${activeTab === 'reference' ? 'active' : ''}`}
          onClick={() => setActiveTab('reference')}
        >
          Reference Ranges
        </button>
        <button 
          className={`sp-tab-btn ${activeTab === 'sync_history' ? 'active' : ''}`}
          onClick={() => setActiveTab('sync_history')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RotateCcw size={14} /> Sync History
        </button>
      </div>

      <div className="sp-content">
        
        {/* --- TAB: TEST AVAILABILITY --- */}
        {activeTab === 'tests' && (
          <div className="tab-pane fadeIn">
            <div className="sp-header-row">
              <div>
                <h2 className="sp-title">Clinic-Specific Test Availability</h2>
                <p className="sp-subtitle">Enable tests available at this clinic. Receptionists will only see enabled tests.</p>
              </div>
            </div>

            {/* Searchable Dropdown for Categories */}
            <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
              <div 
                className="form-input" 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: '#f8fafc', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
              >
                <span style={{ fontWeight: 500, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FlaskConical size={18} className="text-muted" /> 
                  {activeCategory || 'Select category...'}
                </span>
                <ChevronDown size={18} className="text-muted" />
              </div>
              
              {isMainDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  marginTop: '4px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  zIndex: 20,
                  maxHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '8px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                    <div className="sp-search-bar" style={{ width: '100%', padding: '8px 12px', backgroundColor: 'white' }}>
                      <Search size={14} className="text-muted" />
                      <input 
                        type="text" 
                        placeholder="Search category..." 
                        value={mainDropdownSearch}
                        onChange={(e) => setMainDropdownSearch(e.target.value)}
                        style={{ fontSize: '14px', width: '100%' }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div style={{ overflowY: 'auto', flex: 1, padding: '4px 0' }}>
                    {categories.filter(cat => {
                      return cat.name.toLowerCase().includes(mainDropdownSearch.toLowerCase());
                    }).length === 0 ? (
                      <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                        No categories found.
                      </div>
                    ) : (
                      categories.filter(cat => {
                        return cat.name.toLowerCase().includes(mainDropdownSearch.toLowerCase());
                      }).map(cat => {
                        const enabledCount = cat.tests.filter(t => enabledTests.includes(t)).length;
                        return (
                          <div 
                            key={cat.name}
                            className="custom-select-option"
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              backgroundColor: activeCategory === cat.name ? '#f1f5f9' : 'transparent',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '14px',
                              color: activeCategory === cat.name ? 'var(--primary)' : 'var(--text-main)',
                              fontWeight: activeCategory === cat.name ? 600 : 500
                            }}
                            onClick={() => {
                              setActiveCategory(cat.name);
                              setIsMainDropdownOpen(false);
                              setMainDropdownSearch('');
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                               {cat.name}
                            </span>
                            <span style={{ 
                              fontSize: '12px', 
                              color: activeCategory === cat.name ? 'var(--primary)' : '#64748b',
                              backgroundColor: activeCategory === cat.name ? 'rgba(203, 160, 40, 0.1)' : '#f1f5f9',
                              padding: '2px 8px',
                              borderRadius: '12px'
                            }}>
                              {enabledCount}/{cat.tests.length}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Content for Selected Category */}
            <div className="category-content-container">
              <div className="sp-detail-header">
                  <div>
                    <h3 className="sp-detail-title">{activeCategory} Tests</h3>
                    <p className="sp-detail-subtitle">Manage availability for all tests under {activeCategory}.</p>
                  </div>
                  <div className="sp-search-bar">
                    <Search size={16} className="text-muted" />
                    <input 
                      type="text" 
                      placeholder="Search tests..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="test-settings-list">
                  {filteredCategories.find(c => c.name === activeCategory)?.tests.map(test => {
                    const isSelected = enabledTests.includes(test);
                    return (
                      <div key={test} className="test-setting-row">
                        <div className="test-setting-info">
                          <span className="test-setting-name">{test}</span>
                          <span className="test-setting-desc">Standard diagnostic test</span>
                        </div>
                        <label className="setting-toggle">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleTest(test)}
                          />
                          <span className="toggle-bg"></span>
                        </label>
                      </div>
                    );
                  })}
                  {(!filteredCategories.find(c => c.name === activeCategory) || 
                    filteredCategories.find(c => c.name === activeCategory)?.tests.length === 0) && (
                    <div style={{ color: 'var(--text-muted)', padding: '24px 0' }}>
                      No tests found matching "{searchQuery}" in this category.
                    </div>
                  )}
                </div>
              </div>
            </div>
        )}

        {/* --- TAB: HEALTH PACKAGES --- */}
        {activeTab === 'packages' && (
          <div className="tab-pane fadeIn">
             <div className="sp-header-row">
              <div>
                <h2 className="sp-title">Health Testing Packages</h2>
                <p className="sp-subtitle">Packages selectable by receptionists. Only tests enabled for this clinic can be included.</p>
              </div>
              <button className="btn-primary" onClick={() => setShowDrawer(true)}>
                <Plus size={16} /> Create Package
              </button>
            </div>

            <div className="packages-list">
              {packages.map(pkg => (
                <div key={pkg.id} className="package-card">
                  <div className="package-info">
                    <div className="package-name">
                      <Package size={18} className="text-muted" />
                      {pkg.name}
                      <span className="package-code">{pkg.code}</span>
                    </div>
                    <div className="package-tests">
                      {pkg.tests.slice(0, 8).map(test => (
                        <span key={test} className="test-tag">{test}</span>
                      ))}
                      {pkg.tests.length > 8 && (
                        <span className="test-tag" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                          +{pkg.tests.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="package-actions">
                    <button className="btn-icon-action" title="Edit Package" onClick={() => handleEditPackage(pkg)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon-action danger" title="Delete Package">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {packages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  <Package size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                  <p>No packages created yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB: REFERENCE RANGES --- */}
        {activeTab === 'reference' && (
          <div className="tab-pane fadeIn">
            <div className="sp-header-row" style={{ marginBottom: '16px' }}>
              <div>
                <h2 className="sp-title">Clinic-Specific Reference Ranges</h2>
                {currentRole === 'Platform Admin' ? (
                  <p className="sp-subtitle">Manage reference ranges for laboratory tests.</p>
                ) : (
                  <p className="sp-subtitle">Display only. Changes are handled by Platform/System Admin.</p>
                )}
              </div>
              {currentRole === 'Platform Admin' && (
                <button className="btn-primary" onClick={() => {
                  setEditingRefId(null);
                  setNewRefData({ test: '', parameter: '', unit: '', maleRange: '', femaleRange: '', ageRange: '', notes: '' });
                  setShowRefModal(true);
                }}>
                  <Plus size={16} /> Add Reference Range
                </button>
              )}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Test</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Parameter</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Unit</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Male Range</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Female Range</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Age Range</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569' }}>Notes</th>
                    {currentRole === 'Platform Admin' && <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', textAlign: 'right' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {referenceRanges.map(ref => (
                    <tr key={ref.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', color: '#1e293b' }}>{ref.test}</td>
                      <td style={{ padding: '12px 16px', color: '#1e293b' }}>{ref.parameter}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{ref.unit}</td>
                      <td style={{ padding: '12px 16px', color: '#1e293b' }}>{ref.maleRange}</td>
                      <td style={{ padding: '12px 16px', color: '#1e293b' }}>{ref.femaleRange}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{ref.ageRange}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{ref.notes}</td>
                      {currentRole === 'Platform Admin' && (
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button className="btn-icon-action" onClick={() => handleEditRef(ref)} style={{ marginRight: '8px' }}>
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-icon-action danger" onClick={() => handleDeleteRef(ref.id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {referenceRanges.length === 0 && (
                    <tr>
                      <td colSpan={currentRole === 'Platform Admin' ? 8 : 7} style={{ padding: '32px 16px', textAlign: 'center', color: '#64748b' }}>
                        No reference ranges configured yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB: SYNC HISTORY --- */}
        {activeTab === 'sync_history' && (
          <div className="tab-pane fadeIn">
            <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>Catalogue sync history</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>One row per sync attempt: the nightly run, Sync now, and the first sync after a fresh deployment.</p>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Last 20 runs</div>
              </div>
              
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>Started</th>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>Trigger</th>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>By</th>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>Status</th>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>Duration</th>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>Fetched</th>
                      <th style={{ padding: '12px 16px', fontWeight: 500, color: '#64748b' }}>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SYNC_HISTORY.map(row => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', color: '#334155' }}>{row.started}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{row.trigger}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{row.by}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{row.duration}</td>
                        <td style={{ padding: '12px 16px', color: '#334155' }}>{row.fetched}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>{row.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- ADD / EDIT PACKAGE MODAL --- */}
      {showDrawer && (
        <div className="modal-overlay">
          <div className="modal-panel">
            <div className="modal-header">
              <h3 className="modal-title">{editingPackageId ? 'Edit Package' : 'Create New Package'}</h3>
              <button className="modal-close" onClick={handleCloseDrawer}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Package Name</label>
                  <div className="input-with-icon-drawer">
                    <FileText size={18} className="input-icon" />
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Annual Health Checkup" 
                      value={newPkgName}
                      onChange={(e) => setNewPkgName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Package Code</label>
                  <div className="input-with-icon-drawer">
                    <Barcode size={18} className="input-icon" />
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Auto-generated code" 
                      value={newPkgCode}
                      disabled
                      style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Included Tests</label>
                  <span className="selected-count-badge">{newPkgTests.length} selected</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>Select tests to include in this package. Only enabled clinic tests are shown.</p>
                
                <div className="tests-selection-tabs-layout">
                  {/* Custom Searchable Dropdown */}
                  <div style={{ position: 'relative', marginBottom: '16px' }}>
                    <div 
                      className="form-input" 
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                        {activeNewPkgCategory || 'Select category...'}
                      </span>
                      <ChevronDown size={16} className="text-muted" />
                    </div>
                    
                    {isDropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        marginTop: '4px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        zIndex: 10,
                        maxHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                      }}>
                        <div style={{ padding: '8px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                          <div className="sp-search-bar" style={{ width: '100%', padding: '8px 12px', backgroundColor: 'white' }}>
                            <Search size={14} className="text-muted" />
                            <input 
                              type="text" 
                              placeholder="Search category..." 
                              value={dropdownSearch}
                              onChange={(e) => setDropdownSearch(e.target.value)}
                              style={{ fontSize: '13px' }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1, padding: '4px 0' }}>
                          {categories.filter(cat => {
                            const availableTests = cat.tests.filter(t => enabledTests.includes(t));
                            if (availableTests.length === 0) return false;
                            return cat.name.toLowerCase().includes(dropdownSearch.toLowerCase());
                          }).length === 0 ? (
                            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                              No categories found.
                            </div>
                          ) : (
                            categories.filter(cat => {
                              const availableTests = cat.tests.filter(t => enabledTests.includes(t));
                              if (availableTests.length === 0) return false;
                              return cat.name.toLowerCase().includes(dropdownSearch.toLowerCase());
                            }).map(cat => {
                              const availableTests = cat.tests.filter(t => enabledTests.includes(t));
                              const selectedCount = availableTests.filter(t => newPkgTests.includes(t)).length;
                              return (
                                <div 
                                  key={cat.name}
                                  className="custom-select-option"
                                  style={{
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    backgroundColor: activeNewPkgCategory === cat.name ? '#f1f5f9' : 'transparent',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    color: activeNewPkgCategory === cat.name ? 'var(--primary)' : 'var(--text-main)',
                                    fontWeight: activeNewPkgCategory === cat.name ? 600 : 500
                                  }}
                                  onClick={() => {
                                    setActiveNewPkgCategory(cat.name);
                                    setIsDropdownOpen(false);
                                    setDropdownSearch('');
                                  }}
                                >
                                  <span>{cat.name}</span>
                                  <span style={{ 
                                    fontSize: '12px', 
                                    color: activeNewPkgCategory === cat.name ? 'var(--primary)' : '#64748b',
                                    backgroundColor: activeNewPkgCategory === cat.name ? 'rgba(203, 160, 40, 0.1)' : '#f1f5f9',
                                    padding: '2px 8px',
                                    borderRadius: '12px'
                                  }}>
                                    {selectedCount}/{availableTests.length}
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Test List for Active Category */}
                  <div className="category-content-container" style={{ padding: '16px' }}>
                    <div className="test-settings-list">
                      {categories.find(c => c.name === activeNewPkgCategory)?.tests
                        .filter(t => enabledTests.includes(t))
                        .map(test => {
                        const isSelected = newPkgTests.includes(test);
                        return (
                          <div key={test} className="test-setting-row" style={{ padding: '12px 0' }}>
                            <div className="test-setting-info">
                              <span className="test-setting-name">{test}</span>
                              <span className="test-setting-desc">Standard diagnostic test</span>
                            </div>
                            <button 
                              className={`add-test-btn ${isSelected ? 'added' : ''}`}
                              onClick={() => toggleNewPkgTest(test)}
                              title={isSelected ? "Remove test" : "Add test"}
                            >
                              {isSelected ? <Check size={16} /> : <Plus size={16} />}
                            </button>
                          </div>
                        );
                      })}
                      
                      {(!categories.find(c => c.name === activeNewPkgCategory) || 
                        categories.find(c => c.name === activeNewPkgCategory)?.tests.filter(t => enabledTests.includes(t)).length === 0) && (
                        <div style={{ color: 'var(--text-muted)', padding: '24px 0', textAlign: 'center' }}>
                          No enabled tests in this category.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseDrawer}>Cancel</button>
              <button className="btn-primary" onClick={handleSavePackage}>Save Package</button>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT REFERENCE RANGE MODAL --- */}
      {showRefModal && (
        <div className="modal-overlay">
          <div className="modal-panel" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">{editingRefId ? 'Edit Reference Range' : 'Add Reference Range'}</h3>
              <button className="modal-close" onClick={() => setShowRefModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Test *</label>
                <select 
                  className="form-input" 
                  value={newRefData.test}
                  onChange={(e) => setNewRefData({...newRefData, test: e.target.value})}
                >
                  <option value="">Select a test from the system...</option>
                  {allTests.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Parameter *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Fasting Glucose" 
                  value={newRefData.parameter}
                  onChange={(e) => setNewRefData({...newRefData, parameter: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Unit</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. mg/dL" 
                    value={newRefData.unit}
                    onChange={(e) => setNewRefData({...newRefData, unit: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Age Range</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 18-65" 
                    value={newRefData.ageRange}
                    onChange={(e) => setNewRefData({...newRefData, ageRange: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Male Range</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 70 - 99" 
                    value={newRefData.maleRange}
                    onChange={(e) => setNewRefData({...newRefData, maleRange: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Female Range</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 70 - 99" 
                    value={newRefData.femaleRange}
                    onChange={(e) => setNewRefData({...newRefData, femaleRange: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Fasting required" 
                  value={newRefData.notes}
                  onChange={(e) => setNewRefData({...newRefData, notes: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowRefModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveRef} disabled={!newRefData.test || !newRefData.parameter}>
                Save Reference Range
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
