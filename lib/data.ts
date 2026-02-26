export type Country = {
  code: string;
  name: string;
  flag: string;
  nameEs: string;
};

export type Route = {
  country: string;
  pricePerLb: number;
  minDays: number;
  maxDays: number;
  notes?: string;
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
  fromCities: string[];
  toCountries: string[];
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
};

export const COUNTRIES: Country[] = [
  { code: 've', name: 'Venezuela',          flag: '🇻🇪', nameEs: 'Venezuela' },
  { code: 'co', name: 'Colombia',           flag: '🇨🇴', nameEs: 'Colombia' },
  { code: 'cl', name: 'Chile',              flag: '🇨🇱', nameEs: 'Chile' },
  { code: 'pe', name: 'Peru',               flag: '🇵🇪', nameEs: 'Perú' },
  { code: 'do', name: 'Dominican Republic', flag: '🇩🇴', nameEs: 'Rep. Dominicana' },
  { code: 'mx', name: 'Mexico',             flag: '🇲🇽', nameEs: 'México' },
  { code: 'ec', name: 'Ecuador',            flag: '🇪🇨', nameEs: 'Ecuador' },
  { code: 'bo', name: 'Bolivia',            flag: '🇧🇴', nameEs: 'Bolivia' },
  { code: 'es', name: 'Spain',              flag: '🇪🇸', nameEs: 'España' },
  { code: 'pa', name: 'Panama',             flag: '🇵🇦', nameEs: 'Panamá' },
  { code: 'gt', name: 'Guatemala',          flag: '🇬🇹', nameEs: 'Guatemala' },
  { code: 'sv', name: 'El Salvador',        flag: '🇸🇻', nameEs: 'El Salvador' },
  { code: 'hn', name: 'Honduras',           flag: '🇭🇳', nameEs: 'Honduras' },
  { code: 'ar', name: 'Argentina',          flag: '🇦🇷', nameEs: 'Argentina' },
  { code: 'br', name: 'Brazil',             flag: '🇧🇷', nameEs: 'Brasil' },
  { code: 'uy', name: 'Uruguay',            flag: '🇺🇾', nameEs: 'Uruguay' },
  { code: 'pt', name: 'Portugal',           flag: '🇵🇹', nameEs: 'Portugal' },
  { code: 'pr', name: 'Puerto Rico',        flag: '🇵🇷', nameEs: 'Puerto Rico' },
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
    fromCities: ['Miami, FL', 'Orlando, FL'],
    toCountries: ['ve', 'co', 'do', 'pa'],
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
    fromCities: ['Miami, FL', 'New York, NY'],
    toCountries: ['ve', 'co', 'ec', 'pe', 'bo'],
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
    fromCities: ['Houston, TX', 'Dallas, TX'],
    toCountries: ['mx', 've', 'co', 'gt', 'sv', 'hn'],
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
    fromCities: ['Miami, FL', 'Orlando, FL', 'Atlanta, GA'],
    toCountries: ['ve', 'do', 'pa', 'pr'],
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
    fromCities: ['New York, NY', 'Boston, MA'],
    toCountries: ['ve', 'co', 'pe', 'es', 'pt', 'do'],
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
    fromCities: ['Miami, FL', 'Los Angeles, CA'],
    toCountries: ['ar', 'cl', 'uy', 'br', 'pe', 'bo'],
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
