import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { Users, UserCheck, AlertTriangle, Clock, UserPlus, Snowflake, Fingerprint, Receipt, Download, Upload } from 'lucide-react';
import { MembersTable } from './Members/MembersTable';
import { MembersFilter } from './Members/MembersFilter';
import { AddMemberModal } from './Members/AddMemberModal';
import { MemberDetails } from './Members/MemberDetails';

interface Props {
  role: string;
  canAddMember: boolean;
  showAddMember: boolean;
  setShowAddMember: (show: boolean) => void;
}

const MembersPanel: React.FC<Props> = ({ role, canAddMember, showAddMember, setShowAddMember }) => {
  const { members, loading } = useAppSelector((state) => state.member);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const stats = [
    { label: "Total Members", value: members.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50 border-blue-100", trend: "+12%" },
    { label: "Active Members", value: members.filter((m: any) => m.status === 'Active' || !m.status).length.toString(), icon: UserCheck, color: "text-green-600", bg: "bg-green-50 border-green-100", trend: "+5%" },
    { label: "Expired", value: members.filter((m: any) => m.status === 'Inactive').length.toString(), icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50 border-red-100", trend: "-2%" },
    { label: "Expiring Soon", value: "14", icon: Clock, color: "text-orange-600", bg: "bg-orange-50 border-orange-100", trend: "+1%" },
    { label: "New This Month", value: "28", icon: UserPlus, color: "text-purple-600", bg: "bg-purple-50 border-purple-100", trend: "+24%" },
    { label: "Frozen Members", value: "5", icon: Snowflake, color: "text-gray-600", bg: "bg-gray-100 border-gray-200", trend: "0%" },
    { label: "Today's Attendance", value: "85", icon: Fingerprint, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100", trend: "+18%" },
    { label: "Pending Payments", value: "12", icon: Receipt, color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-100", trend: "-5%" },
  ];

  return (
    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Member Management</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage all gym members from one centralized dashboard.</p>
        </div>
        
        {(canAddMember || role === "admin" || role === "superadmin" || role === "owner") && (
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)] hidden md:flex items-center gap-2">
              <Download size={16} /> Template
            </button>
            <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)] hidden md:flex items-center gap-2">
              <Upload size={16} /> Import
            </button>
            <button onClick={() => setShowAddMember(true)} className="px-5 py-2.5 bg-[#4f46e5] text-white rounded-xl text-sm font-bold hover:bg-[#4338ca] transition-all shadow-lg shadow-[#4f46e5]/25 flex items-center gap-2">
              <UserPlus size={18} /> Add Member
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl border ${s.bg} ${s.color} flex items-center justify-center shadow-sm`}>
                <s.icon size={22} strokeWidth={2.5} />
              </div>
              <span className={`text-[10px] font-bold ${s.trend.startsWith('+') ? 'text-green-700 bg-green-100' : s.trend.startsWith('-') ? 'text-red-700 bg-red-100' : 'text-gray-600 bg-gray-100'} px-2 py-1 rounded-md tracking-wide`}>
                {s.trend}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{s.value}</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>

      <MembersFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <MembersTable 
        members={members.filter((m: any) => 
          !searchTerm || 
          m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.mobileNo?.includes(searchTerm)
        )} 
        onViewMember={setSelectedMember} 
        onAddMember={() => setShowAddMember(true)}
      />

      {showAddMember && (
        <AddMemberModal 
          onClose={() => setShowAddMember(false)} 
          onSave={() => setShowAddMember(false)} 
        />
      )}

      {selectedMember && (
        <MemberDetails 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}
    </div>
  );
};

export default MembersPanel;
