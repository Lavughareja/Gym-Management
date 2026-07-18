import React, { useState, useEffect } from "react";
import { Plus, X, Trash2, DollarSign, Loader, TrendingUp } from "lucide-react";
import { useAppDispatch } from "../../utils/reduxHooks";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { getExpensesApi, getExpenseSummaryApi, addExpenseApi, deleteExpenseApi } from "../../services/apis/expenseApis";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const overlayStyle: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20
};

const ExpenseTrackerPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [summary, setSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Equipment",
    description: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resExp, resSum] = await Promise.all([
        getExpensesApi(),
        getExpenseSummaryApi(30)
      ]);
      setExpenses(resExp.data.expenses || []);
      setSummary(resSum.data.summary || []);
    } catch (error) {
      console.error(error);
      dispatch(showSnackbar({ message: "Failed to load expenses", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    if (!newExpense.title || !newExpense.amount) {
      dispatch(showSnackbar({ message: "Title and Amount are required", type: "error" }));
      return;
    }
    setSubmitting(true);
    try {
      await addExpenseApi({
        title: newExpense.title,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        category: newExpense.category,
        description: newExpense.description
      });
      dispatch(showSnackbar({ message: "Expense added successfully", type: "success" }));
      setShowAddModal(false);
      setNewExpense({ title: "", amount: "", date: new Date().toISOString().split("T")[0], category: "Equipment", description: "" });
      fetchData();
    } catch (error) {
      dispatch(showSnackbar({ message: "Failed to add expense", type: "error" }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpenseApi(id);
      dispatch(showSnackbar({ message: "Expense deleted", type: "success" }));
      fetchData();
    } catch (error) {
      dispatch(showSnackbar({ message: "Failed to delete expense", type: "error" }));
    }
  };

  const totalSpent = summary.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 className="page-title">Expense Tracker</h2>
          <p className="page-subtitle">Track and manage your gym purchases</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.2)' }}
        >
          <Plus size={16} /> Add Expense
        </button>
      </div>

      <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
        <div className="gym-card" style={{ flex: "1 1 300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(239, 68, 68, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={24} style={{ color: "#ef4444" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600 }}>Total Spent (Last 30 Days)</p>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)" }}>₹{totalSpent.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="gym-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>Spending Trends</h3>
        <div style={{ height: 300, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={summary} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} style={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis style={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", background: "var(--bg-primary)", color: "var(--text-primary)" }} />
              <Area type="monotone" dataKey="amount" name="Amount Spent" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="gym-card">
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>Recent Purchases</h3>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}><Loader size={24} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
        ) : expenses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            <DollarSign size={40} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
            <p>No expenses recorded yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="gym-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TITLE & DESC</th>
                  <th>CATEGORY</th>
                  <th>AMOUNT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp: any) => (
                  <tr key={exp._id}>
                    <td>{new Date(exp.date).toLocaleDateString('en-GB')}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{exp.title}</div>
                      {exp.description && <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{exp.description}</div>}
                    </td>
                    <td><span style={{ padding: "4px 8px", background: "var(--bg-secondary)", borderRadius: 4, fontSize: "0.85rem" }}>{exp.category}</span></td>
                    <td style={{ fontWeight: 600 }}>₹{exp.amount.toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleDeleteExpense(exp._id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div style={overlayStyle}>
          <div className="gym-card" style={{ maxWidth: 440, width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Add Expense</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="form-label">Item / Title *</label>
                <input type="text" value={newExpense.title} onChange={e => setNewExpense({ ...newExpense, title: e.target.value })} placeholder="e.g. 2 Dumbbells" className="form-input" />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Amount (₹) *</label>
                  <input type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} placeholder="0.00" className="form-input" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Date</label>
                  <input type="date" value={newExpense.date} onChange={e => setNewExpense({ ...newExpense, date: e.target.value })} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Category</label>
                <select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} className="form-input">
                  <option value="Equipment">Equipment</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Supplements">Supplements</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Description (Optional)</label>
                <input type="text" value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} placeholder="More details..." className="form-input" />
              </div>
              <button className="btn-blue" style={{ marginTop: 8, justifyContent: "center" }} disabled={submitting} onClick={handleAddExpense}>
                {submitting ? <Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Save Expense"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTrackerPanel;
