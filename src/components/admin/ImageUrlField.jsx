import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ImageUrlField({ value, onChange, label, placeholder }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
    } catch (err) {
      alert("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-1 block text-xs font-600 uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "https://..."}
          className="flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-600 text-foreground hover:bg-muted disabled:opacity-60"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "…" : "Upload"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt=""
            className="h-16 w-24 rounded border border-border object-cover"
          />
        </div>
      )}
    </div>
  );
}