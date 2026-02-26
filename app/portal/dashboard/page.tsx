import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { COURIERS, JORNADAS } from '@/lib/data';
import {
  Eye, MessageCircle, Truck, CalendarDays,
  TrendingUp, ArrowUpRight, Clock, MapPin,
  DollarSign, AlertCircle, ExternalLink,
} from 'lucide-react';

function StatCard({
  label, value, sub, Icon, color, bg,
}: {
  label: string; value: string | number; sub?: string;
  Icon: React.ElementType; color: string; bg: string;
}) {
  return (
    <div style={{
      background: 'white', border: '1px solid var(--border)',
      borderRadius: '14px', padding: '20px 22px',
      display: 'flex', alignItems: 'flex-start', gap: '14px',
    }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={20} color={color} strokeWidth={1.75} />
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--dark)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500, marginTop: '4px' }}>{label}</div>
        {sub && <div style={{ fontSize: '0.72rem', color, fontWeight: 600, marginTop: '3px' }}>{sub}</div>}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress ?? '';

  // Match courier by email
  const courier = COURIERS.find(c => c.email === userEmail);

  // Courier's upcoming jornadas
  const myJornadas = courier
    ? JORNADAS.filter(j => j.courierSlug === courier.slug && new Date(j.date + 'T12:00:00') >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3)
    : [];

  const firstName = user?.firstName ?? 'Bienvenido';

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Portal de empresa</div>
        <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, color: 'var(--dark)', margin: '0 0 6px' }}>
          Hola, {firstName}
        </h1>
        {courier ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>{courier.name}</span>
            <Link
              href={`/courier/${courier.slug}`}
              target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}
            >
              <ExternalLink size={12} /> Ver perfil público
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '10px 14px', marginTop: '10px', maxWidth: '500px' }}>
            <AlertCircle size={16} color="#EF4444" />
            <span style={{ fontSize: '0.85rem', color: '#B91C1C' }}>
              Tu email no coincide con ningún courier registrado. Contacta a <strong>soporte@envialatam.com</strong>.
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        <StatCard label="Visitas esta semana"   value="1,204" sub="+18% vs semana pasada" Icon={Eye}          color="#1B4FD8" bg="#EFF6FF" />
        <StatCard label="Clics en WhatsApp"     value="87"    sub="+12 hoy"               Icon={MessageCircle} color="#059669" bg="#D1FAE5" />
        <StatCard label="Solicitudes de pickup" value="23"    sub="6 pendientes"           Icon={Truck}         color="#7C3AED" bg="#F5F3FF" />
        <StatCard label="Jornadas próximas"     value={myJornadas.length || 0} sub={myJornadas.length ? `Próxima: ${myJornadas[0]?.city}` : 'Agrega una'} Icon={CalendarDays} color="#B45309" bg="#FFFBEB" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }} className="dash-grid">

        {/* Recent pickup requests */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="var(--brand)" /> Solicitudes recientes
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'white', background: '#7C3AED', padding: '3px 9px', borderRadius: '20px' }}>6 pendientes</span>
          </div>
          {[
            { name: 'María García',   city: 'Miami, FL',     dest: 'Venezuela',  weight: '15 lbs', time: 'Hace 2h',  status: 'Pendiente' },
            { name: 'José Rodríguez', city: 'Orlando, FL',   dest: 'Colombia',   weight: '8 lbs',  time: 'Hace 4h',  status: 'Confirmado' },
            { name: 'Ana Martínez',   city: 'Miami, FL',     dest: 'Venezuela',  weight: '22 lbs', time: 'Ayer',     status: 'Pendiente' },
            { name: 'Luis Pérez',     city: 'Atlanta, GA',   dest: 'Panamá',     weight: '5 lbs',  time: 'Ayer',     status: 'Completado' },
            { name: 'Carmen López',   city: 'Miami, FL',     dest: 'Venezuela',  weight: '30 lbs', time: 'Hace 3d',  status: 'Confirmado' },
          ].map((req, i) => (
            <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid var(--bg)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--dark)', marginBottom: '3px' }}>{req.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', gap: '10px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {req.city}</span>
                  <span>→ {req.dest}</span>
                  <span>{req.weight}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700,
                  color: req.status === 'Pendiente' ? '#B45309' : req.status === 'Confirmado' ? '#059669' : '#6B7280',
                  background: req.status === 'Pendiente' ? '#FFFBEB' : req.status === 'Confirmado' ? '#D1FAE5' : '#F3F4F6',
                  padding: '3px 8px', borderRadius: '20px', display: 'block', marginBottom: '4px',
                }}>
                  {req.status}
                </span>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{req.time}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: '14px 20px' }}>
            <Link href="/portal/pickups" style={{ fontSize: '0.82rem', color: 'var(--brand)', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Ver todas <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Upcoming jornadas */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CalendarDays size={15} color="var(--brand)" /> Mis jornadas
              </div>
              <Link href="/portal/jornadas" style={{ fontSize: '0.75rem', color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Ver todas</Link>
            </div>
            {myJornadas.length === 0 ? (
              <div style={{ padding: '20px 18px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '10px' }}>No tienes jornadas próximas</div>
                <Link href="/portal/jornadas" style={{ fontSize: '0.82rem', color: 'var(--brand)', fontWeight: 700, textDecoration: 'none' }}>+ Agregar jornada</Link>
              </div>
            ) : myJornadas.map(j => (
              <div key={j.id} style={{ padding: '12px 18px', borderBottom: '1px solid var(--bg)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--brand)', color: 'white', borderRadius: '8px', padding: '6px 10px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 900, lineHeight: 1 }}>{new Date(j.date + 'T12:00:00').getDate()}</div>
                  <div style={{ fontSize: '0.55rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>
                    {new Date(j.date + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short' })}
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--dark)' }}>{j.city}, {j.state}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {j.timeStart} – {j.timeEnd}</span>
                  </div>
                  {j.spotsLeft !== undefined && (
                    <div style={{ fontSize: '0.72rem', color: j.spotsLeft <= 5 ? '#EF4444' : '#059669', fontWeight: 600, marginTop: '3px' }}>
                      {j.spotsLeft} cupos disponibles
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '18px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--dark)', marginBottom: '12px' }}>Acciones rápidas</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { href: '/portal/rates',    label: 'Actualizar tarifas',     Icon: DollarSign,   color: '#1B4FD8' },
                { href: '/portal/jornadas', label: 'Agregar jornada',        Icon: CalendarDays, color: '#7C3AED' },
                { href: '/portal/profile',  label: 'Editar perfil',          Icon: TrendingUp,   color: '#059669' },
              ].map(({ href, label, Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border)',
                    textDecoration: 'none', color: 'var(--dark)', fontWeight: 600, fontSize: '0.85rem',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} color={color} strokeWidth={2} />
                  </div>
                  {label}
                  <ArrowUpRight size={13} style={{ marginLeft: 'auto', color: 'var(--muted)' }} />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`@media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
