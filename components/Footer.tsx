import Link from 'next/link';

const linkStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Sans', sans-serif",
  color: '#fbf4e9',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontSize: '16px',
  lineHeight: '1.8',
  textDecoration: 'none',
};

const smallStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Sans', sans-serif",
  color: '#fbf4e9',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontSize: '12px',
  lineHeight: '1.8',
  textDecoration: 'none',
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#525421' }} className="py-8 md:py-0 md:h-[230px] flex items-center">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
        {/* Nav links row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-4 md:mb-3">
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/about" style={linkStyle}>about</Link>
          <Link href="/method" style={linkStyle}>Method</Link>
          <Link href="/work-with-me" style={linkStyle}>work with me</Link>
          <Link href="/blog" style={linkStyle}>blog</Link>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mb-4 md:mb-3">
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="33" height="33" viewBox="0 0 512 512" fill="#e8eeba">
              <circle cx="255.25" cy="256.21" r="70.68" />
              <path d="M338,54.63H174c-62.72,0-114,51.31-114,114V343.33c0,62.73,51.32,114,114,114H338c62.72,0,114-51.31,114-114V168.67C452,105.94,400.68,54.63,338,54.63ZM255.77,364.07A107.95,107.95,0,1,1,363.71,256.13,107.95,107.95,0,0,1,255.77,364.07Zm109.67-192A25.56,25.56,0,1,1,391,146.5,25.56,25.56,0,0,1,365.44,172.06Z" />
            </svg>
          </a>
          {/* TikTok */}
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
            <svg width="33" height="33" viewBox="0 0 512 512" fill="#e8eeba">
              <path d="M256,41C137.26,41,41,137.26,41,256s96.26,215,215,215,215-96.26,215-215S374.74,41,256,41Zm96.75,182.15a114.35,114.35,0,0,1-34.11-17.79V318.11c-.26,4.31-4,51.95-47.07,78.19-42.62,26-86.24,8.14-90.35,6.38a52.41,52.41,0,0,1-11.1-5.16c-1.43-.89-2.8-1.84-4.11-2.83a112.93,112.93,0,0,1-16-12.77,93.27,93.27,0,0,1-28.33-66A99.63,99.63,0,0,1,128,278.53c2.88-7.69,13.59-35,43.44-51.69,27.72-15.46,54.52-12,62.68-10.62-.07,4.28-.66,40-.87,53.55-2.76-.74-19.65-5-36.15,5.39-15.78,9.93-19.59,25.92-20.23,28.86-.81,3.7-2.46,9.9-1,17.76a40.61,40.61,0,0,0,10,19.55,48.54,48.54,0,0,0,7.15,6.69,57.27,57.27,0,0,0,6.77,4.27l0,0,0,0,.07,0c9.4,4.92,26.21,5.45,38.55-.55,17.05-8.28,26.35-27.36,26.32-38.69q-.31-105.6-.64-211.2l53.49-.31a41.07,41.07,0,0,0,1.69,12c.23.79.48,1.52.74,2.23,1,2.32,2.17,5,3.62,7.88.41.8,2,4,4,7.4q.74,1.25,1.53,2.52l.1.17c.15.25.31.5.47.75l.48.76A125.79,125.79,0,0,0,351,160.21c14,11.26,30,14.44,40,15.37.26,12.65.86,48,.95,53A114.45,114.45,0,0,1,352.75,223.15Z" />
            </svg>
          </a>
          {/* Pinterest */}
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
            <svg width="33" height="33" viewBox="0 0 512 512" fill="#e8eeba">
              <path d="M256 32C132.3 32 32 132.3 32 256c0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4 4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5-1.1 4.1-3.5 14-4.6 18-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9 0 0-13 51.6-15.8 61.6-4.7 17.3-14 34.5-22.5 48 20.1 5.9 41.4 9.2 63.5 9.2 123.7 0 224-100.3 224-224C480 132.3 379.7 32 256 32z" />
            </svg>
          </a>
        </div>

        {/* Credits */}
        <div className="text-center">
          <p style={smallStyle}>Photos by Kaboom</p>
          <p style={smallStyle}>© 2030 Body Unmuted</p>
        </div>
      </div>
    </footer>
  );
}
