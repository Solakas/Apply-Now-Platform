import React from 'react';
import logoSrc from '../logo.png';

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="9" cy="9" r="6" stroke="#777" strokeWidth="1.5"/>
    <path d="M13.5 13.5L17 17" stroke="#777" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconMic = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="7" y="2" width="6" height="10" rx="3" stroke="#777" strokeWidth="1.5"/>
    <path d="M4 10a6 6 0 0012 0" stroke="#777" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 16v2" stroke="#777" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Logo = () => (
  <img src={logoSrc} alt="Logo" style={{ height: 40, width: 'auto', flexShrink: 0 }} />
);

const navItems = [
  { label: 'Dashboard', active: false },
  { label: 'Jobs', active: true },
  { label: 'Talent Vault', active: false },
  { label: 'Reports', hasChevron: true, active: false },
];

export default function TopBar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--color-surface-default)',
      borderBottom: '1px solid var(--color-border-subtle)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--spacing-32)',
      gap: 'var(--spacing-24)',
    }}>
      {/* Logo */}
      <Logo />

      {/* Search */}
      <div style={{
        flex: 1,
        maxWidth: 560,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--color-surface-background-subtle)',
        borderRadius: 'var(--radius-full)',
        padding: '0 var(--spacing-16)',
        border: '1px solid transparent',
        transition: 'border-color 0.15s',
      }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary-base)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'transparent')}
      >
        <IconSearch />
        <input
          placeholder="Search candidates, campaigns, keywords"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: 15,
            color: 'var(--color-text-default)',
          }}
        />
        <IconMic />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
        {navItems.map(item => (
          <button
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: item.active ? 'var(--color-primary-light)' : 'transparent',
              color: item.active ? 'var(--color-primary-base)' : 'var(--color-text-default)',
              fontWeight: item.active ? 700 : 400,
              fontSize: 15,
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              if (!item.active) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-background-subtle)';
            }}
            onMouseLeave={e => {
              if (!item.active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            {item.label}
            {item.hasChevron && <IconChevronDown />}
          </button>
        ))}
      </nav>

      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #354d97, #5677bd)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
        }}>
          PS
        </div>
        <div style={{
          position: 'absolute',
          bottom: -2,
          right: -8,
          background: 'var(--color-error-light)',
          color: 'var(--color-error-dark)',
          borderRadius: 'var(--radius-full)',
          fontSize: 10,
          fontWeight: 700,
          minWidth: 18,
          height: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
        }}>
          9
        </div>
      </div>
    </header>
  );
}
