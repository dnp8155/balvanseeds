import React, { useState } from "react";
import { galleryAlbums, images } from "@/lib/siteData";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Lightbox from "@/components/site/Lightbox";
import EmptyState from "@/components/site/EmptyState";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Gallery() {
  const { t, tc } = useLanguage();
  const [activeAlbum, setActiveAlbum] = useState(galleryAlbums[0].slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const album = galleryAlbums.find((a) => a.slug === activeAlbum) || galleryAlbums[0];

  return (
    <>
      <Seo {...seoConfig["/gallery"]} />
      <PageHero
        eyebrow={t("gallery.eyebrow")}
        title={t("gallery.title")}
        subtitle={t("gallery.subtitle")}
        image={images.hero}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("gallery.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2">
          {galleryAlbums.map((a) => (
            <button key={a.slug} type="button" onClick={() => setActiveAlbum(a.slug)} className={`rounded-full px-4 py-1.5 text-sm font-600 transition focus-ring ${activeAlbum === a.slug ? "bg-primary text-primary-foreground" : "bg-leaf-soft text-leaf hover:bg-leaf/15"}`}>{tc(a.title)}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <p className="mb-6 text-sm text-muted-foreground">{tc(album.title)} — <span className="font-600 text-foreground">{album.photos.length}</span> {t("gallery.photos")}</p>
        {album.photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {album.photos.map((photo, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative overflow-hidden rounded-xl border border-border bg-muted shadow-soft focus-ring"
              >
                <Image src={photo} alt={`${album.title} photo ${i + 1}`} className="aspect-square w-full transition duration-500 group-hover:scale-105" fittingType="fill" />
                <span className="absolute inset-0 bg-charcoal/0 transition group-hover:bg-charcoal/20" />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState title={t("gallery.noPhotos")} description={t("gallery.noPhotosDesc")} />
        )}
      </section>

      <Lightbox photos={album.photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </>
  );
}