import Link from 'next/link';
import { Globe, Landmark, Mountain } from 'lucide-react';
import { COUNTRIES, Country } from '@/lib/data';

const REGIONS = [
  {
    key: 'latam' as const,
    label: 'América Latina',
    Icon: Globe,
    iconColor: '#1B4FD8',
    iconBg: '#EFF6FF',
    description: 'Envíos a toda Latinoamérica y el Caribe',
  },
  {
    key: 'europa' as const,
    label: 'Europa',
    Icon: Landmark,
    iconColor: '#7C3AED',
    iconBg: '#F5F3FF',
    description: 'Enviamos a los principales destinos europeos',
  },
  {
    key: 'asia' as const,
    label: 'Asia y Medio Oriente',
    Icon: Mountain,
    iconColor: '#B45309',
    iconBg: '#FFFBEB',
    description: 'Cobertura en los principales mercados asiáticos',
  },
];

function CountryCard({ c }: { c: Country }) {
  return (
    <Link
      href={`/paises/${c.code}`}
      style={{
        display: 'block',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        position: 'relative',
        aspectRatio: '4/3',
        background: '#1a1a2e',
      }}
    >
      <img
        src={c.photo}
        alt={c.nameEs}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.4s ease',
        }}
        className="country-img"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
          transition: 'background 0.3s',
        }}
        className="country-overlay"
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
        <span
          className={`fi fi-${c.code}`}
          style={{ width: '20px', height: '14px', borderRadius: '3px', display: 'block', marginBottom: '6px' }}
        />
        <div style={{ color: 'white', fontWeight: 800, fontSize: '0.92rem', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {c.nameEs}
        </div>
      </div>
    </Link>
  );
}

export default function PaisesPage() {
  const byRegion = (key: Country['region']) => COUNTRIES.filter((c) => c.region === key);
  const total = COUNTRIES.length;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--dark) 0%, var(--brand) 100%)',
          padding: 'clamp(48px, 7vw, 80px) 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255,255,255,0.12)',
              padding: '8px 18px',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <Globe size={15} color="rgba(255,255,255,0.85)" strokeWidth={2} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {total} países disponibles
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: 'white',
              margin: '0 0 14px',
              lineHeight: 1.15,
            }}
          >
            Destinos disponibles
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Cubrimos América Latina, Europa y Asia. Selecciona un país para ver los couriers disponibles.
          </p>
        </div>
      </section>

      {/* Regions */}
      <section className="section">
        <div className="container">
          {REGIONS.map((region) => {
            const countries = byRegion(region.key);
            if (countries.length === 0) return null;
            const { Icon } = region;
            return (
              <div key={region.key} style={{ marginBottom: '60px' }}>
                {/* Region header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '2px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: region.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={region.iconColor} strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>
                      Continente
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 900, color: 'var(--dark)', margin: 0 }}>
                      {region.label}
                    </h2>
                  </div>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: region.iconColor,
                      background: region.iconBg,
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {countries.length} países
                  </span>
                </div>

                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
                  {countries.map((c) => (
                    <CountryCard key={c.code} c={c} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        .country-img { transition: transform 0.4s ease; }
        a:hover .country-img { transform: scale(1.06); }
        a:hover .country-overlay { background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(27,79,216,0.3) 100%) !important; }
      `}</style>
    </>
  );
}
