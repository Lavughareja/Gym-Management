import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAppDispatch } from "../../utils/reduxHooks";
import { createLeadAction, updateLeadAction } from "../../redux/actions/crmActions";

interface CreateEditLeadModalProps {
  lead?: any;
  onClose: () => void;
}

const CreateEditLeadModal: React.FC<CreateEditLeadModalProps> = ({ lead, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    source: "Walk-in",
    status: "New",
    fitnessGoal: "",
    budget: "",
    notes: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        firstName: lead.firstName || "",
        lastName: lead.lastName || "",
        phone: lead.phone || "",
        email: lead.email || "",
        source: lead.source || "Walk-in",
        status: lead.status || "New",
        fitnessGoal: lead.fitnessGoal || "",
        budget: lead.budget || "",
        notes: lead.notes || "",
      });
    }
  }, [lead]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lead) {
      await dispatch(updateLeadAction({ id: lead._id, data: formData }));
    } else {
      await dispatch(createLeadAction(formData));
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <h2 className="modal-title">{lead ? "Edit Lead" : "Add New Lead"}</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Source</label>
              <select name="source" className="form-control" value={formData.source} onChange={handleChange}>
                <option value="Walk-in">Walk-in</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Website Form">Website Form</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Visit Scheduled">Visit Scheduled</option>
                <option value="Visited Gym">Visited Gym</option>
                <option value="Trial Started">Trial Started</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Joined">Joined</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Fitness Goal</label>
            <input type="text" name="fitnessGoal" className="form-control" value={formData.fitnessGoal} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" className="form-control" rows={3} value={formData.notes} onChange={handleChange}></textarea>
          </div>
          <div className="modal-footer" style={{ marginTop: 20 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{lead ? "Save Changes" : "Create Lead"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditLeadModal;
