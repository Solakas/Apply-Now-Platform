import React, { useState, useEffect, useRef } from 'react';
import type { Candidate } from '../types';
import TopBar from './TopBar';

/* ── Icons ── */
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10v3a1 1 0 001 1h8a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconZoomIn = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconZoomOut = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M5 7h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M8.5 5.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M4 6v4M4 4.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7 10V7.5c0-1 .5-1.5 1.5-1.5S10 6.5 10 7.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1.5" y="3.5" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 5l5.5 3.5L12.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5a3.5 3.5 0 013.5 3.5c0 2-3.5 7-3.5 7S3.5 7 3.5 5A3.5 3.5 0 017 1.5z" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="7" cy="5" r="1.2" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5l1.5 3 3.3.5-2.4 2.3.6 3.3L7 9l-3 1.6.6-3.3L2.2 5l3.3-.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSkip = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconWarning = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L1.5 13.5h13L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="8" cy="11" r="0.8" fill="currentColor"/>
  </svg>
);

/* ── Star icon ── */
function StarIcon({ state, size = 18 }: { state: 'full' | 'half' | 'empty'; size?: number }) {
  const path = `M${size/2} 1.5l${size*0.14} ${size*0.29}L${size-1} ${size*0.41}l-${size*0.24} ${size*0.23}L${size*0.62} ${size-1}L${size/2} ${size*0.82}L${size*0.18} ${size-1}l${size*0.05} ${size*0.33}L1 ${size*0.41}l${size*0.36} ${size*0.05}z`;
  if (state === 'full') return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d={`M${size/2} 2l${Math.round(size*0.15)} ${Math.round(size*0.31)}L${size-1} ${Math.round(size*0.42)}l-${Math.round(size*0.25)} ${Math.round(size*0.24)}.${Math.round(size*0.06)} ${Math.round(size*0.35)}L${size/2} ${Math.round(size*0.84)}l-${Math.round(size*0.31)} ${Math.round(size*0.16)}.${Math.round(size*0.06)}-${Math.round(size*0.35)}-${Math.round(size*0.25)}-${Math.round(size*0.24)}${Math.round(size*0.35)}-${Math.round(size*0.05)}z`}
        fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.8" strokeLinejoin="round"/>
    </svg>
  );
  if (state === 'half') return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <linearGradient id={`hg-${size}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="#f59e0b"/>
          <stop offset="50%" stopColor="#e5e7eb"/>
        </linearGradient>
      </defs>
      <path d={`M${size/2} 2l${Math.round(size*0.15)} ${Math.round(size*0.31)}L${size-1} ${Math.round(size*0.42)}l-${Math.round(size*0.25)} ${Math.round(size*0.24)}.${Math.round(size*0.06)} ${Math.round(size*0.35)}L${size/2} ${Math.round(size*0.84)}l-${Math.round(size*0.31)} ${Math.round(size*0.16)}.${Math.round(size*0.06)}-${Math.round(size*0.35)}-${Math.round(size*0.25)}-${Math.round(size*0.24)}${Math.round(size*0.35)}-${Math.round(size*0.05)}z`}
        fill={`url(#hg-${size})`} stroke="#f59e0b" strokeWidth="0.8" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d={`M${size/2} 2l${Math.round(size*0.15)} ${Math.round(size*0.31)}L${size-1} ${Math.round(size*0.42)}l-${Math.round(size*0.25)} ${Math.round(size*0.24)}.${Math.round(size*0.06)} ${Math.round(size*0.35)}L${size/2} ${Math.round(size*0.84)}l-${Math.round(size*0.31)} ${Math.round(size*0.16)}.${Math.round(size*0.06)}-${Math.round(size*0.35)}-${Math.round(size*0.25)}-${Math.round(size*0.24)}${Math.round(size*0.35)}-${Math.round(size*0.05)}z`}
        fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.8" strokeLinejoin="round"/>
    </svg>
  );
}

/* Simpler star icons with fixed viewBox */
function StarFull({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 12.5l-4.2 2.5.8-4.7L3.2 7l4.7-.7z"
        fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}
function StarHalf({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <defs>
        <linearGradient id="hg20">
          <stop offset="50%" stopColor="#f59e0b"/>
          <stop offset="50%" stopColor="#e5e7eb"/>
        </linearGradient>
      </defs>
      <path d="M10 2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 12.5l-4.2 2.5.8-4.7L3.2 7l4.7-.7z"
        fill="url(#hg20)" stroke="#f59e0b" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}
function StarEmpty({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 12.5l-4.2 2.5.8-4.7L3.2 7l4.7-.7z"
        fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}

function StarRow({ value, size = 18, onClick }: { value: number; size?: number; onClick?: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => {
        const state = value >= i ? 'full' : value >= i - 0.5 ? 'half' : 'empty';
        const star = state === 'full' ? <StarFull size={size} /> : state === 'half' ? <StarHalf size={size} /> : <StarEmpty size={size} />;
        return onClick ? (
          <button key={i} onClick={() => onClick(i)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 1, lineHeight: 0 }}>
            {star}
          </button>
        ) : (
          <span key={i} style={{ lineHeight: 0 }}>{star}</span>
        );
      })}
    </div>
  );
}

