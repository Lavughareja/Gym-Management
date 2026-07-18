import React, { useEffect, useState } from "react";
import { X, Phone, Mail, Calendar as CalIcon, MessageSquare, Plus, Activity, UserCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchLeadByIdAction } from "../../redux/actions/crmActions";
import { clearCurrentLead } from "../../redux/slices/crmSlice";
import ConvertLeadModal from "./ConvertLeadModal";

interface LeadDetailsModalProps {
  leadId: string;
  onClose: () => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ leadId, onClose }) => {
  const dispatch = useAppDispatch();
  const { currentLead, leadActivities, leadFollowUps, loading } = useAppSelector((state) => state.crm);
  const [showConvertModal, setShowConvertModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLeadByIdAction(leadId));
    return () => {
      dispatch(clearCurrentLead());
    };
  }, [dispatch, leadId]);

  if (loading || !currentLead) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ padding: 40, textAlign: 'center' }}>
          Loading lead details...
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: 800, width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{currentLead.firstName} {currentLead.lastName}</h2>
            <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
              <span className="badge badge-info">{currentLead.source}</span>
              <span className={`badge ${currentLead.status === 'Joined' ? 'badge-success' : currentLead.status === 'Lost' ? 'badge-danger' : 'badge-warning'}`}>
                {currentLead.status}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {currentLead.status !== 'Joined' && (
              <button className="btn btn-success" onClick={() => setShowConvertModal(true)}>
                <UserCheck size={16} /> Convert to Member
              </button>
            )}
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>
        </div>
        
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
            <div className="panel" style={{ padding: 15 }}>
              <h4 style={{ marginBottom: 15 }}>Contact Info</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><Phone size={16} className="text-muted" /> {currentLead.phone}</p>
              {currentLead.email && <p style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><Mail size={16} className="text-muted" /> {currentLead.email}</p>}
              <p style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><CalIcon size={16} className="text-muted" /> Created: {new Date(currentLead.createdAt).toLocaleDateString('en-GB')}</p>
              {currentLead.assignedTo && <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}><UserCheck size={16} className="text-muted" /> Assigned to: {currentLead.assignedTo.fullName}</p>}
            </div>
            <div className="panel" style={{ padding: 15 }}>
              <h4 style={{ marginBottom: 15 }}>Other Details</h4>
              <p style={{ marginBottom: 10 }}><strong>Fitness Goal:</strong> {currentLead.fitnessGoal || 'N/A'}</p>
              <p style={{ marginBottom: 10 }}><strong>Budget:</strong> {currentLead.budget ? `$${currentLead.budget}` : 'N/A'}</p>
              <p style={{ marginBottom: 10 }}><strong>Notes:</strong> {currentLead.notes || 'No notes'}</p>
            </div>
          </div>

          <h3 style={{ marginBottom: 15, borderBottom: '1px solid var(--border-color)', paddingBottom: 10 }}>Timeline & Activities</h3>
          <div className="timeline" style={{ padding: '10px 0' }}>
            {leadActivities.length === 0 ? (
               <p className="text-muted">No activities recorded yet.</p>
            ) : (
              leadActivities.map((activity: any, index: number) => (
                <div key={index} style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'rgba(0, 136, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0088FE', flexShrink: 0 }}>
                    <Activity size={16} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>{activity.action}</p>
                    {activity.oldValue || activity.newValue ? (
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {activity.oldValue && `${activity.oldValue} ➔ `} {activity.newValue}
                        </p>
                    ) : null}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(activity.createdAt).toLocaleString()} by {activity.createdBy?.fullName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {showConvertModal && <ConvertLeadModal lead={currentLead} onClose={() => setShowConvertModal(false)} onConverted={onClose} />}
    </div>
  );
};

export default LeadDetailsModal;
