import React, { useState } from 'react';
import { X, Snowflake, Repeat, ArrowUpCircle, Loader2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../utils/reduxHooks';
import { fetchMembersAction } from '../../../redux/actions/memberActions';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';
import { AxiosInstance as api } from '../../../axios/axiosInstance';

interface Props {
  type: 'freeze' | 'transfer' | 'upgrade';
  member: any | null;
  onClose: () => void;
  onSuccess: () => void;
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

export const MembershipManagementModals: React.FC<Props> = ({ type, member, onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [globalSelectedMemberId, setGlobalSelectedMemberId] = useState(member?._id || member?.id || '');

  const { members: rawMembers } = useAppSelector((state) => state.member);
  const allMembers: any[] = Array.isArray(rawMembers) ? rawMembers : [];

  // State for freeze
  const [freezeDays, setFreezeDays] = useState('');
  
  // State for transfer
  const [transferFullName, setTransferFullName] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [transferMobile, setTransferMobile] = useState('');
  const [transferDOB, setTransferDOB] = useState('');
  const [transferBloodGroup, setTransferBloodGroup] = useState('');
  const [transferEmergency, setTransferEmergency] = useState('');

  // State for upgrade
  const [newPlanId, setNewPlanId] = useState('');
  const [extraAmountPaid, setExtraAmountPaid] = useState('');
  const { plans: rawPlans } = useAppSelector((state) => state.plan);
  const allPlans: any[] = Array.isArray(rawPlans) ? rawPlans : [];

  const handleAction = async () => {
    setError('');
    const id = globalSelectedMemberId;
    if (!id) {
      setError('Please select a member first.');
      return;
    }

    try {
      setLoading(true);
      if (type === 'freeze') {
        if (!freezeDays || isNaN(Number(freezeDays)) || Number(freezeDays) <= 0) {
          setError('Please enter a valid number of days.');
          setLoading(false);
          return;
        }
        await api.post(`/members/${id}/freeze`, { days: Number(freezeDays) });
        dispatch(showSnackbar({ message: `Frozen for ${freezeDays} days!`, type: 'success' }));
      } else if (type === 'transfer') {
        if (!transferFullName || !transferEmail || !transferMobile) {
          setError('Please fill out all details for the new member.');
          setLoading(false);
          return;
        }
        await api.post(`/members/${id}/transfer`, { 
          fullName: transferFullName, 
          email: transferEmail, 
          mobileNo: transferMobile,
          dateOfBirth: transferDOB || undefined,
          bloodGroup: transferBloodGroup || undefined,
          emergencyNumber: transferEmergency || undefined
        });
        dispatch(showSnackbar({ message: 'Membership transferred to new member!', type: 'success' }));
      } else if (type === 'upgrade') {
        if (!newPlanId) {
          setError('Please select a new plan.');
          setLoading(false);
          return;
        }
        await api.post(`/members/${id}/upgrade`, { newPlanId, extraAmountPaid: extraAmountPaid ? Number(extraAmountPaid) : 0 });
        dispatch(showSnackbar({ message: 'Membership upgraded!', type: 'success' }));
      }
      
      // Refresh members list
      await dispatch(fetchMembersAction());
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to perform action.');
    } finally {
      setLoading(false);
    }
  };

  const getHeader = () => {
    switch (type) {
      case 'freeze': return { title: 'Freeze Membership', icon: <Snowflake color="#4f46e5" size={20} /> };
      case 'transfer': return { title: 'Transfer Membership', icon: <Repeat color="#4f46e5" size={20} /> };
      case 'upgrade': return { title: 'Upgrade Membership', icon: <ArrowUpCircle color="#4f46e5" size={20} /> };
      default: return { title: '', icon: null };
    }
  };

  const { title, icon } = getHeader();

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.45)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        width: '100%',
        maxWidth: 480,
        maxHeight: '90vh',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{title}</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                {member ? `For ${member.fullName || member.name}` : 'Global Action'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px 32px', overflowY: 'auto' }}>
          {error && (
            <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500, marginBottom: 20, border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          {!member && (
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Select Member</label>
              <select
                value={globalSelectedMemberId}
                onChange={(e) => setGlobalSelectedMemberId(e.target.value)}
                style={inputStyle}
              >
                <option value="">-- Choose Member --</option>
                {allMembers.map(m => (
                  <option key={m._id || m.id} value={m._id || m.id}>
                    {m.fullName || m.name} ({m.mobileNo})
                  </option>
                ))}
              </select>
            </div>
          )}

          {type === 'freeze' && (
            <div>
              <label style={labelStyle}>Number of Days to Freeze</label>
              <input
                type="number"
                placeholder="e.g. 15"
                value={freezeDays}
                onChange={(e) => setFreezeDays(e.target.value)}
                style={inputStyle}
                min={1}
              />
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
                The plan expiration date will be extended by this many days.
              </p>
            </div>
          )}

          {type === 'transfer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>New Member Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={transferFullName}
                  onChange={(e) => setTransferFullName(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>New Member Email</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={transferEmail}
                  onChange={(e) => setTransferEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>New Member Mobile No</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={transferMobile}
                  onChange={(e) => setTransferMobile(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Date of Birth (Optional)</label>
                  <input
                    type="date"
                    value={transferDOB}
                    onChange={(e) => setTransferDOB(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Blood Group (Optional)</label>
                  <select style={inputStyle} value={transferBloodGroup} onChange={(e) => setTransferBloodGroup(e.target.value)}>
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Emergency Contact (Optional)</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543211"
                  value={transferEmergency}
                  onChange={(e) => setTransferEmergency(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
                The current plan will be completely moved to the new member details provided.
              </p>
            </div>
          )}

          {type === 'upgrade' && (
            <div>
              <label style={labelStyle}>Select New Plan</label>
              <select
                value={newPlanId}
                onChange={(e) => setNewPlanId(e.target.value)}
                style={inputStyle}
              >
                <option value="">-- Choose Plan --</option>
                {allPlans.map(p => (
                  <option key={p._id || p.id} value={p._id || p.id}>
                    {p.name} - {p.durationMonths} Months
                  </option>
                ))}
              </select>
              
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Extra Amount Paid (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={extraAmountPaid}
                  onChange={(e) => setExtraAmountPaid(e.target.value)}
                  style={inputStyle}
                  min={0}
                />
              </div>

              <p style={{ fontSize: 12, color: '#64748b', marginTop: 12 }}>
                The member's plan will be updated and the end date will be adjusted.
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: '20px 32px', borderTop: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} disabled={loading} style={{ padding: '10px 20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#475569', cursor: loading ? 'not-allowed' : 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleAction} disabled={loading} style={{ padding: '10px 24px', background: '#4f46e5', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79,70,229,0.25)' }}>
            {loading ? <Loader2 size={18} className="spin" /> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};
