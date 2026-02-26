import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D1B2A 0%, #1B4FD8 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ background: 'white', color: '#1B4FD8', fontWeight: 800, fontSize: '1rem', padding: '5px 10px', borderRadius: '8px', letterSpacing: '-0.02em' }}>
            ENVIA
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'white', letterSpacing: '-0.02em' }}>LATAM</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Portal de empresas</div>
      </div>
      <SignIn />
    </div>
  );
}
