import React, { useState, useMemo } from 'react';
import TopBar from './components/TopBar';
import FilterSidebar from './components/FilterSidebar';
import CandidatesTable from './components/CandidatesTable';
import BulkActionBar from './components/BulkActionBar';
import CandidateInfoPage from './components/CandidateInfoPage';
import KpiBar from './components/KpiBar';
import type { Filters } from './types';
import { CANDIDATES } from './data';

const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <path d="M5 10.5l4-4-4-4" stroke="#999" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DEFAULT_FILTERS: Filters = {
  pipelineStages: ['Screening'],
  applicationStatuses: [],
  matchScoreMin: 0,
  matchScoreMax: 100,
  scoreThreshold: '>80%',
  qualificationLevels: ['Any'],
  locations: [],
};

/* Parse "X years" / "X+ years" → number */
function parseYears(exp: string): number {
  const match = exp.match(/(\d+)/);
  if (!match) return 0;
  const n = parseInt(match[1]);
  return exp.includes('+') ? n + 0.5 : n;
}

function matchesQualLevel(level: string, years: number): boolean {
  if (level === 'Any')    return true;
  if (level === 'Junior') return years <= 2;
  if (level === 'Mid')    return years >= 3 && years <= 5;
  if (level === 'Senior') return years >= 5 && years <= 7;
  if (level === 'Lead')   return years >= 7;
  return true;
}

export default function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  const selectedCandidate = selectedCandidateId != null
    ? CANDIDATES.find(c => c.id === selectedCandidateId) ?? null
    : null;

  /* Apply filters to candidate list */
  const filtered = useMemo(() => {
    return CANDIDATES.filter(c => {
      // Score range
      if (c.score < filters.matchScoreMin || c.score > filters.matchScoreMax) return false;

      // Score threshold
      if (filters.scoreThreshold !== 'Any') {
        const threshold = parseInt(filters.scoreThreshold.replace('>','').replace('%',''));
        if (c.score <= threshold) return false;
      }

      // Application status
      if (filters.applicationStatuses.length > 0) {
        if (!filters.applicationStatuses.includes(c.status)) return false;
      }

      // Qualification level
      if (!filters.qualificationLevels.includes('Any')) {
        const years = parseYears(c.experienceYears);
        const matches = filters.qualificationLevels.some(level => matchesQualLevel(level, years));
        if (!matches) return false;
      }

      // Location
      if (filters.locations.length > 0) {
        if (!filters.locations.includes(c.city)) return false;
      }

      return true;
    });
  }, [filters]);

  const clearSelection = () => setSelectedIds(new Set());

  if (selectedCandidate) {
    return (
      <CandidateInfoPage
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidateId(null)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <FilterSidebar filters={filters} onChange={setFilters} />

        {/* Main content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 32px 80px',
          background: 'var(--color-surface-background-subtle)',
        }}>
          {/* Breadcrumb */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 12,
            fontSize: 13,
          }}>
            <a href="#" style={{ color: 'var(--color-text-subtle)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary-base)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-subtle)')}
            >
              Jobs
            </a>
            <IconChevronRight />
            <a href="#" style={{ color: 'var(--color-primary-base)', textDecoration: 'none', fontWeight: 600 }}>
              Lead Product designer
            </a>
          </nav>

          {/* Page heading */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text-default)', lineHeight: 1.2 }}>
              Candidates List
            </h1>
            <span style={{ fontSize: 18, fontWeight: 400, color: 'var(--color-text-subtle)' }}>
              ({filtered.length < CANDIDATES.length ? `${filtered.length}/48` : '48'})
            </span>
          </div>

          {/* KPI Bar */}
          <KpiBar />

          {/* Table */}
          <CandidatesTable
            candidates={filtered}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onCandidateClick={setSelectedCandidateId}
          />
        </main>
      </div>

      {/* Bulk Action Bar */}
      <BulkActionBar
        count={selectedIds.size}
        onAdvance={() => { alert(`Advancing ${selectedIds.size} candidate(s)`); clearSelection(); }}
        onContact={() => { alert(`Contacting ${selectedIds.size} candidate(s)`); }}
        onShare={() => { alert(`Sharing ${selectedIds.size} profile(s)`); }}
        onReject={() => { if (confirm(`Reject ${selectedIds.size} candidate(s)?`)) clearSelection(); }}
        onClose={clearSelection}
      />
    </div>
  );
}
