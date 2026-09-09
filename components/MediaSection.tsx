import Image from 'next/image';

type MediaSectionProps = {
  backgroundSrc: string;
  veil?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  as?: 'section' | 'div';
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
  as = 'section',
  className = '',
  style,
  contentClassName = '',
  contentStyle,
  children,
}: MediaSectionProps) {
  const Tag = as;
  return (
    <Tag className={`media-section ${className}`} style={style}>
      <div className="media-section__background" aria-hidden="true">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          sizes={sizes}
          style={{ objectFit: 'cover', objectPosition }}
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