/* ── CV Viewer ── */
function CVViewer({ candidate }: { candidate: Candidate }) {
  return (
    <div style={{ padding: '40px 64px', maxWidth: 720, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, paddingBottom: 20, borderBottom: '2px solid var(--color-primary-base)' }}>
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 34, fontWeight: 800, color: '#111c2d',
          letterSpacing: '-0.8px', marginBottom: 6,
        }}>
          {candidate.name}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: '#454652', marginBottom: 10 }}>
          {candidate.role}
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--color-text-subtle)', flexWrap: 'wrap' }}>
          <span>{candidate.city}, {candidate.country}</span>
          <span>{candidate.name.split(' ')[0].toLowerCase()}.{candidate.name.split(' ').slice(-1)[0].toLowerCase()}@email.com</span>
          <span>linkedin.com/in/{candidate.name.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
      </div>

      {/* Summary */}
      <CVSection title="Professional Summary">
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--color-text-default)', margin: 0 }}>
          Results-driven {candidate.role} with {candidate.experienceYears} of experience delivering high-impact digital products.
          Proven track record of leading cross-functional teams and driving product strategy at {candidate.company}.
          Passionate about user-centered design and data-driven decision making.
        </p>
      </CVSection>

      {/* Experience */}
      <CVSection title="Work Experience">
        {[
          {
            role: candidate.role,
            company: candidate.company,
            period: '2021 – Present',
            bullets: [
              'Led end-to-end product design for flagship product, improving user retention by 34%',
              'Established and maintained design system used by 12 engineers across 3 product teams',
              'Collaborated with C-suite to define product vision and quarterly OKRs',
            ],
          },
          {
            role: 'Mid-Level Designer',
            company: 'Previous Company Ltd',
            period: '2018 – 2021',
            bullets: [
              'Designed core user flows reducing task completion time by 28%',
              'Conducted user research and synthesized insights into actionable design decisions',
              'Mentored 2 junior designers and led weekly design critique sessions',
            ],
          },
        ].map((exp, i) => (
          <div key={i} style={{ marginBottom: i === 0 ? 20 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-default)' }}>{exp.role}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', flexShrink: 0 }}>{exp.period}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-text-subtle)', marginBottom: 8 }}>{exp.company}</div>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{ fontSize: 13, color: 'var(--color-text-default)', lineHeight: 1.7, marginBottom: 2 }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </CVSection>

      {/* Education */}
      <CVSection title="Education">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-default)' }}>BSc Computer Science</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-subtle)', marginTop: 2 }}>University of Athens</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-subtle)' }}>2014 – 2018</div>
        </div>
      </CVSection>

      {/* Skills */}
      <CVSection title="Skills">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Figma', 'Product Strategy', 'Design Systems', 'User Research', 'Prototyping', 'Agile / Scrum', 'React', 'Stakeholder Management', 'Accessibility', 'Motion Design'].map(skill => (
            <span key={skill} style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary-base)',
              fontSize: 12, fontWeight: 600,
            }}>{skill}</span>
          ))}
        </div>
      </CVSection>
    </div>
  );
}

function CVSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--color-primary-base)',
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

/* ── Scorecard criteria ── (type shared with Evaluation tab) */

/* ── History tab ── */

const IconCheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="var(--color-success)" strokeWidth="1.3"/>
    <path d="M5 8l2.5 2.5 4-4" stroke="var(--color-success)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5.5" stroke="var(--color-text-subtle)" strokeWidth="1.2"/>
    <path d="M7 6.5v3" stroke="var(--color-text-subtle)" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="7" cy="4.8" r="0.7" fill="var(--color-text-subtle)"/>
  </svg>
);

function ReviewerAvatar({ initials }: { initials: string }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
      background: 'var(--color-primary-light)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 9, fontWeight: 700, color: 'var(--color-primary-base)',
    }}>
      {initials}
    </div>
  );
}

interface HistoryCard {
  checkLabel: string;
  result: string;
  resultColor: string;
  quote: string;
  reviewer: string;
  reviewerInitials: string;
  outcome: string;
}

interface HistoryItem {
  isCurrent?: boolean;
  timestamp: string;
  title: string;
  // current only
  stageLabel?: string;
  appliedLabel?: string;
  // past with card
  card?: HistoryCard;
  // simple past
  stageReached?: string;
}

