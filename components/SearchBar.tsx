'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FROM_CITIES, COUNTRIES } from '@/lib/data';

const EXAMPLES = [
  'De Miami a Venezuela',
  'De New York a Colombia',
  'De Houston a México',
  'De Orlando a República Dominicana',
  'De Miami a España',
  'De Los Angeles a Chile',
];

export default function SearchBar({ large = false }: { large?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [placeholder, setPlaceholder] = useState(EXAMPLES[0]);
  const [mode, setMode] = useState<'text' | 'dropdowns'>('dropdowns');
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle placeholder text
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % EXAMPLES.length; setPlaceholder(EXAMPLES[i]); }, 3000);
    return () => clearInterval(t);
  }, []);

  function handleSearch() {
    const params = new URLSearchParams();
    if (fromCity)  params.set('from', fromCity);
    if (toCountry) params.set('to', toCountry);
    router.push(`/search?${params.toString()}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  const inputH = large ? '56px' : '48px';
  const fontSize = large ? '1rem' : '0.9rem';

  return (
    <div className="search-container" style={{ width: '100%', maxWidth: large ? '820px' : '640px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 0 }}>
        {/* From city */}
        <div style={{ borderRight: '1px solid var(--border)', position: 'relative' }}>
          <label style={{ position: 'absolute', top: '8px', left: '16px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Desde
          </label>
          <select
            value={fromCity}
            onChange={e => setFromCity(e.target.value)}
            style={{
              width: '100%', height: inputH, paddingTop: '18px', paddingLeft: '16px', paddingRight: '32px',
              border: 'none', outline: 'none', fontSize, background: 'white',
              color: fromCity ? 'var(--dark)' : 'var(--muted)', cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="">Cualquier ciudad</option>
            {FROM_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', fontSize: '0.75rem' }}>▼</span>
        </div>

        {/* To country */}
        <div style={{ borderRight: '1px solid var(--border)', position: 'relative' }}>
          <label style={{ position: 'absolute', top: '8px', left: '16px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Hasta
          </label>
          <select
            value={toCountry}
            onChange={e => setToCountry(e.target.value)}
            style={{
              width: '100%', height: inputH, paddingTop: '18px', paddingLeft: '16px', paddingRight: '32px',
              border: 'none', outline: 'none', fontSize, background: 'white',
              color: toCountry ? 'var(--dark)' : 'var(--muted)', cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="">Cualquier país</option>
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.nameEs}</option>)}
          </select>
          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', fontSize: '0.75rem' }}>▼</span>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="btn-primary"
          style={{ borderRadius: 0, height: inputH, padding: '0 28px', fontSize, borderTopRightRadius: '16px', borderBottomRightRadius: '16px' }}
        >
          {large ? '🔍 Buscar Couriers' : '🔍 Buscar'}
        </button>
      </div>

      {/* Quick filters */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500 }}>Popular:</span>
        {[
          { from: 'Miami, FL', to: 've', label: '🇻🇪 Miami → Venezuela' },
          { from: 'Miami, FL', to: 'co', label: '🇨🇴 Miami → Colombia' },
          { from: 'New York, NY', to: 've', label: '🇻🇪 NY → Venezuela' },
          { from: 'Houston, TX', to: 'mx', label: '🇲🇽 Houston → México' },
        ].map(q => (
          <button key={q.label} onClick={() => { setFromCity(q.from); setToCountry(q.to); router.push(`/search?from=${encodeURIComponent(q.from)}&to=${q.to}`); }}
            style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', cursor: 'pointer', color: 'var(--body)', transition: 'all .15s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-light)'; e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.color = 'var(--brand)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--body)'; }}>
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}
