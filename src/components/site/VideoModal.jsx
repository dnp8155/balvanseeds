import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-label="Video player">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 focus-ring" aria-label="Close">
        <X className="w-6 h-6" />
      </button>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-xl bg-black shadow-lift">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${video.youtube}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <h3 className="mt-4 font-heading text-lg font-600 text-white">{video.title}</h3>
      </div>
      <button type="button" className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close video" tabIndex={-1} />
    </div>
  );
}