function HistoryTab({ candidate }: { candidate: Candidate }) {
  const items: HistoryItem[] = [
    {
      isCurrent: true,
      timestamp: 'Current Application',
      title: 'Lead Product Designer',
      stageLabel: `Stage: ${candidate.status}`,
      appliedLabel: `Applied on ${candidate.apDate}`,
    },
    {
      timestamp: '6 Months Ago',
      title: 'UI Specialist (Contract)',
      card: {
        checkLabel: 'Technical Design Test',
        result: 'PASSED (92/100)',
        resultColor: 'var(--color-text-dominant)',
        quote: '"Candidate demonstrated exceptional knowledge of Figma components and structural integrity of design tokens."',
        reviewer: 'Reviewed by Marcus Chen',
        reviewerInitials: 'MC',
        outcome: 'Outcome: Declined (Role redundancy)',
      },
    },
    {
      timestamp: '1.2 Years Ago',
      title: 'Junior-Mid UI/UX Designer',
      stageReached: 'Stage reached: Phone Screening',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes tl-pop-dot {
          0%   { transform: scale(0);    opacity: 0; }
          65%  { transform: scale(1.3);  opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes tl-pulse-ring {
          0%   { box-shadow: 0 0 0 0px  rgba(53,77,151,0.5); }
          70%  { box-shadow: 0 0 0 9px  rgba(53,77,151,0);   }
          100% { box-shadow: 0 0 0 0px  rgba(53,77,151,0);   }
        }
        @keyframes tl-draw-line {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes tl-fade-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item, i) => {
          const dotDelay = `${i * 0.18}s`;
          const contentDelay = `${i * 0.18 + 0.08}s`;
          const lineDelay = `${i * 0.18 + 0.25}s`;
          const isLast = i === items.length - 1;

          return (
            <div key={i} style={{ display: 'flex' }}>

              {/* ── Left column: dot + connector ── */}
              <div style={{
                width: 40,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                {/* Dot */}
                <div style={{
                  width: item.isCurrent ? 16 : 12,
                  height: item.isCurrent ? 16 : 12,
                  borderRadius: '50%',
                  marginTop: 4,
                  flexShrink: 0,
                  zIndex: 1,
                  background: item.isCurrent ? 'var(--color-primary-base)' : 'white',
                  border: item.isCurrent
                    ? '3px solid var(--color-primary-base)'
                    : '2px solid var(--color-border-strong)',
                  animation: item.isCurrent
                    ? `tl-pop-dot 0.45s cubic-bezier(.34,1.56,.64,1) ${dotDelay} both, tl-pulse-ring 2.2s ease-out ${i * 0.18 + 0.6}s infinite`
                    : `tl-pop-dot 0.4s cubic-bezier(.34,1.56,.64,1) ${dotDelay} both`,
                }} />

                {/* Connector line */}
                {!isLast && (
                  <div style={{
                    flex: 1,
                    width: 2,
                    minHeight: 28,
                    background: 'var(--color-border-subtle)',
                    transformOrigin: 'top center',
                    animation: `tl-draw-line 0.45s ease-out ${lineDelay} both`,
                  }} />
                )}
              </div>

              {/* ── Right column: content ── */}
              <div style={{
                flex: 1,
                minWidth: 0,
                paddingLeft: 8,
                paddingBottom: isLast ? 0 : 40,
                animation: `tl-fade-in 0.4s ease-out ${contentDelay} both`,
              }}>
                {item.isCurrent ? (
                  <div>
                    <div style={{ fontSize: 14, color: 'var(--color-text-dominant)', lineHeight: 1.5, marginBottom: 2 }}>
                      {item.timestamp}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5, marginBottom: 8 }}>
                      {item.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center',
                        height: 32, padding: '0 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-info)',
                        background: 'var(--color-info-light)',
                        color: '#24389c',
                        fontSize: 14, lineHeight: 1.5,
                      }}>
                        {item.stageLabel}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67 }}>
                        {item.appliedLabel}
                      </span>
                    </div>
                  </div>
                ) : item.card ? (
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67, marginBottom: 1 }}>
                      {item.timestamp}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5, opacity: 0.8, marginBottom: 8 }}>
                      {item.title}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{
                        background: 'var(--color-surface-background-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0px 1px 2px rgba(0,0,0,0.12), 0px 2px 6px rgba(0,0,0,0.08)',
                        padding: 16,
                        display: 'flex', flexDirection: 'column', gap: 16,
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <IconCheckCircle />
                              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5 }}>
                                {item.card.checkLabel}
                              </span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: item.card.resultColor, lineHeight: 1.67, whiteSpace: 'nowrap' }}>
                              {item.card.result}
                            </span>
                          </div>
                          <p style={{ fontSize: 14, color: 'var(--color-text-subtle)', lineHeight: 1.5, margin: 0 }}>
                            {item.card.quote}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <ReviewerAvatar initials={item.card.reviewerInitials} />
                          <span style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67 }}>
                            {item.card.reviewer}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <IconInfo />
                        <span style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67 }}>
                          {item.card.outcome}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67, marginBottom: 1 }}>
                      {item.timestamp}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5, opacity: 0.8 }}>
                      {item.title}
                    </div>
                    {item.stageReached && (
                      <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67, paddingTop: 8 }}>
                        {item.stageReached}
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
}

/* ── Notes tab ── */
const TEAM_MEMBERS = ['Alice Chen', 'David Chen', 'Sarah Jennings', 'Carlos Rivera', 'Eva Kline'];

interface Reply {
  id: number;
  author: string;
  initials: string;
  timestamp: string;
  text: string;
}

interface Comment {
  id: number;
  author: string;
  initials: string;
  timestamp: string;
  text: string;
  likes: number;
  replies: Reply[];
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    author: 'David Chen',
    initials: 'DC',
    timestamp: '2h ago',
    text: "Their system work is top-tier. I saw the Nebula case study at a conference last year. @Sarah_Jennings, did we ask about their experience with high-density data grids?",
    likes: 2,
    replies: [
      {
        id: 101,
        author: 'Sarah Jennings',
        initials: 'SJ',
        timestamp: '1h ago',
        text: "Good point! I'll make sure we cover that in the technical screen.",
      },
    ],
  },
  {
    id: 2,
    author: 'Sarah Jennings',
    initials: 'SJ',
    timestamp: '45m ago',
    text: "Agreed. Their visual polish is exactly what we need. I've scheduled a technical screen for tomorrow at 2 PM. Let's dig into the grid architecture then.",
    likes: 0,
    replies: [],
  },
];

/* Renders text with @mentions highlighted as chips */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(@\S+)/g);
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('@') ? (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-xs)',
            padding: '1px 4px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            color: 'var(--color-primary-base)',
            fontSize: 14,
          }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

/* Toolbar icon button */
function ToolbarBtn({ children, title, active, onClick }: {
  children: React.ReactNode; title: string; active?: boolean; onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button title={title} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, borderRadius: '50%', border: 'none',
        background: active ? 'var(--color-primary-light)' : hover ? 'var(--color-surface-background-subtle)' : 'transparent',
        color: active ? 'var(--color-primary-base)' : hover ? 'var(--color-text-default)' : 'var(--color-text-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.15s',
        fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13,
        flexShrink: 0,
      }}>
      {children}
    </button>
  );
}

/* Comment action button (Reply) */
function ReplyBtn({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: 32, padding: '0 12px',
        borderRadius: 'var(--radius-md)', border: 'none',
        background: hover ? 'var(--color-primary-light)' : 'transparent',
        color: 'var(--color-text-dominant)',
        fontSize: 14, fontWeight: 700,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.5 7h9M7 3.5l3.5 3.5L7 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Reply
    </button>
  );
}

