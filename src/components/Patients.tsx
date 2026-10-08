import { useState, useEffect } from 'react';
import { Search, Calendar, ChevronDown, Plus, MoreVertical, Eye, Edit2, Trash2, Send, Link } from 'lucide-react';
import PatientFormModal from './PatientFormModal';
import PatientDetail from './PatientDetail';
import EmailDemoModal from './EmailDemoModal';
import MobileAppSimulator from './MobileAppSimulator';
import './Patients.css';

export interface Patient {
  id: string;
  name: string;
  idNumber: string | null;
  gender: string;
  age: string;
  dob: string;
  contact: string;
  allergy: boolean;
  insurance: string;
  lastVisit: string;
  createdAt: string;
  consentStatus: string;
  consentDetail: string;
  identityVerification: string;
  registrationSource: string;
  documentType: string | null;
  verifiedBy: string | null;
  verifiedAt: string | null;
  verificationMethod: string | null;
  verifiedClinic: string | null;
}

export const initialMockPatients: Patient[] = [
  { id: 'MRN001', name: 'Natthawut Srisomboon', idNumber: 'ID234567890', gender: 'Male', age: '38 years', dob: '14/03/1988', contact: '082-614-7293\nnatthawut.s@gmail.com', allergy: true, insurance: 'Thai Life\nTL-385190247', lastVisit: '22/07/2026', createdAt: '2026-07-22', consentStatus: 'Linked', consentDetail: 'Linked on 30 Jul 2026', identityVerification: 'Unverified', registrationSource: 'Mobile App', documentType: null, verifiedBy: null, verifiedAt: null, verificationMethod: null, verifiedClinic: null },
  { id: 'MRN002', name: 'Sirada Wongsawan', idNumber: 'ID312890456', gender: 'Female', age: '27 years', dob: '09/11/1998', contact: '091-208-5634\nsirada.w@hotmail.com', allergy: true, insurance: 'AIA Thailand\nAIA-724058163', lastVisit: '19/07/2026', createdAt: '2026-07-19', consentStatus: 'Not Linked', consentDetail: 'Invitation sent', identityVerification: 'Verified', registrationSource: 'Clinic', documentType: 'Thai National ID', verifiedBy: 'Thao Nguyen', verifiedAt: '05 Aug 2026, 09:45', verificationMethod: 'In Person', verifiedClinic: 'Downtown Medical Center' },
  { id: 'MRN003', name: 'Pongsakorn Thanakit', idNumber: 'ID478123905', gender: 'Male', age: '52 years', dob: '25/06/1974', contact: '087-935-1846\npongsakorn.t@yahoo.com', allergy: true, insurance: 'No insurance', lastVisit: '16/07/2026', createdAt: '2026-07-16', consentStatus: 'Linked', consentDetail: 'Linked on 28 Jul 2026', identityVerification: 'Verified', registrationSource: 'Mobile App', documentType: 'Passport', verifiedBy: 'Sarah Chen', verifiedAt: '28 Jul 2026, 14:20', verificationMethod: 'In Person', verifiedClinic: 'Downtown Medical Center' },
  { id: 'MRN004', name: 'Kamolwan Prasertsri', idNumber: 'ID567234801', gender: 'Female', age: '31 years', dob: '18/02/1995', contact: '064-571-8023\nkamolwan.p@gmail.com', allergy: true, insurance: 'Bangkok Insurance\nBI-841260395', lastVisit: '14/07/2026', createdAt: '2026-07-14', consentStatus: 'Not Linked', consentDetail: 'Expired', identityVerification: 'Unverified', registrationSource: 'Bulk Upload', documentType: null, verifiedBy: null, verifiedAt: null, verificationMethod: null, verifiedClinic: null },
  { id: 'MRN005', name: 'Chaiwat Lertpanich', idNumber: 'ID623789014', gender: 'Male', age: '45 years', dob: '07/09/1980', contact: '089-347-6512\nchaiwat.l@outlook.com', allergy: true, insurance: 'No insurance', lastVisit: '10/07/2026', createdAt: '2026-07-10', consentStatus: 'Not Linked', consentDetail: 'Declined', identityVerification: 'Verified', registrationSource: 'Clinic', documentType: 'Thai National ID', verifiedBy: 'Sarah Chen', verifiedAt: '10 Jul 2026, 10:15', verificationMethod: 'In Person', verifiedClinic: 'Downtown Medical Center' },
  { id: 'MRN006', name: 'Pimchanok Ketkaew', idNumber: 'ID890345672', gender: 'Female', age: '34 years', dob: '21/12/1991', contact: '096-482-3197\npimchanok.k@gmail.com', allergy: true, insurance: 'No insurance', lastVisit: '08/07/2026', createdAt: '2026-07-08', consentStatus: 'Linked', consentDetail: 'Linked on 20 Jun 2026', identityVerification: 'Unverified', registrationSource: 'Mobile App', documentType: null, verifiedBy: null, verifiedAt: null, verificationMethod: null, verifiedClinic: null },
  { id: 'MRN007', name: 'Sompong Kittisak', idNumber: 'ID745012389', gender: 'Male', age: '58 years', dob: '03/04/1968', contact: '083-926-4175\nsompong.k@hotmail.com', allergy: true, insurance: 'AIA Thailand\nAIA-530918274', lastVisit: '01/07/2026', createdAt: '2026-07-01', consentStatus: 'Not Linked', consentDetail: 'Invitation sent', identityVerification: 'Verified', registrationSource: 'Bulk Upload', documentType: 'Thai National ID', verifiedBy: 'James Wilson', verifiedAt: '01 Jul 2026, 11:30', verificationMethod: 'In Person', verifiedClinic: 'Downtown Medical Center' },
  { id: 'MRN008', name: 'Ornuma Chansakul', idNumber: 'ID201567843', gender: 'Female', age: '49 years', dob: '28/05/1977', contact: '061-735-9084\nornuma.c@gmail.com', allergy: false, insurance: 'Thai Life\nTL-692140853', lastVisit: '28/06/2026', createdAt: '2026-06-28', consentStatus: 'Not Linked', consentDetail: 'None', identityVerification: 'Unverified', registrationSource: 'Clinic', documentType: null, verifiedBy: null, verifiedAt: null, verificationMethod: null, verifiedClinic: null },
  { id: 'MRN009', name: 'Ratchanee Boonruang', idNumber: 'ID356901278', gender: 'Female', age: '41 years', dob: '16/08/1984', contact: '088-519-6347\nratchanee.b@yahoo.com', allergy: true, insurance: 'Muang Thai\nMT-418730596', lastVisit: '24/06/2026', createdAt: '2026-06-24', consentStatus: 'Linked', consentDetail: 'Linked on 15 May 2026', identityVerification: 'Verified', registrationSource: 'Mobile App', documentType: 'Thai National ID', verifiedBy: 'Sarah Chen', verifiedAt: '15 May 2026, 09:20', verificationMethod: 'In Person', verifiedClinic: 'Downtown Medical Center' },
  { id: 'MRN010', name: 'Kittichai Maneerat', idNumber: 'ID489056731', gender: 'Male', age: '33 years', dob: '11/01/1993', contact: '093-264-8701\nkittichai.m@gmail.com', allergy: false, insurance: 'Bangkok Insurance\nBI-275843061', lastVisit: '20/06/2026', createdAt: '2026-06-20', consentStatus: 'Linked', consentDetail: 'Linked on 02 Apr 2026', identityVerification: 'Verified', registrationSource: 'Bulk Upload', documentType: 'Passport', verifiedBy: 'Sarah Chen', verifiedAt: '02 Apr 2026, 13:45', verificationMethod: 'In Person', verifiedClinic: 'Downtown Medical Center' },
];

