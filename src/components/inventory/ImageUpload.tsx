import { ImagePlus, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  imageBlobs: Blob[];
  setImageBlobs: (blobs: Blob[]) => void;
}

export const ImageUpload = ({
  selectedImages,
  setSelectedImages,
  imageUrls,
  setImageUrls,
  imageBlobs,
  setImageBlobs
}: ImageUploadProps) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newSelectedImages = [...selectedImages, ...files];
      setSelectedImages(newSelectedImages);
      
      // Create URLs for preview
      const newImageUrls = files.map(file => URL.createObjectURL(file));
      const updatedImageUrls = [...imageUrls, ...newImageUrls];
      setImageUrls(updatedImageUrls);

      // Convert files to Blobs
      const newBlobs = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          return new Blob([arrayBuffer], { type: file.type });
        })
      );
      setImageBlobs([...imageBlobs, ...newBlobs]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    
    const newUrls = imageUrls.filter((_, i) => {
      if (i === index) {
        URL.revokeObjectURL(imageUrls[i]);
      }
      return i !== index;
    });
    setImageUrls(newUrls);

    const newBlobs = imageBlobs.filter((_, i) => i !== index);
    setImageBlobs(newBlobs);
  };

  return (
    <div className="space-y-4">
      <Label>Vehicle Images</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Vehicle preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-purple-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 cursor-pointer bg-white/50 transition-colors">
          <div className="flex flex-col items-center space-y-2">
            <ImagePlus className="h-8 w-8 text-purple-500" />
            <span className="text-sm text-purple-600">Add Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};