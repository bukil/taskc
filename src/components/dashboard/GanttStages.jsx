
import React, { useRef, useEffect } from "react";

const stages = [
  { name: "Requirement Gathering", status: "Completed", color: "bg-green-400 text-green-900", start: "2025-11-01", end: "2025-11-05" },
  { name: "Design", status: "In Progress", color: "bg-blue-400 text-blue-900", start: "2025-11-06", end: "2025-11-15" },
  { name: "Development", status: "Blocked", color: "bg-rose-400 text-rose-900", start: "2025-11-16", end: "2025-11-25" },
  { name: "Testing", status: "Pending", color: "bg-gray-200 text-gray-700", start: "2025-11-26", end: "2025-12-05" },
  { name: "Deployment", status: "Pending", color: "bg-gray-200 text-gray-700", start: "2025-12-06", end: "2025-12-15" },
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
    stages.forEach((stage, idx) => {
      const barWidth = barWidths[idx % barWidths.length];
      const startDay = stageStartDays[idx % stageStartDays.length] - 1;
      const barX = labelWidth + dividerWidth + startDay * tickWidth + 8;
      const barY = topOffset + idx * rowHeight;
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
  }, [canvasWidth, canvasHeight]);

  return (
    <div className="w-full overflow-x-auto">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ width: canvasWidth, height: canvasHeight, background: '#1e293b', borderRadius: 12 }}
      />
    </div>
  );
};