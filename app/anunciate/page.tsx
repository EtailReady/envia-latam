import Link from 'next/link';
import { Check } from 'lucide-react';

export default function AnunciatePage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--dark), var(--brand))', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'white', marginBottom: '14px' }}>Anunciate en Envia Latam</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Llega a miles de personas que buscan couriers confiables cada día. Publica tu empresa gratis o elige un plan destacado.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Plans */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '64px' }}>
            {[
              { name: 'Básico', price: 'Gratis', features: ['Perfil de empresa', '5 destinos', 'Información de contacto', 'Reseñas de clientes'], cta: 'Publicar gratis', href: '/portal/sign-up', accent: false },
              { name: 'Destacado', price: '$49/mes', features: ['Todo lo básico', 'Aparece primero en búsquedas', 'Banner promocional', 'Badge destacado', 'Hasta 20 destinos', 'Estadísticas de visitas'], cta: 'Empezar ahora', href: '/portal/sign-up', accent: true },
              { name: 'Premium', price: '$99/mes', features: ['Todo lo destacado', 'Homepage featured section', 'Logo en portada de país', 'Contacto directo WhatsApp prominente', 'Reseñas verificadas', 'Soporte prioritario'], cta: 'Contáctanos', href: 'mailto:hola@envialatam.com', accent: false },
            ].map((p: { name: string; price: string; features: string[]; cta: string; href: string; accent: boolean }) => (
              <div key={p.name} style={{ border: `2px solid ${p.accent ? 'var(--brand)' : 'var(--border)'}`, borderRadius: '16px', padding: '28px 24px', background: p.accent ? 'var(--brand-light)' : 'white', position: 'relative' }}>
                {p.accent && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--brand)', color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Más popular</div>}
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: p.accent ? 'var(--brand)' : 'var(--dark)', marginBottom: '20px' }}>{p.price}</div>
                <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.features.map(f => <li key={f} style={{ fontSize: '0.85rem', color: 'var(--body)', display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={13} strokeWidth={2.5} color="var(--green)" style={{ flexShrink: 0 }} /> {f}</li>)}
                </ul>
                <Link href={p.href} className={p.accent ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', display: 'block', textAlign: 'center' }}>{p.cta}</Link>
              </div>
            ))}
          </div>

          {/* Contact form placeholder */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>¿Preguntas? Escríbenos</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Te respondemos en menos de 24 horas.</p>
            <a href="mailto:hola@envialatam.com" className="btn-primary">hola@envialatam.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
