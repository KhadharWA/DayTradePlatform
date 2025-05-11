import React from "react";
import "../../Styles/Dashboard/QuickChecklist.css";
import ProgressCircle from "../../hooks/ProgressCircle";





export default function QuickChecklist() {
  return (
    <div className="checklist-card">
      <div className="checklist-header">
        <div className="headerText">
          <ProgressCircle percentage={20} radius={25} stroke={9} />
          <div className="title-group">
            <h3>Kom igång med din investeringsresa</h3>
            <p className="progress-text">20% klar</p>
          </div>
        </div>
        <button className="view-all">Visa alla</button>
      </div>

      <ul className="checklist-tasks">
        <li>
          <div className="task-icon"><i className="fas fa-coins"></i></div>
          <div className="task-info">
            <span className="task-title">Gör din första insättning <span className="bonus">+40%</span></span>
            <span className="task-sub">Sätt in pengar på ditt konto.</span>
          </div>
          <button className="action-btn">Sätt in pengar</button>
        </li>

        <li>
          <div className="task-icon"><i className="fas fa-search"></i></div>
          <div className="task-info">
            <span className="task-title">Hitta investeringar <span className="bonus">+10%</span></span>
            <span className="task-sub">Upptäck aktier och fonder att investera i.</span>
          </div>
          <button className="action-btn">Gå vidare</button>
        </li>

        <li>
          <div className="task-icon"><i className="fas fa-chart-line"></i></div>
          <div className="task-info">
            <span className="task-title">Gör en investering <span className="bonus">+20%</span></span>
            <span className="task-sub">Köp din första aktie eller fond.</span>
          </div>
          <button className="action-btn">Fortsätt</button>
        </li>

        <li>
          <div className="task-icon"><i className="fas fa-graduation-cap"></i></div>
          <div className="task-info">
            <span className="task-title">Gyllene investeringsreglerna <span className="bonus">+10%</span></span>
            <span className="task-sub">Lär dig grunderna i investeringar.</span>
          </div>
          <button className="action-btn">Starta guide</button>
        </li>
      </ul>
    </div>
  );
}