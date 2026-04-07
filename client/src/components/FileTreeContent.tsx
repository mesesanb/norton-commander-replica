import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setLeftExpandedItems, setRightExpandedItems } from '../store/appSlice';
import { fetchFiles } from '../helpers/api';
import { FileInfo } from '../types/types';

// module-level cache: avoids refetching when a dir is collapsed and re-expanded
const directoryCache: Record<string, FileInfo[]> = {};

interface FileTreeContentProps {
  panel: 'left' | 'right';
  currentPath: string;
}

const FileTreeContent: React.FC<FileTreeContentProps> = ({ panel, currentPath }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // expanded state is panel-specific and lives in redux
  const expandedItems = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftExpandedItems : state.app.rightExpandedItems,
  );

  // fetch directory contents on mount, skip if already cached
  useEffect(() => {
    if (directoryCache[currentPath]) {
      setFiles(directoryCache[currentPath]);
      return;
    }

    setLoading(true);
    fetchFiles(currentPath)
      .then((data: FileInfo[]) => {
        directoryCache[currentPath] = data;
        setFiles(data);
      })
      .catch(() => setError('failed to load directory'))
      .finally(() => setLoading(false));
  }, [currentPath]);

  // toggle expand/collapse for a directory path
  const toggleExpand = (path: string) => {
    const updated = { ...expandedItems, [path]: !expandedItems[path] };
    if (panel === 'left') {
      dispatch(setLeftExpandedItems(updated));
    } else {
      dispatch(setRightExpandedItems(updated));
    }
  };

  if (loading) return <div className="text-nortonText p-1">loading...</div>;
  if (error) return <div className="text-nortonInfo p-1">{error}</div>;

  return (
    <div className="font-mono text-sm bg-nortonBackground">
      {files.map((item, index) => {
        const isLast = index === files.length - 1;
        const connector = isLast ? '└─ ' : '├─ ';
        const isExpanded = expandedItems[item.fullPath];

        return (
          <div key={item.fullPath} className="bg-nortonBackground">
            <div
              onClick={() => item.type === 'directory' && toggleExpand(item.fullPath)}
              className={`hover:bg-nortonButton hover:text-black ${
                item.type === 'directory' ? 'cursor-pointer text-nortonButton' : 'text-nortonText'
              }`}>
              {connector}
              {item.name}
            </div>

            {/* recursively render children when the directory is expanded */}
            {item.type === 'directory' && isExpanded && (
              <div className="ml-4">
                <FileTreeContent panel={panel} currentPath={item.fullPath} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FileTreeContent;
