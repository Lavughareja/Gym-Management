import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppDispatch } from "../../utils/reduxHooks";
import { convertLeadAction } from "../../redux/actions/crmActions";

interface ConvertLeadModalProps {
  lead: any;
  onClose: () => void;
  onConverted: () => void;
}

const ConvertLeadModal: React.FC<ConvertLeadModalProps> = ({ lead, onClose, onConverted }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    durationMonths: 1,
    amountPaid: lead.budget || 0,
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(convertLeadAction({ id: lead._id, data: formData }));
    if (result.meta.requestStatus === "fulfilled") {
      onConverted();
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1050 }}>
      <div className="modal-content" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h2 className="modal-title">Convert Lead to Member</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <p style={{ marginBottom: 20 }}>You are converting <strong>{lead.firstName} {lead.lastName}</strong> into a gym member. A user profile will be created.</p>
          
          <div className="form-group">
            <label>Plan Duration (Months)</label>
            <input type="number" name="durationMonths" className="form-control" value={formData.durationMonths} onChange={handleChange} min={1} required />
          </div>
          
          <div className="form-group">
            <label>Amount Paid</label>
            <input type="number" name="amountPaid" className="form-control" value={formData.amountPaid} onChange={handleChange} min={0} required />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
          </div>

          <div className="modal-footer" style={{ marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success">Confirm Conversion</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvertLeadModal;
