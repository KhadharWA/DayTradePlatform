import React from "react";


export default function ProgressCircle({
    percentage = 0,
    radius = 40,
    stroke = 6,
    color = "#3b82f6",
    bgColor = "#f0f0f0"
  }) {
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <svg height={radius * 2} width={radius * 2} className="progress-svg">
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="progress-ring"
        />
      </svg>
    );
  }