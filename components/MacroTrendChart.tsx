'use client';

import { useId, useState } from 'react';

type DayValue = { day: string; value: number };

const BAR_COLOR = '#525421'; // brand olive — single hue, this is a magnitude/sequential chart, not categorical
const BAR_HOVER_COLOR = '#3d3f18';
const TARGET_LINE_COLOR = 'rgba(45,21,6,0.45)';
const GRID_COLOR = 'rgba(45,21,6,0.12)';
const TEXT_MUTED = 'rgba(45,21,6,0.55)';

const CHART_HEIGHT = 120;
const BAR_MAX_WIDTH = 22;
const BAR_GAP = 8;

export default function MacroTrendChart({
  label,
  unit,
  target,
  data,
}: {
  label: string;
  unit: string;
  target: number;
  data: DayValue[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradientId = useId();

  const maxValue = Math.max(target, ...data.map((d) => d.value)) * 1.15;
  const width = data.length * (BAR_MAX_WIDTH + BAR_GAP);
  const valueToY = (v: number) => CHART_HEIGHT - (v / maxValue) * CHART_HEIGHT;
  const targetY = valueToY(target);
  const active = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4px' }}>
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ce965a',
          }}
        >
          {label}
        </p>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '12px', color: TEXT_MUTED }}>
          Target {target}
          {unit}
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        {active && (
          <div
            role="status"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: '#2d1506',
              color: '#fbf4e9',
              borderRadius: '6px',
              padding: '6px 10px',
              fontFamily: 'var(--font-inter-sans), sans-serif',
              fontSize: '12px',
              pointerEvents: 'none',
              zIndex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <strong>{active.value}{unit}</strong> <span style={{ opacity: 0.7 }}>· {active.day}</span>
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${CHART_HEIGHT + 20}`}
          width="100%"
          height={CHART_HEIGHT + 20}
          role="img"
          aria-label={`${label} for the last 7 days, target ${target}${unit}`}
        >
          <defs>
            <clipPath id={`${gradientId}-clip`}>
              <rect x="0" y="0" width={width} height={CHART_HEIGHT} rx="0" />
            </clipPath>
          </defs>

          {/* baseline */}
          <line x1="0" y1={CHART_HEIGHT} x2={width} y2={CHART_HEIGHT} stroke={GRID_COLOR} strokeWidth="1" />

          {/* target reference line */}
          <line
            x1="0"
            y1={targetY}
            x2={width}
            y2={targetY}
            stroke={TARGET_LINE_COLOR}
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          {data.map((d, i) => {
            const barHeight = (d.value / maxValue) * CHART_HEIGHT;
            const x = i * (BAR_MAX_WIDTH + BAR_GAP);
            const y = CHART_HEIGHT - barHeight;
            const isLast = i === data.length - 1;
            const isActive = activeIndex === i;

            return (
              <g key={d.day}>
                <rect
                  x={x}
                  y={y}
                  width={BAR_MAX_WIDTH}
                  height={Math.max(barHeight, 2)}
                  rx="4"
                  fill={isActive ? BAR_HOVER_COLOR : BAR_COLOR}
                  clipPath={`url(#${gradientId}-clip)`}
                  style={{ transition: 'fill 0.15s' }}
                />
                {/* transparent hit target, bigger than the bar */}
                <rect
                  x={x - BAR_GAP / 2}
                  y="0"
                  width={BAR_MAX_WIDTH + BAR_GAP}
                  height={CHART_HEIGHT}
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.day}: ${d.value}${unit}`}
                  onPointerEnter={() => setActiveIndex(i)}
                  onPointerLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(i)}
                  onBlur={() => setActiveIndex(null)}
                  style={{ cursor: 'pointer', outline: 'none' }}
                />
                {isLast && (
                  <text
                    x={x + BAR_MAX_WIDTH / 2}
                    y={y - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="var(--font-inter-sans), sans-serif"
                    fill="#2d1506"
                    fontWeight="600"
                  >
                    {d.value}
                  </text>
                )}
                <text
                  x={x + BAR_MAX_WIDTH / 2}
                  y={CHART_HEIGHT + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-ibm-plex-sans), sans-serif"
                  fill={TEXT_MUTED}
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
