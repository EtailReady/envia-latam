import { currentUser } from '@clerk/nextjs/server';
import { COURIERS } from '@/lib/data';
import ProfileForm, { ProfileData } from './ProfileForm';
import { AlertCircle } from 'lucide-react';

const FALLBACK: ProfileData = {
  name: '',
  tagline: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  whatsapp: '',
  instagram: '',
  address: '',
  acceptsVehicles: false,
  acceptsMerchandise: false,
  acceptsDocuments: false,
  airFreight: false,
  seaFreight: false,
  courierSlug: '',
};

export default async function ProfilePage() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress ?? '';

  // Match courier record by email
  const courier = COURIERS.find(c => c.email === userEmail);

  if (!courier) {
    return (
      <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Información de empresa</div>
        <h1 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 900, color: 'var(--dark)', margin: '0 0 20px' }}>Mi Perfil</h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '16px 18px', maxWidth: '520px' }}>
          <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <div style={{ fontWeight: 700, color: '#B91C1C', marginBottom: '4px', fontSize: '0.9rem' }}>Cuenta no vinculada</div>
            <div style={{ fontSize: '0.85rem', color: '#7F1D1D', lineHeight: 1.6 }}>
              Tu email <strong>{userEmail || '(desconocido)'}</strong> no coincide con ningún courier registrado.
              Contacta a <strong>soporte@envialatam.com</strong> para vincular tu cuenta.
            </div>
          </div>
        </div>
        <ProfileForm initialData={FALLBACK} />
      </div>
    );
  }

  // Build ProfileData from lib/data courier record
  const initialData: ProfileData = {
    name:               courier.name,
    tagline:            courier.tagline,
    description:        courier.description,
    phone:              courier.phone,
    email:              courier.email,
    website:            courier.website,
    whatsapp:           courier.whatsapp ?? '',
    instagram:          courier.instagram ?? '',
    address:            courier.address,
    acceptsVehicles:    courier.acceptsVehicles,
    acceptsMerchandise: courier.acceptsMerchandise,
    acceptsDocuments:   courier.acceptsDocuments,
    airFreight:         courier.airFreight,
    seaFreight:         courier.seaFreight,
    courierSlug:        courier.slug,
  };

  return <ProfileForm initialData={initialData} />;
}
