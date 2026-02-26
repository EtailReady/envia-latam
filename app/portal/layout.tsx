'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import {
  LayoutDashboard, DollarSign, CalendarDays,
  User, ExternalLink, ChevronRight, Building2,
} from 'lucide-react';

const NAV = [
  { href: '/portal/dashboard', label: 'Dashboard',    Icon: LayoutDashboard },
  { href: '/portal/rates',     label: 'Mis Tarifas',  Icon: DollarSign      },
  { href: '/portal/jornadas',  label: 'Mis Jornadas', Icon: CalendarDays    },
  { href: '/portal/profile',   label: 'Mi Perfil',    Icon: User            },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/sign-in') || pathname.includes('/sign-up');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        background: 'var(--dark)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ background: 'var(--brand)', color: 'white', fontWeight: 800, fontSize: '0.85rem', padding: '4px 8px', borderRadius: '6px', letterSpacing: '-0.02em' }}>
              ENVIA
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'white', letterSpacing: '-0.02em' }}>LATAM</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>Portal de empresas</div>
        </div>

        {/* Nav items */}
        <nav style={{ padding: '12px 12px', flex: 1 }}>
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '9px',
                  textDecoration: 'none',
                  marginBottom: '2px',
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: active ? 'white' : 'rgba(255,255,255,0.55)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.88rem',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={16} strokeWidth={active ? 2.5 : 1.75} />
                {label}
                {active && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              marginBottom: '16px',
            }}
          >
            <ExternalLink size={13} /> Ver sitio público
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserButton afterSignOutUrl="/portal/sign-in" />
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Mi cuenta</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}
