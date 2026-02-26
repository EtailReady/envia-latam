'use client';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/data';

export default function Footer() {
  const topCountries = COUNTRIES.slice(0, 8);
  return (
    <footer style={{ background: 'var(--dark)', color: '#9CA3AF', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: 'var(--brand)', color: 'white', fontWeight: 800, fontSize: '1rem', padding: '5px 10px', borderRadius: '6px' }}>ENVIA</div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>LATAM</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '220px' }}>
              El directorio de couriers más completo para enviar desde USA a toda Latinoamérica.
            </p>
          </div>

          {/* Destinos */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Destinos Populares</h4>
            {topCountries.map(c => (
              <Link key={c.code} href={`/paises/${c.code}`} style={{ display: 'block', fontSize: '0.83rem', color: '#9CA3AF', textDecoration: 'none', marginBottom: '7px', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                {c.flag} {c.nameEs}
              </Link>
            ))}
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Envia Latam</h4>
            {[
              { href: '/search',      label: 'Buscar Couriers' },
              { href: '/marketplace', label: 'Comprar & Enviar' },
              { href: '/anunciate',   label: 'Anunciar mi empresa' },
              { href: '/como-funciona', label: 'Cómo funciona' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: '0.83rem', color: '#9CA3AF', textDecoration: 'none', marginBottom: '7px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Tiendas */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Compra & Envía</h4>
            {['Amazon', 'Walmart', 'Target', 'eBay', 'Shein', 'Temu'].map(s => (
              <div key={s} style={{ fontSize: '0.83rem', color: '#9CA3AF', marginBottom: '7px' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1F2937', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.78rem' }}>© {new Date().getFullYear()} Envia Latam. Todos los derechos reservados.</p>
          <p style={{ fontSize: '0.78rem' }}>Hecho con ❤️ para la comunidad latina en USA</p>
        </div>
      </div>
    </footer>
  );
}
