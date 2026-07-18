import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { AxiosInstance as api } from '../../../axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../../utils/reduxHooks';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)',
  borderRadius: 8, fontSize: 14, outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6,
};

export default function TrialMembersPanel() {
  const dispatch = useAppDispatch();
  const [trials, setTrials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', phoneNumber: '', email: '', durationInDays: 2 });

  const fetchTrials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/trials');
      setTrials(res.data.trials);
    } catch (err) {
      console.error(err);
      dispatch(showSnackbar({ message: 'Failed to fetch trial members', type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrials();
  }, []);

  const handleAddTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/trials', addForm);
      dispatch(showSnackbar({ message: 'Trial member added successfully!', type: 'success' }));
      setShowAddModal(false);
      setAddForm({ name: '', phoneNumber: '', email: '', durationInDays: 2 });
      fetchTrials();
    } catch (err: any) {
      dispatch(showSnackbar({ message: err.response?.data?.message || 'Failed to add', type: 'error' }));
    }
  };

  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertTrial, setConvertTrial] = useState<any>(null);
  const [convertForm, setConvertForm] = useState({ planId: '', amountPaid: '', startDate: '' });
  const { plans: rawPlans } = useAppSelector((state: any) => state.plan);
  const plans: any[] = Array.isArray(rawPlans) ? rawPlans : [];

  const handleConvertClick = (trial: any) => {
    setConvertTrial(trial);
    setConvertForm({ planId: '', amountPaid: '', startDate: new Date().toISOString().split('T')[0] });
    setShowConvertModal(true);
  };

  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertTrial) return;
    try {
      // 1. Add as member
      const payload = {
        fullName: convertTrial.name,
        email: convertTrial.email || 'trial_' + Date.now() + '@example.com',
        mobileNo: convertTrial.phoneNumber,
        planId: convertForm.planId,
        amountPaid: Number(convertForm.amountPaid),
        startDate: convertForm.startDate
      };
      await api.post('/members', payload);
      // 2. Mark trial as converted
      await api.put(`/trials/${convertTrial._id}/status`);
      
      dispatch(showSnackbar({ message: 'Successfully converted to member!', type: 'success' }));
      setShowConvertModal(false);
      fetchTrials();
    } catch (err: any) {
      dispatch(showSnackbar({ message: err.response?.data?.message || 'Failed to convert', type: 'error' }));
    }
  };

  const filteredTrials = trials.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.phoneNumber.includes(search));

  const getStatusBadge = (status: string) => {
    if (status === 'active') return <span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Active</span>;
    if (status === 'expired') return <span style={{ padding: '4px 8px', background: '#fee2e2', color: '#991b1b', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Expired</span>;
    if (status === 'converted') return <span style={{ padding: '4px 8px', background: '#e0e7ff', color: '#3730a3', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>Converted</span>;
    return null;
  };

  return (
    <div style={{ padding: '28px 32px', minHeight: '100%', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 4 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.4px' }}>Trial Members</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0, fontWeight: 500 }}>Track members on temporary trials</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ padding: '9px 20px', background: '#4f46e5', border: 'none', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
        >
          <Plus size={16} /> Add Trial Member
        </button>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: 16, border: '1px solid var(--border-color)', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', width: 300, marginBottom: 20 }}>
          <Search size={18} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
          <input 
            type="text" 
            placeholder="Search trials..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)' }}
          />
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading trials...</p>
        ) : filteredTrials.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No trial members found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13 }}>Name</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13 }}>Contact</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13 }}>Start Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13 }}>End Date</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13 }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrials.map(t => (
                  <tr key={t._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 14 }}>
                      <div>{t.phoneNumber}</div>
                      {t.email && <div style={{ fontSize: 12, marginTop: 2 }}>{t.email}</div>}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontSize: 14 }}>{new Date(t.startDate).toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontSize: 14 }}>{new Date(t.endDate).toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(t.status)}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {t.status !== 'converted' && (
                        <button 
                          onClick={() => handleConvertClick(t)}
                          style={{ padding: '6px 12px', background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                        >
                          Convert to Member
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-primary)', padding: 32, borderRadius: 20, width: '100%', maxWidth: 450, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 20 }}>Add Trial Member</h3>
            <form onSubmit={handleAddTrial} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input required style={inputStyle} value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input required style={inputStyle} value={addForm.phoneNumber} onChange={e => setAddForm({...addForm, phoneNumber: e.target.value})} placeholder="+1234567890" />
              </div>
              <div>
                <label style={labelStyle}>Email (Optional)</label>
                <input type="email" style={inputStyle} value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value})} placeholder="john@example.com" />
              </div>
              <div>
                <label style={labelStyle}>Duration (Days) *</label>
                <input required type="number" min="1" style={inputStyle} value={addForm.durationInDays || ''} onChange={e => setAddForm({...addForm, durationInDays: Number(e.target.value)})} placeholder="e.g. 3" />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Save Trial</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConvertModal && convertTrial && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-primary)', padding: 32, borderRadius: 20, width: '100%', maxWidth: 450, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 20 }}>Convert {convertTrial.name}</h3>
            <form onSubmit={handleConvertSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Select Plan *</label>
                <select required style={inputStyle} value={convertForm.planId} onChange={e => setConvertForm({...convertForm, planId: e.target.value})}>
                  <option value="">-- Choose Plan --</option>
                  {plans.map(p => (
                    <option key={p._id || p.id} value={p._id || p.id}>{p.name} - ₹{p.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Amount Paid *</label>
                <input required type="number" style={inputStyle} value={convertForm.amountPaid} onChange={e => setConvertForm({...convertForm, amountPaid: e.target.value})} placeholder="e.g. 5000" />
              </div>
              <div>
                <label style={labelStyle}>Start Date *</label>
                <input required type="date" style={inputStyle} value={convertForm.startDate} onChange={e => setConvertForm({...convertForm, startDate: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button type="button" onClick={() => setShowConvertModal(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#3730a3', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Convert</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
