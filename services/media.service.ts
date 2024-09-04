import api from "@/lib/api";
import { Media } from "@/lib/types";

/**
 * Uploads a media file to the server.
 *
 * @param {File} media The media file to be uploaded.
 * @returns {Promise<Media>} The uploaded media file.
 */
export async function uploadMedia(media: File): Promise<Media> {
  const formData = new FormData();
  formData.append("media", media);

  const response = await api.post<Media>("media", formData, {
    // Set the Content-Type header to multipart/form-data
    // to allow the server to parse the file.
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // The response is a Media object.
  return response.data;
}
