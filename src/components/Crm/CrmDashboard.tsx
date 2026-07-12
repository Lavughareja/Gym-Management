import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { fetchCrmDashboardAction } from "../../redux/actions/crmActions";
import { Users, PhoneCall, CalendarClock, UserCheck, TrendingUp, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a28bfe', '#fd79a8'];

const CrmDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dashboard, loading } = useAppSelector((state) => state.crm);

  useEffect(() => {
    dispatch(fetchCrmDashboardAction());
  }, [dispatch]);

  if (loading || !dashboard) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading dashboard...</div>;
  }

  const formatDataForPie = (dataArray: any[]) => {
    if (!dataArray || dataArray.length === 0) return [];
    return dataArray.map((item) => ({ name: item._id, value: item.count }));
  };

  const sourceData = formatDataForPie(dashboard.sourceDistribution);
  const statusData = formatDataForPie(dashboard.statusDistribution);

  return (
    <div className="crm-dashboard">
      <div className="stats-grid" style={{ marginBottom: 30 }}>
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ background: 'rgba(0, 136, 254, 0.1)' }}>
            <Users size={22} style={{ color: '#0088FE' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboard.totalLeads}</span>
            <span className="stat-label">Total Leads</span>
          </div>
        </div>
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ background: 'rgba(0, 196, 159, 0.1)' }}>
            <PhoneCall size={22} style={{ color: '#00C49F' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboard.todaysLeads}</span>
            <span className="stat-label">Today's Leads</span>
          </div>
        </div>
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ background: 'rgba(255, 187, 40, 0.1)' }}>
            <CalendarClock size={22} style={{ color: '#FFBB28' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboard.todaysFollowUps}</span>
            <span className="stat-label">Today's Follow-ups</span>
          </div>
        </div>
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ background: 'rgba(255, 128, 66, 0.1)' }}>
            <UserCheck size={22} style={{ color: '#FF8042' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboard.joinedMembers}</span>
            <span className="stat-label">Joined Members</span>
          </div>
        </div>
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ background: 'rgba(162, 139, 254, 0.1)' }}>
            <TrendingUp size={22} style={{ color: '#a28bfe' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboard.conversionRate}%</span>
            <span className="stat-label">Conversion Rate</span>
          </div>
        </div>
        <div className="gym-card stat-card">
          <div className="stat-icon-container" style={{ background: 'rgba(253, 121, 168, 0.1)' }}>
            <AlertTriangle size={22} style={{ color: '#fd79a8' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{dashboard.lostLeads}</span>
            <span className="stat-label">Lost Leads</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="gym-card">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Lead Sources</h3>
          {sourceData.length > 0 ? (
             <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-muted">No data available.</p>
          )}
        </div>

        <div className="gym-card">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Lead Statuses</h3>
          {statusData.length > 0 ? (
             <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} />
                  <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} contentStyle={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--border-color)' }} />
                  <Bar dataKey="value" fill="#00C49F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-muted">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrmDashboard;
