import React, { useState, useEffect } from 'react';
import {
  X, User, Activity, CreditCard, Calendar, Dumbbell, Salad,
  Camera, StickyNote, QrCode, Loader2, CheckCircle2, Clock,
  Mail, AlertCircle, Droplets, Phone, TrendingUp,
  Image as ImageIcon, FileText, Zap
} from 'lucide-react';
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
        .catch(err => console.error('Failed to fetch member details', err))
        .finally(() => setLoading(false));
    }
  }, [initialMember]);

  const tabs = [
    { id: 'overview',    label: 'Overview',        Icon: User },
    { id: 'attendance',  label: 'Attendance',       Icon: Calendar },
    { id: 'payments',    label: 'Payments',         Icon: CreditCard },
    { id: 'workout',     label: 'Workout Plan',     Icon: Dumbbell },
    { id: 'diet',        label: 'Diet Plan',        Icon: Salad },
    { id: 'body',        label: 'Measurements',     Icon: Activity },
    { id: 'photos',      label: 'Progress Photos',  Icon: Camera },
    { id: 'notes',       label: 'Notes',            Icon: StickyNote },
  ];

  let m = memberData?.member || initialMember;
  const recentAttendance = memberData?.recentAttendance || [];
  const invoices = memberData?.invoices || [];

  if (m && invoices.length > 0) {
    const latestInvoice = invoices[0];
    if (!m.planEndDate && latestInvoice.endDate) m = { ...m, planEndDate: latestInvoice.endDate };
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
    if (!m?.planEndDate) return 0;
    const diff = new Date(m.planEndDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const remainingDays = getRemainingDays();
  const isActive = m?.isActive || remainingDays > 0;
  const initials = m?.fullName
    ? m.fullName.substring(0, 2).toUpperCase()
    : m?.name ? m.name.substring(0, 2).toUpperCase() : 'M';

  /* ---- shared style helpers ---- */
  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)', borderRadius: '14px',
    border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', justifyContent: 'flex-end',
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', maxWidth: '940px', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg-secondary)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.25)',
        animation: 'mdSlideIn 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}>

        {/* ── HEADER ── */}
        <div style={{
          flexShrink: 0,
          background: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          padding: '18px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <div style={{
              width: '52px', height: '52px', flexShrink: 0, borderRadius: '14px',
              background: 'linear-gradient(135deg, var(--primary), #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: '18px',
              boxShadow: '0 4px 14px var(--primary-glow)',
            }}>{initials}</div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                  {m?.fullName || m?.name || 'Unknown Member'}
                </h2>
                <span style={{
                  padding: '3px 10px', borderRadius: '20px',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: isActive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                  color: isActive ? '#10b981' : '#ef4444',
                  border: `1px solid ${isActive ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
                }}>
                  {isActive ? 'Active' : 'Expired'}
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap',
                fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500,
              }}>
                <QrCode size={12} />
                <span>{m?.biometricId || m?.memberId || `#${(m?._id || m?.id)?.substring(0, 6)}`}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{m?.planId?.name || m?.plan || 'No Plan'}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>Joined {m?.createdAt ? new Date(m.createdAt).toLocaleDateString('en-GB') : '—'}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>Expires: <span style={{ color: isActive ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                  {m?.planEndDate ? new Date(m.planEndDate).toLocaleDateString('en-GB') : 'N/A'}
                </span></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              flexShrink: 0, width: '36px', height: '36px',
              border: '1px solid var(--border-color)', borderRadius: '10px',
              background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = 'rgba(239,68,68,0.1)';
              b.style.color = '#ef4444';
              b.style.borderColor = 'rgba(239,68,68,0.3)';
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = 'transparent';
              b.style.color = 'var(--text-muted)';
              b.style.borderColor = 'var(--border-color)';
            }}
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── BODY ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

          {/* Sidebar */}
          <div style={{
            width: '196px', flexShrink: 0,
            background: 'var(--bg-card)',
            borderRight: '1px solid var(--border-color)',
            overflowY: 'auto', overflowX: 'hidden',
            padding: '10px 8px',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            {tabs.map(tab => {
              const Icon = tab.Icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px', borderRadius: '10px',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontSize: '13px', fontWeight: active ? 700 : 500,
                    background: active ? 'var(--primary-light)' : 'transparent',
                    color: active ? 'var(--primary)' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = 'var(--accent-light)';
                      b.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = 'transparent';
                      b.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <Icon size={15} strokeWidth={2.5}
                    style={{ color: active ? 'var(--primary)' : 'var(--text-muted)', flexShrink: 0 }}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{
            flex: 1, overflowY: 'auto', overflowX: 'hidden',
            padding: '24px', background: 'var(--bg-secondary)', minWidth: 0,
          }}>
            {loading ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', gap: '12px',
              }}>
                <Loader2 size={36} style={{ color: 'var(--primary)', animation: 'mdSpin 1s linear infinite' }} />
                <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-muted)' }}>Loading member data...</p>
              </div>
            ) : (
              <div style={{ maxWidth: '660px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* OVERVIEW */}
                {activeTab === 'overview' && (<>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <StatCard label="Remaining Days" value={String(remainingDays)} accent={remainingDays > 0 ? 'var(--primary)' : '#ef4444'}
                      sub={`Expires: ${m?.planEndDate ? new Date(m.planEndDate).toLocaleDateString('en-GB') : 'N/A'}`} Icon={Clock} />
                    <StatCard label="Last Visit"
                      value={recentAttendance.length > 0 ? new Date(recentAttendance[0].timestamp).toLocaleDateString('en-GB') : 'None'}
                      sub={recentAttendance.length > 0 ? new Date(recentAttendance[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No visits yet'}
                      accent="#10b981" Icon={Zap} />
                    <StatCard label="Total Invoices" value={String(invoices.length)} sub="Payment history" accent="#f59e0b" Icon={CreditCard} />
                    <StatCard label="Mobile No" value={m?.mobileNo || '—'} sub="Primary contact" accent="#6366f1" Icon={Phone} />
                  </div>
                  <div style={cardStyle}>
                    <div style={{ padding: '13px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={15} style={{ color: 'var(--primary)' }} />
                      <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Personal Information</h3>
                    </div>
                    <div style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }}>
                      <InfoRow Icon={Mail} label="Email Address" value={m?.email || '—'} />
                      <InfoRow Icon={Droplets} label="Blood Group" value={m?.bloodGroup || '—'} iconColor="#ef4444" />
                      <InfoRow Icon={AlertCircle} label="Emergency Contact" value={m?.emergencyNumber || '—'} iconColor="#f59e0b" />
                      <InfoRow Icon={Calendar} label="Date of Birth" value={m?.dateOfBirth ? new Date(m.dateOfBirth).toLocaleDateString('en-GB') : '—'} />
                    </div>
                  </div>
                </>)}

                {/* ATTENDANCE */}
                {activeTab === 'attendance' && (<>
                  <PageTitle Icon={Calendar} title="Attendance History" />
                  <div style={cardStyle}>
                    {recentAttendance.length > 0 ? (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                              <Th>Date</Th><Th>Time</Th><Th right>Status</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentAttendance.map((r: any, i: number) => (
                              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <Td>{new Date(r.timestamp).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</Td>
                                <Td muted>{new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Td>
                                <td style={{ padding: '11px 16px', textAlign: 'right' }}>
                                  <Badge color="#10b981"><CheckCircle2 size={11} strokeWidth={3} /> {r.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : <EmptyState Icon={Clock} title="No attendance records yet" sub="When the member scans in, it will appear here." />}
                  </div>
                </>)}

                {/* PAYMENTS */}
                {activeTab === 'payments' && (<>
                  <PageTitle Icon={CreditCard} title="Payment History" />
                  <div style={cardStyle}>
                    {invoices.length > 0 ? (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '540px' }}>
                          <thead>
                            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                              <Th>Invoice</Th><Th>Plan</Th><Th>Date</Th><Th>Valid Till</Th><Th>Amount</Th><Th right>Status</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoices.map((inv: any, i: number) => (
                              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <Td><span style={{ color: 'var(--primary)', fontWeight: 700 }}>{inv.invoiceNumber}</span></Td>
                                <Td>{inv.planName || 'Custom Plan'}</Td>
                                <Td muted>{new Date(inv.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</Td>
                                <Td>{inv.endDate ? new Date(inv.endDate).toLocaleDateString('en-GB') : 'N/A'}</Td>
                                <Td><span style={{ fontWeight: 800 }}>Rs.{inv.amount}</span></Td>
                                <td style={{ padding: '11px 16px', textAlign: 'right' }}>
                                  <Badge color={inv.status?.toLowerCase() === 'paid' ? '#10b981' : '#f59e0b'}>{inv.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : <EmptyState Icon={CreditCard} title="No payment history" sub="When the member purchases a plan, invoices will appear here." />}
                  </div>
                </>)}

                {/* WORKOUT */}
                {activeTab === 'workout' && (<>
                  <PageTitle Icon={Dumbbell} title="Workout Plans" />
                  {memberData?.workouts && memberData.workouts.length > 0 ? (
                    memberData.workouts.map((plan: any, i: number) => (
                      <div key={i} style={cardStyle}>
                        <div style={{ padding: '13px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Dumbbell size={15} style={{ color: 'var(--primary)' }} />
                          <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{plan.date || 'Assigned Plan'}</h3>
                        </div>
                        <div style={{ padding: '16px 20px' }}>
                          {plan.exercises && plan.exercises.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                              {plan.exercises.map((ex: any, j: number) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                  <div>
                                    <p style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>{ex.name}</p>
                                    {ex.notes && <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', margin: 0 }}>{ex.notes}</p>}
                                  </div>
                                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>{ex.sets}s x {ex.reps}r</span>
                                    {ex.weight && <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>{ex.weight}</p>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No exercises logged.</p>}
                        </div>
                      </div>
                    ))
                  ) : <div style={cardStyle}><EmptyState Icon={Dumbbell} title="No workout plans" sub="Assign a workout routine to see it here." /></div>}
                </>)}

                {/* DIET */}
                {activeTab === 'diet' && (<>
                  <PageTitle Icon={Salad} title="Diet Plans" />
                  {memberData?.diets && memberData.diets.length > 0 ? (
                    memberData.diets.map((plan: any, i: number) => (
                      <div key={i} style={cardStyle}>
                        <div style={{ padding: '13px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Salad size={15} style={{ color: '#10b981' }} />
                            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{plan.date || 'Assigned Diet'}</h3>
                          </div>
                          {plan.waterIntake && <span style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Water: {plan.waterIntake}L</span>}
                        </div>
                        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {plan.meals && plan.meals.length > 0 ? plan.meals.map((meal: any, j: number) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                              <div>
                                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#10b981', display: 'block', marginBottom: '3px' }}>{meal.mealType}</span>
                                <p style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>{meal.foodItems}</p>
                                {meal.notes && <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>{meal.notes}</p>}
                              </div>
                              {meal.calories && <span style={{ fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '3px 10px', borderRadius: '6px', color: 'var(--text-secondary)' }}>{meal.calories} kcal</span>}
                            </div>
                          )) : <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No meals logged.</p>}
                        </div>
                      </div>
                    ))
                  ) : <div style={cardStyle}><EmptyState Icon={Salad} title="No diet plans" sub="Assign a diet plan to see it here." /></div>}
                </>)}

                {/* MEASUREMENTS */}
                {activeTab === 'body' && (<>
                  <PageTitle Icon={Activity} title="Body Measurements" />
                  {memberData?.measurements && memberData.measurements.length > 0 ? (
                    memberData.measurements.map((meas: any, i: number) => (
                      <div key={i} style={cardStyle}>
                        <div style={{ padding: '13px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={15} style={{ color: 'var(--primary)' }} />
                            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Date: {meas.date || new Date(meas.createdAt).toLocaleDateString('en-GB')}</h3>
                          </div>
                          {meas.bmi && <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: meas.bmi > 25 ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)', color: meas.bmi > 25 ? '#ef4444' : '#10b981' }}>BMI: {meas.bmi}</span>}
                        </div>
                        <div style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                            {[
                              { label: 'Weight', value: meas.weight, unit: 'kg' },
                              { label: 'Height', value: meas.height, unit: 'cm' },
                              { label: 'Body Fat', value: meas.bodyFat, unit: '%' },
                              { label: 'Chest', value: meas.chest, unit: 'cm' },
                              { label: 'Waist', value: meas.waist, unit: 'cm' },
                              { label: 'Hips', value: meas.hips, unit: 'cm' },
                              { label: 'Arms', value: meas.arms, unit: 'cm' },
                              { label: 'Thighs', value: meas.thighs, unit: 'cm' },
                            ].filter(s => s.value).map((stat, idx) => (
                              <div key={idx} style={{ textAlign: 'center', padding: '14px 8px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{stat.label}</p>
                                <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, margin: 0 }}>
                                  {stat.value}<span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '2px' }}>{stat.unit}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                          {meas.notes && <div style={{ marginTop: '12px', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-primary)' }}><strong>Notes:</strong> {meas.notes}</div>}
                        </div>
                      </div>
                    ))
                  ) : <div style={cardStyle}><EmptyState Icon={Activity} title="No body measurements" sub="Measurements will be tracked here." /></div>}
                </>)}

                {/* PHOTOS */}
                {activeTab === 'photos' && (<>
                  <PageTitle Icon={Camera} title="Progress Photos" />
                  <div style={cardStyle}><EmptyState Icon={ImageIcon} title="No progress photos" sub="Progress photos will appear here once uploaded." /></div>
                </>)}

                {/* NOTES */}
                {activeTab === 'notes' && (<>
                  <PageTitle Icon={StickyNote} title="Notes" />
                  <div style={cardStyle}><EmptyState Icon={FileText} title="No notes yet" sub="Member notes and trainer remarks will appear here." /></div>
                </>)}

              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mdSlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes mdSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

/* ─── Helper sub-components ─── */

function StatCard({ label, value, sub, accent, Icon }: { label: string; value: string; sub: string; accent: string; Icon: any }) {
  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-color)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '14px', right: '14px', width: '32px', height: '32px', borderRadius: '8px', background: `${accent}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
        <Icon size={16} />
      </div>
      <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{label}</p>
      <p style={{ fontSize: '26px', fontWeight: 800, color: accent, lineHeight: 1, marginBottom: '6px' }}>{value}</p>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{sub}</p>
    </div>
  );
}

function InfoRow({ Icon, label, value, iconColor }: { Icon: any; label: string; value: string; iconColor?: string }) {
  return (
    <div>
      <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{label}</p>
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
        <Icon size={13} style={{ color: iconColor || 'var(--text-muted)', flexShrink: 0 }} /> {value}
      </p>
    </div>
  );
}

function PageTitle({ Icon, title }: { Icon: any; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
      <Icon size={17} style={{ color: 'var(--primary)', flexShrink: 0 }} />
      <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>{title}</h2>
    </div>
  );
}

function EmptyState({ Icon, title, sub }: { Icon: any; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', gap: '12px' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        <Icon size={28} />
      </div>
      <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>{title}</p>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, maxWidth: '260px' }}>{sub}</p>
    </div>
  );
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', background: `${color}1a`, color }}>
      {children}
    </span>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th style={{ padding: '10px 16px', textAlign: right ? 'right' : 'left', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {children}
    </th>
  );
}

function Td({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <td style={{ padding: '11px 16px', fontSize: '13px', fontWeight: muted ? 500 : 600, color: muted ? 'var(--text-muted)' : 'var(--text-primary)' }}>
      {children}
    </td>
  );
}