interface PatientsProps {
  isDoctor?: boolean;
  hideTitle?: boolean;
}

export default function Patients({ isDoctor = false, hideTitle = false }: PatientsProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);
  const [patientsList, setPatientsList] = useState<Patient[]>(initialMockPatients);
  
  // Custom navigation event listener
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const patientId = customEvent.detail;
      const patient = patientsList.find(p => p.id === patientId);
      if (patient) {
        setViewingPatient(patient);
      }
    };
    
    const handleOpenRegister = () => {
      setIsRegisterOpen(true);
    };

    window.addEventListener('navigate-to-patient', handleNavigate);
    window.addEventListener('open-register-modal', handleOpenRegister);
    
    return () => {
      window.removeEventListener('navigate-to-patient', handleNavigate);
      window.removeEventListener('open-register-modal', handleOpenRegister);
    };
  }, [patientsList]);
  
  // Filter States
  const [verificationFilter, setVerificationFilter] = useState('All');
  
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Custom'>('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [appliedDateRange, setAppliedDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [demoEmail, setDemoEmail] = useState<string | null>(null);
  const [simEmail, setSimEmail] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const openRegisterModal = () => setIsRegisterOpen(true);
  
  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient);
    setActiveDropdown(null);
  };

  const openViewModal = (patient: Patient) => {
    setViewingPatient(patient);
    setActiveDropdown(null);
  };

  const handleSendEmailDemo = (patient: Patient) => {
    // Extract email from contact string (format is "Phone\nEmail")
    let email = 'patient@example.com';
    if (patient.contact && patient.contact.includes('\n')) {
      email = patient.contact.split('\n')[1];
    }
    setDemoEmail(email);
    setActiveDropdown(null);
  };

  const filteredPatients: Patient[] = patientsList.filter((patient: Patient) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = patient.name.toLowerCase().includes(q);
      const matchPhone = patient.contact.toLowerCase().includes(q);
      const matchId = (patient.idNumber || '').toLowerCase().includes(q);
      const matchMRN = patient.id.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchId && !matchMRN) return false;
    }
    
    if (verificationFilter !== 'All') {
      if (patient.identityVerification !== verificationFilter) return false;
    }

    if (dateFilter === 'Today') {
      const today = new Date();
      const patientDate = new Date(patient.createdAt);
      if (patientDate.toDateString() !== today.toDateString()) return false;
    } else if (dateFilter === 'Custom' && appliedDateRange.start && appliedDateRange.end) {
      const start = new Date(appliedDateRange.start);
      // Set end date to end of day to include all times on that day
      const end = new Date(appliedDateRange.end);
      end.setHours(23, 59, 59, 999);
      const patientDate = new Date(patient.createdAt);
      if (patientDate < start || patientDate > end) return false;
    }

    return true;
  });

  if (viewingPatient) {
    return (
      <PatientDetail 
        patient={viewingPatient}
        onBack={() => setViewingPatient(null)}
        onEdit={() => {
          setEditingPatient(viewingPatient);
          setViewingPatient(null);
        }}
      />
    );
  }

  return (
    <div className="patients-container" style={hideTitle ? { gap: 0 } : {}}>
      {!hideTitle && (
        <div className="patients-header">
          <h1 className="page-title mb-0">Patients</h1>
          {!isDoctor && (
            <button className="btn-primary" onClick={openRegisterModal}>
              <Plus size={16} />
              Register New Patient
            </button>
          )}
        </div>
      )}

      <div className="patients-card" style={hideTitle ? { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' } : {}}>
        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search by name, phone, or ID number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filters-right">
            <div className="filter-dropdown-container">
              <span className="filter-label">Verification:</span>
              <button 
                className="dropdown-trigger"
                onClick={() => {
                  setActiveFilterDropdown(activeFilterDropdown === 'verification' ? null : 'verification');
                  setActiveDropdown(null);
                }}
              >
                {verificationFilter} <ChevronDown size={14} />
              </button>
              {activeFilterDropdown === 'verification' && (
                <div className="filter-dropdown-menu" style={{ right: 0, left: 'auto', minWidth: '150px' }}>
                  {['All', 'Verified', 'Unverified'].map(status => (
                    <button 
                      key={status} 
                      className={`dropdown-item ${verificationFilter === status ? 'active' : ''}`}
                      onClick={() => { setVerificationFilter(status); setActiveFilterDropdown(null); }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="date-segmented-control" style={{ marginRight: '8px' }}>
              <button 
                type="button"
                className={dateFilter === 'All' ? 'active' : ''} 
                onClick={() => { setDateFilter('All'); setAppliedDateRange({ start: '', end: '' }); }}
              >
                All
              </button>
              <button 
                type="button"
                className={dateFilter === 'Today' ? 'active' : ''} 
                onClick={() => { setDateFilter('Today'); setAppliedDateRange({ start: '', end: '' }); }}
              >
                Today
              </button>
            </div>

            <div className="filter-dropdown-container date-filter-container">
              <button 
                className={`dropdown-trigger ${dateFilter === 'Custom' ? 'active' : ''}`}  
                style={{ minWidth: '160px', justifyContent: 'space-between' }}
                onClick={() => {
                  setActiveFilterDropdown(activeFilterDropdown === 'date' ? null : 'date');
                  setActiveDropdown(null);
                }}
              >
                <span className="text-muted">
                  {appliedDateRange.start && appliedDateRange.end ? `${appliedDateRange.start} ~ ${appliedDateRange.end}` : 'Date range'}
                </span>
                <Calendar size={14} className="text-muted" />
              </button>
              {activeFilterDropdown === 'date' && (
                <div className="filter-dropdown-menu date-range-menu">
                  <div className="date-range-header">
                    <span className="font-medium text-sm">Select Date Range</span>
                  </div>
                  <div className="date-range-body">
                    <div className="date-input-group">
                      <label>Start Date</label>
                      <input 
                        type="date" 
                        className="date-input" 
                        value={dateRange.start} 
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} 
                      />
                    </div>
                    <div className="date-input-separator">to</div>
                    <div className="date-input-group">
                      <label>End Date</label>
                      <input 
                        type="date" 
                        className="date-input" 
                        value={dateRange.end} 
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="date-range-footer">
                    <button 
                      className="btn-secondary btn-sm" 
                      onClick={() => {
                        setDateRange({ start: '', end: '' });
                        setAppliedDateRange({ start: '', end: '' });
                        setDateFilter('All');
                        setActiveFilterDropdown(null);
                      }}
                    >
                      Clear
                    </button>
                    <button 
                      className="btn-primary btn-sm" 
                      onClick={() => {
                        setAppliedDateRange(dateRange);
                        setDateFilter('Custom');
                        setActiveFilterDropdown(null);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button className="btn-reset" onClick={() => {
              setVerificationFilter('All');
              setDateFilter('All');
              setDateRange({ start: '', end: '' });
              setAppliedDateRange({ start: '', end: '' });
              setSearchQuery('');
            }}>Reset</button>
          </div>
        </div>

        <div className="table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>MRN</th>
                <th>Patient</th>
                <th>ID / Passport</th>
                <th>Gender</th>
                <th>Age / DOB</th>
                <th>Contact</th>
                <th>Allergy</th>
                {!isDoctor && <th>Insurance</th>}
                <th>Last Visit</th>
                {!isDoctor && <th>Consent</th>}
                {!isDoctor && <th>Identity Verification</th>}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} onClick={() => openViewModal(patient)} style={{ cursor: 'pointer' }} className="patient-row-clickable">
                  <td className="text-muted">{patient.id}</td>
                  <td className="font-medium">{patient.name}</td>
                  <td className="text-muted">{patient.idNumber}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <div>{patient.age}</div>
                    <div className="text-muted text-xs">{patient.dob}</div>
                  </td>
                  <td>
                    <div>{patient.contact.split('\n')[0]}</div>
                    <div className="text-muted text-xs">{patient.contact.split('\n')[1]}</div>
                  </td>
                  <td>
                    {patient.allergy ? (
                      <span className="badge-danger">Yes</span>
                    ) : (
                      <span className="badge-secondary">No</span>
                    )}
                  </td>
                  {!isDoctor && (
                    <td>
                      <div>{patient.insurance.split('\n')[0]}</div>
                      <div className="text-muted text-xs">{patient.insurance.split('\n')[1] || ''}</div>
                    </td>
                  )}
                  <td>{patient.lastVisit}</td>
                  {!isDoctor && (
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {patient.consentStatus === 'Linked' ? (
                          <span className="badge-success w-fit">{patient.consentStatus}</span>
                        ) : (
                          <span className="badge-secondary w-fit">{patient.consentStatus}</span>
                        )}
                        <span className="text-muted text-xs">{patient.consentDetail}</span>
                      </div>
                    </td>
                  )}
                  {!isDoctor && (
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {patient.identityVerification === 'Verified' ? (
                          <span className="badge-success w-fit">Verified</span>
                        ) : (
                          <span className="badge-secondary w-fit" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>Unverified</span>
                        )}
                      </div>
                    </td>
                  )}
                  <td className="action-cell" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="icon-btn-small" 
                      onClick={() => toggleDropdown(patient.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === patient.id && (
                      <div className="action-dropdown">
                        {!isDoctor && patient.consentStatus !== 'Linked' && (
                          <button className="dropdown-item" onClick={() => handleSendEmailDemo(patient)}>
                            <Send size={14} /> {patient.consentDetail === 'Invitation sent' || patient.consentDetail === 'Declined' ? 'Resend Invitation' : 'Send Invitation'}
                          </button>
                        )}
                        {!isDoctor && patient.consentStatus === 'Linked' && (
                          <button className="dropdown-item" onClick={() => handleSendEmailDemo(patient)}>
                            <Link size={14} /> Resend Link
                          </button>
                        )}
                        <button className="dropdown-item" onClick={() => openViewModal(patient)}>
                          <Eye size={14} /> {patient.consentStatus === 'Linked' ? 'View Patient' : 'View detail'}
                        </button>
                        {!isDoctor && (
                          <>
                            <button className="dropdown-item" onClick={() => openEditModal(patient)}>
                              <Edit2 size={14} /> Edit patient
                            </button>
                            <button className="dropdown-item text-danger">
                              <Trash2 size={14} /> Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span className="text-muted text-sm">0 of 10 row(s) selected.</span>
          
          <div className="pagination-controls">
            <div className="rows-per-page">
              <span className="text-sm font-medium">Rows per page</span>
              <button className="dropdown-trigger">
                10 <ChevronDown size={14} />
              </button>
            </div>
            
            <span className="text-sm font-medium">Page 1 of 2</span>
            
            <div className="page-nav">
              <button className="page-btn disabled">&laquo;</button>
              <button className="page-btn disabled">&lsaquo;</button>
              <button className="page-btn">&rsaquo;</button>
              <button className="page-btn">&raquo;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PatientFormModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        mode="create" 
        onSubmitSuccess={(email, isVerified, newPatientData) => {
          setDemoEmail(email);
          const newPatient: Patient = {
            id: `MRN0${patientsList.length + 1}`,
            name: newPatientData?.firstName ? `${newPatientData.firstName} ${newPatientData.lastName}` : 'New Patient',
            idNumber: newPatientData?.nationalId || 'ID123456789',
            gender: newPatientData?.gender || 'Unknown',
            age: 'N/A',
            dob: newPatientData?.dob || 'Unknown',
            contact: `${newPatientData?.phone || '000-000-0000'}\n${email}`,
            allergy: false,
            insurance: 'No insurance',
            lastVisit: 'N/A',
            createdAt: new Date().toISOString().split('T')[0],
            consentStatus: 'Not Linked',
            consentDetail: 'None',
            identityVerification: isVerified ? 'Verified' : 'Unverified',
            registrationSource: 'Clinic',
            documentType: isVerified ? 'Thai National ID' : null,
            verifiedBy: isVerified ? 'Receptionist' : null,
            verifiedAt: isVerified ? new Date().toLocaleString() : null,
            verificationMethod: isVerified ? 'In Person' : null,
            verifiedClinic: isVerified ? 'Downtown Medical Center' : null
          };
          setPatientsList([newPatient, ...patientsList]);
        }}
      />
      
      <PatientFormModal 
        isOpen={!!editingPatient} 
        onClose={() => setEditingPatient(null)} 
        mode="edit"
        initialData={editingPatient}
      />
      

      {demoEmail && (
        <EmailDemoModal 
          email={demoEmail} 
          onClose={() => setDemoEmail(null)} 
          onAccept={() => {
            setSimEmail(demoEmail);
            setDemoEmail(null);
          }}
        />
      )}

      {simEmail && (
        <MobileAppSimulator 
          email={simEmail} 
          onClose={() => setSimEmail(null)} 
        />
      )}
    </div>
  );
}
