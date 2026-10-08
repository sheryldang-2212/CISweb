import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, X, CheckSquare, Lock, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useClinicConfig } from '../context/ClinicConfigContext';
import Modal from './Modal';
import { initialMockPatients } from './Patients';
import type { Patient } from './Patients';
import './LabOrderFormModal.css';

interface LabOrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: any;
  onRegisterPatient?: () => void;
  onPrintLabels?: (orderId: string) => void;
}

export default function LabOrderFormModal({ isOpen, onClose, mode, initialData, onRegisterPatient, onPrintLabels }: LabOrderFormModalProps) {
  const { categories: testCategories, packages: clinicPackages } = useClinicConfig();
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Hematology': true
  });
  
  const [selectedTests, setSelectedTests] = useState<string[]>(initialData?.tests || []);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [patientSearch, setPatientSearch] = useState(initialData?.patientName || '');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(initialData?.patientId || null);
  
  // New flags state
  const [isConfidential, setIsConfidential] = useState(false);
  const [isEmailConsent, setIsEmailConsent] = useState(false);

  // New modal/toast state
  const [showVerificationBlock, setShowVerificationBlock] = useState(false);
  const [showLinkingWarning, setShowLinkingWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedTests(initialData?.tests || []);
      setPatientSearch(initialData?.patientName || '');
      
      if (initialData?.patientName) {
         const found = initialMockPatients.find(p => p.name === initialData.patientName);
         if (found) setSelectedPatientId(found.id);
      } else {
         setSelectedPatientId(null);
      }
      setSelectedPackages([]);
      setShowVerificationBlock(false);
      setShowLinkingWarning(false);
      setShowSuccessModal(false);
    }
  }, [isOpen, initialData]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTestToggle = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    );
  };

  const handlePackageToggle = (pkg: string) => {
    setSelectedPackages(prev => 
      prev.includes(pkg) ? prev.filter(p => p !== pkg) : [...prev, pkg]
    );
  };

  const removeTest = (test: string) => {
    setSelectedTests(prev => prev.filter(t => t !== test));
  };

  const isEdit = mode === 'edit';

  const selectedPatientData = initialMockPatients.find(p => p.id === selectedPatientId);
  const isPatientUnverified = selectedPatientData?.identityVerification === 'Unverified';

  const handlePatientSelect = (p: Patient) => {
    setPatientSearch(p.name);
    setSelectedPatientId(p.id);
    setShowPatientDropdown(false);

    if (p.identityVerification === 'Unverified') {
      setShowVerificationBlock(true);
    } else if (p.consentStatus !== 'Linked') {
      setShowLinkingWarning(true);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPatientUnverified) {
      return;
    }
    
    let message = `Lab Order ${isEdit ? 'updated' : 'created'} successfully!\n\n`;
    
    if (isConfidential) {
      message += `🔒 Confidential: Results will be visible ONLY to the assigned doctor and patient (or just the patient if unassigned).\n`;
    } else {
      message += `🔓 Standard Visibility applied.\n`;
    }
    
    if (isEmailConsent) {
      message += `📧 Email Consent: Results will be automatically sent to the patient's email when ready.\n`;
    } else {
      message += `🚫 No Email: Results will NOT be sent by email.\n`;
    }

    setShowSuccessModal(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Lab Order' : 'Create Lab Order'} width="800px">
      <form className="lab-order-form" onSubmit={handleSubmit}>
        
        {/* Patient Selection */}
        <div className="form-section" style={{ position: 'relative' }}>
          <div className="section-header-flex">
            <h3 className="section-title">Patient</h3>
            {!isEdit && (
              <button type="button" className="text-btn" onClick={onRegisterPatient}>
                + Register New Patient
              </button>
            )}
          </div>
          
          <div className="patient-selector">
            <div className={`patient-input ${showPatientDropdown ? 'active' : ''}`} onClick={() => !isEdit && setShowPatientDropdown(!showPatientDropdown)}>
              {isEdit ? (
                <span>{initialData?.patientName}</span>
              ) : (
                <div className="search-wrapper w-full">
                  <Search size={16} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by name, MRN, ID..." 
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={() => setShowPatientDropdown(true)}
                  />
                </div>
              )}
            </div>
            
            {showPatientDropdown && !isEdit && (
              <div className="patient-dropdown" style={{ zIndex: 50 }}>
                {initialMockPatients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.id.toLowerCase().includes(patientSearch.toLowerCase())).map((p, i) => (
                  <div key={i} className="patient-option" onClick={() => handlePatientSelect(p)}>
                    <div className="patient-option-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {p.name}
                      {p.identityVerification === 'Unverified' && (
                        <span style={{ fontSize: '11px', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>Unverified</span>
                      )}
                    </div>
                    <div className="patient-option-id text-muted text-xs">{p.id} • ID: {p.idNumber}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedPatientData && (
            <div className="patient-status-card" style={{ marginTop: '12px', padding: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
              <div style={{ color: '#64748b' }}>Patient: <span style={{ color: '#0f172a', fontWeight: 500 }}>{selectedPatientData.name}</span></div>
              <div style={{ color: '#64748b' }}>MRN: <span style={{ color: '#0f172a', fontWeight: 500 }}>{selectedPatientData.id}</span></div>
              <div style={{ color: '#64748b' }}>Date of birth: <span style={{ color: '#0f172a', fontWeight: 500 }}>{selectedPatientData.dob}</span></div>
              <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>Identity: 
                {selectedPatientData.identityVerification === 'Verified' ? (
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>Verified</span>
                ) : (
                  <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>Not Verified</span>
                )}
              </div>
              <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>Mobile Account: 
                {selectedPatientData.consentStatus === 'Linked' ? (
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>Linked</span>
                ) : selectedPatientData.consentStatus === 'Pending Consent' || selectedPatientData.consentDetail === 'Invitation sent' ? (
                  <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>Pending Consent</span>
                ) : (
                  <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>Not Linked</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Test Packages */}
        <div className={`form-section ${isPatientUnverified ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="section-title-with-badge">
            <h3 className="section-title">Test Packages</h3>
            {selectedPackages.length > 0 && <span className="counter-badge">{selectedPackages.length}</span>}
          </div>
          
          <div className="packages-grid">
            {clinicPackages.map((pkg, i) => (
              <label key={i} className={`package-card ${selectedPackages.includes(pkg.name) ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={selectedPackages.includes(pkg.name)}
                  onChange={() => handlePackageToggle(pkg.name)}
                  className="hidden-checkbox"
                  disabled={isPatientUnverified}
                />
                <div className="package-card-content">
                  <span className="package-name">{pkg.name}</span>
                  {selectedPackages.includes(pkg.name) && <CheckSquare size={16} className="text-primary" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Individual Tests */}
        <div className={`form-section ${isPatientUnverified ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="section-title-with-badge">
            <h3 className="section-title">Individual Tests by Category</h3>
          </div>
          
          <div className="categories-accordion">
            {testCategories.map((category, i) => {
              const isExpanded = expandedCategories[category.name];
              const selectedCount = category.tests.filter(t => selectedTests.includes(t)).length;
              
              return (
                <div key={i} className="category-item">
                  <div className="category-header" onClick={() => !isPatientUnverified && toggleCategory(category.name)}>
                    <span className="category-name">{category.name}</span>
                    <div className="category-header-right">
                      {selectedCount > 0 && <span className="counter-badge">{selectedCount}/{category.tests.length}</span>}
                      {isExpanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="category-body">
                      <div className="tests-grid">
                        {category.tests.map((test, j) => (
                          <label key={j} className={`test-checkbox-label ${selectedTests.includes(test) ? 'selected' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={selectedTests.includes(test)}
                              onChange={() => handleTestToggle(test)}
                              disabled={isPatientUnverified}
                            />
                            <span>{test}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Tests Summary */}
        <div className={`form-section ${isPatientUnverified ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="section-title-with-badge">
            <h3 className="section-title">Selected Tests</h3>
            <span className="counter-badge outline">{selectedTests.length}</span>
          </div>
          
          <div className="selected-tests-container">
            {selectedTests.length === 0 ? (
              <span className="text-muted text-sm">No individual tests selected</span>
            ) : (
              selectedTests.map((test, i) => (
                <div key={i} className="selected-tag">
                  {test}
                  <button type="button" onClick={() => removeTest(test)} className="remove-tag-btn" disabled={isPatientUnverified}>
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className={`form-row-2 ${isPatientUnverified ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="form-group">
            <label>Assigned Doctor</label>
            <div className="select-wrapper">
              <select defaultValue={initialData?.assignedTo || ""} disabled={isPatientUnverified}>
                <option value="">Unassigned</option>
                <option>Dr. Narong Phanich</option>
                <option>Dr. Preecha Suthiwong</option>
                <option>Dr. Apinya Chamroenuk</option>
                <option>Dr. Michel Kikuzaki</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Priority <span className="required">*</span></label>
            <div className="select-wrapper">
              <select defaultValue={initialData?.priority || "Routine"} disabled={isPatientUnverified}>
                <option>Routine</option>
                <option>Urgent</option>
                <option>STAT</option>
              </select>
              <ChevronDown size={16} className="select-icon" />
            </div>
          </div>
        </div>

        <div className={`form-group ${isPatientUnverified ? 'opacity-50 pointer-events-none' : ''}`}>
          <label>Clinical Notes</label>
          <textarea rows={3} placeholder="Add any relevant clinical information, instructions for the lab, etc." disabled={isPatientUnverified}></textarea>
        </div>

        {/* Flags */}
        <div className={`form-section mt-2 flags-grid ${isPatientUnverified ? 'opacity-50 pointer-events-none' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <label className="flag-checkbox confidential-flag" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              style={{ marginTop: '4px' }} 
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              disabled={isPatientUnverified}
            />
            <div className="flag-content">
              <span className="flag-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                <Lock size={16} /> Confidential Test
              </span>
              <span className="flag-desc" style={{ fontSize: '12px', color: '#6b7280', display: 'block', lineHeight: 1.4 }}>Result visible only to the assigned doctor and patient. If Unassigned Doctor, only the patient.</span>
            </div>
          </label>
          
          <label className="flag-checkbox email-flag" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              style={{ marginTop: '4px' }} 
              checked={isEmailConsent}
              onChange={(e) => setIsEmailConsent(e.target.checked)}
              disabled={isPatientUnverified}
            />
            <div className="flag-content">
              <span className="flag-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                <Mail size={16} /> Patient consents to result/report by email
              </span>
              <span className="flag-desc" style={{ fontSize: '12px', color: '#6b7280', display: 'block', lineHeight: 1.4 }}>If unchecked, results will not be sent by email.</span>
            </div>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="modal-actions sticky-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <div className="actions-right">
            <button type="button" className="btn-secondary" disabled={isPatientUnverified}>
              {isEdit ? 'Update & Print' : 'Create & Print'}
            </button>
            <button type="submit" className="btn-primary" disabled={isPatientUnverified}>
              {isEdit ? 'Update Order' : 'Create Order'}
            </button>
          </div>
        </div>
      </form>

      {/* Blocking Modal for Unverified Patient */}
      {showVerificationBlock && selectedPatientData && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, borderRadius: '12px' }}>
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', maxWidth: '400px', width: '100%', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: '#dc2626' }}>
              <AlertCircle size={48} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', textAlign: 'center', marginBottom: '12px' }}>Patient Verification Required</h3>
            <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '24px', lineHeight: 1.6 }}>
              This patient has not yet been identity verified. Please complete the identity verification on the Patient Details page before creating a lab order.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                type="button"
                className="btn-primary"
                style={{ width: '100%', padding: '10px', justifyContent: 'center', fontSize: '14px' }}
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent('request-tab-change', { detail: 'Patients' }));
                  setTimeout(() => window.dispatchEvent(new CustomEvent('navigate-to-patient', { detail: selectedPatientData.id })), 100);
                }}
              >
                Go to Verify Identity
              </button>
              <button 
                type="button"
                className="btn-cancel"
                style={{ width: '100%', padding: '10px', justifyContent: 'center', fontSize: '14px', backgroundColor: 'transparent', border: 'none' }}
                onClick={() => {
                  setShowVerificationBlock(false);
                  setPatientSearch('');
                  setSelectedPatientId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Modal for Verified but Not Linked */}
      {showLinkingWarning && selectedPatientData && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, borderRadius: '12px' }}>
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', maxWidth: '440px', width: '100%', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: '#f59e0b' }}>
              <AlertCircle size={48} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', textAlign: 'center', marginBottom: '12px' }}>Patient Mobile Account Not Linked</h3>
            <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginBottom: '16px', lineHeight: 1.6 }}>
              This patient has not yet provided consent to link their mobile account with this clinic.
            </p>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px', fontSize: '13px', color: '#92400e', marginBottom: '24px', borderLeft: '3px solid #f59e0b' }}>
              <strong>Note:</strong> The patient may not be able to view the approved lab results in the Mobile App until the account is successfully linked.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                type="button"
                className="btn-primary"
                style={{ width: '100%', padding: '10px', justifyContent: 'center', fontSize: '14px' }}
                onClick={() => {
                  setShowLinkingWarning(false);
                  showToast("The linking request has been sent successfully.");
                }}
              >
                {selectedPatientData.consentDetail === 'Invitation sent' ? 'Resend Linking Request' : 'Send Linking Request'}
              </button>
              <button 
                type="button"
                className="btn-secondary"
                style={{ width: '100%', padding: '10px', justifyContent: 'center', fontSize: '14px' }}
                onClick={() => setShowLinkingWarning(false)}
              >
                Continue Without Linking
              </button>
              <button 
                type="button"
                style={{ backgroundColor: 'transparent', color: '#64748b', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', marginTop: '4px' }}
                onClick={() => {
                  setShowLinkingWarning(false);
                  setPatientSearch('');
                  setSelectedPatientId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 110, animation: 'fadeInUp 0.3s ease-out' }}>
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{toastMessage}</span>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, borderRadius: '12px' }}>
          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', maxWidth: '400px', width: '100%', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: '#10b981' }}>
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', textAlign: 'center', marginBottom: '8px' }}>Lab Order {isEdit ? 'Updated' : 'Created'} Successfully</h3>
            <p style={{ fontSize: '15px', color: '#475569', marginBottom: '4px' }}>Order ID: <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{initialData?.id || 'CLN2023-NEW-001'}</span></p>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Required specimens: <span style={{ fontWeight: 600 }}>3</span></p>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', width: '100%', marginBottom: '24px', fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Lock size={14} style={{ marginTop: '2px', color: isConfidential ? '#d97706' : '#64748b' }} />
                <span>{isConfidential ? 'Confidential: Results visible ONLY to assigned doctor and patient.' : 'Standard Visibility applied.'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Mail size={14} style={{ marginTop: '2px', color: isEmailConsent ? '#0ea5e9' : '#64748b' }} />
                <span>{isEmailConsent ? "Email Consent: Results will be sent to the patient's email." : 'No Email: Results will NOT be sent by email.'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button 
                type="button"
                className="btn-secondary"
                style={{ flex: 1, padding: '10px', justifyContent: 'center', fontSize: '14px' }}
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose();
                }}
              >
                Done
              </button>
              <button 
                type="button"
                className="btn-primary"
                style={{ flex: 1, padding: '10px', justifyContent: 'center', fontSize: '14px' }}
                onClick={() => {
                  if (onPrintLabels) onPrintLabels(initialData?.id || 'CLN2023-NEW-001');
                  setShowSuccessModal(false);
                  onClose();
                }}
              >
                Print Specimen Labels
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
