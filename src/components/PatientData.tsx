import { useState } from 'react';
import PatientBulkUpload from './PatientBulkUpload';
import Patients from './Patients';
import './PatientData.css';

export default function PatientData() {
  const [activeTab, setActiveTab] = useState('Patient List');
  
  return (
    <div className="patient-data-wrapper">
      <div className="pd-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="pd-title">Patients</h1>
          <p className="pd-subtitle">Manage patient records, upload new patients, and keep your database up to date.</p>
        </div>
        <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-register-modal'))}>
          <span style={{ marginRight: '8px' }}>+</span> Register New Patient
        </button>
      </div>

      <div className="pd-tabs-new">
        <button 
          className={`pd-tab-new ${activeTab === 'Patient List' ? 'active' : ''}`}
          onClick={() => setActiveTab('Patient List')}
        >
          Patient List
        </button>
        <button 
          className={`pd-tab-new ${activeTab === 'Bulk Upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('Bulk Upload')}
        >
          Bulk Upload
        </button>
      </div>

      <div className="pd-tab-content">
        {activeTab === 'Patient List' && (
          <div className="fadeIn">
            <Patients hideTitle={true} />
          </div>
        )}
        
        {activeTab === 'Bulk Upload' && (
          <div className="pd-card fadeIn">
            <PatientBulkUpload />
          </div>
        )}
      </div>
    </div>
  );
}
