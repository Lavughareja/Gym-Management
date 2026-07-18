import React, { useState, useRef, useEffect } from 'react';
import { Search, RefreshCw, ChevronDown } from 'lucide-react';

interface MembersFilterProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Expiring Soon', value: 'expiring' },
  { label: 'Expired', value: 'expired' },
  { label: 'Frozen', value: 'frozen' },
];

export const MembersFilter: React.FC<MembersFilterProps> = ({ searchTerm, setSearchTerm }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Search */}
        <div className="flex-1 w-full">
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Search Members</label>
          <div className="relative h-[38px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} strokeWidth={2} />
            <input
              type="text"
              placeholder="Search by ID, Name, Phone, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full pr-3 rounded-lg border border-slate-200 focus:border-slate-300 outline-none transition-all text-[13px] text-slate-700 bg-white placeholder:text-slate-400"
              style={{ paddingLeft: '34px' }}
            />
          </div>
        </div>

        {/* Custom Status Dropdown */}
        <div className="w-full md:w-[170px]" ref={statusRef}>
          <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Status</label>
          <div className="relative h-[38px]">
            <button
              type="button"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className={`w-full h-full pl-3 pr-8 rounded-lg border ${isStatusOpen ? 'border-slate-300' : 'border-slate-200 hover:border-slate-300'} outline-none transition-all text-[13px] text-slate-700 bg-white flex items-center justify-between cursor-pointer`}
            >
              <span className="truncate">{selectedStatus.label}</span>
              <ChevronDown className={`absolute right-3 text-slate-400 transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} size={15} strokeWidth={2} />
            </button>
            
            {isStatusOpen && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-slate-200 rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] py-1.5 z-50 overflow-hidden">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setSelectedStatus(option);
                      setIsStatusOpen(false);
                    }}
                    className={`px-3 py-2 text-[13px] cursor-pointer transition-colors flex items-center ${
                      selectedStatus.value === option.value
                        ? 'bg-slate-100 font-semibold text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center h-[38px]">
          <button className="h-full w-[38px] flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-[#4f46e5] rounded-lg transition-colors cursor-pointer" title="Reset Filters">
            <RefreshCw size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};
