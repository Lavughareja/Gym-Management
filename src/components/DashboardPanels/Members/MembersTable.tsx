import React, { useState } from 'react';
import { MoreVertical, FileText, QrCode, Trash2, Edit, Repeat, Eye, PauseCircle, UserCheck, Users, Plus, ArrowUpCircle, Snowflake } from 'lucide-react';

interface MembersTableProps {
  members: any[];
  onAddMember: () => void;
  onManage?: (action: 'freeze' | 'transfer' | 'upgrade', member: any) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const s = (status || 'active').toLowerCase();
  const map: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: '#dcfce7', color: '#16a34a', label: 'Active' },
    'expiring soon': { bg: '#ffedd5', color: '#ea580c', label: 'Expiring' },
    expired: { bg: '#fee2e2', color: '#dc2626', label: 'Expired' },
    inactive: { bg: '#fef3c7', color: '#d97706', label: 'Pending' },
    frozen: { bg: '#f1f5f9', color: '#475569', label: 'Frozen' },
  };
  const style = map[s] || map.frozen;
  return (
    <span style={{ background: style.bg, color: style.color, padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'inline-block' }}>
      {style.label}
    </span>
  );
};

const PaymentBadge = ({ status }: { status: string }) => {
  const s = (status || 'paid').toLowerCase();
  const map: Record<string, { bg: string; color: string; border: string }> = {
    paid: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    pending: { bg: '#fefce8', color: '#ca8a04', border: '#fef08a' },
    overdue: { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
    partial: { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  };
  const style = map[s] || map.paid;
  return (
    <span style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}`, padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'inline-block' }}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
};

export const MembersTable: React.FC<MembersTableProps> = ({ members, onAddMember, onManage }) => {
  return (
    <div style={{ width: '100%' }}>


      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              {['Member', 'Contact', 'Plan Details', 'Status', 'Payment', 'Today'].map((h, i) => (
                <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', width: 'auto' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 64, textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(79,70,229,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#4f46e5' }}>
                    <Users size={32} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>No Members Found</h3>
                  <p style={{ fontSize: 14, color: '#64748b', margin: '0 auto 24px', maxWidth: 320, lineHeight: 1.6 }}>Add your first member to start managing your gym from this centralized dashboard.</p>
                  <button onClick={onAddMember} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.2)' }}>
                    <Plus size={16} /> Add Member
                  </button>
                </td>
              </tr>
            ) : (
              members.map((m, idx) => {
                const rowId = m._id || m.id || String(idx);
                const initials = m.name ? m.name.substring(0, 2).toUpperCase() : 'M';
                const avatarBg = ['#ede9fe', '#dbeafe', '#dcfce7', '#fef3c7', '#fce7f3'][idx % 5];
                const avatarColor = ['#7c3aed', '#2563eb', '#16a34a', '#d97706', '#db2777'][idx % 5];
                const isSelected = false;
                const status = m.status || (m.planEndDate && new Date(m.planEndDate) >= new Date() ? 'Active' : 'Expired');

                return (
                  <tr key={rowId} style={{ borderBottom: '1px solid #f8fafc', background: '#fff', transition: 'background 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}
                  >

                    {/* Member name */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: avatarBg, color: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{m.name || 'Unknown'}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', marginTop: 2 }}>{m.memberId || `#${rowId.substring(0, 6)}`}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{m.mobileNo || '—'}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{m.email || '—'}</div>
                    </td>

                    {/* Plan */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{m.plan || 'N/A'}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Exp: {m.planEndDate ? new Date(m.planEndDate).toLocaleDateString('en-GB') : '—'}</div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <StatusBadge status={status} />
                    </td>

                    {/* Payment */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <PaymentBadge status={m.paymentStatus || 'Paid'} />
                    </td>

                    {/* Attendance */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span> Present
                      </span>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ padding: '14px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
          Showing <strong style={{ color: '#0f172a' }}>{members.length > 0 ? 1 : 0}</strong> – <strong style={{ color: '#0f172a' }}>{Math.min(members.length, 10)}</strong> of <strong style={{ color: '#0f172a' }}>{members.length}</strong> members
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, background: '#fff', color: '#94a3b8', border: '1px solid #e5e7eb', borderRadius: 10, cursor: 'pointer' }}>Previous</button>
          <button style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 10, cursor: 'pointer' }}>Next</button>
        </div>
      </div>
    </div>
  );
};
