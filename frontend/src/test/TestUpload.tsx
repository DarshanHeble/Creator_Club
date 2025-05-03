import { useState } from 'react';
import { uploadToCloudinary } from '../services/cloudinaryService';

const TestUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed:", e.target.files);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setUrl(null);
      console.log("File set:", e.target.files[0].name);
    } else {
      setFile(null);
      console.log("No file selected");
    }
  };

  const handleUpload = async () => {
    console.log("Upload button clicked");
    console.log("Current file state:", file);

    if (!file) {
      setError('Please select a file to upload.');
      console.log("Error: No file selected");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Calling uploadToCloudinary...");
      const uploadedUrl = await uploadToCloudinary(file);
      setUrl(uploadedUrl);
      console.log('Uploaded URL:', uploadedUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to upload file: ${errorMessage}. Check the console for details.`);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
      console.log("Upload process completed");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Cloudinary Upload</h2>
      <div>
        <label htmlFor="file-upload">Choose Image or Video: </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
      </div>
      {file && (
        <p style={{ margin: '10px 0' }}>
          Selected File: <strong>{file.name}</strong>
        </p>
      )}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          position: 'relative',
          zIndex: 1000,
        }}
      >
        {loading ? 'Uploading...' : 'Upload File'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {url && (
        <div style={{ marginTop: '10px' }}>
          <p>
            Uploaded File URL:{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default TestUpload;