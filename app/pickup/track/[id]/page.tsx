'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Truck, CheckCircle, Clock, MapPin, Package, ChevronLeft, AlertCircle, Info } from 'lucide-react';
import { getCountry } from '@/lib/data';

type PickupData = {
  pickupId: string;
  courierName: string;
  courierSlug: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  destination: string;
  weight: string;
  contents: string;
  preferredDate: string;
  notes: string;
  status: string;
  createdAt: string;
};

const STATUSES = [
  { key: 'Solicitado',  label: 'Solicitud recibida',   icon: Package,      color: '#3B82F6' },
  { key: 'Confirmado',  label: 'Pickup confirmado',     icon: CheckCircle,  color: '#8B5CF6' },
  { key: 'En camino',   label: 'En camino al almacén',  icon: Truck,        color: '#F59E0B' },
  { key: 'Entregado',   label: 'Entregado en destino',  icon: MapPin,       color: '#10B981' },
];

export default function TrackPage() {
  const params = useParams();
  const id = params?.id as string;
  const [pickup, setPickup] = useState<PickupData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const pickups: PickupData[] = JSON.parse(localStorage.getItem('envia_pickups') || '[]');
    const found = pickups.find((p) => p.pickupId === id);
    if (found) {
      setPickup(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const currentStatusIndex = pickup
    ? STATUSES.findIndex((s) => s.key === pickup.status)
    : -1;

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '680px' }}>
        {/* Back */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--muted)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            marginBottom: '28px',
          }}
        >
          <ChevronLeft size={15} /> Inicio
        </Link>

        {/* Not found */}
        {notFound && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <AlertCircle size={40} color="#EF4444" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark)', marginBottom: '8px' }}>
              Número no encontrado
            </h2>
            <p style={{ color: 'var(--body)', fontSize: '0.9rem', marginBottom: '20px' }}>
              No encontramos el número <strong>{id}</strong> en este dispositivo.
              El seguimiento está disponible desde el dispositivo donde hiciste la solicitud.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                padding: '10px 24px',
                background: 'var(--brand)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
              }}
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Loading state */}
        {!pickup && !notFound && (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '60px 0' }}>
            <Clock size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p>Cargando...</p>
          </div>
        )}

        {/* Found */}
        {pickup && (
          <>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--brand)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '6px',
                }}
              >
                Seguimiento de envío
              </div>
              <h1
                style={{
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  fontWeight: 900,
                  color: 'var(--dark)',
                  margin: '0 0 8px',
                  letterSpacing: '0.03em',
                }}
              >
                {pickup.pickupId}
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>
                {pickup.courierName} · Solicitado el{' '}
                {new Date(pickup.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Status timeline */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  background: 'var(--bg)',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                }}
              >
                Estado del envío
              </div>
              <div style={{ padding: '20px' }}>
                {STATUSES.map((s, i) => {
                  const isDone = i <= currentStatusIndex;
                  const isCurrent = i === currentStatusIndex;
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.key}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                        paddingBottom: i < STATUSES.length - 1 ? '20px' : 0,
                        position: 'relative',
                      }}
                    >
                      {/* Connector line */}
                      {i < STATUSES.length - 1 && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '19px',
                            top: '36px',
                            width: '2px',
                            height: '32px',
                            background: isDone && i < currentStatusIndex ? s.color : 'var(--border)',
                          }}
                        />
                      )}

                      {/* Icon circle */}
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: isDone ? s.color : 'var(--bg)',
                          border: `2px solid ${isDone ? s.color : 'var(--border)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: isCurrent ? `0 0 0 4px ${s.color}22` : 'none',
                        }}
                      >
                        <Icon
                          size={18}
                          color={isDone ? 'white' : 'var(--muted)'}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Label */}
                      <div style={{ paddingTop: '8px' }}>
                        <div
                          style={{
                            fontWeight: isCurrent ? 800 : 600,
                            fontSize: '0.9rem',
                            color: isDone ? 'var(--dark)' : 'var(--muted)',
                            marginBottom: '2px',
                          }}
                        >
                          {s.label}
                          {isCurrent && (
                            <span
                              style={{
                                marginLeft: '8px',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                color: s.color,
                                background: `${s.color}18`,
                                padding: '2px 8px',
                                borderRadius: '20px',
                                verticalAlign: 'middle',
                              }}
                            >
                              ACTUAL
                            </span>
                          )}
                        </div>
                        {isCurrent && i === 0 && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                            El courier te contactará pronto para confirmar.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details card */}
            <div
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  background: 'var(--bg)',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                }}
              >
                Detalles del envío
              </div>
              <div style={{ padding: '8px 20px' }}>
                {(
                  [
                    ['Courier', pickup.courierName],
                    ['Pickup en', `${pickup.address}, ${pickup.city}, ${pickup.state}`],
                    [
                      'Destino',
                      (() => {
                        const c = getCountry(pickup.destination);
                        return c ? `${c.flag} ${c.nameEs}` : pickup.destination;
                      })(),
                    ],
                    ['Peso estimado', `${pickup.weight} lbs`],
                    ['Contenido', pickup.contents],
                    ['Fecha preferida', pickup.preferredDate],
                    ...(pickup.notes ? [['Notas', pickup.notes] as [string, string]] : []),
                  ] as [string, string][]
                ).map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--bg)',
                      fontSize: '0.84rem',
                    }}
                  >
                    <span style={{ color: 'var(--muted)', fontWeight: 500, flexShrink: 0 }}>
                      {label}
                    </span>
                    <span
                      style={{
                        color: 'var(--dark)',
                        fontWeight: 600,
                        textAlign: 'right',
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div
              style={{
                marginTop: '20px',
                padding: '14px 18px',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '12px',
                fontSize: '0.82rem',
                color: '#1D4ED8',
                lineHeight: 1.6,
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}
            >
              <Info size={14} style={{ flexShrink: 0, marginTop: '1px' }} /> <strong>Nota:</strong> El seguimiento se actualiza cuando el courier confirma cada
              etapa. Si han pasado 24 horas sin respuesta, comunícate directamente con{' '}
              <strong>{pickup.courierName}</strong>.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
