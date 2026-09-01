import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined;
  const photo = open ? photos[index] : null;

  const prev = useCallback(() => {
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  const next = useCallback(() => {
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, prev, next]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring" aria-label="Close">
        <X className="w-6 h-6" />
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" onClick={prev} className="absolute left-3 sm:left-6 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring" aria-label="Previous">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button type="button" onClick={next} className="absolute right-3 sm:right-6 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring" aria-label="Next">
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
      <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-lg">
          <Image src={photo} alt="Gallery photo" className="max-h-[80vh] w-full" fittingType="fit" />
        </div>
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {index + 1} / {photos.length}
        </figcaption>
      </figure>
      <button type="button" className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close viewer" tabIndex={-1} />
    </div>
  );
}