/* Like button */
function LikeBtn({ count, liked, onClick }: { count: number; liked: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <button onClick={onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          width: 32, height: 32, borderRadius: '50%', border: 'none',
          background: hover ? 'var(--color-surface-background-subtle)' : 'transparent',
          color: liked ? 'var(--color-primary-base)' : 'var(--color-text-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.15s',
        }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 13.5C8 13.5 1.5 9.8 1.5 5.5C1.5 3.29 3.29 1.5 5.5 1.5C6.6 1.5 7.6 2 8 2.85C8.4 2 9.4 1.5 10.5 1.5C12.71 1.5 14.5 3.29 14.5 5.5C14.5 9.8 8 13.5 8 13.5Z"
            fill={liked ? '#ef4444' : 'none'}
            stroke={liked ? '#ef4444' : 'var(--color-text-subtle)'} strokeWidth="1.3" strokeLinejoin="round"/>
        </svg>
      </button>
      <span style={{ fontSize: 12, color: 'var(--color-text-subtle)', lineHeight: 1.67 }}>{count}</span>
    </div>
  );
}

/* Single comment */
function CommentItem({ comment, liked, onLike, onReplySubmit, isNew }: {
  comment: Comment;
  liked: boolean;
  onLike: () => void;
  onReplySubmit: (commentId: number, text: string) => void;
  isNew?: boolean;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const submitReply = () => {
    if (!replyText.trim()) return;
    onReplySubmit(comment.id, replyText.trim());
    setReplyText('');
    setIsReplying(false);
  };

  const isJustNow = comment.timestamp === 'just now';

  return (
    <>
      <style>{`
        @keyframes note-enter {
          0%   { opacity: 0; transform: translateY(-14px) scale(0.98); }
          60%  { opacity: 1; transform: translateY(2px)   scale(1);    }
          100% { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes bubble-highlight {
          0%   { background: var(--color-primary-light); }
          100% { background: var(--color-surface-background-subtle); }
        }
      `}</style>
      <div style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        animation: isNew ? 'note-enter 0.45s cubic-bezier(0.16,1,0.3,1) both' : 'none',
      }}>
        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0, marginTop: 2,
          background: isJustNow ? 'var(--color-primary-base)' : 'var(--color-primary-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700,
          color: isJustNow ? 'white' : 'var(--color-primary-base)',
          transition: 'background 0.3s',
        }}>
          {comment.initials}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5 }}>
              {comment.author}
            </span>
            <span style={{
              fontSize: 12, lineHeight: 1.67,
              color: isJustNow ? 'var(--color-primary-base)' : 'var(--color-text-subtle)',
              fontWeight: isJustNow ? 600 : 400,
            }}>
              {comment.timestamp}
            </span>
          </div>

          {/* Bubble — top-left corner is square */}
          <div style={{
            borderRadius: '0 8px 8px 8px',
            padding: '12px 16px',
            animation: isNew ? 'bubble-highlight 1.2s ease-out 0.15s both' : 'none',
            background: 'var(--color-surface-background-subtle)',
          }}>
            <p style={{ fontSize: 14, color: 'var(--color-text-subtle)', lineHeight: 1.5, margin: 0 }}>
              <RichText text={comment.text} />
            </p>
          </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ReplyBtn onClick={() => setIsReplying(r => !r)} />
          <div style={{ width: 1, height: 16, background: 'var(--color-border-subtle)' }} />
          <LikeBtn count={comment.likes} liked={liked} onClick={onLike} />
        </div>

        {/* Replies thread */}
        {(comment.replies.length > 0 || isReplying) && (
          <div style={{
            marginTop: 4,
            paddingLeft: 16,
            borderLeft: '2px solid var(--color-border-subtle)',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {comment.replies.map(reply => (
              <div key={reply.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: 'var(--color-primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, fontWeight: 700, color: 'var(--color-primary-base)',
                }}>
                  {reply.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-default)' }}>
                      {reply.author}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-subtle)' }}>
                      {reply.timestamp}
                    </span>
                  </div>
                  <div style={{
                    background: 'white',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '0 8px 8px 8px',
                    padding: '10px 14px',
                  }}>
                    <p style={{ fontSize: 13, color: 'var(--color-text-subtle)', lineHeight: 1.5, margin: 0 }}>
                      <RichText text={reply.text} />
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply input */}
            {isReplying && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: 'var(--color-primary-base)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, fontWeight: 700, color: 'white',
                }}>
                  YO
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <textarea
                    autoFocus
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder={`Reply to ${comment.author}…`}
                    rows={2}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submitReply(); }}
                    style={{
                      width: '100%', border: '1px solid var(--color-border-default)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px 12px', outline: 'none',
                      fontSize: 13, color: 'var(--color-text-default)',
                      fontFamily: 'inherit', lineHeight: 1.5,
                      resize: 'none', background: 'white',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary-base)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; }}
                  />
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button onClick={() => { setIsReplying(false); setReplyText(''); }} style={{
                      height: 32, padding: '0 14px', borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-default)',
                      background: 'white', fontSize: 13, fontWeight: 600,
                      color: 'var(--color-text-subtle)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>Cancel</button>
                    <button onClick={submitReply} style={{
                      height: 32, padding: '0 14px', borderRadius: 'var(--radius-md)',
                      border: 'none', background: 'var(--color-primary-base)',
                      fontSize: 13, fontWeight: 700, color: 'white',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>Reply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

/* Toolbar SVG icons */
const IconBold = () => <span style={{ fontSize: 13, fontWeight: 700 }}>B</span>;
const IconItalic = () => <span style={{ fontSize: 13, fontStyle: 'italic', fontFamily: 'serif' }}>I</span>;
const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="2" cy="3.5" r="1" fill="currentColor"/>
    <circle cx="2" cy="7" r="1" fill="currentColor"/>
    <circle cx="2" cy="10.5" r="1" fill="currentColor"/>
  </svg>
);
const IconLinkTool = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 8.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M8.5 5.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconAt = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9.5 7c0 1.5.5 2.5 1.5 2.5s1.5-1.5 1.5-3A5.5 5.5 0 107 12.5c1.5 0 2.5-.5 3-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M16 9L2 3l5 6-5 6z" fill="currentColor"/>
  </svg>
);

function NotesTab() {
  const [editorText, setEditorText] = useState(
    "I just reviewed the portfolio. @David_Chen what do you think about the design system work at Nebula? It looks quite robust but I'd love a second pair of eyes on the accessibility compliance."
  );
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [newestId, setNewestId] = useState<number | null>(null);
  const [posting, setPosting] = useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setEditorText(v);
    const lastAt = v.lastIndexOf('@');
    if (lastAt === -1) { setShowMentions(false); return; }
    const afterAt = v.slice(lastAt + 1);
    if (afterAt.includes(' ') && afterAt.length > 0) { setShowMentions(false); return; }
    setShowMentions(true);
    setMentionQuery(afterAt);
  };

  const insertMention = (name: string) => {
    const lastAt = editorText.lastIndexOf('@');
    const slug = name.replace(/\s+/g, '_');
    setEditorText(editorText.slice(0, lastAt) + `@${slug} `);
    setShowMentions(false);
    textareaRef.current?.focus();
  };

  const postNote = () => {
    if (!editorText.trim()) return;
    const id = Date.now();
    const newComment: Comment = {
      id,
      author: 'You',
      initials: 'YO',
      timestamp: 'just now',
      text: editorText.trim(),
      likes: 0,
      replies: [],
    };
    setPosting(true);
    setTimeout(() => setPosting(false), 380);
    setComments(prev => [newComment, ...prev]);
    setNewestId(id);
    setTimeout(() => setNewestId(null), 1400);
    setEditorText('');
  };

  const handleReplySubmit = (commentId: number, text: string) => {
    setComments(prev => prev.map(c =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, { id: Date.now(), author: 'You', initials: 'YO', timestamp: 'just now', text }] }
        : c
    ));
  };

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setComments(c => c.map(cm => cm.id === id ? { ...cm, likes: cm.likes - 1 } : cm));
      } else {
        next.add(id);
        setComments(c => c.map(cm => cm.id === id ? { ...cm, likes: cm.likes + 1 } : cm));
      }
      return next;
    });
  };

  const filtered = TEAM_MEMBERS.filter(m =>
    m.toLowerCase().replace(/\s+/g, '_').includes(mentionQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Rich Text Editor */}
      <div style={{
        background: 'white',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}>
          <ToolbarBtn title="Bold"><IconBold /></ToolbarBtn>
          <ToolbarBtn title="Italic"><IconItalic /></ToolbarBtn>
          <ToolbarBtn title="List"><IconList /></ToolbarBtn>
          <ToolbarBtn title="Link"><IconLinkTool /></ToolbarBtn>
          <div style={{ width: 1, height: 20, background: 'var(--color-border-subtle)', margin: '0 4px' }} />
          <ToolbarBtn title="Mention (@)" onClick={() => {
            setEditorText(t => t + '@');
            setShowMentions(true);
            setMentionQuery('');
            setTimeout(() => textareaRef.current?.focus(), 0);
          }}><IconAt /></ToolbarBtn>
        </div>

        {/* Body */}
        <div style={{ position: 'relative', minHeight: 120, padding: 16 }}>
          {showMentions && filtered.length > 0 && (
            <div style={{
              position: 'absolute', top: 8, left: 16, right: 16, zIndex: 50,
              background: 'white',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              overflow: 'hidden',
            }}>
              {filtered.map(m => (
                <button key={m} onMouseDown={() => insertMention(m)} style={{
                  width: '100%', padding: '10px 14px', textAlign: 'left',
                  border: 'none', borderBottom: '1px solid var(--color-border-subtle)',
                  background: 'white', fontSize: 13,
                  color: 'var(--color-text-default)', cursor: 'pointer', fontFamily: 'inherit',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-light)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
          <textarea
            ref={textareaRef}
            value={editorText}
            onChange={handleEditorChange}
            placeholder="Write your notes here. Tag teammates with @"
            rows={5}
            style={{
              width: '100%', border: 'none', outline: 'none',
              background: 'transparent',
              fontSize: 14, color: 'var(--color-text-default)',
              fontFamily: 'inherit', lineHeight: 1.5,
              resize: 'none',
            }}
          />
        </div>

        {/* Footer */}
        <div style={{
          background: 'var(--color-surface-background-subtle)',
          borderTop: '1px solid var(--color-border-subtle)',
          padding: 12,
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <>
            <style>{`
              @keyframes btn-post {
                0%   { transform: scale(1);    }
                30%  { transform: scale(0.93); }
                65%  { transform: scale(1.04); }
                100% { transform: scale(1);    }
              }
            `}</style>
            <button onClick={postNote} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 40, padding: '0 16px',
              borderRadius: 'var(--radius-md)', border: 'none',
              background: 'var(--color-primary-base)',
              color: 'white',
              fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background 0.15s',
              animation: posting ? 'btn-post 0.38s cubic-bezier(0.36,0.07,0.19,0.97) both' : 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-base)'; }}
            >
              Post Note
              <IconSend />
            </button>
          </>
        </div>
      </div>

      {/* Comment Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5 }}>
          Recent Activity
        </div>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            liked={likedIds.has(comment.id)}
            onLike={() => toggleLike(comment.id)}
            onReplySubmit={handleReplySubmit}
            isNew={comment.id === newestId}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Criterion card (Scorecard tab) ── */
function CriterionCard({
  criterion, onNoteChange, onRatingChange,
}: {
  criterion: EvalCriterion;
  onNoteChange: (note: string) => void;
  onRatingChange: (rating: number) => void;
}) {
  return (
    <div style={{
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-md)', padding: 16, background: 'white',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-default)' }}>
          {criterion.label}
        </div>
        {criterion.rating !== null ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-default)' }}>
              {criterion.rating}/5
            </span>
            <StarRow value={criterion.rating} size={16} onClick={onRatingChange} />
          </div>
        ) : (
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-warning-light)',
            color: 'var(--color-warning-dark)',
            fontSize: 12, fontWeight: 600,
            border: '1px solid var(--color-warning)',
          }}>
            Pending
          </span>
        )}
      </div>

      {criterion.rating !== null ? (
        <textarea
          value={criterion.note}
          onChange={e => onNoteChange(e.target.value)}
          placeholder="Add evaluation notes..."
          rows={3}
          style={{
            width: '100%', padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border-subtle)',
            background: 'var(--color-surface-background-subtle)',
            fontSize: 13, color: 'var(--color-text-default)',
            fontFamily: 'inherit', lineHeight: 1.6,
            resize: 'vertical', outline: 'none',
          }}
        />
      ) : (
        <button
          onClick={() => onRatingChange(3)}
          style={{
            width: '100%', height: 36,
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--color-primary-base)',
            background: 'white',
            color: 'var(--color-primary-base)',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-light)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
        >
          Evaluate after interview
        </button>
      )}
    </div>
  );
}

/* ── Small icon buttons for header ── */
function HeaderIconBtn({ children, title, onClick }: {
  children: React.ReactNode; title: string; onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button title={title} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 36, height: 36, borderRadius: 'var(--radius-md)',
        border: `1px solid ${hover ? 'var(--color-border-default)' : 'var(--color-border-subtle)'}`,
        background: hover ? 'var(--color-surface-background-subtle)' : 'transparent',
        color: hover ? 'var(--color-text-default)' : 'var(--color-text-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.15s',
      }}>
      {children}
    </button>
  );
}

function HeaderActionBtn({ label, variant, onClick }: {
  label: string; variant: 'primary' | 'danger'; onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        height: 36, padding: '0 18px',
        borderRadius: 'var(--radius-md)',
        border: variant === 'primary' ? 'none' : `1.5px solid ${hover ? 'var(--color-error)' : 'var(--color-error-light)'}`,
        background: variant === 'primary'
          ? (hover ? 'var(--color-primary-hover)' : 'var(--color-primary-base)')
          : (hover ? 'var(--color-error-light)' : 'white'),
        color: variant === 'primary' ? 'white' : 'var(--color-error-dark)',
        fontSize: 14, fontWeight: 700,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}>
      {label}
    </button>
  );
}

