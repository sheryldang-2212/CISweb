import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './VerifyIdentityModal.css';

interface VerifyIdentityModalProps {
  patient: any;
  onClose: () => void;
  onVerify: (verificationDetails: any) => void;
  isLoading?: boolean;
  cancelText?: string;
  confirmText?: string;
}

export default function VerifyIdentityModal({ 
  patient, 
  onClose, 
  onVerify, 
  isLoading = false,
  cancelText = 'Cancel',
  confirmText = 'Confirm Verification'
}: VerifyIdentityModalProps) {
  const handleConfirm = () => {
    onVerify({
      verifiedBy: 'Sarah Chen', // Simulating current user
      verifiedAt: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="verify-identity-overlay" onClick={!isLoading ? onClose : undefined}>
      <div className="verify-identity-modal" onClick={e => e.stopPropagation()}>
        <div className="vim-header">
          <h2>Confirm Identity Verification</h2>
          <button className="vim-close-btn" onClick={onClose} disabled={isLoading}><X size={20} /></button>
        </div>
        
        <div className="vim-body">
          <p className="vim-instruction">
            Please review the patient’s details against their identity document before confirming.
          </p>

          <div className="vim-comparison-box">
            <div className="vim-field-row">
              <span className="vim-field-label">National ID</span>
              <span className="vim-field-value">{patient.nationalId || patient.idNumber || '-'}</span>
            </div>
            
            <div className="vim-field-row">
              <span className="vim-field-label">First Name</span>
              <span className="vim-field-value">{patient.firstName || patient.name?.split(' ')[0] || '-'}</span>
            </div>

            <div className="vim-field-row">
              <span className="vim-field-label">Last Name</span>
              <span className="vim-field-value">{patient.lastName || patient.name?.split(' ').slice(1).join(' ') || '-'}</span>
            </div>
            
            <div className="vim-field-row">
              <span className="vim-field-label">Date of Birth</span>
              <span className="vim-field-value">{patient.dob || '-'}</span>
            </div>

            <div className="vim-field-row">
              <span className="vim-field-label">Gender</span>
              <span className="vim-field-value">{patient.gender || '-'}</span>
            </div>
          </div>

          <div className="vim-warning-banner" style={{ display: 'flex', gap: '8px', padding: '12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', marginTop: '16px' }}>
            <AlertTriangle size={18} style={{ color: '#d97706', flexShrink: 0 }} />
            <span style={{ color: '#b45309', fontSize: '14px', lineHeight: '1.4' }}>
              <strong>After identity verification, clinic users will no longer be able to edit these five fields.</strong> Please make sure all details are correct before confirming.
            </span>
          </div>
        </div>

        <div className="vim-footer">
          <div className="vim-actions" style={{ width: '100%', justifyContent: 'flex-end' }}>
            <button className="vim-btn-cancel" onClick={onClose} disabled={isLoading}>{cancelText}</button>
            <button 
              className="vim-btn-confirm active"
              onClick={handleConfirm}
              disabled={isLoading}
              style={{ minWidth: '150px' }}
            >
              {isLoading ? 'Verifying...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
