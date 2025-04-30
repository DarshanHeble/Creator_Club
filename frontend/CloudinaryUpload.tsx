import { useState } from 'react';
     import { AdvancedImage } from '@cloudinary/react';
     import { Cloudinary } from '@cloudinary/url-gen';

     const CloudinaryUpload = () => {
       console.log('CloudinaryUpload component is rendering');
       const [imageId, setImageId] = useState<string | null>(null);
       const [error, setError] = useState<string | null>(null);
       const [loading, setLoading] = useState(false);

       const cld = new Cloudinary({
         cloud: {
           cloudName: 'dp19nujli',
         },
       });

       const myImage = imageId ? cld.image(imageId) : null;

       // Load environment variables
       const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
       const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

       // Function to generate SHA-1 hash for the signature
       const sha1 = async (message: string): Promise<string> => {
         const encoder = new TextEncoder();
         const data = encoder.encode(message);
         const hash = await crypto.subtle.digest('SHA-1', data);
         return Array.from(new Uint8Array(hash))
           .map(b => b.toString(16).padStart(2, '0'))
           .join('');
       };

       const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
         const file = event.target.files?.[0];
         if (!file || !apiKey || !apiSecret) return;

         setLoading(true);
         setError(null);

         try {
           // Generate a timestamp for the signature
           const timestamp = Math.round(new Date().getTime() / 1000).toString();
           // Create the string to sign (timestamp + API secret)
           const signatureString = `timestamp=${timestamp}${apiSecret}`;
           // Generate the SHA-1 signature
           const signature = await sha1(signatureString);

           const formData = new FormData();
           formData.append('file', file);
           formData.append('api_key', apiKey);
           formData.append('timestamp', timestamp);
           formData.append('signature', signature);

           console.log('Attempting upload to:', `https://api.cloudinary.com/v1_1/dp19nujli/image/upload`);
           const response = await fetch(
             `https://api.cloudinary.com/v1_1/dp19nujli/image/upload`,
             {
               method: 'POST',
               body: formData,
             }
           );
           console.log('Response status:', response.status);
           const data = await response.json();
           console.log('Upload response:', data);
           if (!response.ok) {
             throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
           }
           if (!data.public_id) throw new Error('No public_id in response');
           setImageId(data.public_id);
         } catch (err: any) {
           console.error('Upload failed:', err);
           setError(err.message || 'Failed to upload image. Please try again.');
         } finally {
           setLoading(false);
         }
       };

       return (
         <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
           <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
             Upload to Cloudinary
           </h1>
           <div style={{ marginBottom: '20px', textAlign: 'center' }}>
             <label
               htmlFor="file-upload"
               style={{
                 display: 'inline-block',
                 padding: '10px 20px',
                 backgroundColor: '#007bff',
                 color: 'white',
                 borderRadius: '5px',
                 cursor: 'pointer',
                 fontSize: '16px',
               }}
             >
               {loading ? 'Uploading...' : 'Choose File'}
             </label>
             <input
               id="file-upload"
               type="file"
               accept="image/*"
               onChange={handleUpload}
               disabled={loading}
               style={{ display: 'none' }}
             />
           </div>
           {error && (
             <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
               {error}
             </p>
           )}
           {imageId && (
             <div style={{ textAlign: 'center' }}>
               <AdvancedImage cldImg={myImage as any} style={{ maxWidth: '300px' }} />
             </div>
           )}
         </div>
       );
     };

     export default CloudinaryUpload;