import { Instrument_Serif, Domine, IBM_Plex_Sans, Inter } from 'next/font/google';

export const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const domine = Domine({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-domine-serif',
});

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
});

export const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-sans',
});
