import React, { useEffect, useState } from 'react';
import { getDemoRequests, updateDemoRequestStatus, startTrialForRequest } from '../services/demoRequestService';
import { ClipboardList, Play, Edit3 } from 'lucide-react';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import './DemoRequests.css';

const DemoRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

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

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = prompt('Enter new status (Pending, Contacted, Trial Started, Rejected):', currentStatus);
    if (newStatus && ['Pending', 'Contacted', 'Trial Started', 'Rejected'].includes(newStatus)) {
      try {
        await updateDemoRequestStatus(id, newStatus, '');
        fetchRequests();
      } catch (error) {
        alert('Failed to update status');
      }
    }
  };

  const handleStartTrial = (id) => {
    setSelectedRequestId(id);
    setModalOpen(true);
  };

  const confirmStartTrial = async () => {
    if (!selectedRequestId) return;
    try {
      await startTrialForRequest(selectedRequestId);
      alert('Trial started successfully! Invitation email has been sent.');
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start trial');
    } finally {
      setModalOpen(false);
      setSelectedRequestId(null);
    }
  };

  return (
    <div className="demo-requests-page">
      <div className="section-title">
        <ClipboardList size={18} /> Demo Requests
        <span className="count-pill">
          {requests.length} total
        </span>
      </div>
      
      {loading ? (
        <div className="loading-pill">Loading requests...</div>
      ) : (
        <div className="table-card">
          <table className="demo-table">
            <thead>
              <tr className="table-header-row">
                <th className="th-cell">Date</th>
                <th className="th-cell">Owner Name</th>
                <th className="th-cell">Gym Name</th>
                <th className="th-cell">Contact</th>
                <th className="th-cell">Status</th>
                <th className="th-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req: any) => (
                <tr key={req._id} className="table-row">
                  <td className="td-cell">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="td-cell td-cell-bold">{req.fullName}</td>
                  <td className="td-cell">{req.gymName}</td>
                  <td className="td-cell">
                    <div className="contact-email">{req.email}</div>
                    <div className="contact-phone">{req.phone}</div>
                  </td>
                  <td className="td-cell">
                    <span className={`status-badge ${
                      req.status === 'Trial Started' ? 'status-trial' :
                      req.status === 'Pending' ? 'status-pending' :
                      'status-default'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="td-cell actions-cell">
                    <button 
                      onClick={() => handleUpdateStatus(req._id, req.status)}
                      className="action-btn"
                    >
                      <Edit3 size={14} /> Update
                    </button>
                    {req.status !== 'Trial Started' && req.status !== 'Rejected' && (
                      <button 
                        onClick={() => handleStartTrial(req._id)}
                        className="primary-btn"
                      >
                        <Play size={14} /> Start Trial
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state-cell">
                    No demo requests found at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmStartTrial}
        title="Start Free Trial"
        message="Are you sure you want to start a 15-day free trial for this gym? This will automatically send an invitation email."
        confirmText="Start Trial"
      />
    </div>
  );
};

export default DemoRequests;
