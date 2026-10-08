import { useState } from 'react';
import { Edit2, AlertTriangle, ArrowLeft, Phone, Mail, MapPin, Shield, PhoneCall, Link2, Lock, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Printer, Download, Search, Calendar, User } from 'lucide-react';
import LabResultReviewModal from './LabResultReviewModal';
import LabOrderDetail from './LabOrderDetail';
import VerifyIdentityModal from './VerifyIdentityModal';
import './PatientDetail.css';

interface PatientDetailProps {
  patient: any;
  onEdit: () => void;
  onBack: () => void;
  currentRole?: string;
}

// --- Mock Data for Labs ---
// const mockLabResults = [
//   { id: 'RES001', testName: 'Complete Blood Count (CBC)', date: '15/07/2026', status: 'Approved', isAbnormal: false },
//   { id: 'RES002', testName: 'Lipid Panel', date: '10/07/2026', status: 'Approved', isAbnormal: true },
//   { id: 'RES003', testName: 'Liver Function Test', date: '08/07/2026', status: 'Pending Doctor Review', isAbnormal: false },
// ];

const mockLabOrders = [
  { id: 'ORD-20260718-01', tests: 'Thyroid Panel', date: '18/07/2026', status: 'Pending Collection' },
  { id: 'ORD-20260710-03', tests: 'Lipid Panel, CBC', date: '10/07/2026', status: 'Completed' },
];

