import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface MembersFilterProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export const MembersFilter: React.FC<MembersFilterProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Search */}
        <div className="flex-1 w-full">
          <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Search Members</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID, Name, Phone, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50/50"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-44">
          <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Status</label>
          <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50/50">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
            <option value="frozen">Frozen</option>
          </select>
        </div>

        {/* Payment Filter */}
        <div className="w-full md:w-44">
          <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Payment</label>
          <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/20 outline-none transition-all text-sm bg-gray-50/50">
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="h-[42px] px-4 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:text-[#4f46e5] text-gray-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <Filter size={16} /> Advanced Filters
          </button>
          <button className="h-[42px] w-[42px] flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors" title="Reset Filters">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
