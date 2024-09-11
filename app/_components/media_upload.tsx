import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "@/services/media.service";

/**
 * MediaUpload component
 *
 * @param {Object} props - Component props
 * @param {Function} props.onChange - Called when the user selects a file
 * @param {string} [props.imgUrl] - The URL of the image to display
 *
 * @returns {React.ReactElement} The component
 */
function MediaUpload({
  onChange,
  imgUrl,
}: Readonly<{
  onChange: (value: string) => void;
  imgUrl?: string;
}>) {
  const [img, setImg] = useState<string>();
  const uploadMediaMutation = useMutation({
    /**
     * The mutation function
     *
     * @param {File} file - The file to upload
     * @returns {Promise<MediaUploadServerResponse>} The response from the server
     */
    mutationFn: (file: File) => uploadMedia(file),
    /**
     * Called when the mutation is successful
     *
     * @param {MediaUploadServerResponse} data - The response from the server
     */
    onSuccess: (data) => {
      setImg(data.url);
      onChange(data.id);
    },
  });

  /**
   * Update the component state when the imgUrl prop changes
   */
  useEffect(() => {
    setImg(imgUrl);
  }, [imgUrl]);

  return (
    <div className="w-full h-64 bg-slate-100 relative">
      {
        // Display the uploaded image
        img && (
          <Image src={img} alt="upload media" objectFit="cover" fill priority />
        )
      }
      <Input
        type="file"
        className="hidden"
        id="media"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg, image/jpg"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            // Call the mutation function with the file
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
