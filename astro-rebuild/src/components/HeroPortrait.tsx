const HERO_IMAGE_WEBP = '/professional-photo.webp';
const HERO_IMAGE_FALLBACK = '/professional-photo.jpg';

/** Static profile photo — About page only. */
export const HeroPortrait = () => (
  <div className="hero-portrait relative w-full max-w-[260px] lg:max-w-[300px] mx-auto lg:mx-0">
    <div className="border-2 border-foreground bg-concrete shadow-brutal">
      <div className="border-b-2 border-foreground bg-foreground px-3 py-2">
        <span className="brutal-label text-background">Profile / About</span>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
        <img
          src={HERO_IMAGE_WEBP}
          alt="Nico Loperena"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[center_20%] grayscale contrast-110"
          onError={(e) => {
            const el = e.currentTarget;
            if (el.src.endsWith('.webp')) {
              el.src = HERO_IMAGE_FALLBACK;
            }
          }}
        />
      </div>
    </div>
  </div>
);
