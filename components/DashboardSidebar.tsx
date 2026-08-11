'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import type { PortalFeatures } from '@/app/lib/adhara-portal';

const iconStyle = { flexShrink: 0 };

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  featureFlag?: keyof PortalFeatures;
};

const navItems: NavItem[] = [
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
  {
    label: 'My Onboarding',
    href: '/dashboard/onboarding',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M9 3h6a1 1 0 0 1 1 1v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1Z" />
        <path d="M9 13l2.2 2.2L15.5 11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'My Courses',
    href: '/dashboard/courses',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M12 6.5C10.5 5.3 8 4.5 4 4.5v13c4 0 6.5.8 8 2 1.5-1.2 4-2 8-2v-13c-4 0-6.5.8-8 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6.5v13" strokeLinecap="round" />
      </svg>
    ),
    featureFlag: 'learning_center',
  },
  {
    label: 'BRI AI',
    href: '/dashboard/ai-coach',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: 'Community',
    href: '/dashboard/community',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15.5 14c2.9.3 5.5 2.6 5.5 6" strokeLinecap="round" />
      </svg>
    ),
    featureFlag: 'community',
  },
  {
    label: 'Resources',
    href: '/dashboard/resources',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M12 3v12" strokeLinecap="round" />
        <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 19h16" strokeLinecap="round" />
      </svg>
    ),
    featureFlag: 'resource_library',
  },
  {
    label: 'Certificates',
    href: '/dashboard/certificates',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <circle cx="12" cy="9" r="6" />
        <path d="M9 14.5 7.5 21l4.5-2.5 4.5 2.5-1.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    featureFlag: 'certificates',
  },
];

const myContentItem = {
  label: 'My Content',
  icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
      <path d="M3 8l9-5 9 5-9 5-9-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 8v9l9 5 9-5V8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13v9" strokeLinecap="round" />
    </svg>
  ),
};

const comingSoonStaticItems = [
  {
    label: 'Trainerize',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
        <path d="M6.5 7v10M4 9v6M17.5 7v10M20 9v6M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
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

export default function DashboardSidebar({ features }: { features: PortalFeatures }) {
  const pathname = usePathname();

  const availableNavItems = navItems.filter((item) => !item.featureFlag || features[item.featureFlag]);
  const disabledNavItems = navItems.filter((item) => item.featureFlag && !features[item.featureFlag]);
  const comingSoonItems = [myContentItem, ...disabledNavItems, ...comingSoonStaticItems];

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
        {availableNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px 11px 12px',
                borderRadius: '4px',
                borderLeft: isActive ? '2px solid #ce965a' : '2px solid transparent',
                fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive ? '#f3e4c4' : '#e8eeba',
                backgroundColor: isActive ? 'rgba(206,150,90,0.1)' : 'transparent',
                transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
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
          href="/dashboard/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '11px 14px 11px 12px',
            borderRadius: '4px',
            borderLeft: pathname === '/dashboard/profile' ? '2px solid #ce965a' : '2px solid transparent',
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: pathname === '/dashboard/profile' ? '#f3e4c4' : '#e8eeba',
            backgroundColor: pathname === '/dashboard/profile' ? 'rgba(206,150,90,0.1)' : 'transparent',
            transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={iconStyle}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
          </svg>
          Profile
        </Link>

        <Link
          href="/dashboard/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '11px 14px 11px 12px',
            borderRadius: '4px',
            borderLeft: pathname === '/dashboard/settings' ? '2px solid #ce965a' : '2px solid transparent',
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            marginBottom: '8px',
            color: pathname === '/dashboard/settings' ? '#f3e4c4' : '#e8eeba',
            backgroundColor: pathname === '/dashboard/settings' ? 'rgba(206,150,90,0.1)' : 'transparent',
            transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
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
