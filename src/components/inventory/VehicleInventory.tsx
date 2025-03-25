import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { VehicleForm } from "./VehicleForm";
import { createInventoryItem } from "@/services/inventoryService";
import { useToast } from "@/hooks/use-toast";
import { InventoryFormData } from "@/types/inventory";
import { useNavigate } from "react-router-dom";

export const VehicleInventory = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (formData: InventoryFormData) => {
    setIsSubmitting(true);

    try {
      // Get the first image blob if available
      const imageBlob = imageBlobs[0];
      
      // Update the image_url if there are any images
      if (imageUrls.length > 0) {
        formData.image_url = imageUrls[0];
      }

      await createInventoryItem(formData, imageBlob);
      
      toast({
        title: "Success",
        description: "Vehicle added to inventory successfully",
      });

      // Reset form and images
      setSelectedImages([]);
      setImageUrls([]);
      setImageBlobs([]);
      
      // Navigate to inventory list
      navigate('/vehicles/inventory');
    } catch (error) {
      console.error('Error creating inventory item:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add vehicle to inventory",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <VehicleForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        >
          <ImageUpload
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            imageBlobs={imageBlobs}
            setImageBlobs={setImageBlobs}
          />
        </VehicleForm>
      </CardContent>
    </Card>
  );
};