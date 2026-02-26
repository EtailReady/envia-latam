'use client';

import { useState } from 'react';
import { Truck, MapPin, Package, Clock, Search, Filter, ChevronDown, CheckCircle, XCircle, AlertCircle, RotateCcw } from 'lucide-react';

type Status = 'Pendiente' | 'Confirmado' | 'Completado' | 'Cancelado';

type Pickup = {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  dest: string;
  weight: string;
  notes: string;
  time: string;
  status: Status;
};

const MOCK_PICKUPS: Pickup[] = [
  { id: 'ENV-2026-A4KR8B', name: 'María García',     phone: '+1 (305) 555-0191', city: 'Miami',    state: 'FL', dest: 'Venezuela',  weight: '15 lbs', notes: 'Caja con ropa y comida',    time: '2026-02-26 09:14', status: 'Pendiente'  },
  { id: 'ENV-2026-C7NM2E', name: 'José Rodríguez',   phone: '+1 (407) 555-0102', city: 'Orlando',  state: 'FL', dest: 'Colombia',   weight: '8 lbs',  notes: '',                          time: '2026-02-26 07:22', status: 'Confirmado' },
  { id: 'ENV-2026-P9WX4F', name: 'Ana Martínez',     phone: '+1 (305) 555-0143', city: 'Miami',    state: 'FL', dest: 'Venezuela',  weight: '22 lbs', notes: 'Frágil — electrónicos',    time: '2026-02-25 16:47', status: 'Pendiente'  },
  { id: 'ENV-2026-YT3LQ7', name: 'Luis Pérez',       phone: '+1 (404) 555-0158', city: 'Atlanta',  state: 'GA', dest: 'Panamá',     weight: '5 lbs',  notes: 'Documentos urgentes',       time: '2026-02-24 11:33', status: 'Completado' },
  { id: 'ENV-2026-KJ6RV1', name: 'Carmen López',     phone: '+1 (305) 555-0177', city: 'Miami',    state: 'FL', dest: 'Venezuela',  weight: '30 lbs', notes: 'Medicamentos y ropa',       time: '2026-02-23 14:08', status: 'Confirmado' },
  { id: 'ENV-2026-MH8DP5', name: 'Pedro Sánchez',    phone: '+1 (786) 555-0129', city: 'Hialeah', state: 'FL', dest: 'Colombia',   weight: '12 lbs', notes: '',                          time: '2026-02-22 09:55', status: 'Completado' },
  { id: 'ENV-2026-ZB2NK9', name: 'Sofía Torres',     phone: '+1 (305) 555-0166', city: 'Miami',    state: 'FL', dest: 'Venezuela',  weight: '7 lbs',  notes: 'Solo zapatos',              time: '2026-02-21 13:19', status: 'Cancelado'  },
  { id: 'ENV-2026-QL5TX3', name: 'Diego Morales',    phone: '+1 (954) 555-0148', city: 'Miramar', state: 'FL', dest: 'Rep. Dom.',  weight: '18 lbs', notes: 'Juguetes para niños',       time: '2026-02-20 10:41', status: 'Completado' },
];

const STATUS_CONFIG: Record<Status, { color: string; bg: string; Icon: React.ElementType }> = {
  Pendiente:  { color: '#B45309', bg: '#FFFBEB', Icon: AlertCircle   },
  Confirmado: { color: '#059669', bg: '#D1FAE5', Icon: CheckCircle   },
  Completado: { color: '#6B7280', bg: '#F3F4F6', Icon: RotateCcw     },
  Cancelado:  { color: '#EF4444', bg: '#FEF2F2', Icon: XCircle       },
};

