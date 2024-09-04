import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "@/services/media.service";

function MediaUpload({ onChange }: { onChange: (value: string) => void }) {
  const [img, setImg] = useState<string>();
  const uploadMediaMutation = useMutation({
    mutationFn: (file: File) => uploadMedia(file),
    onSuccess: (data) => {
      setImg(data.url);
      onChange(data.id);
    },
  });
  return (
    <div className="w-full h-64 bg-slate-100 relative">
      {img && (
        <Image src={img} alt="upload media" objectFit="cover" fill priority />
      )}
      <Input
        type="file"
        className="hidden"
        id="media"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg, image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            uploadMediaMutation.mutate(file);
          }
        }}
      />
      <Label
        htmlFor="media"
        className="absolute z-[3] text-center inset-0 cursor-pointer py-2"
      />
      <p className="absolute z-[2] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center">
        Choose Image
      </p>
    </div>
  );
}

export default MediaUpload;
