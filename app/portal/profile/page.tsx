'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Save, CheckCircle, ExternalLink, Globe, Phone, Mail, MapPin, MessageCircle, Instagram, Info } from 'lucide-react';

const MOCK_PROFILE = {
  name: 'Cargo Express Miami',
  tagline: 'Tu carga en manos confiables desde Miami',
  description: 'Más de 15 años llevando paquetes, vehículos y mercancía a toda Venezuela, Colombia y el Caribe. Servicio puerta a puerta.',
  phone: '+1 (305) 555-0101',
  email: 'info@cargoexpressmiami.com',
  website: 'https://cargoexpressmiami.com',
  whatsapp: '+13055550101',
  instagram: '@cargoexpressmiami',
  address: '8350 NW 52nd Terrace, Miami, FL 33166',
  acceptsVehicles: true,
  acceptsMerchandise: true,
  acceptsDocuments: true,
  airFreight: true,
  seaFreight: false,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string | boolean) => {
    setProfile(p => ({ ...p, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // TODO: POST /api/portal/profile
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1px solid var(--border)',
    borderRadius: '9px', fontSize: '0.88rem', color: 'var(--dark)',
    outline: 'none', background: 'white', boxSizing: 'border-box' as const,
  };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--dark)', marginBottom: '5px' };
  const sectionHead = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' };

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Información de empresa</div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 900, color: 'var(--dark)', margin: '0 0 4px' }}>Mi Perfil</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0 }}>Esta información aparece en tu perfil público en Envia Latam.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link
            href="/courier/cargo-express-miami"
            target="_blank"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '9px', color: 'var(--body)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}
          >
            <ExternalLink size={13} /> Ver perfil público
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 20px',
              background: saved ? '#059669' : 'var(--brand)', color: 'white', border: 'none',
              borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {saved ? <CheckCircle size={15} /> : <Save size={15} />}
            {saving ? 'Guardando...' : saved ? 'Guardado' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }} className="profile-grid">
        {/* Left: form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Basic info */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={sectionHead}>Información básica</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Nombre de la empresa</label>
                <input value={profile.name} onChange={e => update('name', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Tagline (frase corta)</label>
                <input value={profile.tagline} onChange={e => update('tagline', e.target.value)} placeholder="Tu carga en buenas manos" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Descripción</label>
                <textarea
                  value={profile.description}
                  onChange={e => update('description', e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div>
                <label style={labelStyle}><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />Dirección principal</label>
                <input value={profile.address} onChange={e => update('address', e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={sectionHead}>Contacto</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}><Phone size={12} style={{ display: 'inline', marginRight: '4px' }} />Teléfono</label>
                <input value={profile.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 (305) 000-0000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}><MessageCircle size={12} style={{ display: 'inline', marginRight: '4px' }} />WhatsApp</label>
                <input value={profile.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="+13050000000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}><Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />Email</label>
                <input type="email" value={profile.email} onChange={e => update('email', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}><Globe size={12} style={{ display: 'inline', marginRight: '4px' }} />Sitio web</label>
                <input value={profile.website} onChange={e => update('website', e.target.value)} placeholder="https://tuempresa.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}><Instagram size={12} style={{ display: 'inline', marginRight: '4px' }} />Instagram</label>
                <input value={profile.instagram} onChange={e => update('instagram', e.target.value)} placeholder="@tuempresa" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Services */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <div style={sectionHead}>Servicios ofrecidos</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {[
                { key: 'acceptsVehicles',     label: 'Acepta vehículos' },
                { key: 'acceptsMerchandise',  label: 'Acepta mercancía' },
                { key: 'acceptsDocuments',    label: 'Acepta documentos' },
                { key: 'airFreight',          label: 'Flete aéreo' },
                { key: 'seaFreight',          label: 'Flete marítimo' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                    padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border)',
                    background: (profile as Record<string, boolean | string>)[key] ? 'var(--brand-light)' : 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!(profile as Record<string, boolean | string>)[key]}
                    onChange={e => update(key, e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--brand)' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--dark)' }}>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: preview card */}
        <div style={{ position: 'sticky', top: '24px' }}>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--brand))', padding: '20px', color: 'white' }}>
              <div style={{ fontSize: '0.68rem', opacity: 0.6, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vista previa</div>
              <div style={{ fontWeight: 900, fontSize: '1.05rem', marginBottom: '4px' }}>{profile.name || '—'}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>{profile.tagline || '—'}</div>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--body)', lineHeight: 1.6, marginBottom: '14px' }}>
                {profile.description?.slice(0, 120)}{(profile.description?.length ?? 0) > 120 ? '...' : ''}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--muted)' }}>
                {profile.phone    && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={11} /> {profile.phone}</span>}
                {profile.email    && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={11} /> {profile.email}</span>}
                {profile.website  && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={11} /> {profile.website}</span>}
                {profile.address  && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={11} /> {profile.address}</span>}
              </div>
              <div style={{ marginTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {profile.airFreight      && <span style={{ fontSize: '0.68rem', padding: '3px 8px', background: '#EFF6FF', color: '#1D4ED8', borderRadius: '6px', fontWeight: 600 }}>Flete Aéreo</span>}
                {profile.seaFreight      && <span style={{ fontSize: '0.68rem', padding: '3px 8px', background: '#F0FDFA', color: '#0D9488', borderRadius: '6px', fontWeight: 600 }}>Flete Marítimo</span>}
                {profile.acceptsVehicles && <span style={{ fontSize: '0.68rem', padding: '3px 8px', background: '#FEF2F2', color: '#DC2626', borderRadius: '6px', fontWeight: 600 }}>Vehículos</span>}
              </div>
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                <Info size={12} /> Los cambios se guardan al hacer clic en "Guardar cambios"
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
