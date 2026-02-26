'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { JORNADAS, Jornada } from '@/lib/data';
import { CalendarDays, MapPin, Clock, Users, ChevronRight, Building2 } from 'lucide-react';

// All unique cities from jornadas data
const ALL_CITIES = ['Todas las ciudades', ...Array.from(new Set(JORNADAS.map((j) => `${j.city}, ${j.state}`)))];

function formatDate(dateStr: string): { weekday: string; day: string; month: string; full: string } {
  const d = new Date(dateStr + 'T12:00:00'); // noon to avoid TZ issues
  return {
    weekday: d.toLocaleDateString('es-ES', { weekday: 'long' }),
    day: d.toLocaleDateString('es-ES', { day: 'numeric' }),
    month: d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
    full: d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

function SpotsIndicator({ spots }: { spots?: number }) {
  if (spots === undefined) return null;
  const color = spots <= 5 ? '#EF4444' : spots <= 10 ? '#F59E0B' : '#10B981';
  const label = spots <= 5 ? '🔴 Últimos cupos' : spots <= 10 ? '🟡 Cupos limitados' : '🟢 Cupos disponibles';
  return (
    <span
      style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        color,
        background: `${color}14`,
        padding: '3px 9px',
        borderRadius: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {label} ({spots})
    </span>
  );
}

function JornadaCard({ jornada }: { jornada: Jornada }) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'none';
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--dark) 0%, var(--brand) 100%)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Building2 size={18} color="white" strokeWidth={1.75} />
        </div>
        <div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
            Courier
          </div>
          <div style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem' }}>
            {jornada.courierName}
          </div>
        </div>
        {jornada.spotsLeft !== undefined && jornada.spotsLeft <= 5 && (
          <span
            style={{
              marginLeft: 'auto',
              background: '#EF4444',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Últimos cupos
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.87rem', color: 'var(--body)' }}>
          <Clock size={14} color="var(--brand)" strokeWidth={2} />
          <span style={{ fontWeight: 600, color: 'var(--dark)' }}>
            {jornada.timeStart} – {jornada.timeEnd}
          </span>
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.87rem', color: 'var(--body)' }}>
          <MapPin size={14} color="var(--brand)" strokeWidth={2} style={{ marginTop: '2px', flexShrink: 0 }} />
          <span>{jornada.address}</span>
        </div>

        {/* Spots */}
        {jornada.spotsLeft !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.87rem' }}>
            <Users size={14} color="var(--brand)" strokeWidth={2} />
            <SpotsIndicator spots={jornada.spotsLeft} />
          </div>
        )}

        {/* Notes */}
        {jornada.notes && (
          <div
            style={{
              background: 'var(--bg)',
              borderRadius: '8px',
              padding: '9px 12px',
              fontSize: '0.8rem',
              color: 'var(--muted)',
              lineHeight: 1.55,
            }}
          >
            📌 {jornada.notes}
          </div>
        )}

        {/* CTA */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <Link
            href={`/courier/${jornada.courierSlug}`}
            style={{
              flex: 1,
              padding: '10px 14px',
              background: 'var(--brand)',
              color: 'white',
              borderRadius: '9px',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            Reservar pickup <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function JornadasPage() {
  const [cityFilter, setCityFilter] = useState('Todas las ciudades');

  const filtered = useMemo(() => {
    if (cityFilter === 'Todas las ciudades') return JORNADAS;
    return JORNADAS.filter((j) => `${j.city}, ${j.state}` === cityFilter);
  }, [cityFilter]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, Jornada[]>();
    filtered.forEach((j) => {
      if (!map.has(j.date)) map.set(j.date, []);
      map.get(j.date)!.push(j);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const totalJornadas = filtered.length;

  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--dark) 0%, var(--brand) 100%)',
          padding: 'clamp(40px, 6vw, 72px) 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.12)',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '18px',
            }}
          >
            <CalendarDays size={15} color="rgba(255,255,255,0.8)" strokeWidth={2} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Agenda de jornadas
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: 'white',
              margin: '0 0 14px',
              lineHeight: 1.15,
            }}
          >
            Jornadas de Pickup
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Encuentra cuándo y dónde hacen pickup los couriers en tu ciudad.
            Agrega tu carga directamente en la jornada — sin esperar.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid var(--border)',
          padding: '16px 0',
          position: 'sticky',
          top: '64px',
          zIndex: 50,
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', flexShrink: 0 }}>
              Filtrar por ciudad:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ALL_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: `1.5px solid ${cityFilter === city ? 'var(--brand)' : 'var(--border)'}`,
                    background: cityFilter === city ? 'var(--brand)' : 'white',
                    color: cityFilter === city ? 'white' : 'var(--body)',
                    fontSize: '0.82rem',
                    fontWeight: cityFilter === city ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '0.8rem',
                color: 'var(--muted)',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {totalJornadas} jornada{totalJornadas !== 1 ? 's' : ''} próxima{totalJornadas !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container">
          {grouped.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--muted)',
              }}
            >
              <CalendarDays size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                No hay jornadas próximas en {cityFilter}.
              </p>
              <p style={{ fontSize: '0.88rem', marginTop: '8px' }}>
                Prueba otra ciudad o{' '}
                <button
                  onClick={() => setCityFilter('Todas las ciudades')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand)', fontWeight: 700, padding: 0 }}
                >
                  ve todas las jornadas
                </button>
                .
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {grouped.map(([date, jornadas]) => {
                const fmt = formatDate(date);
                return (
                  <div key={date}>
                    {/* Date header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '20px',
                      }}
                    >
                      {/* Day badge */}
                      <div
                        style={{
                          background: 'var(--brand)',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '10px 14px',
                          textAlign: 'center',
                          flexShrink: 0,
                          minWidth: '60px',
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{fmt.day}</div>
                        <div
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            opacity: 0.85,
                            marginTop: '3px',
                          }}
                        >
                          {fmt.month.split(' ')[0]}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: 'var(--dark)',
                            textTransform: 'capitalize',
                          }}
                        >
                          {fmt.weekday}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{fmt.month}</div>
                      </div>

                      <div
                        style={{
                          flex: 1,
                          height: '1px',
                          background: 'var(--border)',
                          marginLeft: '8px',
                        }}
                      />

                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--muted)',
                          flexShrink: 0,
                        }}
                      >
                        {jornadas.length} jornada{jornadas.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Cards grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '16px',
                      }}
                    >
                      {jornadas.map((j) => (
                        <JornadaCard key={j.id} jornada={j} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA for couriers */}
          <div
            style={{
              marginTop: '60px',
              background: 'linear-gradient(135deg, var(--dark), var(--brand))',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: 800,
                  color: 'white',
                  margin: '0 0 8px',
                }}
              >
                ¿Tienes una empresa de courier?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0 }}>
                Publica tus jornadas y llega a miles de clientes en tu ciudad.
              </p>
            </div>
            <Link
              href="/anunciate"
              style={{
                padding: '14px 28px',
                background: 'var(--accent)',
                color: 'white',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
              }}
            >
              Publicar mis jornadas <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
