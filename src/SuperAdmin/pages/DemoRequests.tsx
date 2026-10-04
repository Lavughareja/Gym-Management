import React, { useEffect, useState } from 'react';
import { getDemoRequests, updateDemoRequestStatus, startTrialForRequest } from '../services/demoRequestService';
import { ClipboardList, Play, Edit3, Clock } from 'lucide-react';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import './DemoRequests.css';

const STATUS_OPTIONS = ['Pending', 'Contacted', 'Trial Started', 'Rejected'];

const getTrialInfo = (trialEndDate: string | Date | undefined) => {
  if (!trialEndDate) return null;
  const end = new Date(trialEndDate);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const endStr = end.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  return { daysLeft, endStr, expired: diffMs < 0 };
};

const StatusBadge = ({ status }: { status: string }) => {
  const classMap: Record<string, string> = {
    'Trial Started': 'dr-badge dr-badge-trial',
    'Pending': 'dr-badge dr-badge-pending',
    'Contacted': 'dr-badge dr-badge-contacted',
    'Rejected': 'dr-badge dr-badge-rejected',
  };
  return (
    <span className={classMap[status] || 'dr-badge dr-badge-pending'}>
      <span className="dr-badge-dot" />
      {status}
    </span>
  );
};

const DemoRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [updateModal, setUpdateModal] = useState<{ open: boolean; id: string | null; currentStatus: string }>({
    open: false,
    id: null,
    currentStatus: '',
  });
  const [newStatus, setNewStatus] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getDemoRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching demo requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleOpenUpdateModal = (id: string, currentStatus: string) => {
    setUpdateModal({ open: true, id, currentStatus });
    setNewStatus(currentStatus);
  };

  const handleSaveStatus = async () => {
    if (!updateModal.id || !newStatus) return;
    try {
      await updateDemoRequestStatus(updateModal.id, newStatus, '');
      setUpdateModal({ open: false, id: null, currentStatus: '' });
      fetchRequests();
    } catch {
      alert('Failed to update status');
    }
  };

  const handleStartTrial = (id: string) => {
    setSelectedRequestId(id);
    setModalOpen(true);
  };

  const confirmStartTrial = async () => {
    if (!selectedRequestId) return;
    try {
      await startTrialForRequest(selectedRequestId);
      alert('Trial started successfully. Invitation email has been sent.');
      fetchRequests();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to start trial');
    } finally {
      setModalOpen(false);
      setSelectedRequestId(null);
    }
  };

  return (
    <div className="demo-requests-page">
      {/* Header */}
      <div className="dr-header">
        <div className="dr-header-left">
          <div className="dr-header-icon">
            <ClipboardList size={20} />
          </div>
          <div className="dr-header-text">
            <h2>Demo Requests</h2>
            <p>Review and manage incoming gym demo requests</p>
          </div>
        </div>
        <span className="dr-count-badge">{requests.length} Total</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="dr-loading">Loading requests...</div>
      ) : (
        <div className="dr-table-container">
          <table className="dr-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Owner Name</th>
                <th>Gym Name</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="dr-empty">No demo requests found.</td>
                </tr>
              ) : (
                requests.map((req: any, index: number) => {
                  const trialInfo = req.status === 'Trial Started' ? getTrialInfo(req.trialEndDate) : null;
                  return (
                    <tr key={req._id}>
                      <td className="dr-sr">{index + 1}</td>
                      <td>
                        <span className="dr-date">
                          {new Date(req.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td>
                        <span className="dr-name">{req.fullName}</span>
                      </td>
                      <td>
                        <span className="dr-gym">{req.gymName}</span>
                      </td>
                      <td>
                        <div className="dr-email">{req.email}</div>
                        <div className="dr-phone">{req.phone}</div>
                      </td>
                      <td>
                        <StatusBadge status={req.status} />
                        {trialInfo && (
                          <div className={`dr-trial-timer${trialInfo.expired ? ' dr-trial-expired' : ''}`}>
                            <Clock size={11} className="dr-trial-timer-icon" />
                            <span className="dr-trial-timer-text">
                              {trialInfo.expired
                                ? `Expired on ${trialInfo.endStr}`
                                : `${trialInfo.daysLeft} day${trialInfo.daysLeft !== 1 ? 's' : ''} left (ends ${trialInfo.endStr})`}
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="dr-actions">
                          <button
                            className="dr-btn-update"
                            onClick={() => handleOpenUpdateModal(req._id, req.status)}
                          >
                            <Edit3 size={13} /> Update
                          </button>
                          {req.status !== 'Trial Started' && req.status !== 'Rejected' && (
                            <button
                              className="dr-btn-start-trial"
                              onClick={() => handleStartTrial(req._id)}
                            >
                              <Play size={13} /> Start Trial
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Status Modal */}
      {updateModal.open && (
        <div className="dr-modal-overlay" onClick={() => setUpdateModal({ open: false, id: null, currentStatus: '' })}>
          <div className="dr-modal" onClick={e => e.stopPropagation()}>
            <h3>Update Status</h3>
            <p>Select the new status for this demo request.</p>
            <select
              className="dr-modal-select"
              value={newStatus}
              onChange={e => setNewStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="dr-modal-actions">
              <button
                className="dr-modal-cancel"
                onClick={() => setUpdateModal({ open: false, id: null, currentStatus: '' })}
              >
                Cancel
              </button>
              <button className="dr-modal-save" onClick={handleSaveStatus}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Trial Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmStartTrial}
        title="Start 15-Day Free Trial"
        message="Are you sure you want to start a 15-day free trial for this gym? An invitation email will be sent automatically. The trial will expire after 15 days."
        confirmText="Start Trial"
      />
    </div>
  );
};

export default DemoRequests;
