import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { mockFileSystem } from '../mockData';
import { setLeftExpandedItems, setRightExpandedItems } from '../store/appSlice';
import { FileInfo } from '../types/types';

interface FileTreeContentProps {
  panel: 'left' | 'right';
  currentPath: string;
}

const FileTreeContent: React.FC<FileTreeContentProps> = ({ panel, currentPath }) => {
  const dispatch = useDispatch();

  // select expanded items from the redux store
  const expandedItems = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftExpandedItems : state.app.rightExpandedItems,
  );

  // toggle the expanded state of a directory
  const toggleExpand = (itemPath: string) => {
    const newExpandedItems = { ...expandedItems, [itemPath]: !expandedItems[itemPath] };
    if (panel === 'left') {
      dispatch(setLeftExpandedItems(newExpandedItems));
    } else {
      dispatch(setRightExpandedItems(newExpandedItems));
    }
  };

  const isRoot = currentPath === '/';
  const files = mockFileSystem[currentPath] || [];

  // render a single tree item
  const renderTreeItem = (item: FileInfo, isLast: boolean, depth: number) => {
    const newPath = isRoot ? `/${item.name}` : `${currentPath}/${item.name}`;
    const indentation = '  '.repeat(depth);
    const connector = isLast ? '└─ ' : '├─ ';

    return (
      <div key={item.name + item.creationDate} className="bg-nortonBackground">
        <div
          onClick={() => {
            if (item.type === 'directory') {
              toggleExpand(newPath);
            }
          }}
          className={` hover:bg-nortonButton hover:text-black ${
            item.type === 'directory' ? 'text-nortonButton' : 'text-nortonText'
          }`}>
          {indentation}
          {connector}
          {item.name}
        </div>
        {item.type === 'directory' && expandedItems[newPath] && (
          <div className="ml-4">
            <FileTreeContent panel={panel} currentPath={newPath} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-mono text-sm text-nortonText bg-nortonBackground h-full">
      {files.map((item, index) => {
        const isLast = index === files.length - 1;
        return renderTreeItem(item, isLast, 0);
      })}
    </div>
  );
};

export default FileTreeContent;
