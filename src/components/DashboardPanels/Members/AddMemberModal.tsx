import React, { useState } from 'react';
import { X, User, HeartPulse, Lock, CheckCircle2, ChevronRight, UserPlus, CreditCard, Activity } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

export const AddMemberModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Personal Info", icon: User },
    { label: "Membership", icon: CreditCard },
    { label: "Trainer", icon: UserPlus },
    { label: "Health", icon: HeartPulse },
    { label: "Login Details", icon: Lock },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Member</h2>
            <p className="text-sm text-gray-500 mt-1">Complete all sections to register a new member to the gym.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-gray-50/50 border-r border-gray-100 p-4 overflow-y-auto hidden md:block">
            <div className="space-y-1">
              {tabs.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(i)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === i ? 'bg-white text-[#4f46e5] shadow-sm border border-gray-100' : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-700'}`}
                >
                  <div className="flex items-center gap-3">
                    <t.icon size={18} className={activeTab === i ? 'text-[#4f46e5]' : 'text-gray-400'} />
                    {t.label}
                  </div>
                  {activeTab === i && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
            
            <div className="mt-8 px-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">Ensure email and phone number are correct for WhatsApp automation and receipts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white">
            
            {activeTab === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><User size={20} className="text-[#4f46e5]" /> Personal Information</h3>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-[#4f46e5] hover:bg-[#4f46e5]/5 transition-all text-gray-400 flex-col gap-1">
                    <UserPlus size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-1">Profile Photo</h4>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size of 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name *</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gender</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Blood Group</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                      <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input type="tel" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Emergency Contact</label>
                    <input type="tel" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="+1 (555) 111-1111" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="123 Fitness Street" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard size={20} className="text-[#4f46e5]" /> Membership Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Membership Plan *</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>Select a plan...</option>
                      <option>Pro Monthly ($49.99)</option>
                      <option>Elite Quarterly ($129.99)</option>
                      <option>Ultimate Annual ($499.99)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Joining Date</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Start Date</label>
                    <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Membership Fee</label>
                    <input type="number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Discount Amount</label>
                    <input type="number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Final Amount</label>
                    <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-900 font-bold text-sm">$0.00</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Method</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>Cash</option>
                      <option>Credit Card</option>
                      <option>Bank Transfer</option>
                      <option>UPI / Online</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Status</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Partial</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5]" defaultChecked />
                    <label className="text-sm font-semibold text-gray-700">Auto Renew Membership</label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><UserPlus size={20} className="text-[#4f46e5]" /> Trainer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assigned Trainer</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>None</option>
                      <option>Mike Johnson</option>
                      <option>Sarah Williams</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 pt-2 md:col-span-2">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5]" />
                    <label className="text-sm font-semibold text-gray-700">Enroll in Personal Training (PT)</label>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Workout Batch</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>Morning (6AM - 10AM)</option>
                      <option>Afternoon (12PM - 4PM)</option>
                      <option>Evening (5PM - 10PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Workout Time</label>
                    <input type="time" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><HeartPulse size={20} className="text-[#4f46e5]" /> Health Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Height (cm)</label>
                    <input type="number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="175" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Weight (kg)</label>
                    <input type="number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="70" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target Goal</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white appearance-none">
                      <option>Weight Loss</option>
                      <option>Muscle Gain</option>
                      <option>Maintain Fitness</option>
                      <option>Athletic Performance</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Medical Conditions (If any)</label>
                    <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="Asthma, Joint pain, etc." />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Lock size={20} className="text-[#4f46e5]" /> Login Details</h3>
                <div className="p-5 bg-[#4f46e5]/5 border border-[#4f46e5]/10 rounded-xl mb-6">
                  <p className="text-sm text-[#4f46e5] font-medium leading-relaxed">
                    By default, the member's email address will be used as their username. You can assign a custom password below, or auto-generate one and email it to them.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-sm outline-none" value="john@example.com" disabled />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                    <div className="flex gap-2">
                      <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" placeholder="••••••••" />
                      <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap">
                        Generate
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 md:col-span-2">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5]" defaultChecked />
                    <label className="text-sm font-semibold text-gray-700">Send Welcome Email with App Download Link & Login Details</label>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500 hidden md:block">
            Step <span className="font-bold text-gray-900">{activeTab + 1}</span> of {tabs.length}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {activeTab > 0 && (
              <button 
                onClick={() => setActiveTab(activeTab - 1)}
                className="flex-1 md:flex-none px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Previous
              </button>
            )}
            
            {activeTab < tabs.length - 1 ? (
              <button 
                onClick={() => setActiveTab(activeTab + 1)}
                className="flex-1 md:flex-none px-6 py-2.5 bg-[#4f46e5] text-white font-semibold rounded-xl hover:bg-[#4338ca] shadow-md shadow-[#4f46e5]/20 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <div className="flex items-center gap-3 flex-1 md:flex-none">
                <button onClick={onClose} className="hidden md:block px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => onSave({})} className="flex-1 md:flex-none px-6 py-2.5 bg-[#4f46e5] text-white font-semibold rounded-xl hover:bg-[#4338ca] shadow-md shadow-[#4f46e5]/20 transition-colors whitespace-nowrap">
                  Save Member
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
