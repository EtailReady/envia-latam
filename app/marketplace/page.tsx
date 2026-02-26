import Link from 'next/link';
import { AFFILIATES, BOX_SIZES } from '@/lib/data';
import { ShoppingCart, Search, Package, ShoppingBag, Plane, Home, Ruler } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A, #364CD0)', padding: '64px 0 56px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><ShoppingCart size={48} color="white" strokeWidth={1.25} /></div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'white', marginBottom: '14px' }}>
            Compra en USA, envía a Latinoamérica
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Ordena desde Amazon, Walmart, Target y más. Usa la dirección de tu courier en USA. Ellos lo envían directo a tu familia.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '32px', textAlign: 'center' }}>¿Cómo funciona?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {([
              { n: '1', Icon: Search,      t: 'Busca tu courier',   d: 'Usa Envia Latam para encontrar un courier confiable en tu ciudad que envíe al país destino.' },
              { n: '2', Icon: Package,     t: 'Obtén su dirección', d: 'El courier te da una dirección en USA para recibir tus compras en su almacén.' },
              { n: '3', Icon: ShoppingBag, t: 'Compra online',      d: 'Ordena desde Amazon, Walmart, Target, Shein o cualquier tienda. Envía a la dirección del courier.' },
              { n: '4', Icon: Plane,       t: 'El courier envía',   d: 'El courier consolida tus paquetes y los envía a Latinoamérica.' },
              { n: '5', Icon: Home,        t: 'Tu familia recibe',  d: 'Entrega puerta a puerta donde sea que estén.' },
            ] as const).map(s => (
              <div key={s.n} style={{ textAlign: 'center', padding: '24px 16px', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand)', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1rem' }}>{s.n}</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}><s.Icon size={26} color="var(--brand)" strokeWidth={1.5} /></div>
                <div style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: '6px', fontSize: '0.9rem' }}>{s.t}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px', textAlign: 'center' }}>Tiendas populares</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '32px', fontSize: '0.9rem' }}>Haz click para ir a la tienda. Los couriers reciben pedidos de todas estas plataformas.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
            {AFFILIATES.map(a => (
              <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" className="store-card">
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShoppingBag size={20} color="white" strokeWidth={1.75} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: '2px' }}>{a.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{a.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Box sizes */}
      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px', textAlign: 'center' }}>Referencia de tamaños de caja</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '32px', fontSize: '0.9rem' }}>Antes de ordenar, confirma con tu courier los tamaños que acepta</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '960px', margin: '0 auto' }}>
            {BOX_SIZES.map(b => (
              <div key={b.size} style={{ padding: '24px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--dark)' }}>{b.size}</div>
                  <span style={{ background: 'var(--brand-light)', color: 'var(--brand)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{b.maxWeight}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--brand)', fontWeight: 500, marginBottom: '6px' }}><Ruler size={12} /> {b.dimensions}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>Ej: {b.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'var(--brand)', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>¿Aún no tienes un courier?</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px', fontSize: '0.9rem' }}>Busca uno de confianza en tu ciudad y empieza a enviar hoy.</p>
          <Link href="/search" style={{ background: 'white', color: 'var(--brand)', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
            Buscar Couriers →
          </Link>
        </div>
      </section>
    </>
  );
}
