import React, { useState } from 'react';
import { useAppSelector } from "../../utils/reduxHooks";
import { Users, UserCheck, AlertTriangle, Clock, UserPlus, Snowflake, Fingerprint, Receipt, Download, Upload, ArrowUpCircle, Repeat } from 'lucide-react';
import { MembersTable } from './Members/MembersTable';
import { MembersFilter } from './Members/MembersFilter';
import { AddMemberModal } from './Members/AddMemberModal';
import { MembershipManagementModals } from './Members/MembershipManagementModals';

interface Props {
  role: string;
  canAddMember: boolean;
  showAddMember: boolean;
  setShowAddMember: (show: boolean) => void;
}

const MembersPanel: React.FC<Props> = ({ role, canAddMember, showAddMember, setShowAddMember }) => {
  const { members: rawMembers, loading } = useAppSelector((state) => state.member);
  const members: any[] = Array.isArray(rawMembers) ? rawMembers : [];
  const [searchTerm, setSearchTerm] = useState("");
  
  // We can pass null to signify global action where the user must select a member inside the modal
  const [manageAction, setManageAction] = useState<'freeze' | 'transfer' | 'upgrade' | null>(null);
  const [manageMember, setManageMember] = useState<any | null>(null);

  // ── Real calculations from member data ──────────────────────────────────────
  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalMembers    = members.length;
  const activeMembers   = members.filter((m) => m.status === 'Active' || (!m.status && m.planEndDate && new Date(m.planEndDate) >= now)).length;
  const expiredMembers  = members.filter((m) => m.status === 'Inactive' || (m.planEndDate && new Date(m.planEndDate) < now)).length;
  const expiringMembers = members.filter((m) => {
    if (!m.planEndDate) return false;
    const end = new Date(m.planEndDate);
    return end >= now && end <= sevenDaysLater;
  }).length;
  const newThisMonth    = members.filter((m) => {
    const created = m.createdAt ? new Date(m.createdAt) : null;
    return created && created >= startOfMonth;
  }).length;
  const frozenMembers   = members.filter((m) => m.status === 'Frozen' || m.status === 'frozen').length;
  const pendingPayments = members.filter((m) => m.paymentStatus === 'Pending' || m.paymentStatus === 'pending' || m.paymentStatus === 'Partial').length;

  const stats = [
    { label: "Total Members",      value: totalMembers,    icon: Users,        iconColor: '#2563eb', iconBg: '#eff6ff', iconBorder: '#bfdbfe', trend: null },
    { label: "Active Members",     value: activeMembers,   icon: UserCheck,    iconColor: '#16a34a', iconBg: '#f0fdf4', iconBorder: '#bbf7d0', trend: null },
    { label: "Expired",            value: expiredMembers,  icon: AlertTriangle,iconColor: '#dc2626', iconBg: '#fff1f2', iconBorder: '#fecdd3', trend: null },
    { label: "Expiring Soon",      value: expiringMembers, icon: Clock,        iconColor: '#ea580c', iconBg: '#fff7ed', iconBorder: '#fed7aa', trend: null },
    { label: "New This Month",     value: newThisMonth,    icon: UserPlus,     iconColor: '#7c3aed', iconBg: '#f5f3ff', iconBorder: '#ddd6fe', trend: null },
  ];

  const filteredMembers = members.filter((m: any) =>
    !searchTerm ||
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mobileNo?.includes(searchTerm)
  );

  return (
    <div style={{ padding: '28px 32px', minHeight: '100%', fontFamily: 'inherit' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.4px' }}>Member Management</h1>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0, fontWeight: 500 }}>Manage all gym members from one centralized dashboard.</p>
        </div>

        {(canAddMember || role === "admin" || role === "superadmin" || role === "owner") && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => { setManageAction('upgrade'); setManageMember(null); }} style={{ padding: '9px 16px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
              <ArrowUpCircle size={14} /> Upgrade
            </button>
            <button onClick={() => { setManageAction('transfer'); setManageMember(null); }} style={{ padding: '9px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
              <Repeat size={14} /> Transfer
            </button>
            <button onClick={() => { setManageAction('freeze'); setManageMember(null); }} style={{ padding: '9px 16px', background: '#eef2ff', border: '1px solid #c7d2fe', color: '#4338ca', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
              <Snowflake size={14} /> Freeze
            </button>
            
            <div style={{ width: 1, height: 24, background: '#e2e8f0', margin: '0 4px' }} />

            <button style={{ padding: '9px 16px', background: '#fff', border: '1px solid #e2e8f0', color: '#475569', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <Download size={14} /> Template
            </button>
            <button style={{ padding: '9px 16px', background: '#fff', border: '1px solid #e2e8f0', color: '#475569', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <Upload size={14} /> Import
            </button>
            <button
              onClick={() => setShowAddMember(true)}
              style={{ padding: '9px 20px', background: '#4f46e5', border: 'none', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
            >
              <UserPlus size={16} /> Add Member
            </button>
          </div>
        )}
      </div>

      {/* ── Stats Grid – 5 cols ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', minWidth: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.iconBg, border: `1.5px solid ${s.iconBorder}`, color: s.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={18} strokeWidth={2.5} />
              </div>
            </div>
            <p style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 4px', lineHeight: 1, letterSpacing: '-0.5px' }}>
              {loading ? '—' : s.value}
            </p>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Table & Filter Card ── */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', overflow: 'hidden', width: '100%' }}>
        <div style={{ padding: '20px' }}>
          <MembersFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <MembersTable
          members={filteredMembers}
          onAddMember={() => setShowAddMember(true)}
          onManage={(action, member) => {
            setManageAction(action);
            setManageMember(member);
          }}
        />
      </div>

      {showAddMember && (
        <AddMemberModal
          onClose={() => setShowAddMember(false)}
          onSave={() => setShowAddMember(false)}
        />
      )}

      {manageAction && (
        <MembershipManagementModals
          type={manageAction}
          member={manageMember}
          onClose={() => {
            setManageAction(null);
            setManageMember(null);
          }}
          onSuccess={() => {
            setManageAction(null);
            setManageMember(null);
          }}
        />
      )}
    </div>
  );
};

export default MembersPanel;
