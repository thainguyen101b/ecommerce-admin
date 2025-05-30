import React, { useState, useCallback } from "react";
import { InputProps, useInput, useNotify, Labeled } from "react-admin";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { cloudinaryUploader } from "../cloudinaryConfig";

export interface ImageData {
  url: string;
  displayName: string;
  publicId: string;
}

const validateFile = (file: File, maxSize: number): string | null => {
  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
  }
  if (!file.type.startsWith("image/")) {
    return "Only image files are allowed";
  }
  return null;
};

interface CloudinaryImageInputProps extends Omit<InputProps, "source"> {
  source: string;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  maxSize?: number;
  helperText?: string;
  label?: string;
}

export const CloudinaryImageInput = ({
  source,
  multiple = true,
  maxFiles = 5,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  helperText,
  label = "Images",
  ...rest
}: CloudinaryImageInputProps) => {
  const { field, fieldState } = useInput({ source, ...rest });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const notify = useNotify();
  const images: ImageData[] = field.value || [];

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      const fileArray = Array.from(files);

      // Validate files
      const validationErrors = fileArray
        .map((file, index) => ({
          file,
          index,
          error: validateFile(file, maxSize),
        }))
        .filter((item) => item.error);

      if (validationErrors.length > 0) {
        validationErrors.forEach(({ error }) =>
          notify(error!, { type: "error" }),
        );
        return;
      }

      // Check max files limit
      if (multiple && images.length + fileArray.length > maxFiles) {
        notify(`Maximum ${maxFiles} images allowed`, { type: "error" });
        return;
      }

      if (!multiple && fileArray.length > 1) {
        notify("Only one image allowed", { type: "error" });
        return;
      }

      setUploading(true);

      try {
        const uploadPromises = fileArray.map(async (file, index) => {
          const fileId = `${Date.now()}-${index}`;
          setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

          try {
            const result = await cloudinaryUploader.uploadImage(file);
            setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }));

            return {
              url: result.secure_url,
              displayName: result.display_name,
              publicId: result.public_id,
            };
          } catch (error) {
            setUploadProgress((prev) => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
            throw error;
          }
        });

        const uploadedImages = await Promise.all(uploadPromises);

        const newImages = multiple
          ? [...images, ...uploadedImages]
          : uploadedImages;

        field.onChange(newImages);
        notify(`Successfully uploaded ${uploadedImages.length} image(s)`);
      } catch (error) {
        console.error("Upload error:", error);
        notify("Upload failed. Please try again.", { type: "error" });
      } finally {
        setUploading(false);
        setUploadProgress({});
      }
    },
    [images, field, multiple, maxFiles, notify],
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    field.onChange(newImages);
    notify("Image removed");
  };

  const getOptimizedImageUrl = (image: ImageData) => {
    if (image.publicId) {
      return cloudinaryUploader.getOptimizedUrl(image.publicId, {
        width: 200,
        height: 150,
      });
    }
    return image.url;
  };

  return (
    <Labeled
      label={label}
      source={source}
      isRequired={rest.validate !== undefined}
    >
      <Stack spacing={2}>
        {helperText && (
          <Typography variant="body2" color="text.secondary">
            {helperText}
          </Typography>
        )}

        {/* Upload Progress */}
        {uploading && Object.keys(uploadProgress).length > 0 && (
          <Box>
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <Box key={fileId} sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Uploading... {progress}%
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            ))}
          </Box>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={getOptimizedImageUrl(image)}
                    alt={image.displayName}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
                    <Typography variant="caption" noWrap sx={{ maxWidth: 100 }}>
                      {image.displayName}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveImage(index)}
                      disabled={uploading}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Upload Button */}
        <Box>
          <input
            accept={accept}
            style={{ display: "none" }}
            id={`cloudinary-upload-${source}`}
            multiple={multiple}
            type="file"
            onChange={handleFileInputChange}
            disabled={uploading || (!multiple && images.length >= 1)}
          />
          <label htmlFor={`cloudinary-upload-${source}`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={images.length === 0 ? <UploadIcon /> : <AddIcon />}
              disabled={
                uploading ||
                (!multiple && images.length >= 1) ||
                (multiple && images.length >= maxFiles)
              }
            >
              {images.length === 0
                ? "Upload Images"
                : multiple
                  ? `Add More (${images.length}/${maxFiles})`
                  : "Replace Image"}
            </Button>
          </label>
        </Box>

        {/* Error Display */}
        {fieldState.error && (
          <Typography variant="body2" color="error">
            {typeof fieldState.error === "string"
              ? fieldState.error
              : fieldState.error.message}
          </Typography>
        )}
      </Stack>
    </Labeled>
  );
};
