import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchFollowUpsAction, updateFollowUpAction } from "../../redux/actions/crmActions";
import { CheckCircle, Clock } from "lucide-react";

const FollowupCalendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { followUps, loading } = useAppSelector((state) => state.crm);

  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    dispatch(fetchFollowUpsAction({ date: dateFilter }));
  }, [dispatch, dateFilter]);

  const handleComplete = (id: string) => {
    dispatch(updateFollowUpAction({ id, data: { status: 'Completed' } }));
  };

  return (
    <div className="gym-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>Daily Follow-ups</h3>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label style={{ margin: 0, fontWeight: 500 }}>Date:</label>
            <input 
                type="date" 
                className="form-control" 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                style={{ width: 'auto' }}
            />
        </div>
      </div>

      <div className="followup-list">
        {loading ? (
          <p style={{ textAlign: 'center', padding: 20 }}>Loading follow-ups...</p>
        ) : followUps.length === 0 ? (
          <p style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>No follow-ups scheduled for this date.</p>
        ) : (
          <div style={{ display: 'grid', gap: 15 }}>
            {followUps.map((fu) => (
              <div key={fu._id} className="gym-card" style={{ padding: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${fu.status === 'Completed' ? '#00C49F' : '#FFBB28'}` }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{fu.leadId?.firstName} {fu.leadId?.lastName}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {fu.followUpType} at {fu.followUpTime || 'Time not specified'}
                  </p>
                  {fu.remarks && <p style={{ margin: 0, fontSize: '0.85rem' }}>{fu.remarks}</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={`badge ${fu.status === 'Completed' ? 'badge-success' : fu.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                    {fu.status}
                  </span>
                  {fu.status === 'Pending' && (
                    <button className="btn-icon" style={{ color: '#00C49F' }} onClick={() => handleComplete(fu._id)} title="Mark Completed">
                      <CheckCircle size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowupCalendar;
