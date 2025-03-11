// extract date and time from an ISO string
export const extractDateTime = (isoString: string): { date: string; time: string } => {
  const date = new Date(isoString);
  const dateString = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const timeString = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    date: dateString,
    time: timeString,
  };
};

// format file size based on the specified place
export const formatSize = (size: number, place: 'list' | 'bottom'): string => {
  if (place === 'bottom') {
    if (size < 1024) return `${size}`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)}`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)}`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)}`;
  } else {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

// extract file name and extension from a file name string
export const extractFileNameAndExtension = (fileName: string): [string, string] => {
  const parts = fileName.split(/\.(?=[^.]+$)/);
  if (parts.length === 2) {
    return [parts[0], parts[1]];
  }
  return [fileName, ''];
};
