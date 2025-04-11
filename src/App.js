import React, { useState } from 'react';
import FileUpload from './pages/UploadForm';
import BlockList from './pages/BlockList';
import BlockDetails from './pages/BlockDetails';

function App() {
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>CAD Block Viewer</h1>
      <FileUpload onUploadSuccess={() => setReloadFlag(!reloadFlag)} />
      <hr />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <BlockList onSelectBlock={setSelectedBlockId} reloadFlag={reloadFlag} />
        <BlockDetails blockId={selectedBlockId} />
      </div>
    </div>
  );
}

export default App;
