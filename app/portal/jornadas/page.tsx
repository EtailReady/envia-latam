'use client';

import { useState } from 'react';
import { CalendarDays, Plus, Trash2, Save, CheckCircle, MapPin, Clock, Users } from 'lucide-react';

type JornadaRow = {
  id: string;
  city: string;
  state: string;
  address: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  spotsLeft: string;
  notes: string;
};

const MOCK: JornadaRow[] = [
  { id: '1', city: 'Miami',   state: 'FL', address: '8350 NW 52nd Terrace, Miami, FL 33166', date: '2026-03-01', timeStart: '09:00', timeEnd: '16:00', spotsLeft: '12', notes: 'Jornada mensual. Se aceptan cajas hasta 100 lbs.' },
  { id: '2', city: 'Orlando', state: 'FL', address: '4200 Millenia Blvd, Orlando, FL 32839',  date: '2026-03-08', timeStart: '10:00', timeEnd: '16:00', spotsLeft: '15', notes: '' },
];

const US_STATES = ['FL','TX','NY','GA','CA','MA','NC','IL','OH','NJ','WA','AZ','CO','PA','VA'];

function formatDate(d: string) {
  if (!d) return '';
  return new Date(d + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export default function JornadasPortalPage() {
  const [jornadas, setJornadas] = useState<JornadaRow[]>(MOCK);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<Omit<JornadaRow, 'id'>>({
    city: '', state: 'FL', address: '', date: '', timeStart: '09:00', timeEnd: '17:00', spotsLeft: '', notes: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const addJornada = (e: React.FormEvent) => {
    e.preventDefault();
    setJornadas(js => [...js, { id: Date.now().toString(), ...form }]);
    setForm({ city: '', state: 'FL', address: '', date: '', timeStart: '09:00', timeEnd: '17:00', spotsLeft: '', notes: '' });
    setShowForm(false);
    setSaved(false);
  };

  const remove = (id: string) => setJornadas(js => js.filter(j => j.id !== id));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // TODO: POST /api/portal/jornadas
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1px solid var(--border)',
    borderRadius: '8px', fontSize: '0.85rem', color: 'var(--dark)',
    outline: 'none', background: 'white', boxSizing: 'border-box' as const,
  };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '5px' };

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Agenda</div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 900, color: 'var(--dark)', margin: '0 0 4px' }}>Mis Jornadas</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>Gestiona tus eventos de pickup. Se muestran en la agenda pública.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '10px 18px', background: saved ? '#059669' : 'var(--bg)',
              color: saved ? 'white' : 'var(--dark)', border: '1px solid var(--border)',
              borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
            {saved ? 'Guardado' : 'Guardar'}
          </button>
          <button
            onClick={() => setShowForm(v => !v)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '10px 18px', background: 'var(--brand)', color: 'white',
              border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            <Plus size={15} /> Nueva jornada
          </button>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={addJornada} style={{
          background: 'white', border: '2px solid var(--brand)', borderRadius: '16px',
          padding: '24px', marginBottom: '24px',
        }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--dark)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarDays size={16} color="var(--brand)" /> Nueva jornada de pickup
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={labelStyle}>Ciudad</label>
              <input name="city" required value={form.city} onChange={handleFormChange} placeholder="Miami" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Estado</label>
              <select name="state" value={form.state} onChange={handleFormChange} style={inputStyle}>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fecha</label>
              <input name="date" type="date" required value={form.date} onChange={handleFormChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Cupos disponibles</label>
              <input name="spotsLeft" type="number" min="1" value={form.spotsLeft} onChange={handleFormChange} placeholder="20" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Hora inicio</label>
              <input name="timeStart" type="time" required value={form.timeStart} onChange={handleFormChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Hora fin</label>
              <input name="timeEnd" type="time" required value={form.timeEnd} onChange={handleFormChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Dirección completa</label>
            <input name="address" required value={form.address} onChange={handleFormChange} placeholder="123 Main St, Miami, FL 33101" style={inputStyle} />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Notas (opcional)</label>
            <input name="notes" value={form.notes} onChange={handleFormChange} placeholder="Instrucciones especiales, límites de peso, etc." style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--brand)', color: 'white', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
              Agregar jornada
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 20px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '9px', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', color: 'var(--body)' }}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Jornadas list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {jornadas.length === 0 && (
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
            <CalendarDays size={36} style={{ margin: '0 auto 12px', opacity: 0.25 }} />
            <p style={{ fontWeight: 600, margin: '0 0 10px' }}>No tienes jornadas registradas</p>
            <button onClick={() => setShowForm(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand)', fontWeight: 700, fontSize: '0.88rem' }}>
              + Agregar primera jornada
            </button>
          </div>
        )}
        {jornadas
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(j => {
            const isPast = new Date(j.date + 'T23:59:59') < new Date();
            return (
              <div
                key={j.id}
                style={{
                  background: 'white', border: '1px solid var(--border)', borderRadius: '14px',
                  padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start',
                  opacity: isPast ? 0.55 : 1,
                }}
              >
                {/* Date badge */}
                <div style={{
                  background: isPast ? 'var(--bg)' : 'var(--brand)', color: isPast ? 'var(--muted)' : 'white',
                  borderRadius: '10px', padding: '8px 12px', textAlign: 'center', flexShrink: 0, minWidth: '52px',
                }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, lineHeight: 1 }}>
                    {new Date(j.date + 'T12:00:00').getDate()}
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>
                    {new Date(j.date + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short' })}
                  </div>
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--dark)', marginBottom: '6px' }}>
                    {j.city}, {j.state}
                    {isPast && <span style={{ marginLeft: '8px', fontSize: '0.68rem', fontWeight: 600, color: 'var(--muted)', background: 'var(--bg)', padding: '2px 7px', borderRadius: '20px' }}>Pasada</span>}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: 'var(--muted)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      {j.timeStart.replace(/^(\d{2}):(\d{2})$/, (_, h, m) => {
                        const hr = parseInt(h); return `${hr > 12 ? hr - 12 : hr}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
                      })} – {j.timeEnd.replace(/^(\d{2}):(\d{2})$/, (_, h, m) => {
                        const hr = parseInt(h); return `${hr > 12 ? hr - 12 : hr}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
                      })}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {j.address}</span>
                    {j.spotsLeft && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {j.spotsLeft} cupos</span>}
                  </div>
                  {j.notes && <div style={{ marginTop: '6px', fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic' }}>{j.notes}</div>}
                </div>

                {/* Delete */}
                <button
                  onClick={() => remove(j.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px', borderRadius: '6px', flexShrink: 0 }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
