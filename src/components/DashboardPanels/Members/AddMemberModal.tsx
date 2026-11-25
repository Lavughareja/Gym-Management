import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { addMemberAction } from '../../../redux/actions/memberActions';
import { fetchDevicesAction } from '../../../redux/actions/deviceActions';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #e2e8f0',
  borderRadius: 10,
  fontSize: 15,
  color: '#1e293b',
  background: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 14,
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: 8,
};

export const AddMemberModal: React.FC<Props> = ({ onClose, onSave }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdResult, setCreatedResult] = useState<any>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    dateOfBirth: '',
    secondaryPhone: '',
    emergencyNumber: '',
    bloodGroup: '',
    planId: '',
    startDate: '',
    amountPaid: '',
    extraDays: '',
    deviceUserId: '',
    biometricDeviceId: '',
  });

  const { plans: rawPlans } = useAppSelector((state: any) => state.plan);
  const { devices: rawDevices } = useAppSelector((state: any) => state.device);
  const plans: any[] = Array.isArray(rawPlans) ? rawPlans : [];
  const devices: any[] = Array.isArray(rawDevices) ? rawDevices : [];

  useEffect(() => {
    if (devices.length === 0) {
      dispatch(fetchDevicesAction());
    }
  }, [dispatch, devices.length]);

  // Default website plans to show if user hasn't created any yet
  const defaultPlans = [
    { _id: '111111111111111111111111', name: 'Starter', durationMonths: 1, basePrice: 1999 },
    { _id: '222222222222222222222222', name: 'Plus', durationMonths: 3, basePrice: 2999 },
    { _id: '333333333333333333333333', name: 'Professional', durationMonths: 6, basePrice: 4999 },
    { _id: '444444444444444444444444', name: 'Enterprise', durationMonths: 12, basePrice: 9999 },
  ];
  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  // Auto-calculate end date from startDate + plan duration + extraDays
  const calcEndDate = (): string => {
    if (!form.startDate || !form.planId) return '';
    const selectedPlan = displayPlans.find(p => (p._id || p.id) === form.planId);
    if (!selectedPlan) return '';
    
    const d = new Date(form.startDate);
    d.setMonth(d.getMonth() + Number(selectedPlan.durationMonths || 1));
    if (form.extraDays) d.setDate(d.getDate() + Number(form.extraDays));
    return d.toISOString().split('T')[0];
  };
  const endDate = calcEndDate();

  const handleSubmit = async () => {
    setError('');
    if (!form.fullName.trim()) { setError('Full Name is required.'); return; }
    if (!form.email.trim()) { setError('Email is required.'); return; }
    if (!form.mobileNo.trim()) { setError('Mobile number is required.'); return; }

    setLoading(true);
    try {
      const payload: any = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobileNo: form.mobileNo.trim(),
      };
      if (form.dateOfBirth) payload.dateOfBirth = form.dateOfBirth;
      if (form.secondaryPhone.trim()) payload.secondaryPhone = form.secondaryPhone.trim();
      if (form.emergencyNumber.trim()) payload.emergencyNumber = form.emergencyNumber.trim();
      if (form.bloodGroup) payload.bloodGroup = form.bloodGroup;
      if (form.planId) payload.planId = form.planId;
      if (form.extraDays) payload.extraDays = Number(form.extraDays);
      if (form.startDate) payload.startDate = form.startDate;
      if (form.amountPaid) payload.amountPaid = Number(form.amountPaid);
      if (form.deviceUserId.trim()) payload.deviceUserId = Number(form.deviceUserId);
      if (form.biometricDeviceId) payload.biometricDeviceId = form.biometricDeviceId;

      const result = await dispatch(addMemberAction(payload));
      if (result) {
        if (typeof result === 'object' && (result.user || result.machineSync)) {
          setCreatedResult(result);
        } else {
          onSave(payload);
        }
      }
    } catch {
      setError('Failed to add member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.45)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        width: '100%',
        maxWidth: 520,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Add New Member</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>

          {/* Full Name */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Full Name</label>
            <input
              style={inputStyle}
              placeholder="Member Name"
              value={form.fullName}
              onChange={set('fullName')}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Email Address</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="member@example.com"
              value={form.email}
              onChange={set('email')}
            />
          </div>

          {/* Mobile */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Mobile Number</label>
            <input
              style={inputStyle}
              type="tel"
              placeholder="9876543210"
              value={form.mobileNo}
              onChange={set('mobileNo')}
            />
          </div>

          {/* Date of Birth */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Date of Birth</label>
            <input
              style={inputStyle}
              type="date"
              value={form.dateOfBirth}
              onChange={set('dateOfBirth')}
            />
          </div>

          {/* Blood Group */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Blood Group</label>
            <select style={inputStyle} value={form.bloodGroup} onChange={set('bloodGroup')}>
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Emergency Contact */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Emergency Contact</label>
            <input
              style={inputStyle}
              type="tel"
              placeholder="Emergency number (optional)"
              value={form.emergencyNumber}
              onChange={set('emergencyNumber')}
            />
          </div>

          {/* Plan Selection */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Membership Plan</label>
            <select
              style={inputStyle}
              value={form.planId}
              onChange={(e) => {
                set('planId')(e);
                const p = displayPlans.find(plan => (plan._id || plan.id) === e.target.value);
                if (p) {
                  setForm(f => ({ ...f, amountPaid: String(p.basePrice || 0) }));
                }
              }}
            >
              <option value="">-- Choose a Plan --</option>
              {displayPlans.map(p => (
                <option key={p._id || p.id} value={p._id || p.id}>
                  {p.name} - {p.durationMonths} Months (₹{p.basePrice})
                </option>
              ))}
            </select>
          </div>

          {/* Start Date + Extra Days in one row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={labelStyle}>Start Date</label>
              <input
                style={inputStyle}
                type="date"
                value={form.startDate}
                onChange={set('startDate')}
              />
            </div>
            <div>
              <label style={labelStyle}>Extra Days</label>
              <input
                style={inputStyle}
                type="number"
                min="0"
                placeholder="0"
                value={form.extraDays}
                onChange={set('extraDays')}
              />
            </div>
          </div>

          {/* Auto-calculated End Date */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>End Date (Auto Calculated)</label>
            <input
              style={{ ...inputStyle, background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#15803d', fontWeight: 700, cursor: 'not-allowed' }}
              type={endDate ? "date" : "text"}
              placeholder="Select a plan to see end date"
              value={endDate || ''}
              readOnly
            />
          </div>

          {/* Amount Paid */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Amount Paid (₹)</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              placeholder="0"
              value={form.amountPaid}
              onChange={set('amountPaid')}
            />
          </div>

          {/* Biometric Device User ID + Device */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 8 }}>
            <div>
              <label style={labelStyle}>Device User ID</label>
              <input
                style={inputStyle}
                type="number"
                min="1"
                placeholder="Auto-generated if empty"
                value={form.deviceUserId}
                onChange={set('deviceUserId')}
              />
            </div>
            <div>
              <label style={labelStyle}>Biometric Device</label>
              <select
                style={inputStyle}
                value={form.biometricDeviceId}
                onChange={set('biometricDeviceId')}
              >
                <option value="">-- Optional --</option>
                {devices.map((d: any) => (
                  <option key={d._id || d.id} value={d._id || d.id}>
                    {d.name} ({d.provider})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Created Result */}
          {createdResult && (
            <div style={{ marginTop: 14, padding: '12px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, color: '#166534', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                <CheckCircle2 size={16} /> Member Created
              </div>
              {createdResult.user?.deviceUserId !== undefined && (
                <div>Device User ID: <strong>{createdResult.user.deviceUserId}</strong></div>
              )}
              {createdResult.machineSync && (
                <div style={{ marginTop: 2 }}>
                  Machine Sync: <strong>{typeof createdResult.machineSync === 'string' ? createdResult.machineSync : createdResult.machineSync.status || (createdResult.machineSync.success ? 'Synced' : 'Failed')}</strong>
                  {createdResult.machineSync.message ? ` — ${createdResult.machineSync.message}` : ''}
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 13, fontWeight: 500 }}>
              {error}
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div style={{ padding: '16px 28px 24px', display: 'flex', gap: 12 }}>
          {createdResult ? (
            <button
              onClick={() => onSave(createdResult)}
              style={{
                flex: 1,
                padding: '13px 0',
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '13px 0',
                  background: loading ? '#93c5fd' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                {loading ? 'Adding...' : 'Add Member'}
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '13px 0',
                  background: '#fff',
                  color: '#2563eb',
                  border: '1.5px solid #2563eb',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
