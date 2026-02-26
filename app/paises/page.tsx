import Link from 'next/link';
import { COUNTRIES, Country } from '@/lib/data';

const REGIONS = [
  {
    key: 'latam' as const,
    label: 'América Latina',
    emoji: '🌎',
    description: 'Envíos a toda Latinoamérica y el Caribe',
  },
  {
    key: 'europa' as const,
    label: 'Europa',
    emoji: '🌍',
    description: 'Enviamos a los principales destinos europeos',
  },
  {
    key: 'asia' as const,
    label: 'Asia y Medio Oriente',
    emoji: '🌏',
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
      {/* Background photo */}
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

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
          transition: 'background 0.3s',
        }}
        className="country-overlay"
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
        }}
      >
        <div style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{c.flag}</div>
        <div
          style={{
            color: 'white',
            fontWeight: 800,
            fontSize: '0.95rem',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
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
              gap: '8px',
              background: 'rgba(255,255,255,0.12)',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '18px',
            }}
          >
            <span style={{ fontSize: '1rem' }}>🌎🌍🌏</span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
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
            Cubrimos América Latina, Europa y Asia. Selecciona un país para
            ver los couriers disponibles.
          </p>
        </div>
      </section>

      {/* Regions */}
      <section className="section">
        <div className="container">
          {REGIONS.map((region) => {
            const countries = byRegion(region.key);
            if (countries.length === 0) return null;
            return (
              <div key={region.key} style={{ marginBottom: '60px' }}>
                {/* Region header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '16px',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '2px solid var(--border)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--brand)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        marginBottom: '4px',
                      }}
                    >
                      Región
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                        fontWeight: 900,
                        color: 'var(--dark)',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span>{region.emoji}</span> {region.label}
                    </h2>
                    <p
                      style={{
                        color: 'var(--muted)',
                        fontSize: '0.85rem',
                        margin: '4px 0 0',
                      }}
                    >
                      {region.description}
                    </p>
                  </div>
                  <span
                    style={{
                      marginLeft: 'auto',
                      flexShrink: 0,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--muted)',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    {countries.length} países
                  </span>
                </div>

                {/* Cards grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '14px',
                  }}
                >
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
