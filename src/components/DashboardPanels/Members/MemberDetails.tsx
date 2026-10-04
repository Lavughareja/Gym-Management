import React, { useState, useEffect } from 'react';
import { X, User, Activity, CreditCard, Calendar, Dumbbell, Salad, Camera, StickyNote, QrCode, Loader2, CheckCircle2, Clock, Mail, AlertCircle, Droplets, ArrowRight } from 'lucide-react';
import { getMemberDetailsApi } from '../../../services/apis/memberApis';

interface Props {
  member: any;
  onClose: () => void;
}

export const MemberDetails: React.FC<Props> = ({ member: initialMember, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [memberData, setMemberData] = useState<any>(null);

  useEffect(() => {
    if (initialMember?._id || initialMember?.id) {
      setLoading(true);
      getMemberDetailsApi(initialMember._id || initialMember.id)
        .then(res => setMemberData(res.data))
        .catch(err => console.error("Failed to fetch member details", err))
        .finally(() => setLoading(false));
    }
  }, [initialMember]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
    { id: 'diet', label: 'Diet Plan', icon: Salad },
    { id: 'body', label: 'Measurements', icon: Activity },
    { id: 'photos', label: 'Progress Photos', icon: Camera },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  let m = memberData?.member || initialMember;
  const recentAttendance = memberData?.recentAttendance || [];
  const invoices = memberData?.invoices || [];

  // Polyfill missing plan data for older database records (from before backend was updated)
  if (m && invoices.length > 0) {
    const latestInvoice = invoices[0];
    
    if (!m.planEndDate && latestInvoice.endDate) {
      m = { ...m, planEndDate: latestInvoice.endDate };
    }
    
    if (m.planId && typeof m.planId !== 'object') {
      const pIdStr = m.planId.toString();
      let name = latestInvoice.planName;
      if (pIdStr === '111111111111111111111111') name = 'Starter';
      else if (pIdStr === '222222222222222222222222') name = 'Plus';
      else if (pIdStr === '333333333333333333333333') name = 'Professional';
      else if (pIdStr === '444444444444444444444444') name = 'Enterprise';
      
      m = { ...m, planId: { _id: pIdStr, name: name || 'Custom Plan' } };
    }
  }

  const getRemainingDays = () => {
    if (!m.planEndDate) return 0;
    const diff = new Date(m.planEndDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };
  const remainingDays = getRemainingDays();
  const isActive = m.isActive || remainingDays > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-5xl bg-[#f8fafc] h-full flex flex-col shadow-2xl animate-in slide-in-from-right-8 duration-300">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center z-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#4f46e5] flex items-center justify-center font-black text-2xl shadow-inner border border-indigo-100">
              {m.fullName ? m.fullName.substring(0, 2).toUpperCase() : m.name ? m.name.substring(0, 2).toUpperCase() : 'M'}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{m.fullName || m.name || 'Unknown Member'}</h2>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {isActive ? 'Active' : 'Expired'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><QrCode size={14}/> ID: {m.biometricId || m.memberId || `#${(m._id || m.id)?.substring(0,6)}`}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="text-indigo-600 font-bold">{m.planId?.name || m.plan || 'No Plan'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span>Joined {m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-GB') : 'Unknown'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1">Expires: <span className={isActive ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>{m.planEndDate ? new Date(m.planEndDate).toLocaleDateString('en-GB') : 'N/A'}</span></span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 rounded-xl transition-all shadow-sm">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden relative w-full h-full">
          
          {/* Sidebar Tabs */}
          <div className="w-64 shrink-0 bg-white border-r border-slate-200 overflow-y-auto hidden md:block py-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="px-4 space-y-1">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activeTab === t.id 
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <t.icon size={18} className={activeTab === t.id ? 'text-indigo-600' : 'text-slate-400'} strokeWidth={2.5} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 relative">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={36} />
                <p className="text-slate-500 font-medium">Loading member data...</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
                    
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden min-h-[120px]">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Remaining Days</p>
                        <p className={`text-4xl font-black ${remainingDays > 0 ? 'text-[#4f46e5]' : 'text-rose-500'}`}>{remainingDays}</p>
                        <p className="text-xs font-medium text-slate-500 mt-2">Expires: {m.planEndDate ? new Date(m.planEndDate).toLocaleDateString('en-GB') : 'N/A'}</p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Last Visit</p>
                        <p className="text-2xl font-black text-slate-900">{recentAttendance.length > 0 ? new Date(recentAttendance[0].timestamp).toLocaleDateString('en-GB') : 'None'}</p>
                        {recentAttendance.length > 0 && (
                          <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                            <Clock size={12}/> {new Date(recentAttendance[0].timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        )}
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Invoices</p>
                        <p className="text-2xl font-black text-slate-900">{invoices.length}</p>
                        <p className="text-xs font-medium text-slate-500 mt-2">Total payments</p>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile No</p>
                        <p className="text-xl font-black text-slate-900">{m.mobileNo || '-'}</p>
                        <p className="text-xs font-medium text-slate-500 mt-2">Primary contact</p>
                      </div>
                    </div>

                    {/* Personal Info Grid */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2"><User size={18} className="text-[#4f46e5]" /> Personal Information</h3>
                      </div>
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {m.email || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Group</p>
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-2"><Droplets size={14} className="text-rose-400"/> {m.bloodGroup || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Emergency Contact</p>
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-2"><AlertCircle size={14} className="text-amber-500"/> {m.emergencyNumber || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Birth</p>
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-2"><Calendar size={14} className="text-slate-400"/> {m.dateOfBirth ? new Date(m.dateOfBirth).toLocaleDateString('en-GB') : '-'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ATTENDANCE TAB */}
                {activeTab === 'attendance' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-black text-slate-900 mb-6">Attendance History</h2>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      {recentAttendance.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentAttendance.map((record: any, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                <td className="px-6 py-4 text-sm font-bold text-slate-700">{new Date(record.timestamp).toLocaleDateString('en-GB', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-500">{new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                                <td className="px-6 py-4 text-right">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700">
                                    <CheckCircle2 size={12} strokeWidth={3}/> {record.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-16 flex flex-col items-center justify-center text-center">
                          <Clock size={40} className="text-slate-300 mb-4" />
                          <p className="text-slate-900 font-bold mb-1">No attendance records yet</p>
                          <p className="text-slate-500 text-sm">When the member scans in, it will appear here.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PAYMENTS TAB (UPDATED WITH PLAN NAMES, EXACT TIMES & EXPIRY) */}
                {activeTab === 'payments' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2"><CreditCard size={18} className="text-indigo-500"/> Payment History & Purchased Plans</h3>
                      </div>
                      {invoices.length > 0 ? (
                        <div className="p-4 overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Invoice No</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Plan Purchased</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Purchase Date</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Valid Till</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoices.map((inv: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                  <td className="px-4 py-3.5 border-b border-slate-50 text-sm font-bold text-indigo-600">{inv.invoiceNumber}</td>
                                  <td className="px-4 py-3.5 border-b border-slate-50 text-sm font-bold text-slate-800">{inv.planName || 'Custom Plan'}</td>
                                  <td className="px-4 py-3.5 border-b border-slate-50 text-sm font-medium text-slate-500">{new Date(inv.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                  <td className="px-4 py-3.5 border-b border-slate-50 text-sm font-bold text-slate-700">{inv.endDate ? new Date(inv.endDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                                  <td className="px-4 py-3.5 border-b border-slate-50 text-sm font-black text-slate-900">₹{inv.amount}</td>
                                  <td className="px-4 py-3.5 border-b border-slate-50 text-right">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${inv.status?.toLowerCase() === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                      {inv.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-16 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4"><CreditCard size={32} className="text-slate-300" /></div>
                          <p className="text-slate-900 font-bold mb-1">No payment history</p>
                          <p className="text-slate-500 text-sm max-w-xs">When the member purchases a plan, invoices will appear here.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* WORKOUT TAB */}
                {activeTab === 'workout' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                    <h2 className="text-xl font-black text-slate-900 mb-6">Workout Plans</h2>
                    {memberData?.workouts && memberData.workouts.length > 0 ? (
                      memberData.workouts.map((plan: any, i: number) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Dumbbell size={18} className="text-[#4f46e5]"/> {plan.date || 'Assigned Plan'}</h3>
                          </div>
                          <div className="p-6">
                            {plan.exercises && plan.exercises.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {plan.exercises.map((ex: any, j: number) => (
                                  <div key={j} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <div>
                                      <p className="font-bold text-slate-900 text-sm">{ex.name}</p>
                                      {ex.notes && <p className="text-xs font-medium text-slate-500 mt-0.5">{ex.notes}</p>}
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                      <span className="bg-white border border-slate-200 text-[#4f46e5] text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">{ex.sets}s × {ex.reps}r</span>
                                      {ex.weight && <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{ex.weight}</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-slate-500 italic">No exercises logged in this plan.</p>
                            )}
                            {plan.generalNotes && (
                              <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-sm text-slate-700">
                                <strong>Notes:</strong> {plan.generalNotes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
                        <Dumbbell size={40} className="text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-900 font-bold mb-1">No workout plans</p>
                        <p className="text-slate-500 text-sm">Assign a workout routine to see it here.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* DIET TAB */}
                {activeTab === 'diet' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                    <h2 className="text-xl font-black text-slate-900 mb-6">Diet Plans</h2>
                    {memberData?.diets && memberData.diets.length > 0 ? (
                      memberData.diets.map((plan: any, i: number) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Salad size={18} className="text-emerald-500"/> {plan.date || 'Assigned Diet'}</h3>
                            {plan.waterIntake && <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-xs font-bold border border-blue-100">💧 {plan.waterIntake}L Water</span>}
                          </div>
                          <div className="p-6">
                            {plan.meals && plan.meals.length > 0 ? (
                              <div className="space-y-3">
                                {plan.meals.map((meal: any, j: number) => (
                                  <div key={j} className="flex items-start justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <div>
                                      <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest mb-1 block">{meal.mealType}</span>
                                      <p className="font-bold text-slate-900 text-sm leading-relaxed">{meal.foodItems}</p>
                                      {meal.notes && <p className="text-xs font-medium text-slate-500 mt-1">{meal.notes}</p>}
                                    </div>
                                    {meal.calories && (
                                      <span className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm whitespace-nowrap">
                                        {meal.calories} kcal
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-slate-500 italic">No meals logged.</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
                        <Salad size={40} className="text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-900 font-bold mb-1">No diet plans</p>
                        <p className="text-slate-500 text-sm">Assign a diet plan to see it here.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* BODY TAB */}
                {activeTab === 'body' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                    <h2 className="text-xl font-black text-slate-900 mb-6">Body Measurements</h2>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                      {memberData?.measurements && memberData.measurements.length > 0 ? (
                        <div className="space-y-10">
                          {memberData.measurements.map((m: any, i: number) => (
                            <div key={i} className="relative">
                              {i > 0 && <hr className="my-10 border-slate-100" />}
                              <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 bg-slate-50 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-slate-100">
                                  <Activity size={16} className="text-[#4f46e5]" /> Date: {m.date || new Date(m.createdAt).toLocaleDateString('en-GB')}
                                </h3>
                                {m.bmi && (
                                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${m.bmi > 25 ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                    BMI: {m.bmi}
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                  { label: 'Weight', value: m.weight, unit: 'kg' },
                                  { label: 'Height', value: m.height, unit: 'cm' },
                                  { label: 'Body Fat', value: m.bodyFat, unit: '%' },
                                  { label: 'Chest', value: m.chest, unit: 'cm' },
                                  { label: 'Waist', value: m.waist, unit: 'cm' },
                                  { label: 'Hips', value: m.hips, unit: 'cm' },
                                  { label: 'Arms', value: m.arms, unit: 'cm' },
                                  { label: 'Thighs', value: m.thighs, unit: 'cm' }
                                ].map((stat, idx) => stat.value ? (
                                  <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-xl font-black text-slate-900">{stat.value}<span className="text-xs font-semibold text-slate-400 ml-1">{stat.unit}</span></p>
                                  </div>
                                ) : null)}
                              </div>
                              {m.notes && <p className="text-sm text-slate-600 mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100"><strong>Notes:</strong> {m.notes}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <Activity size={40} className="text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-900 font-bold mb-1">No body measurements</p>
                          <p className="text-slate-500 text-sm">Measurements will be tracked here.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Under Construction Fallback */}
                {!['overview', 'attendance', 'payments', 'workout', 'diet', 'body'].includes(activeTab) && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-300 mb-6 border border-indigo-100">
                      {tabs.find(t => t.id === activeTab)?.icon({ size: 36, strokeWidth: 2 })}
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-2">{tabs.find(t => t.id === activeTab)?.label}</h2>
                    <p className="text-slate-500 text-sm max-w-md text-center font-medium">
                      This section is currently under development. Check back soon for beautiful data visualizations.
                    </p>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
