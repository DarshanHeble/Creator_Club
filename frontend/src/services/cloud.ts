import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
const CLOUDINARY_DESTROY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;
// const CLOUDINARY_FETCH_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Upload a file to Cloudinary.
 * @param file - The file to upload.
 * @returns The response data containing file information.
 */
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
    });
    console.log(response.data);

    return response.data; // Returns the uploaded file details
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file.");
  }
};

/**
 * Delete a file from Cloudinary.
 * @param publicId - The public_id of the file to delete.
 * @returns A success message or error.
 */
export const deleteFromCloudinary = async (publicId: string) => {
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("invalidate", "true"); // Optional: Invalidate cached versions

  try {
    const response = await axios.post(CLOUDINARY_DESTROY_URL, formData, {
      auth: {
        username: API_KEY,
        password: API_SECRET,
      },
    });

    if (response.status === 200 && response.data.result === "ok") {
      return "Image successfully deleted!";
    } else {
      throw new Error("Failed to delete image.");
    }
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new Error(`Failed to delete file: ${error}`);
  }
};

// /**
//  * Fetch a file from Cloudinary.
//  * @param publicId - The public ID of the file.
//  * @param resourceType - The type of resource (e.g., 'image', 'video', 'raw').
//  * @returns The file's URL or an error message.
//  */
// export const fetchFromCloudinary = (
//   publicId: string,
//   resourceType: string = "image",
// ): string => {
//   try {
//     if (!publicId) {
//       throw new Error("Public ID is required to fetch the file.");
//     }

//     const fileUrl = `${CLOUDINARY_FETCH_URL}/${resourceType}/v1/${publicId}`;
//     return fileUrl;
//   } catch (error) {
//     console.error("Error fetching file from Cloudinary:", error);
//     throw new Error("Failed to fetch the file URL.");
//   }
// };
