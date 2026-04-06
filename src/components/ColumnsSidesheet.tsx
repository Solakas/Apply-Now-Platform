import React, { useState } from 'react';
import type { ColumnConfig, ActionConfig } from '../types';

/* ── Defaults (match Figma) ── */
export const DEFAULT_COLUMN_CONFIG: ColumnConfig = {
  experience: true,
  score: true,
  location: true,
  apDate: true,
  status: true,
  skills: false,
  contactInfo: false,
  actions: true,
};

export const DEFAULT_ACTION_CONFIG: ActionConfig = {
  thumbsUp: false,
  thumbsDown: false,
  share: true,
  contact: true,
  moreActions: true,
  quickNote: false,
  promote: false,
  reject: false,
  archive: false,
};

const COLUMN_OPTIONS: { key: keyof ColumnConfig; label: string }[] = [
  { key: 'experience',  label: 'Experience' },
  { key: 'score',       label: 'Score' },
  { key: 'location',    label: 'Location' },
  { key: 'apDate',      label: 'Application Date' },
  { key: 'status',      label: 'Status' },
  { key: 'skills',      label: 'Skills' },
  { key: 'contactInfo', label: 'Contact Info' },
  { key: 'actions',     label: 'Actions' },
];

const ACTION_OPTIONS: { key: keyof ActionConfig; label: string }[] = [
  { key: 'thumbsUp',    label: 'Thumbs Up' },
  { key: 'thumbsDown',  label: 'Thumbs Down' },
  { key: 'share',       label: 'Share Candidate' },
  { key: 'contact',     label: 'Contact' },
  { key: 'moreActions', label: 'More actions' },
  { key: 'quickNote',   label: 'Quick Note' },
  { key: 'promote',     label: 'Promote to next phase' },
  { key: 'reject',      label: 'Reject' },
  { key: 'archive',     label: 'Archive to Talent Vault' },
];

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckboxRow({
  checked, label, onChange, disabled,
}: {
  checked: boolean; label: string; onChange: () => void; disabled?: boolean;
}) {
  return (
    <div
      onClick={disabled ? undefined : onChange}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        minHeight: 44, cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: 4, flexShrink: 0,
        border: checked ? 'none' : '1px solid var(--color-border-default)',
        background: checked ? 'var(--color-primary-base)' : 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
        transition: 'background 0.15s',
      }}>
        {checked && <CheckIcon />}
      </div>
      <span style={{
        fontSize: 16, color: 'var(--color-text-default)',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}>
        {label}
      </span>
    </div>
  );
}

interface Props {
  columnConfig: ColumnConfig;
  actionConfig: ActionConfig;
  onApply: (cols: ColumnConfig, actions: ActionConfig) => void;
  onClose: () => void;
}

export default function ColumnsSidesheet({ columnConfig, actionConfig, onApply, onClose }: Props) {
  const [draftCols, setDraftCols] = useState<ColumnConfig>({ ...columnConfig });
  const [draftActions, setDraftActions] = useState<ActionConfig>({ ...actionConfig });

  const toggleCol = (key: keyof ColumnConfig) =>
    setDraftCols(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleAction = (key: keyof ActionConfig) =>
    setDraftActions(prev => ({ ...prev, [key]: !prev[key] }));

  const resetAll = () => {
    setDraftCols({ ...DEFAULT_COLUMN_CONFIG });
    setDraftActions({ ...DEFAULT_ACTION_CONFIG });
  };

  return (
    <>
      <style>{`
        @keyframes sh-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sh-slide-in {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,0,0.38)',
          animation: 'sh-overlay-in 0.25s ease-out both',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', left: 0, top: 0, bottom: 0,
        width: 360, zIndex: 301,
        background: 'white',
        boxShadow: '6px 0 32px rgba(0,0,0,0.14)',
        display: 'flex', flexDirection: 'column',
        animation: 'sh-slide-in 0.32s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', flexShrink: 0,
        }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-default)', lineHeight: 1.33 }}>
            Table Columns
          </span>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: '50%', border: 'none',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-subtle)', transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-background-subtle)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <IconX />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border-subtle)', flexShrink: 0 }} />

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Display Columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)', marginBottom: 4 }}>
              Display Columns
            </div>
            {/* Candidate — always on */}
            <CheckboxRow checked label="Candidate" onChange={() => {}} disabled />
            {COLUMN_OPTIONS.map(opt => (
              <CheckboxRow
                key={opt.key}
                checked={draftCols[opt.key]}
                label={opt.label}
                onChange={() => toggleCol(opt.key)}
              />
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--color-border-subtle)' }} />

          {/* Display Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-default)', marginBottom: 4 }}>
              Display Actions
            </div>
            {ACTION_OPTIONS.map(opt => (
              <CheckboxRow
                key={opt.key}
                checked={draftActions[opt.key]}
                label={opt.label}
                onChange={() => toggleAction(opt.key)}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border-subtle)', flexShrink: 0 }} />

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', flexShrink: 0,
        }}>
          <button
            onClick={resetAll}
            style={{
              height: 40, padding: '0 16px',
              borderRadius: 'var(--radius-md)', border: 'none',
              background: 'transparent', cursor: 'pointer',
              fontSize: 16, fontWeight: 700, color: 'var(--color-text-dominant)',
              fontFamily: 'inherit', transition: 'color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-dominant)'; }}
          >
            Reset All
          </button>
          <button
            onClick={() => { onApply(draftCols, draftActions); onClose(); }}
            style={{
              height: 40, padding: '0 20px',
              borderRadius: 'var(--radius-md)', border: 'none',
              background: 'var(--color-primary-base)', cursor: 'pointer',
              fontSize: 16, fontWeight: 700, color: 'white',
              fontFamily: 'inherit', transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-base)'; }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
