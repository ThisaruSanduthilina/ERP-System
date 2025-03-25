import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, FileScan, RotateCw, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createDocument } from "@/services/documentService";
import { useQueryClient } from "@tanstack/react-query";

export const DocumentScanner = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [scannedFile, setScannedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleScan = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setScannedFile(file);

      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      
      // Simulate scanning process
      setTimeout(() => {
        setIsScanning(false);
        setPreview(previewUrl);
        toast({
          title: "Scan complete",
          description: "Document has been successfully scanned.",
        });
      }, 2000);
    }
  };

  const handleReset = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setScannedFile(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (scannedFile) {
      try {
        const formData = new FormData();
        formData.append('file', scannedFile);
        
        // Create a fake URL for demo purposes
        const fakeFileUrl = URL.createObjectURL(scannedFile);
        
        await createDocument({
          customer_id: 1, // You might want to make this dynamic
          file_name: scannedFile.name,
          file_path: fakeFileUrl,
          uploaded_at: new Date().toISOString(),
        });

        queryClient.invalidateQueries({ queryKey: ['documents'] });
        
        toast({
          title: "Success",
          description: "Document has been uploaded successfully.",
        });
        
        handleReset();
      } catch (error) {
        console.error('Error uploading document:', error);
        toast({
          title: "Error",
          description: "Failed to upload document",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileScan className="h-6 w-6" />
          Document Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
        />
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8",
            isScanning ? "border-primary" : "border-gray-300"
          )}
        >
          {preview ? (
            <div className="relative">
              {scannedFile?.type.startsWith('image/') ? (
                <img
                  src={preview}
                  alt="Scanned document"
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <div className="bg-gray-100 p-4 rounded text-center">
                  <FileScan className="mx-auto h-16 w-16 text-gray-400 mb-2" />
                  <p>{scannedFile?.name}</p>
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Camera
                className={cn(
                  "mx-auto h-16 w-16",
                  isScanning
                    ? "text-primary animate-pulse"
                    : "text-gray-400"
                )}
              />
              <p className="mt-4 text-sm text-gray-600">
                {isScanning
                  ? "Scanning in progress..."
                  : "Click 'Start Scanning' to scan a document"}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end">
          {preview ? (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCw className="h-4 w-4" />
                Rescan
              </Button>
              <Button 
                onClick={handleUpload} 
                className="gap-2"
                disabled={!scannedFile}
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
            </>
          ) : (
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              {isScanning ? "Scanning..." : "Start Scanning"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};