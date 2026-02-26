'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { JORNADAS, Jornada } from '@/lib/data';
import { CalendarDays, MapPin, Clock, Users, ChevronRight, ArrowRight, Zap } from 'lucide-react';

type Tab = 'week' | 'month' | 'all';

function parseDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00');
}

function formatWeekday(d: Date) {
  return d.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
}
function formatDay(d: Date) {
  return d.toLocaleDateString('es-ES', { day: 'numeric' });
}
function formatMonthYear(d: Date) {
  return d.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }).toUpperCase();
}
function formatFullDate(d: Date) {
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDaysFromNow(d: Date) {
  const now = new Date();
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff <= 7) return `En ${diff} días`;
  return `En ${Math.ceil(diff / 7)} semanas`;
}

function SpotsChip({ spots }: { spots?: number }) {
  if (!spots) return null;
  const color = spots <= 5 ? '#EF4444' : spots <= 10 ? '#F59E0B' : '#10B981';
  const label = spots <= 5 ? 'Últimos cupos' : spots <= 10 ? 'Limitado' : 'Disponible';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 700, color, background: `${color}15`, padding: '3px 9px', borderRadius: '20px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block' }} />
      {label} · {spots}
    </span>
  );
}

function EventRow({ j }: { j: Jornada }) {
  const d = parseDate(j.date);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: '0',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.15s',
      }}
      className="event-row"
    >
      {/* Date column */}
      <div style={{ padding: '18px 16px 18px 0', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em' }}>{formatWeekday(d)}</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--brand)', lineHeight: 1.1 }}>{formatDay(d)}</div>
        <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.06em' }}>{formatMonthYear(d)}</div>
      </div>

      {/* Details column */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--dark)', marginBottom: '6px' }}>{j.courierName}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '8px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} strokeWidth={2} /> {j.timeStart} – {j.timeEnd}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={12} strokeWidth={2} /> {j.city}, {j.state}
          </span>
          {j.spotsLeft !== undefined && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Users size={12} strokeWidth={2} />
              <SpotsChip spots={j.spotsLeft} />
            </span>
          )}
        </div>
        {j.address && (
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: j.notes ? '6px' : 0 }}>{j.address}</div>
        )}
        {j.notes && (
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic' }}>{j.notes}</div>
        )}
      </div>

      {/* Action column */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <Link
          href={`/courier/${j.courierSlug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 16px',
            background: 'var(--brand)',
            color: 'white',
            borderRadius: '9px',
            fontWeight: 700,
            fontSize: '0.82rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Reservar <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function JornadasPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [cityFilter, setCityFilter] = useState('');

  const now = new Date();
  const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  // Next upcoming jornada (closest date)
  const nextUp = useMemo(() => {
    return JORNADAS
      .filter(j => parseDate(j.date) >= now)
      .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())[0];
  }, []);

  const filtered = useMemo(() => {
    return JORNADAS.filter(j => {
      const d = parseDate(j.date);
      if (d < now) return false;
      if (tab === 'week' && d > oneWeek) return false;
      if (tab === 'month' && d > oneMonth) return false;
      if (cityFilter && `${j.city}, ${j.state}` !== cityFilter) return false;
      return true;
    }).sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
  }, [tab, cityFilter]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, Jornada[]>();
    filtered.forEach(j => {
      if (!map.has(j.date)) map.set(j.date, []);
      map.get(j.date)!.push(j);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const allCities = useMemo(() =>
    Array.from(new Set(JORNADAS.map(j => `${j.city}, ${j.state}`))).sort(),
    []
  );

  return (
    <>
      {/* Compact hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--dark) 0%, var(--brand) 100%)', padding: '40px 0 48px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarDays size={18} color="white" strokeWidth={2} />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Agenda de jornadas
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 900, color: 'white', margin: '0 0 10px', lineHeight: 1.15 }}>
            Jornadas de Pickup
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', margin: 0, maxWidth: '480px' }}>
            Cuándo y dónde hacen pickup los couriers en tu ciudad. Agrega tu carga directamente — sin esperar.
          </p>
        </div>
      </div>

      {/* Next up banner */}
      {nextUp && (
        <div style={{ background: 'var(--accent)', padding: '0' }}>
          <div className="container">
            <Link
              href={`/courier/${nextUp.courierSlug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                textDecoration: 'none',
                color: 'var(--dark)',
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={14} color="var(--dark)" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', opacity: 0.65 }}>Próxima</span>
              <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                {nextUp.courierName} · {nextUp.city}, {nextUp.state}
              </span>
              <span style={{ fontSize: '0.82rem', opacity: 0.75 }}>
                {formatDaysFromNow(parseDate(nextUp.date))} · {nextUp.timeStart}
              </span>
              <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
            </Link>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: '64px', zIndex: 50 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', borderBottom: 'none', paddingTop: '12px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '2px', flex: 1 }}>
              {([
                { key: 'week',  label: 'Esta semana' },
                { key: 'month', label: 'Este mes' },
                { key: 'all',   label: 'Todas' },
              ] as { key: Tab; label: string }[]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: tab === t.key ? 700 : 500,
                    color: tab === t.key ? 'var(--brand)' : 'var(--muted)',
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${tab === t.key ? 'var(--brand)' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    marginBottom: '-1px',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* City filter */}
            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              style={{
                padding: '7px 12px',
                fontSize: '0.82rem',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--dark)',
                background: 'white',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="">Todas las ciudades</option>
              {allCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Event list */}
      <div className="section" style={{ paddingTop: '0' }}>
        <div className="container" style={{ paddingTop: '32px' }}>
          {grouped.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <CalendarDays size={40} style={{ margin: '0 auto 14px', opacity: 0.25 }} />
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '6px' }}>
                No hay jornadas para este período.
              </p>
              <button
                onClick={() => { setTab('all'); setCityFilter(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand)', fontWeight: 700, fontSize: '0.88rem' }}
              >
                Ver todas las jornadas
              </button>
            </div>
          ) : (
            grouped.map(([date, jornadas]) => {
              const d = parseDate(date);
              return (
                <div key={date} style={{ marginBottom: '32px' }}>
                  {/* Date group header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '0',
                    padding: '10px 0',
                    borderBottom: '2px solid var(--brand)',
                  }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {formatFullDate(d)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 500 }}>
                      {formatDaysFromNow(d)} · {jornadas.length} jornada{jornadas.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Event rows */}
                  <div style={{ background: 'white', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
                    {jornadas.map(j => <EventRow key={j.id} j={j} />)}
                  </div>
                </div>
              );
            })
          )}

          {/* CTA for couriers */}
          <div style={{
            marginTop: '24px',
            background: 'linear-gradient(135deg, var(--dark), var(--brand))',
            borderRadius: '16px',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Para empresas</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', margin: '0 0 4px' }}>
                ¿Tienes una empresa de courier?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', margin: 0 }}>
                Publica tus jornadas y llega a miles de clientes.
              </p>
            </div>
            <Link
              href="/portal"
              style={{
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'var(--dark)',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.88rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
              }}
            >
              Acceder al portal <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .event-row:hover { background: var(--bg); }
      `}</style>
    </>
  );
}