function ToolbarIconBtn({ children, title }: { children: React.ReactNode; title: string }) {
  const [hover, setHover] = useState(false);
  return (
    <button title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: hover ? 'var(--color-surface-background-subtle)' : 'transparent',
        color: hover ? 'var(--color-text-default)' : 'var(--color-text-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.15s',
      }}>
      {children}
    </button>
  );
}

/* ── Evaluation tab types & data ── */
interface EvalCriterion {
  id: string;
  label: string;
  description: string;
  rating: number | null; // null = not yet rated
  note: string;
}

const INITIAL_EVAL_CRITERIA: EvalCriterion[] = [
  {
    id: 'experience',
    label: 'Relevant Experience',
    description: 'Assess the depth of knowledge in design tools and frontend principles.',
    rating: 4.5,
    note: 'Deep enterprise experience in Figma and design systems. Previous role at FinFlow is highly relevant to our scale.',
  },
  {
    id: 'cultural',
    label: 'Cultural Fit',
    description: "Evaluate candidate's alignment with company values and team dynamics.",
    rating: null,
    note: '',
  },
  {
    id: 'communication',
    label: 'Communication Skills',
    description: 'Assess clarity, confidence, and effectiveness of verbal and written communication.',
    rating: 5,
    note: 'Excellent communicator with clear and concise style. Strong interpersonal skills and active listening during initial screening.',
  },
  {
    id: 'relevance',
    label: 'Role Relevance',
    description: 'How closely does the background match the specific requirements of this role?',
    rating: 4,
    note: 'Well-aligned with Lead Product Designer responsibilities. Portfolio shows strong systems thinking.',
  },
  {
    id: 'problem-solving',
    label: 'Problem Solving',
    description: 'Evaluate ability to break down complex problems and propose effective, creative solutions.',
    rating: null,
    note: '',
  },
  {
    id: 'leadership',
    label: 'Leadership & Initiative',
    description: 'Assess evidence of proactive ownership, team mentoring, and cross-functional influence.',
    rating: 3,
    note: 'Has managed small design pods but limited enterprise-scale leadership experience. Shows clear potential.',
  },
  {
    id: 'technical',
    label: 'Technical Proficiency',
    description: "Rate the candidate's technical skills relevant to the role — tools, methodologies, and craft quality.",
    rating: null,
    note: '',
  },
  {
    id: 'adaptability',
    label: 'Adaptability & Growth',
    description: 'Evaluate openness to feedback, comfort with ambiguity, and evidence of continuous learning.',
    rating: 4,
    note: 'Demonstrated quick adaptation across fintech and healthtech industries. Proactively up-skills in emerging tools.',
  },
];

