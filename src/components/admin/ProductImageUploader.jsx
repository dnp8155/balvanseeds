import React, { useEffect, useState, useCallback } from "react";
import { Upload, Trash2, Star, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { adminEntity } from "@/lib/supabaseAdmin";

const IMAGE_TYPES = ["product", "field", "packaging", "farmer_result", "other"];

export default function ProductImageUploader() {
  const [varieties, setVarieties] = useState([]);
  const [loadingVarieties, setLoadingVarieties] = useState(true);
  const [varietyId, setVarietyId] = useState("");
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState("");
  const [imageType, setImageType] = useState("product");
  const [isCover, setIsCover] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const items = await adminEntity("SeedVariety").filter({}, "variety_name", 200);
        setVarieties(items || []);
      } catch {
        setVarieties([]);
      } finally {
        setLoadingVarieties(false);
      }
    })();
  }, []);

  const loadImages = useCallback(async (id) => {
    if (!id) { setImages([]); return; }
    setLoadingImages(true);
    try {
      const items = await adminEntity("SeedImage").filter({ seed_variety_id: id }, "display_order");
      setImages(items || []);
    } catch {
      setImages([]);
    } finally {
      setLoadingImages(false);
    }
  }, []);

  useEffect(() => { loadImages(varietyId); }, [varietyId, loadImages]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!varietyId) return setError("Select a seed variety first.");
    if (!file) return setError("Choose an image file.");
    setUploading(true);
    try {
      // Transit upload (stored privately) — backend fetches bytes via a short-lived signed URL.
      const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
      const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({ file_uri, expires_in: 300 });
      const file_url = signed_url;
      const res = await base44.functions.invoke("uploadProductImage", {
        file_url,
        seed_variety_id: varietyId,
        image_type: imageType,
        alt_text: altText,
        is_cover: isCover,
        display_order: Number(displayOrder) || 0,
      });
      if (res?.data?.publicUrl) {
        setSuccess("Uploaded to Supabase and linked.");
        setFile(null); setAltText(""); setIsCover(false); setDisplayOrder(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
        loadImages(varietyId);
      } else {
        setError(res?.data?.error || "Upload failed.");
      }
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img) => {
    if (!confirm("Delete this image record? (File stays in Supabase Storage.)")) return;
    try {
      await adminEntity("SeedImage").delete(img.id);
      loadImages(varietyId);
    } catch (err) {
      setError(err.message || "Delete failed.");
    }
  };

  const fileInputRef = React.useRef(null);

  return (
    <div>
      <h2 className="font-heading text-2xl font-600 text-foreground">Product Images</h2>
      <p className="text-sm text-muted-foreground">Upload product images to your Supabase Storage and link them to a seed variety.</p>

      <form onSubmit={handleUpload} className="mt-6 grid gap-4 rounded-lg border border-border bg-card p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block">
            <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">Seed Variety</span>
            <select value={varietyId} onChange={(e) => setVarietyId(e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
              <option value="">{loadingVarieties ? "Loading…" : "Select variety"}</option>
              {varieties.map((v) => (
                <option key={v.id} value={v.id}>{v.variety_name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="block">
            <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">Image File</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1.5 w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground hover:file:bg-leaf"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">Image Type</span>
          <select value={imageType} onChange={(e) => setImageType(e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
            {IMAGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">Display Order</span>
          <input type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-600 uppercase tracking-wide text-muted-foreground">Alt Text</span>
          <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} className="mt-1.5 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </label>

        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" checked={isCover} onChange={(e) => setIsCover(e.target.checked)} className="h-4 w-4 rounded border-input accent-primary" />
          <span className="text-sm text-foreground">Set as cover (also updates variety thumbnail)</span>
        </label>

        {error && <p className="sm:col-span-2 text-sm text-destructive">{error}</p>}
        {success && <p className="sm:col-span-2 text-sm text-leaf">{success}</p>}

        <div className="sm:col-span-2 flex justify-end">
          <button type="submit" disabled={uploading} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-600 text-primary-foreground hover:bg-leaf disabled:opacity-60">
            {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</> : <><Upload className="h-4 w-4" /> Upload to Supabase</>}
          </button>
        </div>
      </form>

      {/* Existing images for the selected variety */}
      <div className="mt-8">
        <h3 className="font-heading text-lg font-600 text-foreground">Linked Images</h3>
        {!varietyId ? (
          <p className="mt-2 text-sm text-muted-foreground">Select a variety to see its images.</p>
        ) : loadingImages ? (
          <div className="mt-4 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : images.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No images linked yet.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-square bg-muted">
                  <img src={img.image_url} alt={img.alt_text || ""} className="h-full w-full object-cover" />
                  {img.is_cover && (
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-600 text-primary-foreground"><Star className="h-3 w-3" />Cover</span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 p-2">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-600 text-foreground">{img.image_type}</p>
                    <p className="truncate text-xs text-muted-foreground">order: {img.display_order ?? 0}</p>
                  </div>
                  <button onClick={() => handleDelete(img)} className="rounded-full p-1.5 text-destructive hover:bg-destructive/10" title="Delete record"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}