import React, { useState } from 'react';
import { X, User, Activity, CreditCard, Calendar, Dumbbell, Salad, Camera, FileSignature, StickyNote, History, Edit, Repeat, FileSpreadsheet, QrCode } from 'lucide-react';

interface Props {
  member: any;
  onClose: () => void;
}

export const MemberDetails: React.FC<Props> = ({ member, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'membership', label: 'Membership', icon: CreditCard },
    { id: 'payments', label: 'Payments', icon: FileSpreadsheet },
    { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
    { id: 'diet', label: 'Diet Plan', icon: Salad },
    { id: 'body', label: 'Body Measurements', icon: Activity },
    { id: 'photos', label: 'Progress Photos', icon: Camera },
    { id: 'documents', label: 'Documents', icon: FileSignature },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'timeline', label: 'Activity Timeline', icon: History },
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 z-[1000] flex flex-col animate-in slide-in-from-bottom-8 duration-300 overflow-hidden">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-bold text-2xl shadow-inner">
            {member.name ? member.name.substring(0, 2).toUpperCase() : 'M'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {member.name || 'Unknown Member'}
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">Active</span>
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 font-medium">
              <span>ID: {member.memberId || `#${member.id?.substring(0,6)}`}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>{member.plan || 'No Plan'}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Joined {member.joined || 'Unknown'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:text-[#4f46e5] hover:border-[#4f46e5]/30 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2">
            <Edit size={16} /> Edit
          </button>
          <button className="px-4 py-2 bg-[#4f46e5]/5 border border-[#4f46e5]/20 text-[#4f46e5] hover:bg-[#4f46e5]/10 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2">
            <Repeat size={16} /> Renew
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 hidden md:flex">
            <QrCode size={16} /> QR Code
          </button>
          <div className="w-px h-8 bg-gray-200 mx-2 hidden md:block"></div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-all" title="Close Profile">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-4 space-y-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-[#4f46e5]/10 text-[#4f46e5] shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <t.icon size={18} className={activeTab === t.id ? 'text-[#4f46e5]' : 'text-gray-400'} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 md:p-8">
          
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Remaining Days</p>
                  <p className="text-3xl font-bold text-[#4f46e5]">45</p>
                  <p className="text-xs font-medium text-gray-500 mt-2">Expires on Oct 12, 2026</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Last Visit</p>
                  <p className="text-3xl font-bold text-gray-900">Today</p>
                  <p className="text-xs font-medium text-green-600 mt-2 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Checked in at 08:30 AM</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Outstanding Balance</p>
                  <p className="text-3xl font-bold text-gray-900">$0.00</p>
                  <p className="text-xs font-medium text-gray-500 mt-2">All payments clear</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Assigned Trainer</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">Mike Johnson</p>
                  <p className="text-xs font-medium text-[#4f46e5] mt-2 cursor-pointer hover:underline">View Profile</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Personal Information</h3>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-y-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm font-medium text-gray-900">{member.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="text-sm font-medium text-gray-900">{member.mobileNo || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Gender</p>
                      <p className="text-sm font-medium text-gray-900">Male</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date of Birth</p>
                      <p className="text-sm font-medium text-gray-900">14 Aug 1995</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="text-sm font-medium text-gray-900">123 Fitness Ave, NY 10001</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Current Body Stats</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weight</p>
                        <p className="text-sm font-bold text-gray-900">76 kg</p>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4f46e5] w-[70%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">BMI</p>
                        <p className="text-sm font-bold text-gray-900">24.5 (Normal)</p>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[50%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Body Fat</p>
                        <p className="text-sm font-bold text-gray-900">18%</p>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400 w-[40%]"></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fitness Goal</p>
                      <span className="inline-flex px-3 py-1 bg-[#4f46e5]/10 text-[#4f46e5] rounded-lg text-xs font-bold">Muscle Gain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center min-h-[500px] bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                {tabs.find(t => t.id === activeTab)?.icon({ size: 40 })}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{tabs.find(t => t.id === activeTab)?.label} Data</h2>
              <p className="text-gray-500 text-sm max-w-md text-center leading-relaxed">
                This section is under construction. It will display comprehensive tracking and historical data for this member.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
