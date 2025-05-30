// cloudinaryConfig.ts
export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
}

export interface CloudinaryUploadResponse {
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  public_id: string;
  original_filename: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
}

export class CloudinaryUploader {
  private config: CloudinaryConfig;

  constructor(config: CloudinaryConfig) {
    this.config = config;
  }

  async uploadImage(file: File): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.config.uploadPreset);

    // Add folder for organization (if configured in upload preset)
    formData.append("folder", "products");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Cloudinary upload failed: ${errorData.error?.message || response.statusText}`,
      );
    }

    return await response.json();
  }

  async uploadMultipleImages(
    files: File[],
  ): Promise<CloudinaryUploadResponse[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  // Helper method to generate optimized URLs
  getOptimizedUrl(
    publicId: string,
    options?: {
      width?: number;
      height?: number;
      quality?: string;
      format?: string;
    },
  ): string {
    const {
      width = 400,
      height = 300,
      quality = "auto",
      format = "auto",
    } = options || {};
    return `https://res.cloudinary.com/${this.config.cloudName}/image/upload/q_${quality},f_${format},w_${width},h_${height},c_fill/${publicId}`;
  }
}

// Initialize Cloudinary instance
export const cloudinaryUploader = new CloudinaryUploader({
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY, // Optional, for signed uploads
});
