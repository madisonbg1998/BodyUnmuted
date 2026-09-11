import Image from 'next/image';

type MediaSectionProps = {
  backgroundSrc: string;
  veil?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  /** Overrides objectPosition below 768px only (e.g. a crop that centers the
   * subject on desktop needs a different slice once the box goes narrow and
   * tall on mobile). Defaults to `objectPosition` when omitted, so existing
   * callers are unaffected. */
  mobileObjectPosition?: string;
  as?: 'section' | 'div';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Three-layer background system: background photo/pattern, directional veil,
 * and content — always separate layers so opacity never applies to text.
 */
export default function MediaSection({
  backgroundSrc,
  veil,
  priority = false,
  sizes = '100vw',
  objectPosition = 'center',
  mobileObjectPosition,
  as = 'section',
  id,
  className = '',
  style,
  contentClassName = '',
  contentStyle,
  children,
}: MediaSectionProps) {
  const Tag = as;
  return (
    <Tag id={id} className={`media-section ${className}`} style={style}>
      <div className="media-section__background" aria-hidden="true">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          sizes={sizes}
          className="media-section__bg-img"
          style={
            {
              objectFit: 'cover',
              objectPosition,
              '--media-mobile-object-position': mobileObjectPosition || objectPosition,
            } as React.CSSProperties
          }
          priority={priority}
        />
      </div>
      {veil && <div className="media-section__veil" aria-hidden="true" style={{ background: veil }} />}
      <div className={`media-section__content ${contentClassName}`} style={contentStyle}>
        {children}
      </div>
    </Tag>
  );
}
