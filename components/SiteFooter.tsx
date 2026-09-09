'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const ROUTES_WITH_OWN_FOOTER = ['/', '/about'];

/**
 * The homepage and about page render Footer themselves as the slide-over
 * surface of their final sticky chapter, so the layout-level footer is
 * suppressed there to avoid a duplicate.
 */
export default function SiteFooter() {
  const pathname = usePathname();
  if (ROUTES_WITH_OWN_FOOTER.includes(pathname ?? '')) return null;
  return <Footer />;
}
