import React, { useEffect, useState } from 'react';
import { fetchBlocks } from '../api';


const BlockList = ({ onSelectBlock, reloadFlag }) => {
  const [blocks, setBlocks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBlock = async () => {
    try {
      setLoading(true);
      const res = await fetchBlocks(page, search);

      setBlocks(res.data?.data || []);
      setPages(res.data?.pages || 1);
    } catch (err) {
      console.error('Failed to fetch blocks:', err);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchBlock();
  }, [page, reloadFlag, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on new search
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Block List</h2>
      <input
        type="text"
        placeholder="Search block name..."
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem', width: '100%' }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : blocks.length === 0 ? (
        <p>No blocks found. Upload a DXF file first.</p>
      ) : (
        <ul>
          {blocks.map((block) => (
            <li key={block.id} onClick={() => onSelectBlock(block.id)} style={{ cursor: 'pointer' }}>
              {block.name} ({block.x}, {block.y})
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 1rem' }}>Page {page} of {pages}</span>
        <button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default BlockList;
