import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchLeadsAction, deleteLeadAction } from "../../redux/actions/crmActions";
import { Search, Plus, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import CreateEditLeadModal from "./CreateEditLeadModal";
import LeadDetailsModal from "./LeadDetailsModal";

const LeadList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { leads, loading } = useAppSelector((state) => state.crm);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editLead, setEditLead] = useState<any>(null);
  const [viewLead, setViewLead] = useState<any>(null);

  useEffect(() => {
    fetchLeads();
  }, [dispatch]);

  const fetchLeads = () => {
    dispatch(fetchLeadsAction({ search: searchTerm, status: statusFilter }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLeadAction(id));
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>Manage Leads</h3>
        <button className="btn-blue" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} /> Add Lead
        </button>
      </div>

      <div className="gym-card" style={{ display: 'flex', gap: 15, marginBottom: 20, flexWrap: 'wrap', padding: "12px 16px", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 250, display: "flex", alignItems: "center", gap: 10 }}>
          <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search leads by name, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "var(--text-primary)", width: "100%" }}
          />
        </div>
        <select 
          className="form-control" 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 150 }}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Visit Scheduled">Visit Scheduled</option>
          <option value="Visited Gym">Visited Gym</option>
          <option value="Trial Started">Trial Started</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Joined">Joined</option>
          <option value="Lost">Lost</option>
        </select>
        <button className="btn-blue-outline" onClick={fetchLeads} style={{ padding: "8px 12px" }}>
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="gym-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="gym-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
              <th>Name</th>
              <th>Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center' }}>Loading leads...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center' }}>No leads found.</td></tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.firstName} {lead.lastName}</td>
                  <td>{lead.phone}</td>
                  <td><span className="badge badge-info">{lead.source}</span></td>
                  <td>
                    <span className={`badge ${lead.status === 'Joined' ? 'badge-success' : lead.status === 'Lost' ? 'badge-danger' : 'badge-warning'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>{lead.assignedTo?.fullName || 'Unassigned'}</td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View" onClick={() => setViewLead(lead)}><Eye size={16} /></button>
                      <button className="btn-icon" title="Edit" onClick={() => setEditLead(lead)}><Edit size={16} /></button>
                      <button className="btn-icon delete" title="Delete" onClick={() => handleDelete(lead._id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {showCreateModal && <CreateEditLeadModal onClose={() => setShowCreateModal(false)} />}
      {editLead && <CreateEditLeadModal lead={editLead} onClose={() => setEditLead(null)} />}
      {viewLead && <LeadDetailsModal leadId={viewLead._id} onClose={() => setViewLead(null)} />}
    </div>
  );
};

export default LeadList;
