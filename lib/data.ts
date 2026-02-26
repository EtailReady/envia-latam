export type Country = {
  code: string;
  name: string;
  flag: string;
  nameEs: string;
  photo: string;
};

export type Route = {
  country: string;
  pricePerLb: number;
  minDays: number;
  maxDays: number;
  notes?: string;
};

export type Office = {
  city: string;
  state?: string;      // 'FL', 'TX', 'NY' — US offices only
  countryCode: string; // 'us', 've', 'co', etc.
};

export type Courier = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  tier: 'free' | 'paid';
  fromCities: string[];
  toCountries: string[];
  offices?: Office[];
  routes: Route[];
  services: string[];
  address: string;
  phone: string;
  email: string;
  website: string;
  instagram?: string;
  whatsapp?: string;
  boxSizes: string[];
  acceptsVehicles: boolean;
  acceptsMerchandise: boolean;
  acceptsDocuments: boolean;
  airFreight: boolean;
  seaFreight: boolean;
};

export const COUNTRIES: Country[] = [
  { code: 've', name: 'Venezuela',          flag: '🇻🇪', nameEs: 'Venezuela',       photo: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80' },
  { code: 'co', name: 'Colombia',           flag: '🇨🇴', nameEs: 'Colombia',         photo: 'https://images.unsplash.com/photo-1599413987323-b2b8c0d7d9c8?w=600&q=80' },
  { code: 'cl', name: 'Chile',              flag: '🇨🇱', nameEs: 'Chile',            photo: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80' },
  { code: 'pe', name: 'Peru',               flag: '🇵🇪', nameEs: 'Perú',             photo: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80' },
  { code: 'do', name: 'Dominican Republic', flag: '🇩🇴', nameEs: 'Rep. Dominicana',  photo: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80' },
  { code: 'mx', name: 'Mexico',             flag: '🇲🇽', nameEs: 'México',           photo: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&q=80' },
  { code: 'ec', name: 'Ecuador',            flag: '🇪🇨', nameEs: 'Ecuador',          photo: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600&q=80' },
  { code: 'bo', name: 'Bolivia',            flag: '🇧🇴', nameEs: 'Bolivia',          photo: 'https://images.unsplash.com/photo-1536516918657-f13a1a8cfb2c?w=600&q=80' },
  { code: 'es', name: 'Spain',              flag: '🇪🇸', nameEs: 'España',           photo: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80' },
  { code: 'pa', name: 'Panama',             flag: '🇵🇦', nameEs: 'Panamá',           photo: 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=600&q=80' },
  { code: 'gt', name: 'Guatemala',          flag: '🇬🇹', nameEs: 'Guatemala',        photo: 'https://images.unsplash.com/photo-1553254448-bdfdb2e82e09?w=600&q=80' },
  { code: 'sv', name: 'El Salvador',        flag: '🇸🇻', nameEs: 'El Salvador',      photo: 'https://images.unsplash.com/photo-1601312040672-14e7b9b5ff0e?w=600&q=80' },
  { code: 'hn', name: 'Honduras',           flag: '🇭🇳', nameEs: 'Honduras',         photo: 'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=600&q=80' },
  { code: 'ar', name: 'Argentina',          flag: '🇦🇷', nameEs: 'Argentina',        photo: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80' },
  { code: 'br', name: 'Brazil',             flag: '🇧🇷', nameEs: 'Brasil',           photo: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80' },
  { code: 'uy', name: 'Uruguay',            flag: '🇺🇾', nameEs: 'Uruguay',          photo: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=600&q=80' },
  { code: 'pt', name: 'Portugal',           flag: '🇵🇹', nameEs: 'Portugal',         photo: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80' },
  { code: 'pr', name: 'Puerto Rico',        flag: '🇵🇷', nameEs: 'Puerto Rico',      photo: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80' },
];

export const FROM_CITIES = [
  'Miami, FL',
  'New York, NY',
  'Houston, TX',
  'Los Angeles, CA',
  'Orlando, FL',
  'Dallas, TX',
  'Chicago, IL',
  'Boston, MA',
  'Atlanta, GA',
  'Charlotte, NC',
];

export const COURIERS: Courier[] = [
  {
    id: '1',
    slug: 'cargo-express-miami',
    name: 'Cargo Express Miami',
    tagline: 'Tu carga en manos confiables desde Miami',
    description: 'Más de 15 años llevando paquetes, vehículos y mercancía a toda Venezuela, Colombia y el Caribe. Servicio puerta a puerta. Almacén en Miami con dirección para recibir tus compras de Amazon, Walmart y más.',
    logo: '/logos/placeholder-logo.svg',
    banner: '/banners/placeholder-banner.jpg',
    rating: 4.8,
    reviewCount: 312,
    verified: true,
    featured: true,
    tier: 'paid',
    fromCities: ['Miami, FL', 'Orlando, FL'],
    toCountries: ['ve', 'co', 'do', 'pa'],
    offices: [
      { city: 'Miami',   state: 'FL', countryCode: 'us' },
      { city: 'Orlando', state: 'FL', countryCode: 'us' },
      { city: 'Caracas',      countryCode: 've' },
      { city: 'Barranquilla', countryCode: 'co' },
    ],
    routes: [
      { country: 've', pricePerLb: 3.50, minDays: 7,  maxDays: 14, notes: 'Servicio aéreo' },
      { country: 'co', pricePerLb: 2.80, minDays: 5,  maxDays: 10 },
      { country: 'do', pricePerLb: 2.20, minDays: 4,  maxDays: 8 },
      { country: 'pa', pricePerLb: 2.50, minDays: 5,  maxDays: 9 },
    ],
    services: ['Puerta a puerta', 'Recibe de Amazon', 'Recibe de Walmart', 'Vehículos', 'Mercancía', 'Documentos', 'Alimentos no perecederos'],
    address: '8350 NW 52nd Terrace, Miami, FL 33166',
    phone: '+1 (305) 555-0101',
    email: 'info@cargoexpressmiami.com',
    website: 'https://cargoexpressmiami.com',
    instagram: '@cargoexpressmiami',
    whatsapp: '+13055550101',
    boxSizes: ['Small', 'Medium', 'Large', 'X-Large'],
    acceptsVehicles: true,
    acceptsMerchandise: true,
    acceptsDocuments: true,
    airFreight: true,
    seaFreight: false,
  },
  {
    id: '2',
    slug: 'envios-directos-usa',
    name: 'Envíos Directos USA',
    tagline: 'Desde New York y Miami a toda Latinoamérica',
    description: 'Especialistas en envíos a Venezuela, Colombia, Ecuador y Perú. Contamos con almacenes en New York y Miami para recibir tus compras. Tarifas competitivas y seguimiento en tiempo real.',
    logo: '/logos/placeholder-logo.svg',
    banner: '/banners/placeholder-banner.jpg',
    rating: 4.6,
    reviewCount: 189,
    verified: true,
    featured: true,
    tier: 'paid',
    fromCities: ['Miami, FL', 'New York, NY'],
    toCountries: ['ve', 'co', 'ec', 'pe', 'bo'],
    offices: [
      { city: 'Miami',    state: 'FL', countryCode: 'us' },
      { city: 'New York', state: 'NY', countryCode: 'us' },
      { city: 'Caracas',  countryCode: 've' },
      { city: 'Guayaquil',countryCode: 'ec' },
    ],
    routes: [
      { country: 've', pricePerLb: 3.75, minDays: 8,  maxDays: 15 },
      { country: 'co', pricePerLb: 3.00, minDays: 6,  maxDays: 12 },
      { country: 'ec', pricePerLb: 3.20, minDays: 7,  maxDays: 14 },
      { country: 'pe', pricePerLb: 3.40, minDays: 8,  maxDays: 16 },
      { country: 'bo', pricePerLb: 4.00, minDays: 10, maxDays: 18 },
    ],
    services: ['Puerta a puerta', 'Recibe de Amazon', 'Recibe de Target', 'Mercancía', 'Documentos', 'Comida no perecedera'],
    address: '1450 SW 8th St, Miami, FL 33135',
    phone: '+1 (786) 555-0202',
    email: 'contacto@enviosdirectos.com',
    website: 'https://enviosdirectos.com',
    whatsapp: '+17865550202',
    boxSizes: ['Small', 'Medium', 'Large', 'X-Large'],
    acceptsVehicles: false,
    acceptsMerchandise: true,
    acceptsDocuments: true,
    airFreight: true,
    seaFreight: false,
  },
  {
    id: '3',
    slug: 'latam-cargo-houston',
    name: 'Latam Cargo Houston',
    tagline: 'El puente entre Houston y Latinoamérica',
    description: 'Desde Houston enviamos a México, Colombia, Venezuela y Centroamérica. Especialistas en mercancía y vehículos. Más de 20 años de experiencia. Tu dirección en Houston para recibir compras online.',
    logo: '/logos/placeholder-logo.svg',
    banner: '/banners/placeholder-banner.jpg',
    rating: 4.5,
    reviewCount: 247,
    verified: true,
    featured: false,
    tier: 'free',
    fromCities: ['Houston, TX', 'Dallas, TX'],
    toCountries: ['mx', 've', 'co', 'gt', 'sv', 'hn'],
    offices: [
      { city: 'Houston', state: 'TX', countryCode: 'us' },
      { city: 'Dallas',  state: 'TX', countryCode: 'us' },
      { city: 'Miami',   state: 'FL', countryCode: 'us' },
      { city: 'Maracaibo',    countryCode: 've' },
      { city: 'Ciudad de México', countryCode: 'mx' },
    ],
    routes: [
      { country: 'mx', pricePerLb: 1.80, minDays: 3,  maxDays: 7 },
      { country: 've', pricePerLb: 3.90, minDays: 9,  maxDays: 16 },
      { country: 'co', pricePerLb: 3.10, minDays: 7,  maxDays: 12 },
      { country: 'gt', pricePerLb: 2.40, minDays: 5,  maxDays: 10 },
      { country: 'sv', pricePerLb: 2.50, minDays: 5,  maxDays: 10 },
    ],
    services: ['Puerta a puerta', 'Recibe de Amazon', 'Recibe de Walmart', 'Vehículos', 'Maquinaria', 'Mercancía', 'Documentos'],
    address: '5900 Westheimer Rd, Houston, TX 77057',
    phone: '+1 (713) 555-0303',
    email: 'info@latamcargohouston.com',
    website: 'https://latamcargohouston.com',
    instagram: '@latamcargohouston',
    whatsapp: '+17135550303',
    boxSizes: ['Small', 'Medium', 'Large', 'X-Large'],
    acceptsVehicles: true,
    acceptsMerchandise: true,
    acceptsDocuments: true,
    airFreight: true,
    seaFreight: true,
  },
  {
    id: '4',
    slug: 'expreso-caribe',
    name: 'Expreso Caribe',
    tagline: 'Especialistas en el Caribe y Venezuela',
    description: 'Enfocados 100% en Venezuela, República Dominicana y el Caribe. Servicio personalizado, atención en español. Recibimos de cualquier tienda online y lo enviamos directamente a tu familia.',
    logo: '/logos/placeholder-logo.svg',
    banner: '/banners/placeholder-banner.jpg',
    rating: 4.9,
    reviewCount: 421,
    verified: true,
    featured: true,
    tier: 'paid',
    fromCities: ['Miami, FL', 'Orlando, FL', 'Atlanta, GA'],
    toCountries: ['ve', 'do', 'pa', 'pr'],
    offices: [
      { city: 'Miami',   state: 'FL', countryCode: 'us' },
      { city: 'Orlando', state: 'FL', countryCode: 'us' },
      { city: 'Atlanta', state: 'GA', countryCode: 'us' },
      { city: 'Houston', state: 'TX', countryCode: 'us' },
      { city: 'Maracaibo',    countryCode: 've' },
      { city: 'Santo Domingo',countryCode: 'do' },
    ],
    routes: [
      { country: 've', pricePerLb: 3.25, minDays: 6,  maxDays: 12, notes: 'Mejor precio garantizado' },
      { country: 'do', pricePerLb: 2.00, minDays: 3,  maxDays: 6 },
      { country: 'pa', pricePerLb: 2.30, minDays: 4,  maxDays: 8 },
    ],
    services: ['Puerta a puerta', 'Recibe de Amazon', 'Recibe de Walmart', 'Recibe de Shein', 'Documentos', 'Alimentos', 'Medicamentos'],
    address: '3401 N Miami Ave, Miami, FL 33127',
    phone: '+1 (305) 555-0404',
    email: 'hola@expresocaribe.com',
    website: 'https://expresocaribe.com',
    instagram: '@expresocaribe',
    whatsapp: '+13055550404',
    boxSizes: ['Small', 'Medium', 'Large'],
    acceptsVehicles: false,
    acceptsMerchandise: true,
    acceptsDocuments: true,
    airFreight: true,
    seaFreight: false,
  },
  {
    id: '5',
    slug: 'global-pack-ny',
    name: 'Global Pack NY',
    tagline: 'New York a toda Latinoamérica y España',
    description: 'Desde el corazón de New York enviamos a más de 15 países. Especializados en envíos a España, Venezuela, Colombia y Perú. Almacén en Queens con dirección para recibir tus compras.',
    logo: '/logos/placeholder-logo.svg',
    banner: '/banners/placeholder-banner.jpg',
    rating: 4.4,
    reviewCount: 156,
    verified: true,
    featured: false,
    tier: 'free',
    fromCities: ['New York, NY', 'Boston, MA'],
    toCountries: ['ve', 'co', 'pe', 'es', 'pt', 'do'],
    offices: [
      { city: 'New York', state: 'NY', countryCode: 'us' },
      { city: 'Boston',   state: 'MA', countryCode: 'us' },
      { city: 'Caracas',  countryCode: 've' },
      { city: 'Madrid',   countryCode: 'es' },
    ],
    routes: [
      { country: 've', pricePerLb: 4.00, minDays: 9,  maxDays: 17 },
      { country: 'co', pricePerLb: 3.50, minDays: 7,  maxDays: 14 },
      { country: 'es', pricePerLb: 5.00, minDays: 7,  maxDays: 12, notes: 'Envío aéreo express' },
      { country: 'pt', pricePerLb: 5.20, minDays: 8,  maxDays: 14 },
    ],
    services: ['Puerta a puerta', 'Recibe de Amazon', 'Recibe de eBay', 'Mercancía', 'Documentos'],
    address: '89-31 161st St, Jamaica, NY 11432',
    phone: '+1 (718) 555-0505',
    email: 'info@globalpackny.com',
    website: 'https://globalpackny.com',
    whatsapp: '+17185550505',
    boxSizes: ['Small', 'Medium', 'Large', 'X-Large'],
    acceptsVehicles: false,
    acceptsMerchandise: true,
    acceptsDocuments: true,
    airFreight: true,
    seaFreight: false,
  },
  {
    id: '6',
    slug: 'carga-sur-america',
    name: 'Carga Sur América',
    tagline: 'El especialista en el Cono Sur',
    description: 'Los únicos especializados en Argentina, Chile, Uruguay y Brasil desde Miami y Los Angeles. Tarifas especiales para envíos frecuentes. Seguimiento en tiempo real incluido.',
    logo: '/logos/placeholder-logo.svg',
    banner: '/banners/placeholder-banner.jpg',
    rating: 4.3,
    reviewCount: 98,
    verified: false,
    featured: false,
    tier: 'free',
    fromCities: ['Miami, FL', 'Los Angeles, CA'],
    toCountries: ['ar', 'cl', 'uy', 'br', 'pe', 'bo'],
    offices: [
      { city: 'Miami',       state: 'FL', countryCode: 'us' },
      { city: 'Los Angeles', state: 'CA', countryCode: 'us' },
      { city: 'Buenos Aires',countryCode: 'ar' },
      { city: 'Santiago',    countryCode: 'cl' },
    ],
    routes: [
      { country: 'ar', pricePerLb: 4.50, minDays: 10, maxDays: 18 },
      { country: 'cl', pricePerLb: 4.20, minDays: 9,  maxDays: 16 },
      { country: 'uy', pricePerLb: 4.80, minDays: 11, maxDays: 20 },
      { country: 'br', pricePerLb: 3.80, minDays: 8,  maxDays: 15 },
    ],
    services: ['Puerta a puerta', 'Recibe de Amazon', 'Mercancía', 'Documentos', 'Muestras comerciales'],
    address: '801 Brickell Ave, Miami, FL 33131',
    phone: '+1 (305) 555-0606',
    email: 'ventas@cargasuramerica.com',
    website: 'https://cargasuramerica.com',
    whatsapp: '+13055550606',
    boxSizes: ['Small', 'Medium', 'Large', 'X-Large'],
    acceptsVehicles: false,
    acceptsMerchandise: true,
    acceptsDocuments: true,
    airFreight: true,
    seaFreight: true,
  },
];

// ─── Jornadas ────────────────────────────────────────────────────────────────
export type Jornada = {
  id: string;
  courierSlug: string;
  courierName: string;
  city: string;
  state: string;
  address: string;
  date: string;       // YYYY-MM-DD
  timeStart: string;  // '9:00 AM'
  timeEnd: string;    // '3:00 PM'
  spotsLeft?: number;
  notes?: string;
};

export const JORNADAS: Jornada[] = [
  {
    id: 'j1',
    courierSlug: 'cargo-express-miami',
    courierName: 'Cargo Express Miami',
    city: 'Miami', state: 'FL',
    address: '8350 NW 52nd Terrace, Miami, FL 33166',
    date: '2026-03-01',
    timeStart: '9:00 AM', timeEnd: '4:00 PM',
    spotsLeft: 12,
    notes: 'Jornada mensual. Se aceptan cajas hasta 100 lbs.',
  },
  {
    id: 'j2',
    courierSlug: 'expreso-caribe',
    courierName: 'Expreso Caribe',
    city: 'Orlando', state: 'FL',
    address: '5401 S Kirkman Rd, Orlando, FL 32819',
    date: '2026-03-01',
    timeStart: '10:00 AM', timeEnd: '5:00 PM',
    spotsLeft: 8,
    notes: 'Jornada especial para Venezuela y Rep. Dominicana.',
  },
  {
    id: 'j3',
    courierSlug: 'latam-cargo-houston',
    courierName: 'Latam Cargo Houston',
    city: 'Houston', state: 'TX',
    address: '5900 Westheimer Rd, Houston, TX 77057',
    date: '2026-03-07',
    timeStart: '8:00 AM', timeEnd: '3:00 PM',
    spotsLeft: 20,
    notes: 'Envíos a México y Venezuela. Acepta vehículos y maquinaria.',
  },
  {
    id: 'j4',
    courierSlug: 'envios-directos-usa',
    courierName: 'Envíos Directos USA',
    city: 'New York', state: 'NY',
    address: '1450 SW 8th St, New York, NY 10001',
    date: '2026-03-07',
    timeStart: '9:00 AM', timeEnd: '2:00 PM',
    spotsLeft: 5,
    notes: 'Cupos limitados. Venezuela, Colombia y Ecuador.',
  },
  {
    id: 'j5',
    courierSlug: 'cargo-express-miami',
    courierName: 'Cargo Express Miami',
    city: 'Orlando', state: 'FL',
    address: '4200 Millenia Blvd, Orlando, FL 32839',
    date: '2026-03-08',
    timeStart: '10:00 AM', timeEnd: '4:00 PM',
    spotsLeft: 15,
  },
  {
    id: 'j6',
    courierSlug: 'global-pack-ny',
    courierName: 'Global Pack NY',
    city: 'Boston', state: 'MA',
    address: '89-31 161st St, Boston, MA 02101',
    date: '2026-03-14',
    timeStart: '9:00 AM', timeEnd: '3:00 PM',
    spotsLeft: 10,
    notes: 'España, Venezuela y Colombia.',
  },
  {
    id: 'j7',
    courierSlug: 'expreso-caribe',
    courierName: 'Expreso Caribe',
    city: 'Atlanta', state: 'GA',
    address: '3401 N Miami Ave, Atlanta, GA 30301',
    date: '2026-03-14',
    timeStart: '8:30 AM', timeEnd: '2:30 PM',
    spotsLeft: 18,
    notes: 'Solo Venezuela y Rep. Dominicana.',
  },
  {
    id: 'j8',
    courierSlug: 'carga-sur-america',
    courierName: 'Carga Sur América',
    city: 'Miami', state: 'FL',
    address: '801 Brickell Ave, Miami, FL 33131',
    date: '2026-03-15',
    timeStart: '10:00 AM', timeEnd: '5:00 PM',
    spotsLeft: 22,
    notes: 'Especialidad: Argentina, Chile, Uruguay y Brasil.',
  },
  {
    id: 'j9',
    courierSlug: 'latam-cargo-houston',
    courierName: 'Latam Cargo Houston',
    city: 'Dallas', state: 'TX',
    address: '2000 N Lamar St, Dallas, TX 75202',
    date: '2026-03-21',
    timeStart: '9:00 AM', timeEnd: '4:00 PM',
    spotsLeft: 14,
  },
  {
    id: 'j10',
    courierSlug: 'cargo-express-miami',
    courierName: 'Cargo Express Miami',
    city: 'Miami', state: 'FL',
    address: '8350 NW 52nd Terrace, Miami, FL 33166',
    date: '2026-03-29',
    timeStart: '9:00 AM', timeEnd: '4:00 PM',
    spotsLeft: 20,
    notes: 'Jornada fin de mes. Gran capacidad disponible.',
  },
  {
    id: 'j11',
    courierSlug: 'envios-directos-usa',
    courierName: 'Envíos Directos USA',
    city: 'Miami', state: 'FL',
    address: '1450 SW 8th St, Miami, FL 33135',
    date: '2026-04-04',
    timeStart: '8:00 AM', timeEnd: '3:00 PM',
    spotsLeft: 16,
    notes: 'Primera jornada de abril. Venezuela, Ecuador y Perú.',
  },
  {
    id: 'j12',
    courierSlug: 'expreso-caribe',
    courierName: 'Expreso Caribe',
    city: 'Houston', state: 'TX',
    address: '5900 Westheimer Rd, Houston, TX 77057',
    date: '2026-04-05',
    timeStart: '10:00 AM', timeEnd: '5:00 PM',
    spotsLeft: 9,
  },
];

export const BOX_SIZES = [
  { size: 'Small',   dimensions: '12" × 9" × 4"',  maxWeight: '10 lbs',  example: 'Ropa, libros, accesorios' },
  { size: 'Medium',  dimensions: '16" × 12" × 8"', maxWeight: '25 lbs',  example: 'Zapatos, electrodomésticos pequeños' },
  { size: 'Large',   dimensions: '20" × 16" × 12"',maxWeight: '50 lbs',  example: 'Aparatos electrónicos, ropa en cantidad' },
  { size: 'X-Large', dimensions: '24" × 20" × 20"',maxWeight: '100 lbs', example: 'Muebles pequeños, repuestos, mercancía' },
];

export const AFFILIATES = [
  { name: 'Amazon',  url: 'https://amazon.com', color: '#FF9900', desc: 'Millones de productos. Envía a tu courier favorito.' },
  { name: 'Walmart', url: 'https://walmart.com', color: '#0071CE', desc: 'Precios bajos todos los días.' },
  { name: 'Target',  url: 'https://target.com',  color: '#CC0000', desc: 'Moda, hogar, electrónicos y más.' },
  { name: 'eBay',    url: 'https://ebay.com',    color: '#E53238', desc: 'Nuevos y usados. Las mejores ofertas.' },
  { name: 'Shein',   url: 'https://shein.com',   color: '#000000', desc: 'Moda a precios increíbles.' },
  { name: 'Temu',    url: 'https://temu.com',    color: '#FB5C00', desc: 'Todo lo que necesitas a bajo costo.' },
];

// Helper: get courier by slug
export function getCourierBySlug(slug: string): Courier | undefined {
  return COURIERS.find(c => c.slug === slug);
}

// Helper: search couriers by from city and to country
export function searchCouriers(fromCity?: string, toCountry?: string): Courier[] {
  return COURIERS.filter(c => {
    const fromOk = !fromCity || c.fromCities.some(f =>
      f.toLowerCase().includes(fromCity.toLowerCase())
    );
    const toOk = !toCountry || c.toCountries.includes(toCountry.toLowerCase());
    return fromOk && toOk;
  });
}

// Helper: get country by code
export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code.toLowerCase());
}

// Helper: get featured couriers
export function getFeaturedCouriers(): Courier[] {
  return COURIERS.filter(c => c.featured);
}

// Helper: flag + short name for office country codes (includes US)
const OFFICE_META: Record<string, { flag: string; name: string }> = {
  us: { flag: '🇺🇸', name: 'EE.UU.' },
  ...Object.fromEntries(COUNTRIES.map(c => [c.code, { flag: c.flag, name: c.nameEs }])),
};
export function getOfficeCountry(code: string) {
  return OFFICE_META[code.toLowerCase()] ?? { flag: '🌐', name: code.toUpperCase() };
}

