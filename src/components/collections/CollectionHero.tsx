import type { CollectionMeta } from "@/services/collection.service";
import { CollectionBanner } from "./CollectionBanner";

interface Props {
  collection: CollectionMeta;
  productCount: number;
}

export function CollectionHero({ collection, productCount }: Props) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={collection.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-14 pb-14 md:pb-20">
        <CollectionBanner name={collection.name} slug={collection.slug} />
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              — Collection
            </p>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-balance">
              {collection.name}
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              {collection.description}
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {productCount} {productCount === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>
    </section>
  );
}
