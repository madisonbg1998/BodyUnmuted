'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const iconStyle = { flexShrink: 0 };

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
  },
];

const comingSoonItems = [
  {
    label: 'Trainerize',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M6.5 7v10M4 9v6M17.5 7v10M20 9v6M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Course',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M12 6.5C10.5 5.3 8 4.5 4 4.5v13c4 0 6.5.8 8 2 1.5-1.2 4-2 8-2v-13c-4 0-6.5.8-8 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6.5v13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Community',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15.5 14c2.9.3 5.5 2.6 5.5 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'AI Coach',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: 'Travel Plans',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M3 13.5 21 6l-7.5 18-2.5-7-7-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        backgroundColor: '#2d1506',
        width: '260px',
        flexShrink: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 20px',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontSize: '26px',
          color: '#fbf4e9',
          textTransform: 'uppercase',
          textDecoration: 'none',
          lineHeight: '1',
          marginBottom: '48px',
          display: 'block',
        }}
      >
        Body Unmuted
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '6px',
                fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive ? '#2d1506' : '#e8eeba',
                backgroundColor: isActive ? '#e8eeba' : 'transparent',
                transition: 'background-color 0.2s, color 0.2s',
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}

        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(251,244,233,0.4)',
            margin: '28px 14px 8px',
          }}
        >
          Coming Soon
        </p>

        {comingSoonItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 14px',
              borderRadius: '6px',
              fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(251,244,233,0.45)',
              cursor: 'default',
            }}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Link
          href="/dashboard/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '11px 14px',
            borderRadius: '6px',
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            marginBottom: '8px',
            color: pathname === '/dashboard/settings' ? '#2d1506' : '#e8eeba',
            backgroundColor: pathname === '/dashboard/settings' ? '#e8eeba' : 'transparent',
            transition: 'background-color 0.2s, color 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Settings
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
