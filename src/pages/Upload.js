import React, { useState } from 'react';
import axios from 'axios';

function Upload({ onUploadSuccess }) { // Add onUploadSuccess prop
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const handleUpload = () => {
    if (!files) {
      console.log('No file selected');
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append(`file${i + 1}`, files[i]);
    }

    setMsg('Uploading...');
    setProgress(prevState => ({ ...prevState, started: true }));

    axios.post('http://httpbin.org/post', fd, {
      onUploadProgress: (progressEvent) =>
        setProgress(prevState => ({ ...prevState, pc: Math.floor(progressEvent.loaded * 100 / progressEvent.total) })), // Corrected progress calculation
      headers: {
        'Custom-Header': 'value',
      },
    })
      .then(res => {
        setMsg('Upload successful');
        console.log(res.data);
        // Call the passed onUploadSuccess function if available
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      })
      .catch(err => {
        setMsg('Upload Failed');
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Upload Your Academic Files</h1>
      <input onChange={(e) => setFiles(e.target.files)} type="file" multiple />
      <button onClick={handleUpload}>Upload</button>
      {progress.started && <progress max="100" value={progress.pc} />}
      {msg && <span>{msg}</span>}
    </div>
  );
}

export default Upload;
