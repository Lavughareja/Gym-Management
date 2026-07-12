import React, { useState } from "react";
import { LayoutDashboard, Users, Calendar } from "lucide-react";
import CrmDashboard from "../Crm/CrmDashboard";
import LeadList from "../Crm/LeadList";

interface CrmPanelProps {
  role: string;
  gymName: string;
}

const CrmPanel: React.FC<CrmPanelProps> = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads">("dashboard");

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: 20 }}>
        <div>
          <h2 className="page-title">CRM & Leads</h2>
          <p className="page-subtitle">Manage enquiries and convert them to members</p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="crm-tabs" style={{ display: 'flex', gap: 15, marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 10 }}>
        <button 
          onClick={() => setActiveTab("dashboard")} 
          className={activeTab === "dashboard" ? "btn-blue" : "btn-blue-outline"}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: "8px 16px" }}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button 
          onClick={() => setActiveTab("leads")} 
          className={activeTab === "leads" ? "btn-blue" : "btn-blue-outline"}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: "8px 16px" }}
        >
          <Users size={18} /> Leads
        </button>
      </div>

      <div className="crm-content">
        {activeTab === "dashboard" && <CrmDashboard />}
        {activeTab === "leads" && <LeadList />}
      </div>
    </div>
  );
};

export default CrmPanel;
