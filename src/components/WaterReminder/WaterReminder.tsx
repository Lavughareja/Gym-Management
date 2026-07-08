import React, { useState, useEffect } from 'react';
import { Droplets, BellRing, BellOff, Edit2, CheckCircle2, Clock, Check, GlassWater, AlertCircle } from 'lucide-react';

const INTERVAL_OPTIONS = [
  { label: "Never", value: 0 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "2 hours", value: 120 },
  { label: "3 hours", value: 180 },
  { label: "4 hours", value: 240 },
  { label: "5 hours", value: 300 }
];

const WaterReminder: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("22:00");
  const [intervalMin, setIntervalMin] = useState<number>(0);
  
  const [activeSchedule, setActiveSchedule] = useState<{ start: string; end: string; interval: number } | null>(null);
  const [todayTimeline, setTodayTimeline] = useState<{ time: string; passed: boolean }[]>([]);
  
  const [intakeCount, setIntakeCount] = useState<number>(0);
  const [intakeGoal, setIntakeGoal] = useState<number>(12); // Default to 12 glasses
  
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ start?: string; end?: string }>({});

  useEffect(() => {
    // Load state from localStorage on mount
    const saved = localStorage.getItem("water_reminder_schedule");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setActiveSchedule(parsed);
        setStartTime(parsed.start);
        setEndTime(parsed.end);
        setIntervalMin(parsed.interval);
        setRemindersEnabled(parsed.enabled !== false);
        if (parsed.enabled !== false && parsed.interval > 0) {
          generateTimeline(parsed.start, parsed.end, parsed.interval);
        }
      } catch (e) {
        console.error("Error parsing saved schedule");
      }
    }

    const savedIntake = localStorage.getItem("water_intake_data");
    if (savedIntake) {
      try {
        const parsed = JSON.parse(savedIntake);
        // Reset if it's a new day
        const todayStr = new Date().toISOString().split("T")[0];
        if (parsed.date === todayStr) {
          setIntakeCount(parsed.count || 0);
          setIntakeGoal(parsed.goal || 12);
        } else {
          // New day!
          setIntakeCount(0);
          setIntakeGoal(parsed.goal || 12);
          localStorage.setItem("water_intake_data", JSON.stringify({ date: todayStr, count: 0, goal: parsed.goal || 12 }));
        }
      } catch (e) {}
    } else {
      const todayStr = new Date().toISOString().split("T")[0];
      localStorage.setItem("water_intake_data", JSON.stringify({ date: todayStr, count: 0, goal: 12 }));
    }
    
    // Auto-update timeline passed state every minute and check for day rollover
    const interval = setInterval(() => {
      setTodayTimeline(prev => [...prev].map(t => ({
        ...t,
        passed: isTimePassed(t.time)
      })));

      const todayStr = new Date().toISOString().split("T")[0];
      const savedIntake = localStorage.getItem("water_intake_data");
      if (savedIntake) {
        try {
          const parsed = JSON.parse(savedIntake);
          if (parsed.date !== todayStr) {
            setIntakeCount(0);
            localStorage.setItem("water_intake_data", JSON.stringify({ date: todayStr, count: 0, goal: parsed.goal || 12 }));
          }
        } catch(e){}
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const saveIntake = (newCount: number) => {
    setIntakeCount(newCount);
    const todayStr = new Date().toISOString().split("T")[0];
    localStorage.setItem("water_intake_data", JSON.stringify({ date: todayStr, count: newCount, goal: intakeGoal }));
  };

  const handleDrinkWater = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const savedIntake = localStorage.getItem("water_intake_data");
    let currentCount = intakeCount;
    if (savedIntake) {
      try {
        const parsed = JSON.parse(savedIntake);
        if (parsed.date !== todayStr) {
          currentCount = 0; // Reset before adding if it's a new day
        }
      } catch(e){}
    }
    saveIntake(currentCount + 1);
  };

  const isTimePassed = (timeStr: string) => {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    
    const [h, m] = timeStr.split(":").map(Number);
    const targetMins = h * 60 + m;
    
    return currentMins >= targetMins;
  };

  const generateTimeline = (start: string, end: string, interval: number) => {
    if (interval === 0) {
      setTodayTimeline([]);
      return [];
    }

    const times: string[] = [];
    const timelineData: { time: string; passed: boolean }[] = [];
    
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    
    const startMins = startH * 60 + startM;
    let endMins = endH * 60 + endM;
    
    if (endMins <= startMins) {
      endMins += 24 * 60; // Roll over to next day
    }

    // Generate times for the next 7 days
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      let currTotalMins = startMins;
      
      while (currTotalMins <= endMins) {
        let h = Math.floor(currTotalMins / 60) % 24;
        let m = currTotalMins % 60;
        
        const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        const isNextDayOffset = currTotalMins >= 24 * 60 ? 1 : 0;
        
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + dayOffset + isNextDayOffset);
        targetDate.setHours(h, m, 0, 0);
        
        // Only populate visual timeline for today (dayOffset 0)
        if (dayOffset === 0) {
          timelineData.push({
            time: timeStr,
            passed: isNextDayOffset === 0 ? isTimePassed(timeStr) : false
          });
        }
        
        times.push(targetDate.toISOString());
        currTotalMins += interval;
      }
    }
    
    setTodayTimeline(timelineData);
    return times;
  };

  const notifyServiceWorker = (times: string[]) => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SCHEDULE_REMINDERS",
        times
      });
    }
  };

  const cancelServiceWorkerReminders = () => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CANCEL_REMINDERS"
      });
    }
  };

  const handleSetReminder = async () => {
    setErrors({});
    if (intervalMin !== 0) {
      if (!startTime || !endTime) {
        setErrors({
          start: !startTime ? "Required" : undefined,
          end: !endTime ? "Required" : undefined
        });
        return;
      }
      if (startTime === endTime) {
        setErrors({ end: "End time must be different from Start time" });
        return;
      }
    }

    if (intervalMin === 0) {
      // Cancel
      setActiveSchedule({ start: startTime, end: endTime, interval: 0 });
      setRemindersEnabled(false);
      localStorage.setItem("water_reminder_schedule", JSON.stringify({ start: startTime, end: endTime, interval: 0, enabled: false }));
      cancelServiceWorkerReminders();
      setTodayTimeline([]);
      return;
    }

    // Request permission
    if ("Notification" in window) {
      let perm = Notification.permission;
      if (perm === "default") {
        perm = await Notification.requestPermission();
      }
      
      if (perm === "denied") {
        alert("Notifications are blocked! Please enable them in your browser settings to use Water Reminders.");
        return;
      }

      if (perm === "granted") {
        const schedule = { start: startTime, end: endTime, interval: intervalMin, enabled: true };
        setActiveSchedule(schedule);
        setRemindersEnabled(true);
        localStorage.setItem("water_reminder_schedule", JSON.stringify(schedule));
        
        const scheduledDates = generateTimeline(startTime, endTime, intervalMin);
        notifyServiceWorker(scheduledDates);
      }
    } else {
      alert("Your browser does not support notifications.");
    }
  };

  const toggleMasterSwitch = () => {
    const nextState = !remindersEnabled;
    setRemindersEnabled(nextState);
    
    if (activeSchedule) {
      const updated = { ...activeSchedule, enabled: nextState };
      localStorage.setItem("water_reminder_schedule", JSON.stringify(updated));
      
      if (nextState) {
        const scheduledDates = generateTimeline(activeSchedule.start, activeSchedule.end, activeSchedule.interval);
        notifyServiceWorker(scheduledDates);
      } else {
        cancelServiceWorkerReminders();
      }
    }
  };

  const getIntervalLabel = (val: number) => {
    const opt = INTERVAL_OPTIONS.find(o => o.value === val);
    return opt ? opt.label : `${val} min`;
  };

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9", padding: "12px", borderRadius: "12px" }}>
            <Droplets size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>Water Reminder</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "4px 0 0 0" }}>Stay hydrated throughout the day</p>
          </div>
        </div>
        
        {activeSchedule && activeSchedule.interval > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: remindersEnabled ? "var(--text-primary)" : "var(--text-muted)" }}>
              {remindersEnabled ? "Reminders On" : "Reminders Off"}
            </span>
            <label className="switch">
              <input type="checkbox" checked={remindersEnabled} onChange={toggleMasterSwitch} />
              <span className="slider" style={{ background: remindersEnabled ? "#0ea5e9" : undefined }} />
            </label>
          </div>
        )}
      </div>

      <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Top Section: Intake Tracker */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: "50%", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.15)", border: "2px solid #0ea5e9" }}>
              <GlassWater size={36} color="#0ea5e9" />
              <div style={{ position: "absolute", bottom: -10, background: "#0ea5e9", color: "white", padding: "2px 8px", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 800 }}>
                {Math.round((intakeCount / intakeGoal) * 100)}%
              </div>
            </div>
            <div>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "1.2rem", fontWeight: 800 }}>{intakeCount} / {intakeGoal} Glasses</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>Goal: {intakeGoal} glasses today</p>
            </div>
          </div>
          
          <button 
            onClick={handleDrinkWater}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "white", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)", transition: "transform 0.2s" }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <Droplets size={20} /> I drank water 💧
          </button>
        </div>

        {/* Configuration Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "150px" }}>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>Start Time</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${errors.start ? "var(--danger)" : "var(--border-color)"}`, background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "1rem", fontWeight: 600, outline: "none" }}
              />
              {errors.start && <span style={{ color: "var(--danger)", fontSize: "0.8rem", fontWeight: 600, marginTop: "4px", display: "block" }}>{errors.start}</span>}
            </div>

            <div style={{ flex: 1, minWidth: "150px" }}>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>End Time</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: `1px solid ${errors.end ? "var(--danger)" : "var(--border-color)"}`, background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "1rem", fontWeight: 600, outline: "none" }}
              />
              {errors.end && <span style={{ color: "var(--danger)", fontSize: "0.8rem", fontWeight: 600, marginTop: "4px", display: "block" }}>{errors.end}</span>}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>Reminder Interval</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {INTERVAL_OPTIONS.map(opt => {
                const isSelected = intervalMin === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setIntervalMin(opt.value);
                      if (errors.start || errors.end) setErrors({});
                    }}
                    style={{
                      background: isSelected ? "#0ea5e9" : "var(--bg-secondary)",
                      color: isSelected ? "white" : "var(--text-primary)",
                      border: `1px solid ${isSelected ? "#0ea5e9" : "var(--border-color)"}`,
                      padding: "10px 16px",
                      borderRadius: "20px",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: isSelected ? "0 4px 12px rgba(14, 165, 233, 0.2)" : "none"
                    }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
            <button 
              onClick={handleSetReminder}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--primary)", color: "white", border: "none", padding: "16px", borderRadius: "12px", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)", transition: "transform 0.2s" }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {intervalMin === 0 ? <><BellOff size={20} /> Turn Off Reminders</> : <><BellRing size={20} /> Set Reminder Schedule</>}
            </button>
          </div>
          
        </div>

        {/* Timeline Visualization */}
        {activeSchedule && remindersEnabled && intervalMin > 0 && todayTimeline.length > 0 && (
          <div style={{ marginTop: "16px", borderTop: "1px dashed var(--border-color)", paddingTop: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}>Today's Schedule</h4>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} /> Every {getIntervalLabel(activeSchedule.interval)}
              </span>
            </div>
            
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "16px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
              {todayTimeline.map((item, idx) => {
                const isPassed = item.passed;
                const isNext = !isPassed && (idx === 0 || todayTimeline[idx - 1].passed);

                return (
                  <div key={idx} style={{ 
                    minWidth: "80px", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: "8px",
                    opacity: isPassed ? 0.5 : 1
                  }}>
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "50%", 
                      background: isPassed ? "var(--bg-secondary)" : isNext ? "#0ea5e9" : "var(--bg-card)",
                      border: `2px solid ${isPassed ? "var(--border-color)" : isNext ? "#0ea5e9" : "var(--border-color)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isPassed ? "var(--text-muted)" : isNext ? "white" : "var(--text-primary)",
                      boxShadow: isNext ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "none"
                    }}>
                      {isPassed ? <Check size={20} /> : <Droplets size={20} />}
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: isNext ? 800 : 600, color: isNext ? "#0ea5e9" : "var(--text-secondary)" }}>
                      {item.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterReminder;
