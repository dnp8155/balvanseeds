import * as React from "react"
import { ResponsiveImage } from "./responsive-image"
import {
  getOriginalImageUrl,
  IMAGE_LOAD_MODE,
  nextImageLoadMode,
  parseWixMediaUrl,
} from "./image-helpers"

const BRAND_FALLBACK_IMAGE =
  "https://yugouortjdtblrbmuhnu.supabase.co/storage/v1/object/public/balvan-images/images/assets/a33357d97_generated_image.webp";

const SVG_FALLBACK =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 450' fill='%230f3d23'%3E%3Crect width='600' height='450' fill='%23f4f7f4'/%3E%3Ccircle cx='300' cy='200' r='70' fill='%231b4d2e' opacity='0.12'/%3E%3Cpath d='M300 155c-28 0-48 22-48 48 0 38 48 72 48 72s48-34 48-72c0-26-20-48-48-48z' fill='%231b4d2e'/%3E%3Cpath d='M300 170v55' stroke='%23f4f7f4' stroke-width='3' stroke-linecap='round'/%3E%3Ctext x='300' y='325' font-family='system-ui,sans-serif' font-size='20' font-weight='700' fill='%230f3d23' text-anchor='middle' letter-spacing='2'%3EBALVAN AGRO SEEDS%3C/text%3E%3Ctext x='300' y='355' font-family='system-ui,sans-serif' font-size='13' font-weight='500' fill='%23557a62' text-anchor='middle'%3EResearch-Driven Agriculture Seeds%3C/text%3E%3C/svg%3E";

const FALLBACK_IMAGE_URL = BRAND_FALLBACK_IMAGE;

/**
 * Image with built-in Wix Media Platform support: canonical public images on
 * media.base44.com and static.wixstatic.com/media are resized to the rendered
 * container per device pixel ratio and served as AVIF/WebP when supported; `fittingType="fill"`
 * crops server-side, optionally anchored at a focal point. Other URLs render
 * as a plain <img>. Failed transforms retry the original URL; only a broken
 * original swaps to the generic fallback image.
 */
const Image = React.forwardRef(
  (
    {
      src: source,
      fittingType = "fill",
      originWidth,
      originHeight,
      focalPointX,
      focalPointY,
      quality = 90,
      onError,
      ...props
    },
    ref
  ) => {
    const [previewSource, setPreviewSource] = React.useState(null)
    const preview = previewSource?.source === source ? previewSource : null
    const src = preview ? preview.value : source
    const replaceSource = (value, className) => setPreviewSource({
      source, value, className, sourceClassName: props.className,
    })
    React.useEffect(() => setPreviewSource(null), [source])
    const parsedSource = src && src !== FALLBACK_IMAGE_URL ? parseWixMediaUrl(src) : null
    const initialMode = parsedSource ? IMAGE_LOAD_MODE.OPTIMIZED : IMAGE_LOAD_MODE.ORIGINAL
    const [loadState, setLoadState] = React.useState({ src, mode: initialMode })
    const mode = loadState.src === src ? loadState.mode : initialMode

    React.useEffect(() => {
      setLoadState({ src, mode: initialMode })
    }, [src, initialMode])

    const handleError = (event) => {
      if (mode === IMAGE_LOAD_MODE.FALLBACK) {
        if (event?.currentTarget && event.currentTarget.src !== SVG_FALLBACK) {
          event.currentTarget.src = SVG_FALLBACK;
        }
        return;
      }
      const nextMode = nextImageLoadMode(mode);
      setLoadState({ src, mode: nextMode });
      if (nextMode === IMAGE_LOAD_MODE.FALLBACK) onError?.(event);
    };

    const imageProps = {
      ...props,
      className: preview && preview.sourceClassName === props.className ? preview.className : props.className,
      onError: handleError,
    }

    if (!src) {
      // Renders as a real <img> (not a <div>) — the visual editor's
      // click-to-edit toolbar keys its "Replace Image" action off the DOM
      // tag being `img`, so a placeholder div would be unrecoverable in the
      // editor. FALLBACK_IMAGE_URL doubles as the "no image chosen" graphic.
      return <img ref={ref} src={FALLBACK_IMAGE_URL} loading="lazy" decoding="async" {...imageProps} data-empty-image />
    }

    // A failed transform retries the underlying original as a plain image.
    // Only a failure of that original advances to the generic fallback.
    const parsed = mode === IMAGE_LOAD_MODE.OPTIMIZED ? parsedSource : null

    if (!parsed) {
      const isErrorMode = mode === IMAGE_LOAD_MODE.FALLBACK
      const imageSrc = isErrorMode ? FALLBACK_IMAGE_URL : getOriginalImageUrl(src, parsedSource)
      return (
        <img
          ref={ref}
          src={imageSrc}
          loading="lazy"
          decoding="async"
          {...imageProps}
          data-error-image={isErrorMode || undefined}
        />
      )
    }

    const focalPoint =
      typeof focalPointX === "number" && typeof focalPointY === "number"
        ? { x: focalPointX, y: focalPointY }
        : undefined
    // Origin dimensions are optional — when known they stabilize layout via
    // the wrapper's aspect-ratio before the image loads.
    const aspectRatio =
      originWidth && originHeight ? `${originWidth} / ${originHeight}` : undefined

    return (
      <ResponsiveImage
        ref={ref}
        src={src}
        parsed={parsed}
        onSourceChange={replaceSource}
        fittingType={fittingType}
        focalPoint={focalPoint}
        quality={quality}
        aspectRatio={aspectRatio}
        {...imageProps}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
