import Link from 'next/link';
import { COUNTRIES } from '@/lib/data';

export default function PaisesPage() {
  return (
    <>
      <section style={{ background: 'var(--brand)', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'white', marginBottom: '10px' }}>Destinos disponibles</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>Selecciona un país para ver los couriers disponibles</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
            {COUNTRIES.map(c => (
              <Link key={c.code} href={`/paises/${c.code}`} className="pais-link-card">
                <span style={{ fontSize: '1.8rem' }}>{c.flag}</span>
                <span style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.9rem' }}>{c.nameEs}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
