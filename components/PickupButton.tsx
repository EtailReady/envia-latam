'use client';

import { useState } from 'react';
import { X, Truck, CheckCircle, Copy, AlertCircle, Info } from 'lucide-react';
import { Courier, getCountry } from '@/lib/data';

type PickupData = {
  pickupId: string;
  courierName: string;
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
  createdAt: string;
  status: string;
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--dark)',
  marginBottom: '5px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  fontSize: '0.88rem',
  color: 'var(--dark)',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'white',
};

export default function PickupButton({ courier }: { courier: Courier }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [pickup, setPickup] = useState<PickupData | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    destination: courier.toCountries[0] || '',
    weight: '',
    contents: '',
    preferredDate: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/pickup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          courierSlug: courier.slug,
          courierName: courier.name,
          courierEmail: courier.email,
        }),
      });
      const data = await res.json();

      // Persist to localStorage for tracking
      const pickups = JSON.parse(localStorage.getItem('envia_pickups') || '[]');
      pickups.push(data);
      localStorage.setItem('envia_pickups', JSON.stringify(pickups));

      setPickup(data);
      setStep('success');
    } catch (err) {
      console.error(err);
      alert('Error al enviar la solicitud. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const copyId = () => {
    if (pickup) {
      navigator.clipboard.writeText(pickup.pickupId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openModal = () => {
    setStep('form');
    setPickup(null);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--accent)',
          color: '#0D1B2A',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <Truck size={16} /> Solicitar Pickup
      </button>

      {open && (
        <div
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '24px 24px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--brand)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    marginBottom: '4px',
                  }}
                >
                  {courier.name}
                </div>
                <h2
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: 'var(--dark)',
                    margin: 0,
                  }}
                >
                  {step === 'form' ? 'Solicitar Pickup' : '¡Solicitud enviada!'}
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted)',
                  padding: '4px',
                  marginTop: '4px',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* FORM STEP */}
            {step === 'form' && (
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: '20px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {/* Name + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Tu nombre</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Teléfono</label>
                    <input
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (305) 000-0000"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email (para tu recibo)</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tuemail@ejemplo.com"
                    style={inputStyle}
                  />
                </div>

                {/* Address */}
                <div>
                  <label style={labelStyle}>Dirección de pickup</label>
                  <input
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 SW 8th St, Apt 4B"
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Ciudad</label>
                    <input
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Miami"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Estado</label>
                    <input
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      placeholder="FL"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Destination + Weight */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Destino</label>
                    <select
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      {courier.toCountries.map((code) => {
                        const c = getCountry(code);
                        return (
                          <option key={code} value={code}>
                            {c ? `${c.flag} ${c.nameEs}` : code}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Peso estimado (lbs)</label>
                    <input
                      name="weight"
                      type="number"
                      min="1"
                      required
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="10"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Contents */}
                <div>
                  <label style={labelStyle}>Contenido del envío</label>
                  <input
                    name="contents"
                    required
                    value={form.contents}
                    onChange={handleChange}
                    placeholder="Ropa, zapatos, electrónicos..."
                    style={inputStyle}
                  />
                </div>

                {/* Preferred Date */}
                <div>
                  <label style={labelStyle}>Fecha preferida de pickup</label>
                  <input
                    name="preferredDate"
                    type="date"
                    required
                    value={form.preferredDate}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label style={labelStyle}>Notas adicionales (opcional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Horario disponible, instrucciones especiales..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {/* Disclaimer */}
                <div
                  style={{
                    background: '#FFF7ED',
                    border: '1px solid #FED7AA',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '0.8rem',
                    color: '#C2410C',
                    lineHeight: 1.6,
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}
                >
                  <AlertCircle size={13} style={{ flexShrink: 0, marginTop: '1px' }} />
                  El courier te llamará para confirmar la fecha y hora exacta. Este formulario no
                  garantiza el pickup hasta la confirmación telefónica.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '14px',
                    background: 'var(--brand)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Enviando solicitud...' : 'Enviar solicitud de pickup'}
                </button>
              </form>
            )}

            {/* SUCCESS STEP */}
            {step === 'success' && pickup && (
              <div style={{ padding: '20px 24px 28px' }}>
                {/* Icon */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: '#D1FAE5',
                      margin: '0 auto 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle size={34} color="#059669" strokeWidth={2} />
                  </div>
                  <p
                    style={{
                      color: 'var(--body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    Tu solicitud fue enviada a <strong>{courier.name}</strong>.<br />
                    Te llamarán para confirmar. Guarda tu número de seguimiento:
                  </p>
                </div>

                {/* Pickup ID */}
                <div
                  style={{
                    background: 'var(--bg)',
                    border: '2px dashed var(--border)',
                    borderRadius: '14px',
                    padding: '18px 20px',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Número de seguimiento
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: 'var(--brand)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {pickup.pickupId}
                    </span>
                    <button
                      onClick={copyId}
                      title="Copiar"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--muted)',
                      }}
                    >
                      <Copy size={17} />
                    </button>
                  </div>
                  {copied && (
                    <div
                      style={{ fontSize: '0.75rem', color: '#059669', marginTop: '4px' }}
                    >
                      ¡Copiado al portapapeles!
                    </div>
                  )}
                </div>

                {/* Summary receipt */}
                <div
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      padding: '10px 16px',
                      background: 'var(--bg)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.09em',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    Resumen de solicitud
                  </div>
                  <div style={{ padding: '8px 16px' }}>
                    {(
                      [
                        ['Cliente', pickup.name],
                        ['Teléfono', pickup.phone],
                        ['Email', pickup.email],
                        ['Dirección de pickup', `${pickup.address}, ${pickup.city}, ${pickup.state}`],
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
                      ] as [string, string][]
                    ).map(([label, val]) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '8px 0',
                          borderBottom: '1px solid var(--bg)',
                          fontSize: '0.83rem',
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--muted)',
                            fontWeight: 500,
                            flexShrink: 0,
                          }}
                        >
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

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={`/pickup/track/${pickup.pickupId}`}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'var(--brand)',
                      color: 'white',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <Truck size={15} /> Rastrear envío
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      color: 'var(--body)',
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
