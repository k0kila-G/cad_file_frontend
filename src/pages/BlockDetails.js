import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlockDetails = ({ blockId }) => {
  const [block, setBlock] = useState(null);

  useEffect(() => {
    if (!blockId) return;

    const fetchBlock = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blocks/${blockId}`);
        setBlock(response.data);
      } catch (error) {
        console.error('Error fetching block details:', error);
        setBlock(null);
      }
    };

    fetchBlock();
  }, [blockId]);

  if (!blockId) {
    return <div style={{ flex: 1 }}><p>Select a block to view details.</p></div>;
  }

  if (!block) {
    return <div style={{ flex: 1 }}><p>Loading block details...</p></div>;
  }

  return (
    <div style={{ flex: 1 }}>
      <h2>Block Details</h2>
      <p><strong>Name:</strong> {block.name}</p>
<p><strong>X:</strong> {block.x}</p>
<p><strong>Y:</strong> {block.y}</p>
<p><strong>Z:</strong> {block.z}</p>
<p><strong>Layer:</strong> {block.layer}</p>
<p><strong>Type:</strong> {block.type}</p>
<p><strong>Handle:</strong> {block.handle}</p>
<p><strong>Rotation:</strong> {block.rotation}</p>

    </div>
  );
};

export default BlockDetails;
