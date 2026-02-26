import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCourierBySlug, getCountry, getOfficeCountry } from '@/lib/data';
import { Building2, MessageCircle, Phone, Globe, Mail, MapPin, Package, Star, ChevronLeft } from 'lucide-react';

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '3px' }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={16} strokeWidth={0} fill={i <= Math.round(rating) ? '#EFBF04' : '#D1D5DB'} />
      ))}
    </span>
  );
}

export default async function CourierPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const courier = getCourierBySlug(slug);
  if (!courier) notFound();

  return (
    <>
      {/* Banner / Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--dark) 0%, var(--brand) 100%)', padding: '40px 0' }}>
        <div className="container">
          <Link href="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '20px' }}>
            <ChevronLeft size={15} /> Volver a resultados
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={36} color="var(--brand)" strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: 'white', margin: 0 }}>{courier.name}</h1>
                {courier.verified && <span className="badge-verified">✓ Verificado</span>}
                {courier.featured && <span className="badge-featured" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Star size={11} fill="currentColor" strokeWidth={0} /> Destacado</span>}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginBottom: '12px' }}>{courier.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Stars rating={courier.rating} />
                <span style={{ color: 'white', fontWeight: 700 }}>{courier.rating.toFixed(1)}</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>({courier.reviewCount} reseñas)</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {courier.whatsapp && (
                <a href={`https://wa.me/${courier.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
              )}
              {courier.phone && (
                <a href={`tel:${courier.phone}`} className="btn-outline" style={{ fontSize: '0.85rem', borderColor: 'white', color: 'white', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} /> Llamar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }} className="detail-grid">

            {/* Left */}
            <div>
              {/* About */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '14px' }}>Sobre {courier.name}</h2>
                <p style={{ color: 'var(--body)', lineHeight: 1.8, fontSize: '0.95rem' }}>{courier.description}</p>
              </div>

              {/* Offices / Locations */}
              {courier.offices && courier.offices.length > 0 && (() => {
                const usOffices   = courier.offices!.filter(o => o.countryCode === 'us');
                const latamOffices = courier.offices!.filter(o => o.countryCode !== 'us');
                return (
                  <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '18px' }}>Nuestras Ubicaciones</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                      {usOffices.length > 0 && (
                        <div style={{ background: 'var(--brand-light)', borderRadius: '12px', padding: '16px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1.2rem' }}>🇺🇸</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Almacenes en USA</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {usOffices.map(o => (
                              <div key={`${o.city}-us`} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.88rem', color: 'var(--dark)', fontWeight: 500 }}>
                                <MapPin size={13} color="var(--brand)" strokeWidth={2} />
                                {o.city}{o.state ? `, ${o.state}` : ''}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {latamOffices.length > 0 && (
                        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1.1rem' }}>📍</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Entrega en Destino</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {latamOffices.map(o => {
                              const meta = getOfficeCountry(o.countryCode);
                              return (
                                <div key={`${o.city}-${o.countryCode}`} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.88rem', color: 'var(--dark)', fontWeight: 500 }}>
                                  <span>{meta.flag}</span>
                                  <span>{o.city}, {meta.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Rates table */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>Tarifas por destino</h2>
                <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg)' }}>
                        {['Destino', 'Precio/lb', 'Tiempo estimado', 'Notas'].map(h => (
                          <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {courier.routes.map((r, i) => {
                        const c = getCountry(r.country);
                        return (
                          <tr key={r.country} style={{ background: i % 2 === 0 ? 'white' : 'var(--bg)' }}>
                            <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--dark)' }}>
                              {c && <span>{c.flag} {c.nameEs}</span>}
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand)' }}>
                              ${r.pricePerLb.toFixed(2)}/lb
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--body)' }}>
                              {r.minDays}–{r.maxDays} días
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: 'var(--muted)' }}>
                              {r.notes ?? '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Services */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '16px' }}>Servicios</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {courier.services.map(s => (
                    <span key={s} style={{ padding: '8px 16px', background: 'var(--brand-light)', color: 'var(--brand)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box sizes */}
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '14px' }}>Tamaños de caja aceptados</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {courier.boxSizes.map(b => (
                    <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--body)' }}>
                      <Package size={13} strokeWidth={1.75} /> {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Contact card */}
            <div style={{ position: 'sticky', top: '80px' }}>
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <div style={{ background: 'var(--brand)', padding: '20px', color: 'white', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '4px' }}>Contacta ahora</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{courier.name}</div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {courier.whatsapp && (
                    <a href={`https://wa.me/${courier.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <MessageCircle size={15} /> Contactar por WhatsApp
                    </a>
                  )}
                  {courier.phone && (
                    <a href={`tel:${courier.phone}`} className="btn-outline" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Phone size={15} /> {courier.phone}
                    </a>
                  )}
                  {courier.website && (
                    <a href={courier.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--body)', textDecoration: 'none', fontSize: '0.85rem' }}>
                      <Globe size={14} /> Visitar sitio web
                    </a>
                  )}
                  {courier.email && (
                    <a href={`mailto:${courier.email}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--body)', textDecoration: 'none', fontSize: '0.85rem' }}>
                      <Mail size={14} /> {courier.email}
                    </a>
                  )}
                </div>
                <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 500 }}><MapPin size={12} /> Dirección</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--body)', lineHeight: 1.5 }}>{courier.address}</div>
                </div>
                <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500, marginBottom: '8px' }}><Package size={12} /> Acepta de</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {courier.services.filter(s => s.toLowerCase().includes('recibe')).map(s => (
                      <span key={s} style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'var(--brand-light)', color: 'var(--brand)', border: '1px solid var(--border)', borderRadius: '6px', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
