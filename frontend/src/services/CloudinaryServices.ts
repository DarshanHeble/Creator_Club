// Define the upload function for unsigned uploads using an upload preset
export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    console.log("Starting upload for file:", file.name);

    // Get the cloud name from environment variables
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;

    // Log environment variables
    console.log("Cloud Name:", cloudName);

    if (!cloudName) {
      throw new Error("Missing Cloudinary cloud name in environment variables");
    }

    // Prepare the upload parameters (unsigned upload with preset)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "test_upload_preset"); // Use the preset you created

    console.log("Uploading to Cloudinary with unsigned preset...");

    // Upload the file to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    // Parse the response
    const data = await response.json();
    console.log("Cloudinary response:", data);

    // Check if the upload was successful
    if (!response.ok || !data.secure_url) {
      throw new Error(
        data.error?.message || "Failed to upload file to Cloudinary",
      );
    }

    // Return the URL of the uploaded file
    console.log("Upload successful, URL:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error; // Re-throw to let TestUpload handle the error
  }
};
