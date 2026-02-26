import { notFound } from 'next/navigation';
import { searchCouriers, getCountry, COURIERS } from '@/lib/data';
import CourierCard from '@/components/CourierCard';
import SearchBar from '@/components/SearchBar';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return ['ve','co','cl','pe','do','mx','ec','bo','es','pa','gt','sv','hn','ar','br','uy','pt','pr'].map(code => ({ code }));
}

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const c = getCountry(params.code);
  if (!c) return {};
  return {
    title: `Couriers a ${c.nameEs} desde USA | Envia Latam`,
    description: `Encuentra couriers confiables para enviar desde Miami, New York, Houston y más ciudades de USA a ${c.nameEs}. Compara tarifas y lee reseñas.`,
  };
}

export default function CountryPage({ params }: { params: { code: string } }) {
  const country = getCountry(params.code);
  if (!country) notFound();

  const results = searchCouriers(undefined, params.code);

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--dark), var(--brand))', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{country.flag}</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'white', marginBottom: '10px' }}>
            Couriers a {country.nameEs}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', fontSize: '0.95rem' }}>
            {results.length} courier{results.length !== 1 ? 's' : ''} envía{results.length !== 1 ? 'n' : ''} a {country.nameEs} desde USA
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container">
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🔍</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>Próximamente</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Estamos agregando couriers a {country.nameEs}. Vuelve pronto.</p>
              <a href="/search" className="btn-primary">Ver todos los couriers</a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {results.map(c => <CourierCard key={c.id} courier={c} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
