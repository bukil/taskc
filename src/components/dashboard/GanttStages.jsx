
import React, { useRef, useEffect, useState } from "react";
import './gantt-tooltip.css';

const stages = [
  { name: "Requirement Gathering", status: "Completed", color: "bg-green-400 text-green-900", start: "2025-11-01", end: "2025-11-05", person: "Amit Sharma" },
  { name: "Design", status: "In Progress", color: "bg-blue-400 text-blue-900", start: "2025-11-06", end: "2025-11-15", person: "Priya Singh" },
  { name: "Development", status: "Blocked", color: "bg-rose-400 text-rose-900", start: "2025-11-16", end: "2025-11-25", person: "Rohit Verma" },
  { name: "Testing", status: "Pending", color: "bg-gray-200 text-gray-700", start: "2025-11-26", end: "2025-12-05", person: "Neha Patel" },
  { name: "Deployment", status: "Pending", color: "bg-gray-200 text-gray-700", start: "2025-12-06", end: "2025-12-15", person: "Amit Sharma" },
];

const statusBadge = (status, color) => (
  <span className={`px-2 py-0.5 rounded-full text-xxs font-semibold border border-white/10 ${color}`}>{status}</span>
);

function getDurationDays(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
}



export const GanttStages = () => {
  // Canvas dimensions and layout
  const barWidths = [80, 120, 60, 100, 70];
  const daysInMonth = 28;
  const tickWidth = 32;
  const labelWidth = 160;
  const dividerWidth = 8;
  const barHeight = 20;
  const rowHeight = 32;
  const topOffset = 32;
  const canvasWidth = labelWidth + dividerWidth + daysInMonth * tickWidth + 40;
  const canvasHeight = topOffset + stages.length * rowHeight + 32;

  // Assign each stage a start day (1-based, 1-28) for demo
  const stageStartDays = [1, 4, 10, 16, 22];

  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null); // { idx, x, y, width, height }
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Helper: get early/late info (mocked for demo)
  function getEarlyLate(stage) {
    // For demo: Completed = early, In Progress = on time, Blocked = late, Pending = unknown
    if (stage.status === 'Completed') return 'Finished 1d early';
    if (stage.status === 'Blocked') return 'Delayed 2d';
    if (stage.status === 'In Progress') return 'On track';
    return 'TBD';
  }

  // Bar bounding boxes for hit testing (must persist across renders)
  const barBoxesRef = useRef([]);

  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw labels
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    stages.forEach((stage, idx) => {
      ctx.fillText(stage.name, labelWidth - 10, topOffset + idx * rowHeight + barHeight / 2);
    });

    // Draw vertical divider
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(labelWidth, topOffset - 10, 2, stages.length * rowHeight + 20);

    // Draw date axis
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#cbd5e1';
    for (let i = 0; i < daysInMonth; i++) {
      ctx.fillText((i + 1).toString(), labelWidth + dividerWidth + i * tickWidth + tickWidth / 2, 8);
    }

    // Draw bars and severity dots, each bar starts at its assigned start day
    const boxes = [];
    stages.forEach((stage, idx) => {
      const barWidth = barWidths[idx % barWidths.length];
      const startDay = stageStartDays[idx % stageStartDays.length] - 1;
      const barX = labelWidth + dividerWidth + startDay * tickWidth + 8;
      const barY = topOffset + idx * rowHeight;
      // Store bounding box for hover
      boxes[idx] = { x: barX, y: barY, width: barWidth, height: barHeight };
      // Bar color
      ctx.fillStyle = stage.status === 'Blocked' ? '#f43f5e' : stage.status === 'In Progress' ? '#fbbf24' : stage.status === 'Completed' ? '#4ade80' : '#e5e7eb';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barWidth, barHeight, 6);
      ctx.fill();
      ctx.stroke();
      // Severity dot
      ctx.beginPath();
      ctx.arc(barX + 12, barY + barHeight / 2, 7, 0, 2 * Math.PI);
      ctx.fillStyle = stage.status === 'Blocked' ? '#e11d48' : stage.status === 'In Progress' ? '#f59e42' : stage.status === 'Completed' ? '#22c55e' : '#a3a3a3';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      // Bar duration text
      ctx.font = '12px monospace';
      ctx.fillStyle = '#334155';
      ctx.textAlign = 'left';
      ctx.fillText(`${barWidth / 10}d`, barX + 28, barY + barHeight / 2 + 1);
    });
    barBoxesRef.current = boxes;
  }, [canvasWidth, canvasHeight]);

  // Mouse move handler for hover detection
  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (e.clientX - rect.left) * (canvasWidth / rect.width);
    const y = (e.clientY - rect.top) * (canvasHeight / rect.height);
    setMouse({ x: e.clientX, y: e.clientY });
    let found = null;
    const barBoxes = barBoxesRef.current;
    for (let i = 0; i < barBoxes.length; i++) {
      const box = barBoxes[i];
      if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
        found = { idx: i, ...box };
        break;
      }
    }
    setHovered(found);
  }

  function handleMouseLeave() {
    setHovered(null);
  }

  // Tooltip content
  let tooltip = null;
  if (hovered) {
    const stage = stages[hovered.idx];
    // Tooltip width/height estimate for positioning
    const tooltipWidth = 260;
    const tooltipHeight = 120;
    // Center above the bar
    const barCenterX = hovered.x + hovered.width / 2;
    const barTopY = hovered.y;
    // Get parent div scroll offset
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    // Position above the bar, centered
    let left = barCenterX - tooltipWidth / 2 + labelWidth / 8;
    let top = barTopY - tooltipHeight - 12;
    // Clamp to viewport
    left = Math.max(8, left);
    top = Math.max(8, top);
    tooltip = (
      <div
        className={"gantt-tooltip-frost visible"}
        style={{
          left,
          top,
          position: 'absolute',
          pointerEvents: 'none',
        }}
      >
        <div className="gantt-tooltip-title">{stage.name}</div>
        <div className="gantt-tooltip-status">Status: <b>{stage.status}</b></div>
        <div className="gantt-tooltip-meta">Start: {stage.start}</div>
        <div className="gantt-tooltip-meta">End: {stage.end}</div>
        <div className="gantt-tooltip-meta">{getEarlyLate(stage)}</div>
        <div className="gantt-tooltip-person">Assigned: {stage.person}</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto" style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ width: canvasWidth, height: canvasHeight, background: '#1e293b', borderRadius: 12 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip}
    </div>
  );
};