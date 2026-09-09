'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

/**
 * The homepage renders Footer itself as the slide-over surface of its final
 * sticky chapter, so the layout-level footer is suppressed there to avoid
 * a duplicate.
 */
export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Footer />;
}
