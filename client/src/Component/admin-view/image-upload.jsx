import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Label } from "../ui/all";
import { Input } from "../ui/all";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../../Component/ui/button";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setimageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleClickUpload() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  async function uploadedImagetoCloudinary() {
    setimageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    // ✅ Changed only this line (URL)
    const response = await axios.post(
      "https://fashion-website-backend.vercel.app/api/admin/products/upload-image",
      data
    );

    console.log(response, "response");

    if (response?.data?.success)
      setUploadedImageUrl(response.data.result.url);
    setimageLoadingState(false);
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadedImagetoCloudinary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload a photo</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4 cursor-pointer`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <div
            className={`flex flex-col items-center justify-center h-32 text-center ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </div>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
