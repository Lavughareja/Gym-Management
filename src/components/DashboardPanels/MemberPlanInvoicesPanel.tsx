import React, { useEffect, useState } from "react";
import { Receipt, Download, Loader, Calendar, CreditCard } from "lucide-react";
import { getMemberInvoicesApi } from "../../services/apis/invoiceApis";
import { useAppDispatch } from "../../utils/reduxHooks";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import html2pdf from "html2pdf.js";

interface InvoicePanelProps {
  profile: any;
  gymName?: string;
}

const MemberPlanInvoicesPanel: React.FC<InvoicePanelProps> = ({ profile, gymName = 'Your Gym' }) => {
  const dispatch = useAppDispatch();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await getMemberInvoicesApi();
      setInvoices(res.data.invoices || []);
    } catch (err) {
      dispatch(showSnackbar({ message: "Failed to load invoices", type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  // ── Download receipt from profile data (no invoice needed) ──────────────────
  const handleDownloadReceipt = () => {
    if (!profile?.planEndDate) {
      dispatch(showSnackbar({ message: "No active plan found to download", type: "error" }));
      return;
    }

    const planName = profile.planId?.name || profile.plan || "Gym Membership";
    const memberName = profile.fullName || profile.name || "Member";
    const today = new Date().toLocaleDateString('en-GB');
    const startDate = profile.planStartDate ? new Date(profile.planStartDate).toLocaleDateString('en-GB') : "—";
    const endDate = profile.planEndDate ? new Date(profile.planEndDate).toLocaleDateString('en-GB') : "—";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 40px; color: #333; max-width: 750px; margin: auto;">

        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="margin: 0; color: #2563eb; font-size: 30px; font-weight: 900; letter-spacing: 1px;">${gymName}</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #888;">Gym Membership Receipt</p>
          </div>
          <div style="text-align: right;">
            <div style="background: #2563eb; color: #fff; padding: 6px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 1px;">RECEIPT</div>
            <p style="margin: 8px 0 0; font-size: 13px; color: #666;"><strong>Date:</strong> ${today}</p>
          </div>
        </div>

        <!-- Member Info -->
        <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 28px; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 12px; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Member Details</h3>
          <p style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">${memberName}</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #64748b;">${profile?.email || ''}</p>
          <p style="margin: 4px 0 0; font-size: 14px; color: #64748b;">${profile?.mobileNo || ''}</p>
        </div>

        <!-- Plan Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
          <thead>
            <tr style="background: #2563eb; color: #fff;">
              <th style="padding: 12px 16px; text-align: left; font-size: 13px; border-radius: 8px 0 0 0;">Plan</th>
              <th style="padding: 12px 16px; text-align: center; font-size: 13px;">Start Date</th>
              <th style="padding: 12px 16px; text-align: center; font-size: 13px;">Expiry Date</th>
              <th style="padding: 12px 16px; text-align: right; font-size: 13px; border-radius: 0 8px 0 0;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 16px; font-weight: 700; font-size: 15px; color: #0f172a;">${planName}</td>
              <td style="padding: 14px 16px; text-align: center; font-size: 14px; color: #64748b;">${startDate}</td>
              <td style="padding: 14px 16px; text-align: center; font-size: 14px; color: #64748b;">${endDate}</td>
              <td style="padding: 14px 16px; text-align: right;">
                <span style="background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 700;">ACTIVE</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: #94a3b8;">Thank you for being a valued member of <strong style="color: #2563eb;">${gymName}</strong>!</p>
          <p style="margin: 6px 0 0; font-size: 11px; color: #cbd5e1;">This is a system-generated receipt.</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `membership_receipt_${memberName.replace(/ /g, '_')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().from(htmlContent).set(opt).save();
    dispatch(showSnackbar({ message: "Receipt downloading...", type: "info" }));
  };

  // ── Download from invoice data ───────────────────────────────────────────────
  const handleDownloadInvoice = (invoice: any) => {
    const gym = invoice.gymId;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: auto;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="margin: 0; color: #2563eb; font-size: 28px;">${gymName}</h1>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;">${gym?.address || ''}</p>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;">${gym?.phone || ''} | ${gym?.email || ''}</p>
            ${gym?.gstNumber ? `<p style="margin: 5px 0 0; font-size: 14px; color: #666; font-weight: bold;">GSTIN: ${gym.gstNumber}</p>` : ''}
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; color: #555; font-size: 24px;">INVOICE</h2>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;"><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;"><strong>Date:</strong> ${new Date(invoice.invoiceDate).toLocaleDateString('en-GB')}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #444;">Bill To:</h3>
          <p style="margin: 0; font-size: 15px; font-weight: bold;">${profile?.fullName || 'Member'}</p>
          <p style="margin: 5px 0 0; font-size: 14px; color: #666;">${profile?.email || ''}</p>
          <p style="margin: 5px 0 0; font-size: 14px; color: #666;">${profile?.mobileNo || ''}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f8fafc; text-align: left;">
              <th style="padding: 12px; border-bottom: 2px solid #e2e8f0; font-size: 14px;">Description</th>
              <th style="padding: 12px; border-bottom: 2px solid #e2e8f0; font-size: 14px; text-align: center;">Validity</th>
              <th style="padding: 12px; border-bottom: 2px solid #e2e8f0; font-size: 14px; text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">
                <strong>${invoice.planName}</strong>
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-align: center;">
                ${new Date(invoice.startDate).toLocaleDateString('en-GB')} - ${new Date(invoice.endDate).toLocaleDateString('en-GB')}
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-align: right; font-weight: bold;">
                ${invoice.amount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-top: 2px solid #e2e8f0;">
              <strong style="font-size: 16px;">Total Paid:</strong>
              <strong style="font-size: 18px; color: #2563eb;">₹${invoice.amount.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        ${gym?.invoiceTerms ? `
        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee;">
          <h4 style="margin: 0 0 10px; font-size: 14px; color: #666;">Terms & Conditions</h4>
          <p style="margin: 0; font-size: 12px; color: #888; white-space: pre-line;">${gym.invoiceTerms}</p>
        </div>
        ` : ''}
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `invoice_${invoice.invoiceNumber}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };

    html2pdf().from(htmlContent).set(opt).save();
    dispatch(showSnackbar({ message: "Invoice downloading...", type: "info" }));
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 className="page-title">My Plan &amp; Invoices</h2>
          <p className="page-subtitle">View your active membership and download past invoices</p>
        </div>
        {/* Always show download button if member has an active plan */}
        {profile?.planEndDate && (
          <button
            onClick={handleDownloadReceipt}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.2)', whiteSpace: 'nowrap' }}
          >
            <Download size={16} /> Download Receipt
          </button>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="gym-card" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0.15) 100%)", border: "1px solid var(--primary)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CreditCard size={24} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)", marginBottom: 4 }}>Active Membership</h3>
              {profile?.planEndDate ? (
                <>
                  <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                    {profile.planId?.name || "Premium Gym Membership"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                      <Calendar size={16} /> 
                      Starts: <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{new Date(profile.planStartDate).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                      <Calendar size={16} /> 
                      Expires: <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{new Date(profile.planEndDate).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>No active plan found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="gym-card" style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>Payment History &amp; Invoices</h3>
        
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}><Loader size={24} style={{ animation: "spin 1s linear infinite", color: "var(--primary)" }} /></div>
        ) : invoices.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            <Receipt size={40} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
            <p>No invoices found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="gym-table">
              <thead>
                <tr>
                  <th>INVOICE #</th>
                  <th>DATE</th>
                  <th>PLAN NAME</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv: any) => (
                  <tr key={inv._id}>
                    <td style={{ fontWeight: 600, color: "var(--primary)" }}>{inv.invoiceNumber}</td>
                    <td>{new Date(inv.invoiceDate).toLocaleDateString('en-GB')}</td>
                    <td style={{ fontWeight: 600 }}>{inv.planName}</td>
                    <td style={{ fontWeight: 600 }}>₹{inv.amount.toLocaleString()}</td>
                    <td>
                      <span className={`checkin-status ${inv.status === "Paid" ? "status-active" : "status-inactive"}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleDownloadInvoice(inv)} className="btn-blue-outline" style={{ padding: "4px 10px", fontSize: "0.8rem", gap: 6 }}>
                        <Download size={14} /> Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPlanInvoicesPanel;
