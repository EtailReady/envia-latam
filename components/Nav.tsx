'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: 'var(--brand)', color: 'white', fontWeight: 800,
            fontSize: '1.1rem', padding: '6px 12px', borderRadius: '8px', letterSpacing: '-0.02em'
          }}>
            ENVIA
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--dark)', letterSpacing: '-0.02em' }}>
            LATAM
          </span>
        </Link>

        {/* Desktop links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hide-mobile">
          <Link href="/search" style={{ color: 'var(--body)', textDecoration: 'none', padding: '8px 14px', fontSize: '0.9rem', fontWeight: 500, borderRadius: '8px' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            Buscar Couriers
          </Link>
          <Link href="/marketplace" style={{ color: 'var(--body)', textDecoration: 'none', padding: '8px 14px', fontSize: '0.9rem', fontWeight: 500, borderRadius: '8px' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            Comprar &amp; Enviar
          </Link>
          <Link href="/paises" style={{ color: 'var(--body)', textDecoration: 'none', padding: '8px 14px', fontSize: '0.9rem', fontWeight: 500, borderRadius: '8px' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            Destinos
          </Link>
          <Link href="/anunciate" className="btn-primary" style={{ marginLeft: '8px', padding: '9px 18px', fontSize: '0.85rem' }}>
            Anuncia tu empresa
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }} className="show-mobile">
          <span style={{ fontSize: '1.4rem', color: 'var(--dark)' }}>{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '16px 24px 20px' }}>
          {[
            { href: '/search',      label: 'Buscar Couriers' },
            { href: '/marketplace', label: 'Comprar & Enviar' },
            { href: '/paises',      label: 'Destinos' },
          ].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border)', color: 'var(--dark)', textDecoration: 'none', fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
          <Link href="/anunciate" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }} onClick={() => setOpen(false)}>
            Anuncia tu empresa
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