const VERDICT_OPTIONS: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'strong-match', label: 'Strong match', icon: <IconCheck /> },
  { id: 'top5', label: 'Top 5%', icon: <IconStar /> },
  { id: 'waitlist', label: 'Waitlist', icon: <IconClock /> },
  { id: 'skip', label: 'Skip', icon: <IconSkip /> },
];

/* ── Large interactive star rating (32px, evaluation tab) ── */
function LargeStarRating({ value, onChange }: { value: number | null; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value ?? 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex', gap: 3 }}
        onMouseLeave={() => setHovered(null)}>
        {[1, 2, 3, 4, 5].map(i => {
          const filled = display >= i ? 'full' : display >= i - 0.5 ? 'half' : 'empty';
          const star = filled === 'full' ? <StarFull size={32} /> : filled === 'half' ? <StarHalf size={32} /> : <StarEmpty size={32} />;
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              onMouseEnter={() => setHovered(i)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
            >
              {star}
            </button>
          );
        })}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--color-text-default)', minWidth: 24 }}>
        {value ?? 0}
      </span>
    </div>
  );
}

/* ── Verdict chip ── */
function VerdictChip({
  label, icon, selected, onClick,
}: {
  label: string; icon: React.ReactNode; selected: boolean; onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: 32, padding: '0 12px',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${selected ? 'var(--color-primary-base)' : hover ? 'var(--color-border-default)' : 'var(--color-border-subtle)'}`,
        background: selected ? 'var(--color-primary-light)' : hover ? 'var(--color-surface-background-subtle)' : 'white',
        color: selected ? 'var(--color-primary-base)' : 'var(--color-text-default)',
        fontSize: 14, fontWeight: selected ? 600 : 400,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ── Evaluation criterion card ── */
function EvalCriterionCard({
  criterion, onNoteChange, onRatingChange,
}: {
  criterion: EvalCriterion;
  onNoteChange: (note: string) => void;
  onRatingChange: (rating: number) => void;
}) {
  const isPending = criterion.rating === null;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      paddingBottom: 24,
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)', lineHeight: 1.5 }}>
            {criterion.label}
          </div>
          {isPending && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5,
              color: 'var(--color-warning)', fontSize: 12, fontWeight: 700 }}>
              <IconWarning />
              Pending
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0 }}>
          <LargeStarRating value={criterion.rating} onChange={onRatingChange} />
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: 'var(--color-text-default)', lineHeight: 1.67, margin: 0 }}>
        {criterion.description}
      </p>

      {/* Textarea */}
      <div style={{
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        background: 'white',
        padding: 8,
        minHeight: 96,
        position: 'relative',
      }}>
        <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', marginBottom: 4, lineHeight: 1.67 }}>
          Evaluation
        </div>
        <textarea
          value={criterion.note}
          onChange={e => onNoteChange(e.target.value)}
          placeholder="Write your evaluation here"
          style={{
            width: '100%', border: 'none', outline: 'none',
            background: 'transparent',
            fontSize: 14, color: 'var(--color-text-default)',
            fontFamily: 'inherit', lineHeight: 1.5,
            resize: 'none', minHeight: 64,
          }}
          rows={3}
        />
      </div>
    </div>
  );
}

/* ── Evaluation Tab ── */
function EvaluationTab({
  criteria,
  onNoteChange,
  onRatingChange,
}: {
  criteria: EvalCriterion[];
  onNoteChange: (id: string, note: string) => void;
  onRatingChange: (id: string, rating: number) => void;
}) {
  const [selectedVerdicts, setSelectedVerdicts] = useState<Set<string>>(new Set(['strong-match']));

  const toggleVerdict = (id: string) =>
    setSelectedVerdicts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Quick Verdict */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)' }}>
          Quick Verdict
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {VERDICT_OPTIONS.map(opt => (
            <VerdictChip
              key={opt.id}
              label={opt.label}
              icon={opt.icon}
              selected={selectedVerdicts.has(opt.id)}
              onClick={() => toggleVerdict(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-border-subtle)' }} />

      {/* Criteria */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {criteria.map(c => (
          <EvalCriterionCard
            key={c.id}
            criterion={c}
            onNoteChange={note => onNoteChange(c.id, note)}
            onRatingChange={rating => onRatingChange(c.id, rating)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
type TabId = 'scorecard' | 'evaluation' | 'history' | 'notes';

const TABS: { id: TabId; label: string }[] = [
  { id: 'scorecard', label: 'Scorecard' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'history', label: 'History' },
  { id: 'notes', label: 'Team Notes' },
];

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

export default function CandidateInfoPage({ candidate, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('scorecard');
  const [criteria, setCriteria] = useState<EvalCriterion[]>(INITIAL_EVAL_CRITERIA);

  /* ── Overall rating entry animation (runs once on mount) ── */
  const overallRating = 4.5;
  const [animatedRating, setAnimatedRating] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [starsReady, setStarsReady] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const DURATION = 1100;
    const startRating = 0;
    const endRating = overallRating;
    const endScore = candidate.score;
    const startTime = performance.now();

    // Stars pop in after a short delay
    const starsTimer = setTimeout(() => setStarsReady(true), 80);

    const tick = (now: number) => {
      const elapsed = Math.min(now - startTime, DURATION);
      // Ease-out cubic
      const t = 1 - Math.pow(1 - elapsed / DURATION, 3);
      setAnimatedRating(Math.round((startRating + t * (endRating - startRating)) * 10) / 10);
      setAnimatedScore(Math.round(t * endScore));
      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAnimatedRating(endRating);
        setAnimatedScore(endScore);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(starsTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initials = candidate.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const updateNote = (id: string, note: string) =>
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, note } : c));
  const updateRating = (id: string, rating: number) =>
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, rating } : c));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Left Pane: CV Viewer ── */}
        <div style={{
          flex: '0 0 60%',
          background: 'var(--color-surface-background)',
          overflowY: 'auto',
          borderRight: '1px solid var(--color-border-subtle)',
        }}>
          {/* CV toolbar */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(6px)',
            borderBottom: '1px solid var(--color-border-subtle)',
            padding: '8px 20px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-default)', flex: 1 }}>
              {candidate.name} – Resume.pdf
            </span>
            <ToolbarIconBtn title="Zoom in"><IconZoomIn /></ToolbarIconBtn>
            <ToolbarIconBtn title="Zoom out"><IconZoomOut /></ToolbarIconBtn>
            <div style={{ width: 1, height: 20, background: 'var(--color-border-subtle)', margin: '0 4px' }} />
            <ToolbarIconBtn title="Download"><IconDownload /></ToolbarIconBtn>
          </div>

          <CVViewer candidate={candidate} />
        </div>

        {/* ── Right Pane: Workspace ── */}
        <div style={{
          flex: '0 0 40%',
          background: 'var(--color-surface-background)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Sticky header */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 20,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(6px)',
            borderBottom: '1px solid #f0f3ff',
            padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
            flexShrink: 0,
          }}>
            <HeaderActionBtn label="Advance" variant="primary" onClick={() => alert('Advancing candidate')} />
            <HeaderActionBtn label="Reject" variant="danger" onClick={() => { if (confirm('Reject this candidate?')) onClose(); }} />
            <div style={{ flex: 1 }} />
            <HeaderIconBtn title="Share profile" onClick={() => alert('Share profile')}>
              <IconShare />
            </HeaderIconBtn>
            <HeaderIconBtn title="Close" onClick={onClose}>
              <IconX />
            </HeaderIconBtn>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 108px' }}>

            {/* Candidate profile */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
                background: 'var(--color-primary-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, color: 'var(--color-primary-base)',
              }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 22, fontWeight: 800, color: '#111c2d',
                  letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 4,
                }}>
                  {candidate.name}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14, fontWeight: 500, color: '#454652', marginBottom: 8,
                }}>
                  {candidate.role} · {candidate.company}
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-info)',
                  background: 'var(--color-info-light)',
                  color: 'var(--color-info-dark)',
                  fontSize: 12, fontWeight: 600,
                }}>
                  {candidate.status}
                </span>
              </div>
            </div>

            {/* Overall rating */}
            <>
              <style>{`
                @keyframes rating-card-in {
                  from { opacity: 0; transform: translateY(10px) scale(0.97); }
                  to   { opacity: 1; transform: translateY(0)   scale(1);    }
                }
                @keyframes star-pop {
                  0%   { transform: scale(0) rotate(-25deg); opacity: 0; }
                  65%  { transform: scale(1.25) rotate(5deg);  opacity: 1; }
                  100% { transform: scale(1)    rotate(0deg);  opacity: 1; }
                }
                @keyframes score-glow {
                  0%   { text-shadow: none; }
                  50%  { text-shadow: 0 0 12px rgba(53,77,151,0.45); }
                  100% { text-shadow: none; }
                }
              `}</style>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '12px 16px',
                background: 'var(--color-surface-background-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
                marginBottom: 20,
                animation: 'rating-card-in 0.45s cubic-bezier(0.16,1,0.3,1) both',
              }}>
                {/* Numeric score */}
                <div style={{ minWidth: 52 }}>
                  <div style={{
                    fontSize: 28, fontWeight: 800, color: 'var(--color-text-default)', lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                    animation: animatedRating === overallRating ? 'score-glow 0.6s ease-out 0.1s both' : 'none',
                  }}>
                    {animatedRating.toFixed(1)}
                    <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--color-text-subtle)' }}> /5</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-subtle)', marginTop: 3 }}>Overall Score</div>
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 36, background: 'var(--color-border-subtle)', flexShrink: 0 }} />

                {/* Stars + match */}
                <div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
                    {[1, 2, 3, 4, 5].map(i => {
                      const state = overallRating >= i ? 'full' : overallRating >= i - 0.5 ? 'half' : 'empty';
                      const star = state === 'full'
                        ? <StarFull size={22} />
                        : state === 'half'
                        ? <StarHalf size={22} />
                        : <StarEmpty size={22} />;
                      return (
                        <span
                          key={i}
                          style={{
                            lineHeight: 0,
                            display: 'inline-block',
                            opacity: starsReady ? 1 : 0,
                            animation: starsReady
                              ? `star-pop 0.5s cubic-bezier(.34,1.56,.64,1) ${(i - 1) * 0.1}s both`
                              : 'none',
                          }}
                        >
                          {star}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-subtle)' }}>
                    Match:{' '}
                    <span style={{
                      fontWeight: 700,
                      color: 'var(--color-primary-base)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {animatedScore}%
                    </span>
                  </div>
                </div>
              </div>
            </>

            {/* Contact links */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 12,
              marginBottom: 24, paddingBottom: 20,
              borderBottom: '1px solid var(--color-border-subtle)',
            }}>
              {[
                { icon: <IconLink />, label: 'Portfolio', href: '#' },
                { icon: <IconLinkedIn />, label: 'LinkedIn', href: '#' },
                { icon: <IconMail />, label: `${candidate.name.split(' ')[0].toLowerCase()}@email.com`, href: '#' },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} className="ds-link-primary"
                  onClick={e => e.preventDefault()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                  {icon}{label}
                </a>
              ))}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--color-text-subtle)' }}>
                <IconPin />{candidate.city}, {candidate.country}
              </span>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: 4,
              marginBottom: 20, padding: 4,
              background: 'var(--color-surface-background-subtle)',
              borderRadius: 'var(--radius-md)',
            }}>
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1, height: 34,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: activeTab === tab.id ? 'var(--color-primary-light)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--color-primary-base)' : 'var(--color-text-subtle)',
                    fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 400,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'scorecard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {criteria.map(c => (
                  <CriterionCard
                    key={c.id}
                    criterion={c}
                    onNoteChange={note => updateNote(c.id, note)}
                    onRatingChange={rating => updateRating(c.id, rating)}
                  />
                ))}
              </div>
            )}

            {activeTab === 'evaluation' && (
              <EvaluationTab
                criteria={criteria}
                onNoteChange={updateNote}
                onRatingChange={updateRating}
              />
            )}

            {activeTab === 'history' && <HistoryTab candidate={candidate} />}
            {activeTab === 'notes' && <NotesTab />}
          </div>

          {/* Bottom action bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '14px 20px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0px -2px 24px 0px rgba(17,28,45,0.08), 0px 12px 40px 0px rgba(17,28,45,0.15)',
            borderTop: '1px solid var(--color-border-subtle)',
          }}>
            <button
              onClick={() => alert('Schedule Next Round')}
              style={{
                width: '100%', height: 48,
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: 'var(--color-primary-base)',
                color: 'white',
                fontSize: 16, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-base)'; }}
            >
              <IconCalendar />
              Schedule Next Round
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
