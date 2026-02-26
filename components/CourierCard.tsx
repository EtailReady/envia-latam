'use client';
import Link from 'next/link';
import { Building2, MapPin, Star, Car, Package, FileText, ShoppingBag } from 'lucide-react';
import { type Courier, getCountry, getOfficeCountry } from '@/lib/data';

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} strokeWidth={0} fill={i <= Math.round(rating) ? '#EFBF04' : '#D1D5DB'} />
      ))}
    </span>
  );
}

export default function CourierCard({ courier }: { courier: Courier }) {
  return (
    <Link href={`/courier/${courier.slug}`} className={`courier-card${courier.featured ? ' featured' : ''}`}>
      {/* Featured banner */}
      {courier.featured && (
        <div style={{ background: 'linear-gradient(90deg, #EFBF04, #C9A203)', padding: '5px 14px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--dark)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Star size={11} fill="var(--dark)" strokeWidth={0} /> Destacado
        </div>
      )}

      <div style={{ padding: '20px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
          {/* Logo placeholder */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '10px', flexShrink: 0,
            background: 'var(--brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)',
          }}>
            <Building2 size={24} color="var(--brand)" strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '3px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', margin: 0 }}>{courier.name}</h3>
              {courier.verified && <span className="badge-verified">✓ Verificado</span>}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>{courier.tagline}</p>
          </div>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Stars rating={courier.rating} />
          <span className="rating-num">{courier.rating.toFixed(1)}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>({courier.reviewCount} reseñas)</span>
        </div>

        {/* Countries */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Envía a:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {courier.toCountries.slice(0, 5).map(code => {
              const c = getCountry(code);
              return c ? (
                <span key={code} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.78rem', color: 'var(--dark)' }}>
                  <span>{c.flag}</span>
                  <span>{c.nameEs}</span>
                </span>
              ) : null;
            })}
            {courier.toCountries.length > 5 && (
              <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                +{courier.toCountries.length - 5} más
              </span>
            )}
          </div>
        </div>

        {/* Offices */}
        {courier.offices && courier.offices.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Oficinas:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {courier.offices.map(o => {
                const meta = getOfficeCountry(o.countryCode);
                const isUS = o.countryCode === 'us';
                return (
                  <span key={`${o.city}-${o.countryCode}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: isUS ? 'var(--brand-light)' : 'var(--bg)',
                    color: isUS ? 'var(--brand)' : 'var(--body)',
                    border: `1px solid ${isUS ? 'transparent' : 'var(--border)'}`,
                    borderRadius: '6px', padding: '3px 8px', fontSize: '0.78rem', fontWeight: 500,
                  }}>
                    <span>{meta.flag}</span>
                    <span>{o.city}{o.state ? `, ${o.state}` : ''}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Services row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          {courier.acceptsVehicles    && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--muted)', background: 'var(--bg)', padding: '3px 8px', borderRadius: '4px' }}><Car size={11} strokeWidth={1.75} /> Vehículos</span>}
          {courier.acceptsMerchandise && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--muted)', background: 'var(--bg)', padding: '3px 8px', borderRadius: '4px' }}><Package size={11} strokeWidth={1.75} /> Mercancía</span>}
          {courier.acceptsDocuments   && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--muted)', background: 'var(--bg)', padding: '3px 8px', borderRadius: '4px' }}><FileText size={11} strokeWidth={1.75} /> Documentos</span>}
          {courier.services.some(s => s.toLowerCase().includes('amazon')) && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#FF9900', background: '#FFF9F0', padding: '3px 8px', borderRadius: '4px', fontWeight: 500 }}><ShoppingBag size={11} strokeWidth={1.75} /> Recibe Amazon</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
          Desde <strong style={{ color: 'var(--dark)' }}>${Math.min(...courier.routes.map(r => r.pricePerLb)).toFixed(2)}/lb</strong>
        </span>
        <span style={{ fontSize: '0.82rem', color: 'var(--brand)', fontWeight: 600 }}>Ver empresa →</span>
      </div>
    </Link>
  );
}