export default function PatientDetail({ patient, onEdit, onBack, currentRole }: PatientDetailProps) {
  const [selectedResultToReview, setSelectedResultToReview] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('information');
  const [openAccordions, setOpenAccordions] = useState<string[]>(['general_health']);
  const [viewingLabOrder, setViewingLabOrder] = useState<any>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [localPatient, setLocalPatient] = useState(patient);

  const toggleAccordion = (section: string) => {
    setOpenAccordions(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  if (!localPatient) return null;

  const handleOpenVerifyModal = () => {
    // Check if 5 fields are present
    const hasNationalId = localPatient.nationalId || localPatient.idNumber;
    const hasName = (localPatient.firstName && localPatient.lastName) || (localPatient.name && localPatient.name.trim().includes(' '));
    const hasDob = localPatient.dob;
    const hasGender = localPatient.gender;

    if (!hasNationalId || !hasName || !hasDob || !hasGender) {
      alert("Missing required identity information. Please edit the patient profile to complete National ID, First/Last Name, Date of Birth, and Gender before verifying.");
      return;
    }
    setIsVerifyModalOpen(true);
  };

  const handleVerify = (verificationDetails: any) => {
    setIsVerifying(true);
    setTimeout(() => {
      setLocalPatient({
        ...localPatient,
        identityVerification: 'Verified',
        ...verificationDetails
      });
      setIsVerifying(false);
      setIsVerifyModalOpen(false);
    }, 1500);
  };

  if (viewingLabOrder) {
    return (
      <LabOrderDetail 
        order={viewingLabOrder} 

        onBack={() => setViewingLabOrder(null)} 
        onEdit={() => {}}
        onPrint={() => {}}
      />
    );
  }

  const initials = patient.name.split(' ').map((n: string) => n[0]).join('');

  const renderValue = (val: string | undefined | null) => {
    if (!val || val.trim() === '') return <span className="text-muted">Not provided</span>;
    return val;
  };

  return (
    <div className="patient-detail-page">
      <div className="patient-detail-header-bar">
        <button className="btn-back-page" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Patient detail</span>
        </button>
        <div className="header-actions">
          <button className="btn-secondary-outline" onClick={onEdit} disabled={currentRole === 'Technician'}>
            <Edit2 size={14} /> Edit patient
          </button>
          <button className="btn-secondary-outline">
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      <div className="patient-detail-grid">
        {/* LEFT COLUMN: Sidebar Profile */}
        <div className="patient-sidebar-card">
          <div className="patient-profile-header">
            <div className="profile-avatar large">{initials}</div>
            <div className="profile-info">
              <h3 className="profile-name">{patient.name}</h3>
              <span className="profile-meta">{patient.idNumber} • {patient.age} • {patient.gender}</span>
            </div>
            {localPatient.allergy && (
              <span className="alert-tag-red">
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Has Allergies
              </span>
            )}
            {localPatient.registrationSource === 'Mobile App' && (
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontSize: '13px', fontWeight: 600 }}>
                <Lock size={12} />
                <span>Synced with Mobile App</span>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Identity Verification</h4>
            {localPatient.identityVerification === 'Unverified' ? (
              <div className="sidebar-item">
                <ShieldAlert size={16} className="sidebar-icon" style={{ color: '#d97706' }} />
                <div className="sidebar-item-content">
                  <span className="sidebar-item-label" style={{ color: '#d97706', fontWeight: 600 }}>Unverified</span>
                  <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>Source: {localPatient.registrationSource}</span>
                </div>
              </div>
            ) : (
              <div className="sidebar-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <CheckCircle2 size={16} className="sidebar-icon" style={{ color: '#16a34a', marginTop: '2px' }} />
                  <div className="sidebar-item-content">
                    <span className="sidebar-item-label" style={{ color: '#16a34a', fontWeight: 600 }}>Verified</span>
                    <div className="text-muted" style={{ fontSize: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>Verified by: {localPatient.verifiedBy}</span>
                      <span>Verified at: {localPatient.verifiedAt}</span>
                      <span>Clinic: {localPatient.verifiedClinic}</span>
                      <span>Doc Type: {localPatient.documentType}</span>
                      <span>Method: {localPatient.verificationMethod}</span>
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '16px', padding: '8px', fontSize: '13px' }}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('request-tab-change', { detail: 'Lab Orders' }));
                    setTimeout(() => window.dispatchEvent(new CustomEvent('navigate-to-create-lab-order', { detail: localPatient.id })), 100);
                  }}
                >
                  Create Lab Order
                </button>
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Contact Information <Lock size={12} className="text-muted" />
            </h4>
            <div className="sidebar-item">
              <Phone size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Mobile</span>
                <span className="sidebar-item-value">{renderValue(patient.contact?.split('\n')[0])}</span>
              </div>
            </div>
            <div className="sidebar-item">
              <Mail size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Email</span>
                <span className="sidebar-item-value">{renderValue(patient.contact?.split('\n')[1])}</span>
              </div>
            </div>
            <div className="sidebar-item">
              <MapPin size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Address</span>
                <span className="sidebar-item-value">123 Main St, City, State 12345</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Emergency Contact</h4>
            <div className="sidebar-item">
              <PhoneCall size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Michael Johnson</span>
                <span className="sidebar-item-value">+66 89-123-4567</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Insurance</h4>
            <div className="sidebar-item">
              <Shield size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">{renderValue(patient.insurance?.split('\n')[0])}</span>
                <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>Policy: {renderValue(patient.insurance?.split('\n')[1]) || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-title">Consent History</h4>
            <div className="sidebar-item">
              <Link2 size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Downtown Clinic</span>
                <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>10/05/2026 14:30</span>
              </div>
            </div>
            <div className="sidebar-item">
              <Link2 size={16} className="sidebar-icon" />
              <div className="sidebar-item-content">
                <span className="sidebar-item-label">Downtown Clinic</span>
                <span className="sidebar-item-value text-muted" style={{ fontSize: '13px' }}>15/04/2026 09:15</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Main Content */}
        <div className="patient-main-content">
          <div className="patient-tabs">
            <button 
              className={`patient-tab-btn ${activeTab === 'information' ? 'active' : ''}`}
              onClick={() => setActiveTab('information')}
            >
              Information
            </button>
            <button 
              className={`patient-tab-btn ${activeTab === 'history_log' ? 'active' : ''}`}
              onClick={() => setActiveTab('history_log')}
            >
              History Log
            </button>
          </div>

          <div className="tab-panel">
            {activeTab === 'information' && (
              <div className="info-tab-content">
                {currentRole !== 'Technician' && localPatient.identityVerification === 'Unverified' ? (
                  <div className="identity-verification-banner">
                    <div className="ivb-content">
                      <AlertTriangle size={20} className="ivb-icon-warning" />
                      <div>
                        <h4 className="ivb-title">Identity verification required</h4>
                        <p className="ivb-desc">This patient has not been verified at the clinic. Please review the patient's original National ID or Passport.</p>
                      </div>
                    </div>
                    <button className="btn-primary btn-sm" onClick={handleOpenVerifyModal}>
                      Verify Identity
                    </button>
                  </div>
                ) : (
                  <div className="identity-verification-success">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h4 className="ivb-title-success">Identity Verification</h4>
                      <p className="ivb-desc-success">Verified by <strong>{localPatient.verifiedBy}</strong> at <strong>{localPatient.verifiedAt}</strong></p>
                    </div>
                    <span className="badge-verified">Verified</span>
                  </div>
                )}

                <div className="medical-history-section mt-6">
                  <h3 className="section-title mb-4">Medical History</h3>
                  <div className="mh-accordion-container">
                    
                    {/* General Health Accordion */}
                    <div className="mh-accordion">
                      <button className="mh-accordion-header" onClick={() => toggleAccordion('general_health')}>
                        <span>General Health</span>
                        {openAccordions.includes('general_health') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openAccordions.includes('general_health') && (
                        <div className="mh-accordion-content">
                          <p className="mh-accordion-desc">Blood Type, Height, Weight, BMI data.</p>
                          <div className="mh-accordion-grid">
                            <div className="mh-detail-col">
                              <span className="mh-detail-label">Blood Type</span>
                              <span className="mh-detail-value">—</span>
                            </div>
                            <div className="mh-detail-col">
                              <span className="mh-detail-label">Weight</span>
                              <span className="mh-detail-value">70 kg</span>
                            </div>
                            <div className="mh-detail-col">
                              <span className="mh-detail-label">Height</span>
                              <span className="mh-detail-value">175 cm</span>
                            </div>
                            <div className="mh-detail-col">
                              <span className="mh-detail-label">BMI</span>
                              <span className="mh-detail-value">22.9</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Lifestyle Accordion */}
                    <div className="mh-accordion">
                      <button className="mh-accordion-header" onClick={() => toggleAccordion('lifestyle')}>
                        <span>Lifestyle</span>
                        {openAccordions.includes('lifestyle') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openAccordions.includes('lifestyle') && (
                        <div className="mh-accordion-content">
                          <p className="mh-accordion-desc">Habits, nutrition, activity, sleep and stress.</p>
                        </div>
                      )}
                    </div>

                    {/* Conditions Accordion */}
                    <div className="mh-accordion">
                      <button className="mh-accordion-header" onClick={() => toggleAccordion('conditions')}>
                        <span>Conditions</span>
                        {openAccordions.includes('conditions') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openAccordions.includes('conditions') && (
                        <div className="mh-accordion-content">
                          <p className="mh-accordion-desc">Cardiovascular, Metabolic, Endocrine and others.</p>
                        </div>
                      )}
                    </div>

                    {/* Allergies Accordion */}
                    <div className="mh-accordion">
                      <button className="mh-accordion-header" onClick={() => toggleAccordion('allergies')}>
                        <span>Allergies</span>
                        {openAccordions.includes('allergies') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openAccordions.includes('allergies') && (
                        <div className="mh-accordion-content">
                          <p className="mh-accordion-desc">Medication, Food, Environmental allergens.</p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                <div className="lab-orders-section mt-6">
                  <h3 className="section-title mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Lab Orders <span className="count-badge-small">{mockLabOrders.length}</span>
                  </h3>
                  
                  {mockLabOrders.length === 0 ? (
                    <div className="empty-state-box">
                      <p className="text-muted m-0">No lab orders available</p>
                    </div>
                  ) : (
                    <div className="table-container rounded-table">
                      <table className="data-table pd-table">
                        <thead>
                          <tr>
                            <th>Lab Order ID</th>
                            <th>Tests / Package</th>
                            <th>Date</th>
                            <th>Current Status</th>
                            <th style={{ width: '80px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockLabOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="font-medium text-sm">{order.id}</td>
                              <td className="text-sm">
                                <div className="tests-chips-list">
                                  {order.tests.split(',').map(t => (
                                    <span key={t} className="test-chip-pd">{t.trim()}</span>
                                  ))}
                                  {order.tests.includes('CBC') && <span className="test-chip-pd more">+12</span>}
                                </div>
                              </td>
                              <td className="text-sm text-muted">{order.date}</td>
                              <td>
                                <span className={`pd-status-pill ${order.status === 'Completed' ? 'status-completed' : 'status-pending'}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <div className="action-buttons-row">
                                  <button className="btn-icon-only text-muted" title="Download">
                                    <Download size={16} />
                                  </button>
                                  <button className="btn-icon-only text-muted" title="Print" onClick={() => setViewingLabOrder(order)}>
                                    <Printer size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history_log' && (
              <div className="history-tab">
                <div className="history-filters" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <div className="search-filter history-search" style={{ flex: 1 }}>
                    <Search size={16} className="text-muted" />
                    <input type="text" placeholder="Search patients, appointments, labs..." />
                  </div>
                  <div className="filter-dropdown date-filter">
                    <button className="dropdown-trigger" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: 'white', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="text-muted" style={{ fontSize: '14px' }}>Date range</span>
                      <Calendar size={14} className="text-muted" />
                    </button>
                  </div>
                </div>
                <div className="history-content">
                  <div className="timeline-pd">
                    <div className="timeline-item-pd">
                      <div className="timeline-icon-pd edit-bg">
                        <Edit2 size={14} />
                      </div>
                      <div className="timeline-content-pd">
                        <div className="timeline-main-pd">
                          <span className="timeline-title-pd">Edit Patient</span>
                          <span className="timeline-desc-pd">Edited by: Sarah Chen (Receptionist) • 10 Aug 2026, 09:41</span>
                        </div>
                        <div className="timeline-changes-pd">
                          <span className="change-item">Phone Number : +66 89-123-4567 → +66 82-555-9005</span>
                        </div>
                      </div>
                    </div>

                    <div className="timeline-item-pd mt-6">
                      <div className="timeline-icon-pd add-bg">
                        <User size={14} />
                      </div>
                      <div className="timeline-content-pd">
                        <div className="timeline-main-pd">
                          <span className="timeline-title-pd">Patient Created</span>
                          <span className="timeline-desc-pd">10 Aug 2026, 09:41</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedResultToReview && (
        <LabResultReviewModal 
          result={selectedResultToReview}
          onClose={() => setSelectedResultToReview(null)}
        />
      )}
      
      {isVerifyModalOpen && (
        <VerifyIdentityModal 
          patient={localPatient}
          onClose={() => setIsVerifyModalOpen(false)}
          onVerify={handleVerify}
          isLoading={isVerifying}
        />
      )}
    </div>
  );
}
