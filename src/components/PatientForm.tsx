import React, { useState } from 'react';
import { Calendar, ChevronDown, Lock } from 'lucide-react';
import VerifyIdentityModal from './VerifyIdentityModal';
import './PatientFormModal.css';

interface PatientFormProps {
  mode: 'create' | 'edit';
  initialData?: any;
  onSubmitSuccess?: (email: string, isVerified?: boolean, newPatientData?: any) => void;
  onCancel: () => void;
}

export default function PatientForm({ mode, initialData, onSubmitSuccess, onCancel }: PatientFormProps) {
  const isEdit = mode === 'edit';

  let parsedInitialData = { ...initialData };
  if (isEdit && initialData && initialData.name) {
    const nameParts = initialData.name.split(' ');
    parsedInitialData.firstName = nameParts[0] || '';
    parsedInitialData.lastName = nameParts.slice(1).join(' ') || '';
    parsedInitialData.nationalId = initialData.idNumber || '';
    
    if (initialData.contact) {
      const contactParts = initialData.contact.split('\n');
      parsedInitialData.phone = contactParts[0] || '';
      parsedInitialData.email = contactParts[1] || '';
    }

    if (initialData.insurance && initialData.insurance !== 'No insurance') {
      const insParts = initialData.insurance.split('\n');
      parsedInitialData.insuranceProvider = insParts[0] || '';
      parsedInitialData.policyNumber = insParts[1] || '';
    }
  }

  const [nationalId, setNationalId] = useState(parsedInitialData?.nationalId || '');
  const [firstName, setFirstName] = useState(parsedInitialData?.firstName || '');
  const [lastName, setLastName] = useState(parsedInitialData?.lastName || '');
  const [dob, setDob] = useState(parsedInitialData?.dob || '');
  const [gender, setGender] = useState(parsedInitialData?.gender || '');
  const [email, setEmail] = useState(parsedInitialData?.email || '');
  
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const isLocked = isEdit && initialData?.identityVerification === 'Verified';
  
  const [height, setHeight] = useState(parsedInitialData?.height || '');
  const [weight, setWeight] = useState(parsedInitialData?.weight || '');
  
  const [errors, setErrors] = useState<any>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateNumber = (val: string) => {
    if (!val) return false;
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) return false;
    if (val.includes('.')) {
      const parts = val.split('.');
      if (parts[1].length > 1) return false;
    }
    return true;
  };

  const validateFullForm = () => {
    let newErrors: any = {};
    let valid = true;

    if (!nationalId.trim()) { newErrors.nationalId = 'Required'; valid = false; }
    if (!firstName.trim()) { newErrors.firstName = 'Required'; valid = false; }
    if (!lastName.trim()) { newErrors.lastName = 'Required'; valid = false; }
    if (!dob.trim()) { newErrors.dob = 'Required (DD/MM/YYYY)'; valid = false; }
    
    if (!gender || gender === 'Select') {
      newErrors.gender = 'Gender is required.';
      valid = false;
    }

    if (!height) {
      newErrors.height = 'Height is required.';
      valid = false;
    } else if (!validateNumber(height)) {
      newErrors.height = 'Please enter a valid height.';
      valid = false;
    }

    if (!weight) {
      newErrors.weight = 'Weight is required.';
      valid = false;
    } else if (!validateNumber(weight)) {
      newErrors.weight = 'Please enter a valid weight.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegisterAndVerify = () => {
    if (validateFullForm()) {
      setShowVerifyModal(true);
    }
  };

  const handleSubmit = (shouldVerify: boolean) => {
    if (!validateFullForm()) return;

    if (onSubmitSuccess) {
      onSubmitSuccess(
        email || 'patient@example.com', 
        shouldVerify, 
        { 
          nationalId, 
          firstName, 
          lastName, 
          dob, 
          email, 
          gender, 
          height: parseFloat(height), 
          weight: parseFloat(weight) 
        }
      );
    }
  };

  const handleConfirmVerify = () => {
    setShowVerifyModal(false);
    handleSubmit(true);
  };

  const handleFormChange = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
  };

  const lockIcon = <span title="This field cannot be edited by clinic users after identity verification."><Lock size={14} className="text-muted" style={{ marginLeft: '6px' }} /></span>;

  return (
    <>
      <form className="patient-form" onChange={handleFormChange} onSubmit={e => e.preventDefault()} noValidate>
        <section className="form-section">
          <div className="section-header-flex">
            <h3 className="section-title mb-0">General Information</h3>
          </div>
          
          <div className="form-group mt-4 mb-4">
            <label style={{ display: 'flex', alignItems: 'center' }}>
              National ID <span className="required">*</span>
              {isLocked && lockIcon}
            </label>
            <input 
              type="text" 
              placeholder="Enter National ID or Passport Number" 
              value={nationalId}
              onChange={(e) => { setNationalId(e.target.value); setErrors((prev: any) => ({ ...prev, nationalId: null })); }}
              disabled={isLocked}
              className={errors.nationalId ? 'input-error' : ''}
            />
            {errors.nationalId && <span className="error-text">{errors.nationalId}</span>}
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center' }}>First name <span className="required">*</span> {isLocked && lockIcon}</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => { setFirstName(e.target.value); setErrors((prev: any) => ({ ...prev, firstName: null })); }}
                disabled={isLocked}
                className={errors.firstName ? 'input-error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" defaultValue={parsedInitialData?.middleName} />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center' }}>Last Name <span className="required">*</span> {isLocked && lockIcon}</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => { setLastName(e.target.value); setErrors((prev: any) => ({ ...prev, lastName: null })); }}
                disabled={isLocked}
                className={errors.lastName ? 'input-error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center' }}>Date of Birth <span className="required">*</span> {isLocked && lockIcon}</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  placeholder="DD/MM/YYYY" 
                  value={dob} 
                  onChange={(e) => { setDob(e.target.value); setErrors((prev: any) => ({ ...prev, dob: null })); }}
                  disabled={isLocked}
                  className={errors.dob ? 'input-error' : ''}
                />
                <Calendar size={16} className="input-icon" />
              </div>
              {errors.dob && <span className="error-text">{errors.dob}</span>}
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center' }}>Gender <span className="required">*</span> {isLocked && lockIcon}</label>
              <div className="select-wrapper">
                <select 
                  value={gender || "Select"}
                  onChange={(e) => { setGender(e.target.value); setErrors((prev: any) => ({ ...prev, gender: null })); }}
                  className={errors.gender ? 'input-error' : ''}
                  disabled={isLocked}
                >
                  <option disabled value="Select">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
              {errors.gender && <span className="error-text">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Height (cm) <span className="required">*</span></label>
              <input 
                type="number" 
                step="0.1" 
                placeholder="e.g. 175.5" 
                value={height}
                onChange={(e) => { setHeight(e.target.value); setErrors((prev: any) => ({ ...prev, height: null })); }}
                className={errors.height ? 'input-error' : ''}
              />
              {errors.height && <span className="error-text">{errors.height}</span>}
            </div>
            <div className="form-group">
              <label>Weight (kg) <span className="required">*</span></label>
              <input 
                type="number" 
                step="0.1" 
                placeholder="e.g. 70.2" 
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setErrors((prev: any) => ({ ...prev, weight: null })); }}
                className={errors.weight ? 'input-error' : ''}
              />
              {errors.weight && <span className="error-text">{errors.weight}</span>}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <div className="phone-input">
                <div className="country-code">
                  <img src="https://flagcdn.com/w20/th.png" alt="TH" className="flag" />
                  <span>+66</span>
                  <ChevronDown size={14} className="text-muted" />
                </div>
                <input type="text" defaultValue={parsedInitialData?.phone} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address <span className="required">*</span></label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea rows={3} defaultValue={parsedInitialData?.address}></textarea>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="form-section">
          <h3 className="section-title">Emergency Contact</h3>
          
          <div className="form-row-3">
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input type="text" defaultValue={parsedInitialData?.emergencyContactName} />
            </div>
            <div className="form-group">
              <label>Emergency Phone</label>
              <div className="phone-input">
                <div className="country-code">
                  <img src="https://flagcdn.com/w20/th.png" alt="TH" className="flag" />
                  <span>+66</span>
                  <ChevronDown size={14} className="text-muted" />
                </div>
                <input type="text" defaultValue={parsedInitialData?.emergencyPhone} />
              </div>
            </div>
            <div className="form-group">
              <label>Relationship</label>
              <div className="select-wrapper">
                <select defaultValue={parsedInitialData?.relationship || "Select"}>
                  <option disabled>Select</option>
                  <option>Spouse</option>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Friend</option>
                  <option>Other</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Information */}
        <section className="form-section">
          <h3 className="section-title">Insurance Information</h3>
          <div className="form-row-2">
            <div className="form-group">
              <label>Insurance Provider</label>
              <input type="text" defaultValue={parsedInitialData?.insuranceProvider} />
            </div>
            <div className="form-group">
              <label>Policy Number</label>
              <input type="text" defaultValue={parsedInitialData?.policyNumber} />
            </div>
          </div>
        </section>

        {/* Allergies */}
        <section className="form-section">
          <h3 className="section-title">Allergies</h3>
          <div className="checkbox-grid">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={initialData?.allergies?.includes('Drug Allergy')} />
              <span>Drug Allergy</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={initialData?.allergies?.includes('Food Allergy')} />
              <span>Food Allergy</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={initialData?.allergies?.includes('Environmental Allergy')} />
              <span>Environmental Allergy</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={initialData?.allergies?.includes('No Known Allergy')} />
              <span>No Known Allergy</span>
            </label>
          </div>
          <div className="form-group mt-3">
            <label>Other</label>
            <input type="text" placeholder="Specify other allergy" defaultValue={initialData?.otherAllergy} />
          </div>
        </section>

        {/* Medical History */}
        <section className="form-section">
          <h3 className="section-title">Medical History</h3>
          <div className="checkbox-grid">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('Diabetes')} />
              <span>Diabetes</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('Hypertension')} />
              <span>Hypertension</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('Cardiovascular Disease')} />
              <span>Cardiovascular Disease</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('Respiratory Disease')} />
              <span>Respiratory Disease</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('Kidney Disease')} />
              <span>Kidney Disease</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('Liver Disease')} />
              <span>Liver Disease</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked={parsedInitialData?.medicalHistory?.includes('None')} />
              <span>None</span>
            </label>
          </div>
          <div className="form-group mt-3">
            <label>Other</label>
            <input type="text" placeholder="Specify other condition" defaultValue={initialData?.otherMedicalHistory} />
          </div>
        </section>

        <div style={{ paddingBottom: '24px', paddingTop: '16px' }}>
          {!isLocked && (
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', textAlign: 'center' }}>
              You can {isEdit ? 'update' : 'register'} the patient now and verify their identity later. Identity verification is required before creating a lab order.
            </p>
          )}
          <div className="modal-actions" style={{ justifyContent: 'center', gap: '16px' }}>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            {isLocked ? (
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => handleSubmit(true)}
                disabled={!isDirty}
              >
                Update Patient
              </button>
            ) : (
              <>
                <button type="button" className="btn-secondary-outline" onClick={() => handleSubmit(false)}>
                  {isEdit ? 'Update Only' : 'Register Only'}
                </button>
                <button type="button" className="btn-primary" onClick={handleRegisterAndVerify}>
                  {isEdit ? 'Update & Verify' : 'Register & Verify'}
                </button>
              </>
            )}
          </div>
        </div>
      </form>

      {showVerifyModal && (
        <VerifyIdentityModal
          patient={{ nationalId, firstName, lastName, dob, gender }}
          onClose={() => setShowVerifyModal(false)}
          onVerify={handleConfirmVerify}
          cancelText="Back to Edit"
          confirmText="Confirm & Register"
        />
      )}
    </>
  );
}
