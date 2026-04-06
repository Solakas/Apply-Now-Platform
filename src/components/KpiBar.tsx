import React, { useEffect, useRef, useState } from 'react';

interface KpiCardData {
  value: string;
  label: string;
  trend: 'up' | 'down';
  trendText: string;
}

const KPI_CARDS: KpiCardData[] = [
  {
    value: '48',
    label: 'Total Applications',
    trend: 'up',
    trendText: '+12.4% vs last campaign',
  },
  {
    value: '5',
    label: 'New Applications',
    trend: 'down',
    trendText: '-5% vs last week',
  },
  {
    value: '12',
    label: 'Assignment Stage Applications',
    trend: 'down',
    trendText: '-12% vs usual bottleneck',
  },
  {
    value: '8',
    label: 'Final stage Applications',
    trend: 'up',
    trendText: '+5% vs initial target',
  },
];

const DURATION = 1000; // ms
const STAGGER = 120;   // ms delay per card

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function KpiCard({ value, label, trend, trendText, delay }: KpiCardData & { delay: number }) {
  const target = parseInt(value, 10);
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const trendColor = trend === 'up' ? '#166534' : '#991b1b';

  useEffect(() => {
    const startTime = performance.now() + delay;

    function tick(now: number) {
      if (now < startTime) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      setDisplayed(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []); // mount-only

  return (
    <div style={{
      flex: 1,
      background: 'var(--color-surface-default, #fff)',
      borderRadius: 12,
      boxShadow: '0px 2px 12px 0px rgba(0,0,0,0.08)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      minWidth: 0,
    }}>
      <span style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: 32,
        lineHeight: 1.25,
        color: 'var(--color-text-default, #333)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {displayed}
      </span>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1.5,
          color: 'var(--color-text-subtle, #777)',
          textAlign: 'center',
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.5,
          color: trendColor,
          textAlign: 'center',
        }}>
          {trendText}
        </span>
      </div>
    </div>
  );
}

export default function KpiBar() {
  return (
    <div style={{
      display: 'flex',
      gap: 16,
      marginBottom: 24,
    }}>
      {KPI_CARDS.map((card, i) => (
        <KpiCard key={i} {...card} delay={i * STAGGER} />
      ))}
    </div>
  );
}
