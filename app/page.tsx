import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CourierCard from '@/components/CourierCard';
import { getFeaturedCouriers, COUNTRIES, BOX_SIZES, AFFILIATES } from '@/lib/data';

export default function HomePage() {
  const featured = getFeaturedCouriers();

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #364CD0 60%, #2A3BA8 100%)', padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        {/* BG decoration */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(237,195,29,0.08)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}/>

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(237,195,29,0.15)', border: '1px solid rgba(237,195,29,0.3)', borderRadius: '20px', padding: '6px 16px', marginBottom: '28px' }}>
            <span>✈️</span>
            <span style={{ fontSize: '0.8rem', color: '#F5DC6C', fontWeight: 500 }}>El directorio #1 de couriers USA → Latinoamérica</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Encuentra couriers confiables<br />
            <span style={{ color: '#F5DC6C' }}>para enviar a Latinoamérica</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto 48px', lineHeight: 1.7 }}>
            Compara tarifas, lee reseñas y encuentra el courier perfecto para enviar tus paquetes desde USA a Venezuela, Colombia, Chile y más.
          </p>

          {/* Search */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBar large />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)', marginTop: '48px', flexWrap: 'wrap' }}>
            {[
              { val: '50+', label: 'Couriers verificados' },
              { val: '18',  label: 'Países destino' },
              { val: '10k+',label: 'Envíos al mes' },
              { val: '4.7★', label: 'Rating promedio' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'white' }}>{s.val}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: 'var(--brand-light)', borderBottom: '1px solid #DBEAFE', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px,4vw,48px)', flexWrap: 'wrap', alignItems: 'center' }}>
          {['✅ Couriers verificados', '⭐ Reseñas reales', '📦 Reciben de Amazon & más', '🔒 Información confiable'].map(t => (
            <span key={t} style={{ fontSize: '0.82rem', color: 'var(--brand)', fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED COURIERS ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>⭐ Más confiables</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--dark)', margin: 0 }}>Couriers Destacados</h2>
            </div>
            <Link href="/search" className="btn-outline" style={{ fontSize: '0.85rem' }}>Ver todos →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {featured.map(c => <CourierCard key={c.id} courier={c} />)}
          </div>
        </div>
      </section>

      {/* ── COUNTRIES GRID ── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Destinos</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>¿A dónde quieres enviar?</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Selecciona un país para ver todos los couriers disponibles</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
            {COUNTRIES.map(c => (
              <Link key={c.code} href={`/paises/${c.code}`} className="country-card-link">
                <span style={{ fontSize: '2rem' }}>{c.flag}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--dark)', textAlign: 'center' }}>{c.nameEs}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>¿Cómo funciona?</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Encontrar un courier confiable nunca fue tan fácil</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
            {[
              { step: '1', icon: '🔍', title: 'Busca tu ruta', desc: 'Ingresa desde qué ciudad y a qué país quieres enviar. Te mostramos todos los couriers disponibles.' },
              { step: '2', icon: '⭐', title: 'Compara y elige', desc: 'Lee reseñas reales, compara tarifas y elige el courier que más te conviene.' },
              { step: '3', icon: '📦', title: 'Contacta directo', desc: 'Comunícate directamente con el courier por WhatsApp, teléfono o email. Sin intermediarios.' },
              { step: '4', icon: '🏠', title: 'Tu familia recibe', desc: 'Tu paquete llega a manos de quien más quieres, donde sea que estén.' },
            ].map(s => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.8rem' }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand)', marginBottom: '6px', letterSpacing: '0.1em' }}>PASO {s.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE / MARKETPLACE ── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0D1B2A, #364CD0)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(237,195,29,0.15)', border: '1px solid rgba(237,195,29,0.3)', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.8rem', color: '#F5DC6C', fontWeight: 500 }}>🛒 Compra en USA, envía a Latinoamérica</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Compra online y envía con tu courier
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Ordena desde tus tiendas favoritas, usa la dirección de tu courier en USA, y ellos envían todo a tu familia.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', maxWidth: '800px', margin: '0 auto 32px' }}>
            {AFFILIATES.map(a => (
              <Link key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" className="affiliate-dark-card">
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{a.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{a.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>{a.desc}</div>
              </Link>
            ))}
          </div>
          <Link href="/marketplace" className="btn-accent" style={{ fontSize: '0.9rem' }}>Ver guía completa →</Link>
        </div>
      </section>

      {/* ── BOX SIZES ── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>Tamaños de caja</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Referencia de tamaños para planificar tu envío</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {BOX_SIZES.map((b, i) => (
              <div key={b.size} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{(['📦','📫','🗃️','📬'] as const)[i]}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px' }}>{b.size}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--brand)', fontWeight: 500, marginBottom: '8px' }}>{b.dimensions}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '4px' }}>Hasta {b.maxWeight}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>{b.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOR COURIERS ── */}
      <section className="section-sm" style={{ background: 'var(--accent)', }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '6px' }}>¿Tienes una empresa de courier?</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>Llega a miles de clientes que buscan servicios de envío cada día.</p>
          </div>
          <Link href="/anunciate" className="anunciate-cta-btn">
            Publicar mi empresa →
          </Link>
        </div>
      </section>
    </>
  );
}
