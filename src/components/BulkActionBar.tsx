import React from 'react';

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2.5 8l4 4 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10v3a1 1 0 001 1h8a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconReject = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5.5 8h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

interface Props {
  count: number;
  onAdvance: () => void;
  onContact: () => void;
  onShare: () => void;
  onReject: () => void;
  onClose: () => void;
}

function ActionButton({
  children, label, variant = 'outline', onClick,
}: {
  children?: React.ReactNode;
  label: string;
  variant?: 'outline' | 'danger';
  onClick: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  const isDanger = variant === 'danger';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        height: 40, padding: '0 16px',
        borderRadius: 'var(--radius-md)',
        border: `1.5px solid ${isDanger
          ? (hover ? 'var(--color-error)' : 'var(--color-error-light)')
          : (hover ? 'var(--color-primary-base)' : 'var(--color-border-default)')
        }`,
        background: isDanger
          ? (hover ? 'var(--color-error-light)' : 'white')
          : (hover ? 'var(--color-primary-light)' : 'white'),
        color: isDanger ? 'var(--color-error-dark)' : 'var(--color-text-default)',
        fontSize: 14, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        transition: 'all 0.15s',
      }}
    >
      {children}
      {label}
    </button>
  );
}

export default function BulkActionBar({ count, onAdvance, onContact, onShare, onReject, onClose }: Props) {
  if (count === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid var(--color-border-subtle)',
      padding: '12px 20px',
      animation: 'slideUp 0.2s ease-out',
    }}>
      <style>{`@keyframes slideUp { from { opacity:0; transform: translateX(-50%) translateY(12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>

      {/* Count badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 12, borderRight: '1px solid var(--color-border-subtle)' }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'var(--color-primary-base)',
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700,
        }}>
          {count}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-default)' }}>
            {count === 1 ? '1 Candidate' : `${count} Candidates`} Selected
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-subtle)' }}>Bulk Actions Available</div>
        </div>
      </div>

      {/* Actions */}
      <ActionButton label="Advance" onClick={onAdvance}><IconCheck /></ActionButton>
      <ActionButton label="Contact" onClick={onContact}><IconMail /></ActionButton>
      <ActionButton label="Share" onClick={onShare}><IconShare /></ActionButton>
      <ActionButton label="Reject" variant="danger" onClick={onReject}><IconReject /></ActionButton>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          width: 32, height: 32,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
          background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-text-subtle)',
          cursor: 'pointer',
          marginLeft: 4,
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-background-subtle)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
      >
        <IconX />
      </button>
    </div>
  );
}
