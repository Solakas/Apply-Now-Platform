import React, { useCallback, useRef, useState } from 'react';
import type { Filters, PipelineStage, CandidateStatus, QualificationLevel, ScoreThreshold } from '../types';

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

/* ── Chip ── */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        height: 36, padding: '0 12px',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${active ? 'var(--color-primary-base)' : 'var(--color-border-default)'}`,
        background: active ? 'var(--color-primary-light)' : 'var(--color-surface-default)',
        color: active ? 'var(--color-primary-base)' : 'var(--color-text-default)',
        fontSize: 14, fontWeight: active ? 600 : 400,
        cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'all 0.15s', fontFamily: 'inherit',
      }}
    >
      {active && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="#354d97" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {label}
    </button>
  );
}

/* ── Checkbox ── */
function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 10,
      height: 44, cursor: 'pointer',
      fontSize: 15, color: 'var(--color-text-default)',
    }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 20, height: 20, borderRadius: 4,
          border: `1.5px solid ${checked ? 'var(--color-primary-base)' : 'var(--color-border-strong)'}`,
          background: checked ? 'var(--color-primary-base)' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.15s', cursor: 'pointer',
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span onClick={() => onChange(!checked)}>{label}</span>
    </label>
  );
}

/* ── Dual Range Slider ── */
function DualRangeSlider({ min, max, valueMin, valueMax, onChangeMin, onChangeMax }: {
  min: number; max: number; valueMin: number; valueMax: number;
  onChangeMin: (v: number) => void; onChangeMax: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div ref={trackRef} style={{ position: 'relative', height: 6, margin: '12px 0 20px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-border-subtle)', borderRadius: 'var(--radius-full)' }} />
        <div style={{
          position: 'absolute',
          left: `${pct(valueMin)}%`, right: `${100 - pct(valueMax)}%`,
          top: 0, bottom: 0,
          background: 'var(--color-primary-base)', borderRadius: 'var(--radius-full)',
        }} />
        {/* Visual thumbs */}
        {([
          { value: valueMin, onChange: onChangeMin, constraint: (v: number) => Math.max(min, Math.min(v, valueMax - 1)) },
          { value: valueMax, onChange: onChangeMax, constraint: (v: number) => Math.max(valueMin + 1, Math.min(v, max)) },
        ] as const).map((thumb, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `calc(${pct(thumb.value)}% - 10px)`,
            top: -7, width: 20, height: 20, borderRadius: '50%',
            background: 'var(--color-primary-base)',
            border: '2.5px solid white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            cursor: 'ew-resize',
          }}
            onMouseDown={e => {
              const rect = trackRef.current!.getBoundingClientRect();
              const move = (me: MouseEvent) => {
                const raw = ((me.clientX - rect.left) / rect.width) * (max - min) + min;
                thumb.onChange(Math.round(thumb.constraint(raw)));
              };
              const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
              window.addEventListener('mousemove', move);
              window.addEventListener('mouseup', up);
              e.preventDefault();
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'Min', value: valueMin, onChange: onChangeMin },
          { label: 'Max', value: valueMax, onChange: onChangeMax },
        ].map(({ label, value, onChange }) => (
          <div key={label} style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', marginBottom: 4 }}>{label}</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)', padding: '6px 10px', background: 'white',
            }}>
              <input
                type="number" value={value} min={min} max={max}
                onChange={e => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: 'var(--color-text-default)', fontFamily: 'inherit' }}
              />
              <span style={{ fontSize: 13, color: 'var(--color-text-subtle)' }}>%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Location Combobox ── */
const ALL_CITIES = ['Barcelona', 'Berlin', 'Buenos Aires', 'Dubai', 'London', 'Moscow', 'Tokyo', 'Toronto', 'Town'];

function LocationCombobox({ selected, onAdd, onRemove }: {
  selected: string[];
  onAdd: (city: string) => void;
  onRemove: (city: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = ALL_CITIES.filter(city =>
    !selected.includes(city) &&
    city.toLowerCase().includes(query.toLowerCase())
  );

  const select = (city: string) => {
    onAdd(city);
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Selected tags */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {selected.map(city => (
            <span key={city} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 8px 3px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary-base)',
              fontSize: 13, fontWeight: 600,
            }}>
              {city}
              <button
                onClick={() => onRemove(city)}
                style={{
                  width: 16, height: 16, borderRadius: '50%',
                  border: 'none', background: 'transparent',
                  color: 'var(--color-primary-base)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0, fontSize: 14, lineHeight: 1,
                }}
              >×</button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        border: `1px solid ${open ? 'var(--color-primary-base)' : 'var(--color-border-default)'}`,
        borderRadius: 'var(--radius-md)', padding: '9px 12px',
        background: 'white', transition: 'border-color 0.15s',
      }}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={selected.length === 0 ? 'Search city…' : 'Add city…'}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', color: 'var(--color-text-default)', background: 'transparent' }}
        />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M3 5l4 4 4-4" stroke="var(--color-text-subtle)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          background: 'white',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}>
          {suggestions.map((city, i) => (
            <button
              key={city}
              onMouseDown={() => select(city)}
              style={{
                width: '100%', padding: '10px 12px', textAlign: 'left',
                border: 'none',
                borderBottom: i < suggestions.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                background: 'white', fontSize: 14,
                color: 'var(--color-text-default)', cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-light)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary-base)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-default)'; }}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {open && query.length > 0 && suggestions.length === 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          background: 'white', border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-md)', padding: '10px 12px',
          fontSize: 14, color: 'var(--color-text-subtle)',
        }}>
          No cities match "{query}"
        </div>
      )}
    </div>
  );
}

/* ── Section / Group labels ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-default)', marginBottom: 12 }}>
      {children}
    </div>
  );
}
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-subtle)', marginBottom: 8 }}>
      {children}
    </div>
  );
}

/* ── Constants ── */
const PIPELINE_STAGES: PipelineStage[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

const APP_STATUSES: CandidateStatus[] = [
  'New', 'Screen Call', 'Assignment', 'Ass. Center', 'Ex. Interview', 'Offer', 'Hired',
];

const SCORE_THRESHOLDS: ScoreThreshold[] = ['>70%', '>80%', '>90%', 'Any'];

const QUAL_LEVELS: QualificationLevel[] = ['Any', 'Junior', 'Mid', 'Senior', 'Lead'];

const DEFAULT_FILTERS: Filters = {
  pipelineStages: ['Screening'],
  applicationStatuses: [],
  matchScoreMin: 0,
  matchScoreMax: 100,
  scoreThreshold: '>80%',
  qualificationLevels: ['Any'],
  locations: [],
};

export default function FilterSidebar({ filters, onChange }: Props) {
  const toggle = useCallback(<T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item], []);

  return (
    <aside style={{
      width: 280, flexShrink: 0,
      background: 'var(--color-surface-default)',
      borderRight: '1px solid var(--color-border-subtle)',
      display: 'flex', flexDirection: 'column',
      height: '100%', overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--color-border-subtle)',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)' }}>
          Filter Applicants
        </span>
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-primary-base)', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Reset all
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

        {/* ── Jobs & Pipeline ── */}
        <SectionHeading>Jobs &amp; Pipeline</SectionHeading>

        <div style={{ marginBottom: 24 }}>
          <GroupLabel>Pipeline Stage</GroupLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PIPELINE_STAGES.map(s => (
              <Chip
                key={s} label={s}
                active={filters.pipelineStages.includes(s)}
                onClick={() => onChange({ ...filters, pipelineStages: toggle(filters.pipelineStages, s) })}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <GroupLabel>Application Status</GroupLabel>
          {APP_STATUSES.map(s => (
            <CheckOption
              key={s} label={s}
              checked={filters.applicationStatuses.includes(s)}
              onChange={() => onChange({ ...filters, applicationStatuses: toggle(filters.applicationStatuses, s) })}
            />
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '8px -20px 24px' }} />

        {/* ── Candidate Status ── */}
        <SectionHeading>Candidate Status</SectionHeading>

        <div style={{ marginBottom: 24 }}>
          <GroupLabel>Match Score</GroupLabel>
          <DualRangeSlider
            min={0} max={100}
            valueMin={filters.matchScoreMin} valueMax={filters.matchScoreMax}
            onChangeMin={v => onChange({ ...filters, matchScoreMin: v })}
            onChangeMax={v => onChange({ ...filters, matchScoreMax: v })}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {SCORE_THRESHOLDS.map(t => (
              <Chip
                key={t} label={t}
                active={filters.scoreThreshold === t}
                onClick={() => onChange({ ...filters, scoreThreshold: t })}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <GroupLabel>
            Qualification Level
            <span style={{ fontWeight: 400, marginLeft: 6, fontSize: 11 }}>
              (Junior ≤2y · Mid 3–5y · Senior 5–7y · Lead 7+y)
            </span>
          </GroupLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUAL_LEVELS.map(l => (
              <Chip
                key={l} label={l}
                active={filters.qualificationLevels.includes(l)}
                onClick={() => {
                  if (l === 'Any') {
                    onChange({ ...filters, qualificationLevels: ['Any'] });
                  } else {
                    const next = toggle(filters.qualificationLevels.filter(x => x !== 'Any'), l);
                    onChange({ ...filters, qualificationLevels: next.length === 0 ? ['Any'] : next });
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '8px -20px 24px' }} />

        {/* ── Details & Experience ── */}
        <SectionHeading>Details &amp; Experience</SectionHeading>

        <div style={{ marginBottom: 16 }}>
          <GroupLabel>Location</GroupLabel>
          <LocationCombobox
            selected={filters.locations}
            onAdd={city => onChange({ ...filters, locations: [...filters.locations, city] })}
            onRemove={city => onChange({ ...filters, locations: filters.locations.filter(l => l !== city) })}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <GroupLabel>Keywords / Skills</GroupLabel>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-md)', padding: '10px 12px', background: 'white',
          }}>
            <input
              placeholder="e.g. React, Python…"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', color: 'var(--color-text-default)' }}
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '8px -20px 24px' }} />

        {/* ── Time & Source ── */}
        <SectionHeading>Time &amp; Source</SectionHeading>

        <div style={{ marginBottom: 16 }}>
          <GroupLabel>Applied After</GroupLabel>
          <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', padding: '10px 12px', background: 'white' }}>
            <input
              type="date"
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', color: 'var(--color-text-default)' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <GroupLabel>Source</GroupLabel>
          {['LinkedIn', 'Referral', 'Website', 'Job Board', 'Agency'].map(src => (
            <CheckOption key={src} label={src} checked={false} onChange={() => {}} />
          ))}
        </div>

      </div>
    </aside>
  );
}
