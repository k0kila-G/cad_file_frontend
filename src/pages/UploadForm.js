import React, { useState } from 'react';
import { uploadFile } from '../api';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    
      e.preventDefault();
      if (!file) return;
    
     
      const formData = new FormData();
      formData.append('file', file);
      
    
      try {
        await uploadFile(formData);
        alert('Upload success!');
        onUploadSuccess(); 

      } catch (err) {
        console.error(err.response?.data || err.message);
        alert('Upload failed');
      }
       
  };

  return (
    <div>
      <h2>Upload DXF File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".dxf" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default FileUpload;
