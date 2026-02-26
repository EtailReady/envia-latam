import { searchCouriers, getCountry, COUNTRIES, FROM_CITIES } from '@/lib/data';
import CourierCard from '@/components/CourierCard';
import SearchBar from '@/components/SearchBar';

export default function SearchPage({ searchParams }: { searchParams: { from?: string; to?: string } }) {
  const from = searchParams.from ?? '';
  const to   = searchParams.to ?? '';
  const results = searchCouriers(from || undefined, to || undefined);
  const country = to ? getCountry(to) : null;

  return (
    <>
      {/* Header */}
      <div style={{ background: 'var(--dark)', padding: '40px 0 32px' }}>
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            {(from || to) ? (
              <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
                {from && <span>{from} </span>}
                {from && to && <span style={{ color: 'rgba(255,255,255,0.5)' }}>→ </span>}
                {country && <span>{country.flag} {country.nameEs}</span>}
                {!from && !to && 'Todos los couriers'}
              </h1>
            ) : (
              <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Todos los Couriers</h1>
            )}
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
              {results.length} empresa{results.length !== 1 ? 's' : ''} encontrada{results.length !== 1 ? 's' : ''}
            </p>
          </div>
          <SearchBar />
        </div>
      </div>

      {/* Results */}
      <div className="section">
        <div className="container">
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>No encontramos couriers</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Intenta con otra ciudad o destino, o busca todos los couriers disponibles.</p>
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