export default function PickupsPage() {
  const [pickups, setPickups] = useState<Pickup[]>(MOCK_PICKUPS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = pickups.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.dest.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const changeStatus = (id: string, status: Status) => {
    setPickups(ps => ps.map(p => p.id === id ? { ...p, status } : p));
  };

  const counts = {
    all:        pickups.length,
    Pendiente:  pickups.filter(p => p.status === 'Pendiente').length,
    Confirmado: pickups.filter(p => p.status === 'Confirmado').length,
    Completado: pickups.filter(p => p.status === 'Completado').length,
    Cancelado:  pickups.filter(p => p.status === 'Cancelado').length,
  };

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Gestión</div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 900, color: 'var(--dark)', margin: '0 0 4px' }}>Solicitudes de Pickup</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>Gestiona las solicitudes entrantes de tus clientes.</p>
      </div>

      {/* Status filter pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {(['all', 'Pendiente', 'Confirmado', 'Completado', 'Cancelado'] as const).map(s => {
          const active = filterStatus === s;
          const count = counts[s];
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '7px 14px', borderRadius: '20px', border: '1px solid',
                borderColor: active ? 'var(--brand)' : 'var(--border)',
                background: active ? 'var(--brand)' : 'white',
                color: active ? 'white' : 'var(--body)',
                fontWeight: active ? 700 : 500,
                fontSize: '0.82rem', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}
            >
              {s === 'all' ? 'Todas' : s}
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, padding: '1px 6px', borderRadius: '10px',
                background: active ? 'rgba(255,255,255,0.25)' : 'var(--bg)',
                color: active ? 'white' : 'var(--muted)',
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px', maxWidth: '420px' }}>
        <Search size={15} color="var(--muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, ID o destino..."
          style={{
            width: '100%', padding: '9px 12px 9px 36px', border: '1px solid var(--border)',
            borderRadius: '9px', fontSize: '0.85rem', color: 'var(--dark)', outline: 'none',
            background: 'white', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 && (
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '14px', padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
            <Truck size={36} style={{ margin: '0 auto 12px', opacity: 0.2 }} />
            <p style={{ fontWeight: 600, margin: 0 }}>No hay solicitudes que coincidan</p>
          </div>
        )}

        {filtered.map(p => {
          const cfg = STATUS_CONFIG[p.status];
          const StatusIcon = cfg.Icon;
          const isOpen = expanded === p.id;

          return (
            <div key={p.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
              {/* Summary row */}
              <button
                onClick={() => setExpanded(isOpen ? null : p.id)}
                style={{
                  width: '100%', display: 'grid',
                  gridTemplateColumns: '1fr auto auto auto',
                  gap: '12px', alignItems: 'center',
                  padding: '14px 18px', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                {/* Name + meta */}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--dark)', marginBottom: '3px' }}>{p.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} /> {p.city}, {p.state}</span>
                    <span>→ {p.dest}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Package size={11} /> {p.weight}</span>
                  </div>
                </div>

                {/* Pickup ID */}
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{p.id}</span>

                {/* Status badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.72rem', fontWeight: 700,
                  color: cfg.color, background: cfg.bg,
                  padding: '4px 10px', borderRadius: '20px', whiteSpace: 'nowrap',
                }}>
                  <StatusIcon size={11} strokeWidth={2.5} />
                  {p.status}
                </span>

                <ChevronDown size={15} color="var(--muted)" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '16px 18px 18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Teléfono</div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--dark)', fontWeight: 600 }}>{p.phone}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Fecha</div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--dark)' }}>{p.time}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Peso</div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--dark)', fontWeight: 600 }}>{p.weight}</div>
                    </div>
                    {p.notes && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>Notas del cliente</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--body)', fontStyle: 'italic' }}>{p.notes}</div>
                      </div>
                    )}
                  </div>
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(['Pendiente', 'Confirmado', 'Completado', 'Cancelado'] as Status[])
                      .filter(s => s !== p.status)
                      .map(s => {
                        const c = STATUS_CONFIG[s];
                        const Icon = c.Icon;
                        return (
                          <button
                            key={s}
                            onClick={() => changeStatus(p.id, s)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '7px 14px', borderRadius: '8px',
                              border: `1px solid ${c.color}20`,
                              background: c.bg, color: c.color,
                              fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                            }}
                          >
                            <Icon size={13} strokeWidth={2} /> Marcar {s}
                          </button>
                        );
                      })}
                    <a
                      href={`https://wa.me/${p.phone.replace(/\D/g,'')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                      style={{ padding: '7px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Contactar por WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
