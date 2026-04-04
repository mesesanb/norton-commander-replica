export const fetchFiles = async (path: string) => {
  const response = await fetch(`http://localhost:3001/api/files?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  return response.json();
};

export const fetchFileDetails = async (path: string) => {
  const response = await fetch(`http://localhost:3001/api/file?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch file details');
  }
  return response.json();
};
