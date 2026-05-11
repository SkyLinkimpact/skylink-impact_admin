"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import { useState, useEffect, useRef, useId } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "@/services/media.service";
import { toast } from "sonner";
import { ServerErrorResponse } from "@/lib/types";

type MediaUploadProps = {
  onChange: (mediaId: string | undefined) => void;
  value?: string;
  imgUrl?: string;
  resetKey?: string | number;
};

export default function MediaUpload({
  onChange,
  value,
  imgUrl,
  resetKey = "",
}: Readonly<MediaUploadProps>) {
  const componentId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | undefined>(imgUrl);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const uploadMediaMutation = useMutation({
    mutationFn: (file: File) => uploadMedia(file),
    onSuccess: (data) => {
      toast.success("Media uploaded successfully");
      onChange(data.id); // Update form
      if (data.url) setPreview(data.url);
    },
    onError: (error: ServerErrorResponse) => {
      toast.error(error.response?.data?.message || "Failed to upload media");
    },
  });

  // Reset logic - Safe version
  useEffect(() => {
    if (resetKey) {
      // Only reset if we actually have a preview or value
      if (preview || value) {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        setPreview(undefined);
        setObjectUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        onChange(undefined);
      }
    }
  }, [resetKey]); // ← Removed `onChange` from dependencies to prevent loop

  // Sync imgUrl for EditEventForm
  useEffect(() => {
    if (imgUrl) {
      setPreview(imgUrl);
    }
  }, [imgUrl]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (objectUrl) URL.revokeObjectURL(objectUrl);

    const newPreview = URL.createObjectURL(file);
    setPreview(newPreview);
    setObjectUrl(newPreview);

    uploadMediaMutation.mutate(file);
    e.target.value = "";
  };

  const removeImage = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setPreview(undefined);
    setObjectUrl(null);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isUploading = uploadMediaMutation.isPending;

  return (
    <div className="relative w-full h-64 border border-dashed border-gray-300 rounded-lg overflow-hidden bg-slate-100">
      {preview ? (
        <>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            priority
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 bg-black/70 hover:bg-red-600 text-white p-2 rounded-full z-20"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </button>

          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          )}
        </>
      ) : (
        <Label
          htmlFor={`media-upload-${componentId}`}
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <Upload className="w-10 h-10 text-gray-400 mb-3" />
          <p className="font-medium">Upload Speaker Image</p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP, GIF</p>
        </Label>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        id={`media-upload-${componentId}`}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
}
