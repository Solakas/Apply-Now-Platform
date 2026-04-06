import React, { useState, useMemo } from 'react';
import type { Candidate, SortKey, SortDir, ScoreBadge, CandidateStatus, ColumnConfig, ActionConfig } from '../types';
import { TOTAL_CANDIDATES } from '../data';
import ColumnsSidesheet, { DEFAULT_COLUMN_CONFIG, DEFAULT_ACTION_CONFIG } from './ColumnsSidesheet';

/* ── Status chip config ── */
const STATUS_CONFIG: Record<CandidateStatus, { bg: string; border: string; color: string }> = {
  'New':          { bg: '#fef3c7', border: '#d97706', color: '#92400e' },
  'Screen Call':  { bg: '#e0f2fe', border: '#0284c7', color: '#075985' },
  'Assignment':   { bg: '#d6dcf0', border: '#354d97', color: '#354d97' },
  'Ass. Center':  { bg: '#e0f2fe', border: '#0ea5e9', color: '#075985' },
  'Ex. Interview':{ bg: '#dcfce7', border: '#16a34a', color: '#166534' },
  'Offer':        { bg: '#dcfce7', border: '#16a34a', color: '#166534' },
  'Hired':        { bg: '#d6dcf0', border: '#354d97', color: '#354d97' },
};

/* ── Score badge config ── */
const BADGE_CONFIG: Record<NonNullable<ScoreBadge>, { color: string; fontWeight: number }> = {
  'Badge':          { color: '#354d97', fontWeight: 700 },
  'Past Applicant': { color: '#d97706', fontWeight: 700 },
  'Silver Medalist':{ color: '#5677bd', fontWeight: 700 },
};

