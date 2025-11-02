import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhotoUploadProps {
  onPhotosChange: (photos: UploadedPhoto[]) => void;
  maxPhotos?: number;
  minPhotos?: number;
}

export interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  uploaded: boolean;
  url?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

export function PhotoUpload({ 
  onPhotosChange, 
  maxPhotos = 6, 
  minPhotos = 1 
}: PhotoUploadProps) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Auto-orientation and resize to max 1200px
          const maxDimension = 1200;
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  resolve(file);
                }
              },
              "image/jpeg",
              0.85
            );
          } else {
            resolve(file);
          }
        };
      };
    });
  };

  const validateAndProcessFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const currentPhotoCount = photos.length;

    if (currentPhotoCount + fileArray.length > maxPhotos) {
      toast({
        title: "Too many photos",
        description: `You can only upload up to ${maxPhotos} photos.`,
        variant: "destructive",
      });
      return;
    }

    const validFiles: File[] = [];

    for (const file of fileArray) {
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        toast({
          title: "Invalid format",
          description: `${file.name} is not a supported format. Please use JPEG, PNG, or WebP.`,
          variant: "destructive",
        });
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 5MB. Please choose a smaller file.`,
          variant: "destructive",
        });
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const processedPhotos: UploadedPhoto[] = [];

      for (const file of validFiles) {
        const compressedFile = await compressImage(file);
        const preview = URL.createObjectURL(compressedFile);
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        processedPhotos.push({
          id,
          file: compressedFile,
          preview,
          uploaded: false,
        });
      }

      const updatedPhotos = [...photos, ...processedPhotos];
      setPhotos(updatedPhotos);
      onPhotosChange(updatedPhotos);

      toast({
        title: "Photos added",
        description: `${processedPhotos.length} photo(s) ready for upload.`,
      });
    } catch (error) {
      toast({
        title: "Error processing photos",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFiles(e.target.files);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFiles(e.dataTransfer.files);
    }
  }, [photos]);

  const removePhoto = (id: string) => {
    const photoToRemove = photos.find((p) => p.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
    const updatedPhotos = photos.filter((p) => p.id !== id);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const uploadToStorage = async (photo: UploadedPhoto, bucketName: string = "donation-images"): Promise<string> => {
    const fileExt = photo.file.name.split(".").pop();
    const fileName = `${photo.id}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, photo.file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {photos.length < maxPhotos && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS.join(",")}
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">
            {isDragging ? "Drop photos here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-muted-foreground">
            JPEG, PNG or WebP (max 5MB per image)
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {minPhotos} - {maxPhotos} photos required • {photos.length}/{maxPhotos} uploaded
          </p>
        </div>
      )}

      {/* Photo Preview Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted"
            >
              <img
                src={photo.preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(photo.id);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Main Photo
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isUploading && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          Processing images...
        </div>
      )}

      {photos.length > 0 && photos.length < minPhotos && (
        <p className="text-sm text-destructive">
          Please upload at least {minPhotos} photo(s) to continue
        </p>
      )}
    </div>
  );
}
