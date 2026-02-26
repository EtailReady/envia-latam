'use client';

import { useState } from 'react';
import { DollarSign, Save, Plus, Trash2, CheckCircle, Info } from 'lucide-react';
import { COUNTRIES } from '@/lib/data';

type RouteRow = {
  id: string;
  country: string;
  pricePerLb: string;
  minDays: string;
  maxDays: string;
  notes: string;
};

const MOCK_ROUTES: RouteRow[] = [
  { id: '1', country: 've', pricePerLb: '3.50', minDays: '7',  maxDays: '14', notes: 'Servicio aéreo' },
  { id: '2', country: 'co', pricePerLb: '2.80', minDays: '5',  maxDays: '10', notes: '' },
  { id: '3', country: 'do', pricePerLb: '2.20', minDays: '4',  maxDays: '8',  notes: '' },
  { id: '4', country: 'pa', pricePerLb: '2.50', minDays: '5',  maxDays: '9',  notes: '' },
];

export default function RatesPage() {
  const [routes, setRoutes] = useState<RouteRow[]>(MOCK_ROUTES);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (id: string, field: keyof RouteRow, value: string) => {
    setRoutes(rs => rs.map(r => r.id === id ? { ...r, [field]: value } : r));
    setSaved(false);
  };

  const addRoute = () => {
    setRoutes(rs => [...rs, {
      id: Date.now().toString(),
      country: 've', pricePerLb: '', minDays: '', maxDays: '', notes: '',
    }]);
  };

  const removeRoute = (id: string) => setRoutes(rs => rs.filter(r => r.id !== id));

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // TODO: POST /api/portal/rates
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = {
    padding: '8px 10px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: 'var(--dark)',
    width: '100%',
    outline: 'none',
    background: 'white',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Gestión de tarifas</div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 900, color: 'var(--dark)', margin: 0 }}>Mis Tarifas</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
            Actualiza tus precios por libra y tiempos de entrega. Los cambios se reflejan en tu perfil público.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '10px 20px', background: saved ? '#059669' : 'var(--brand)',
            color: 'white', border: 'none', borderRadius: '10px',
            fontWeight: 700, fontSize: '0.88rem', cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.8 : 1, transition: 'background 0.2s',
          }}
        >
          {saved ? <CheckCircle size={15} /> : <Save size={15} />}
          {saving ? 'Guardando...' : saved ? 'Guardado' : 'Guardar cambios'}
        </button>
      </div>

      {/* Info banner */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', fontSize: '0.82rem', color: '#1D4ED8' }}>
        <Info size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
        <span>Los precios se muestran en tu perfil público en tiempo real. Actualízalos cuando cambien tus costos operativos.</span>
      </div>

      {/* Table */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '160px 120px 80px 80px 1fr 44px', gap: '0', background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '10px 16px' }}>
          {['Destino', '$/lb', 'Min días', 'Máx días', 'Notas', ''].map(h => (
            <div key={h} style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {routes.map(r => {
          const country = COUNTRIES.find(c => c.code === r.country);
          return (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '160px 120px 80px 80px 1fr 44px', gap: '0', borderBottom: '1px solid var(--bg)', padding: '10px 16px', alignItems: 'center' }}>
              {/* Country select */}
              <select
                value={r.country}
                onChange={e => update(r.id, 'country', e.target.value)}
                style={{ ...inputStyle, marginRight: '8px' }}
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.nameEs}</option>
                ))}
              </select>

              {/* Price */}
              <div style={{ paddingRight: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.85rem', color: 'var(--muted)', pointerEvents: 'none' }}>$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={r.pricePerLb}
                    onChange={e => update(r.id, 'pricePerLb', e.target.value)}
                    placeholder="3.50"
                    style={{ ...inputStyle, paddingLeft: '22px' }}
                  />
                </div>
              </div>

              {/* Min days */}
              <div style={{ paddingRight: '8px' }}>
                <input type="number" min="1" value={r.minDays} onChange={e => update(r.id, 'minDays', e.target.value)} placeholder="7" style={inputStyle} />
              </div>

              {/* Max days */}
              <div style={{ paddingRight: '8px' }}>
                <input type="number" min="1" value={r.maxDays} onChange={e => update(r.id, 'maxDays', e.target.value)} placeholder="14" style={inputStyle} />
              </div>

              {/* Notes */}
              <div style={{ paddingRight: '8px' }}>
                <input type="text" value={r.notes} onChange={e => update(r.id, 'notes', e.target.value)} placeholder="Opcional" style={inputStyle} />
              </div>

              {/* Delete */}
              <button
                onClick={() => removeRoute(r.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          );
        })}

        {/* Add route */}
        <button
          onClick={addRoute}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
            padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--brand)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'left',
          }}
        >
          <Plus size={15} /> Agregar destino
        </button>
      </div>

      {/* Price summary */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', marginTop: '20px' }}>
        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarSign size={15} color="var(--brand)" /> Resumen de precios
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
          {routes.filter(r => r.pricePerLb).map(r => {
            const c = COUNTRIES.find(ct => ct.code === r.country);
            return (
              <div key={r.id} style={{ background: 'var(--bg)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '4px' }}>{c?.flag} {c?.nameEs}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--brand)' }}>${parseFloat(r.pricePerLb || '0').toFixed(2)}<span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--muted)' }}>/lb</span></div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '2px' }}>{r.minDays}–{r.maxDays} días</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