/* ── SVG Icons ── */
const IconShare = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10v3a1 1 0 001 1h8a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1.5 5l6.5 4.5L14.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconMoreH = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
    <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
  </svg>
);
const IconThumbUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 14H3a1 1 0 01-1-1V8a1 1 0 011-1h2m0 7V7m0 7h7.5a1 1 0 001-.8l.9-5A1 1 0 0015.4 6H10V3a1 1 0 00-1-1L7.5 5.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconThumbDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11 2H13a1 1 0 011 1v5a1 1 0 01-1 1h-2M11 2V9m0-7H3.5a1 1 0 00-1 .8L1.6 9A1 1 0 002.6 10H8v3a1 1 0 001 1l1.5-3.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconNote = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 5h6M5 8h4M5 11h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconPromote = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconReject = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconArchive = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="2.5" width="13" height="3" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2.5 5.5v7a1 1 0 001 1h9a1 1 0 001-1v-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M6 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconSort = ({ dir }: { dir: SortDir }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <path d="M7 2v10M4 5l3-3 3 3" stroke={dir === 'asc' ? '#354d97' : '#ccc'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 9l3 3 3-3" stroke={dir === 'desc' ? '#354d97' : '#ccc'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="#999" strokeWidth="1.4"/>
    <path d="M10.5 10.5L13 13" stroke="#999" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconMic = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke="#999" strokeWidth="1.4"/>
    <path d="M3 8a4 4 0 008 0" stroke="#999" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7 12v2" stroke="#999" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconColumns = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="6.5" y="3" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="10.5" y="3" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Action icon button ── */
function ActionBtn({ children, title }: { children: React.ReactNode; title: string }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 36, height: 36,
        borderRadius: '50%',
        border: `1px solid ${hover ? 'var(--color-border-default)' : 'var(--color-border-subtle)'}`,
        background: hover ? 'var(--color-surface-background-subtle)' : 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hover ? 'var(--color-primary-base)' : 'var(--color-text-subtle)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

/* ── Status Chip ── */
function StatusChip({ status }: { status: CandidateStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 'var(--radius-full)',
      border: `1px solid ${cfg.border}`,
      background: cfg.bg,
      color: cfg.color,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  );
}

const PAGE_SIZE = 10;

interface Props {
  candidates: Candidate[];
  selectedIds: Set<number>;
  onSelectionChange: (ids: Set<number>) => void;
  onCandidateClick: (id: number) => void;
}

export default function CandidatesTable({ candidates, selectedIds, onSelectionChange, onCandidateClick }: Props) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [sidesheetOpen, setSidesheetOpen] = useState(false);
  const [columnConfig, setColumnConfig] = useState<ColumnConfig>({ ...DEFAULT_COLUMN_CONFIG });
  const [actionConfig, setActionConfig] = useState<ActionConfig>({ ...DEFAULT_ACTION_CONFIG });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return candidates.filter(c =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  }, [candidates, search]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const cmp = sortKey === 'score'
        ? (a.score - b.score)
        : String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(TOTAL_CANDIDATES / PAGE_SIZE));
  const pageRows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey | null) => {
    if (!key) return;
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const allChecked = pageRows.length > 0 && pageRows.every(r => selectedIds.has(r.id));
  const someChecked = pageRows.some(r => selectedIds.has(r.id));

  const toggleAll = () => {
    const next = new Set(selectedIds);
    if (allChecked) pageRows.forEach(r => next.delete(r.id));
    else pageRows.forEach(r => next.add(r.id));
    onSelectionChange(next);
  };

  const toggleRow = (id: number) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelectionChange(next);
  };

  const pageNums = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (page > 4) pages.push('...');
      if (page > 3 && page < totalPages - 2) pages.push(page);
      if (page < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  /* Total visible column count for colSpan */
  const visibleColCount =
    2 + // checkbox + candidate
    (columnConfig.experience  ? 1 : 0) +
    (columnConfig.score       ? 1 : 0) +
    (columnConfig.location    ? 1 : 0) +
    (columnConfig.apDate      ? 1 : 0) +
    (columnConfig.status      ? 1 : 0) +
    (columnConfig.skills      ? 1 : 0) +
    (columnConfig.contactInfo ? 1 : 0) +
    (columnConfig.actions     ? 1 : 0);

  /* Column header config */
  type ColDef = { key: SortKey | null; label: string; width: number | string };
  const visibleHeaders: ColDef[] = [
    { key: 'name',            label: 'Candidate',        width: 220 },
    ...(columnConfig.experience  ? [{ key: 'experienceYears' as SortKey, label: 'Experience',       width: 160 }] : []),
    ...(columnConfig.score       ? [{ key: 'score'           as SortKey, label: 'Score',             width: 120 }] : []),
    ...(columnConfig.location    ? [{ key: 'city'            as SortKey, label: 'Location',          width: 140 }] : []),
    ...(columnConfig.apDate      ? [{ key: 'apDate'          as SortKey, label: 'Ap. Date',          width: 120 }] : []),
    ...(columnConfig.status      ? [{ key: 'status'          as SortKey, label: 'Status',            width: 140 }] : []),
    ...(columnConfig.skills      ? [{ key: null,                         label: 'Skills',            width: 200 }] : []),
    ...(columnConfig.contactInfo ? [{ key: null,                         label: 'Contact Info',      width: 200 }] : []),
    ...(columnConfig.actions     ? [{ key: null,                         label: 'Actions',           width: 160  }] : []),
  ];

  return (
    <>
      {sidesheetOpen && (
        <ColumnsSidesheet
          columnConfig={columnConfig}
          actionConfig={actionConfig}
          onApply={(cols, actions) => { setColumnConfig(cols); setActionConfig(actions); }}
          onClose={() => setSidesheetOpen(false)}
        />
      )}

      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}>
          {/* Search */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '0 12px', height: 40, background: 'white',
          }}>
            <IconSearch />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search..."
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 14, fontFamily: 'inherit',
                color: 'var(--color-text-default)',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ color: 'var(--color-text-subtle)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>
                ×
              </button>
            )}
            <IconMic />
          </div>

          {/* Columns btn */}
          <button
            onClick={() => setSidesheetOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 40, padding: '0 16px',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              background: 'white',
              color: 'var(--color-text-default)',
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary-base)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary-base)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-default)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-default)';
            }}
          >
            <IconColumns /> Columns
          </button>

          {/* Add new btn */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            height: 40, padding: '0 16px',
            border: 'none', borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary-base)', color: 'white',
            fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>
            <IconPlus /> Add New
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 920 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                {/* Checkbox header */}
                <th style={{ width: 52, padding: '12px 16px', textAlign: 'center' }}>
                  <div
                    onClick={toggleAll}
                    style={{
                      width: 18, height: 18, margin: '0 auto', borderRadius: 3,
                      border: `1.5px solid ${someChecked ? 'var(--color-primary-base)' : 'var(--color-border-strong)'}`,
                      background: allChecked ? 'var(--color-primary-base)' : someChecked ? 'var(--color-primary-light)' : 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    }}
                  >
                    {allChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {!allChecked && someChecked && (
                      <div style={{ width: 8, height: 2, background: 'var(--color-primary-base)', borderRadius: 1 }} />
                    )}
                  </div>
                </th>

                {visibleHeaders.map(col => (
                  <th
                    key={col.label}
                    onClick={() => handleSort(col.key)}
                    style={{
                      width: col.width, padding: '12px 8px', textAlign: 'left',
                      fontSize: 13, fontWeight: 700, color: 'var(--color-text-default)',
                      whiteSpace: 'nowrap', cursor: col.key ? 'pointer' : 'default',
                      userSelect: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {col.label}
                      {col.key && <IconSort dir={sortKey === col.key ? sortDir : null} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {pageRows.map((c, idx) => {
                const checked = selectedIds.has(c.id);
                return (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: idx < pageRows.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                      background: checked ? '#f5f7fd' : 'white',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--color-surface-background-subtle)'; }}
                    onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLTableRowElement).style.background = 'white'; }}
                  >
                    {/* Checkbox */}
                    <td style={{ width: 52, padding: '0 16px', textAlign: 'center' }}>
                      <div
                        onClick={() => toggleRow(c.id)}
                        style={{
                          width: 18, height: 18, margin: '0 auto', borderRadius: 3,
                          border: `1.5px solid ${checked ? 'var(--color-primary-base)' : 'var(--color-border-strong)'}`,
                          background: checked ? 'var(--color-primary-base)' : 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </td>

                    {/* Candidate — always visible */}
                    <td style={{ padding: '14px 8px' }}>
                      <a
                        href={`/candidates/${c.id}`}
                        className="ds-link-primary"
                        onClick={e => { e.preventDefault(); onCandidateClick(c.id); }}
                        style={{ fontSize: 14, lineHeight: 1.3 }}
                      >
                        {c.name}
                      </a>
                      <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', marginTop: 2 }}>{c.role}</div>
                    </td>

                    {/* Experience */}
                    {columnConfig.experience && (
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-default)' }}>{c.experienceYears}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', marginTop: 2, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.company}</div>
                      </td>
                    )}

                    {/* Score */}
                    {columnConfig.score && (
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-default)' }}>{c.score}%</div>
                        {c.scoreBadge && (
                          <div style={{ fontSize: 11, fontWeight: BADGE_CONFIG[c.scoreBadge].fontWeight, color: BADGE_CONFIG[c.scoreBadge].color, marginTop: 2 }}>
                            {c.scoreBadge}
                          </div>
                        )}
                      </td>
                    )}

                    {/* Location */}
                    {columnConfig.location && (
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 14, color: 'var(--color-text-default)' }}>{c.city}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', marginTop: 2 }}>{c.country}</div>
                      </td>
                    )}

                    {/* Application Date */}
                    {columnConfig.apDate && (
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 14, color: 'var(--color-text-default)', whiteSpace: 'nowrap' }}>{c.apDate}</div>
                      </td>
                    )}

                    {/* Status */}
                    {columnConfig.status && (
                      <td style={{ padding: '14px 8px' }}>
                        <StatusChip status={c.status} />
                      </td>
                    )}

                    {/* Skills */}
                    {columnConfig.skills && (
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 14, color: 'var(--color-text-default)', lineHeight: 1.4 }}>{c.skills}</div>
                      </td>
                    )}

                    {/* Contact Info */}
                    {columnConfig.contactInfo && (
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 14, color: 'var(--color-text-default)' }}>{c.email}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-subtle)', marginTop: 2 }}>{c.phone}</div>
                      </td>
                    )}

                    {/* Actions */}
                    {columnConfig.actions && (
                      <td style={{ padding: '8px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'nowrap' }}>
                          {actionConfig.thumbsUp    && <ActionBtn title="Thumbs up"><IconThumbUp /></ActionBtn>}
                          {actionConfig.thumbsDown  && <ActionBtn title="Thumbs down"><IconThumbDown /></ActionBtn>}
                          {actionConfig.share       && <ActionBtn title="Share profile"><IconShare /></ActionBtn>}
                          {actionConfig.contact     && <ActionBtn title="Send email"><IconMail /></ActionBtn>}
                          {actionConfig.moreActions && <ActionBtn title="More actions"><IconMoreH /></ActionBtn>}
                          {actionConfig.quickNote   && <ActionBtn title="Quick note"><IconNote /></ActionBtn>}
                          {actionConfig.promote     && <ActionBtn title="Promote to next phase"><IconPromote /></ActionBtn>}
                          {actionConfig.reject      && <ActionBtn title="Reject"><IconReject /></ActionBtn>}
                          {actionConfig.archive     && <ActionBtn title="Archive to Talent Vault"><IconArchive /></ActionBtn>}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={visibleColCount} style={{ textAlign: 'center', padding: 48, color: 'var(--color-text-subtle)', fontSize: 14 }}>
                    No candidates match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px', borderTop: '1px solid var(--color-border-subtle)',
          fontSize: 13, color: 'var(--color-text-subtle)',
        }}>
          <span>Showing {Math.min((page - 1) * PAGE_SIZE + 1, TOTAL_CANDIDATES)}–{Math.min(page * PAGE_SIZE, TOTAL_CANDIDATES)} of {TOTAL_CANDIDATES} results</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <PaginationBtn onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <IconChevronLeft />
            </PaginationBtn>

            {pageNums().map((n, i) =>
              n === '...'
                ? <span key={`e-${i}`} style={{ padding: '0 6px', color: 'var(--color-text-subtle)' }}>…</span>
                : <PaginationBtn key={n} active={n === page} onClick={() => setPage(n as number)}>{n}</PaginationBtn>
            )}

            <PaginationBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <IconChevronRight />
            </PaginationBtn>
          </div>
        </div>
      </div>
    </>
  );
}

function PaginationBtn({ children, onClick, active, disabled }: {
  children: React.ReactNode; onClick: () => void; active?: boolean; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 32, height: 32, borderRadius: 'var(--radius-md)',
        border: active ? 'none' : '1px solid transparent',
        background: active ? 'var(--color-primary-base)' : 'transparent',
        color: active ? 'white' : disabled ? 'var(--color-text-disabled)' : 'var(--color-text-default)',
        fontSize: 13, fontWeight: active ? 700 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s', fontFamily: 'inherit',
      }}
      onMouseEnter={e => { if (!active && !disabled) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-primary-light)'; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
    >
      {children}
    </button>
  );
}
