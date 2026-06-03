import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative shrink-0 w-20 h-24 md:w-24 md:h-28 overflow-hidden border transition ${
              active === i ? "border-primary" : "border-border hover:border-primary/50"
            }`}
          >
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image with hover zoom + swipe */}
      <div
        className="relative flex-1 aspect-[4/5] overflow-hidden bg-secondary group"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
        onTouchStart={(e) => {
          (e.currentTarget as any)._sx = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const sx = (e.currentTarget as any)._sx as number | undefined;
          if (sx == null) return;
          const dx = e.changedTouches[0].clientX - sx;
          if (Math.abs(dx) > 40) {
            setActive((cur) =>
              dx < 0
                ? Math.min(cur + 1, images.length - 1)
                : Math.max(cur - 1, 0),
            );
          }
        }}
      >
        <img
          src={images[active]}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
          style={
            zoom
              ? {
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  transform: "scale(1.8)",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
