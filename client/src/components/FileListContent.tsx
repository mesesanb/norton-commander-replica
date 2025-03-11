import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { FileInfo } from '../types/types';
import { extractDateTime, extractFileNameAndExtension, formatSize } from '../helpers/helpers';
import {
  setLeftCurrentPath,
  setRightCurrentPath,
  setLeftSelectedFile,
  setRightSelectedFile,
  setRightPanelConfig,
  setLeftPanelConfig,
  setLeftSelectedFileInfo,
  setRightSelectedFileInfo,
  fetchFileDetails,
} from '../store/appSlice';

interface FileListProps {
  panel: 'left' | 'right';
}

const FileListContent: React.FC<FileListProps> = ({ panel }) => {
  const dispatch = useDispatch<AppDispatch>();

  // select current path, selected file, and panel files from the redux store
  const currentPath = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftCurrentPath : state.app.rightCurrentPath,
  );
  const selectedFile = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftSelectedFile : state.app.rightSelectedFile,
  );
  const panelFiles = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftPanelData : state.app.rightPanelData,
  );
  const rightPanelConfig = useSelector((state: RootState) => state.app.rightPanelConfig);
  const leftPanelConfig = useSelector((state: RootState) => state.app.leftPanelConfig);

  const isRoot = currentPath === '/';

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const fileListRef = useRef<HTMLDivElement>(null);

  // set selected index when panel files or root status changes
  useEffect(() => {
    setSelectedIndex(isRoot ? null : 0);
  }, [panelFiles, isRoot]);

  // focus on the file list when it is rendered
  useEffect(() => {
    if (fileListRef.current) {
      fileListRef.current.focus();
    }
  }, [fileListRef]);

  // handle file click
  const handleFileClick = (file: FileInfo, index: number) => {
    setSelectedIndex(index);
    const newPath = isRoot ? `${currentPath}${file.name}` : `${currentPath}/${file.name}`;
    if (file.type === 'directory') {
      if (panel === 'left') {
        dispatch(setLeftCurrentPath(newPath));
        dispatch(setLeftSelectedFile(file.name));
        dispatch(setLeftSelectedFileInfo(file));
        dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: true }));
        dispatch(setRightPanelConfig({ ...rightPanelConfig, active: false }));
      } else {
        dispatch(setRightCurrentPath(newPath));
        dispatch(setRightSelectedFile(file.name));
        dispatch(setRightSelectedFileInfo(file));
        dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: false }));
        dispatch(setRightPanelConfig({ ...rightPanelConfig, active: true }));
      }
    } else {
      if (panel === 'left') {
        dispatch(setLeftSelectedFile(newPath));
        dispatch(setLeftSelectedFileInfo(file));
        dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: true }));
        dispatch(setRightPanelConfig({ ...rightPanelConfig, active: false }));
      } else {
        dispatch(setRightSelectedFile(newPath));
        dispatch(setRightSelectedFileInfo(file));
        dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: false }));
        dispatch(setRightPanelConfig({ ...rightPanelConfig, active: true }));
      }
      dispatch(fetchFileDetails({ path: newPath, panel }));
    }
  };

  // handle going up to the parent directory
  const handleGoUp = () => {
    setSelectedIndex(null);
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
    if (panel === 'left') {
      dispatch(setLeftCurrentPath(parentPath));
      dispatch(setLeftSelectedFile(null));
      dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: true }));
      dispatch(setRightPanelConfig({ ...rightPanelConfig, active: false }));
    } else {
      dispatch(setRightCurrentPath(parentPath));
      dispatch(setRightSelectedFile(null));
      dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: false }));
      dispatch(setRightPanelConfig({ ...rightPanelConfig, active: true }));
    }
  };

  // handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!panelFiles) return;
    if (panel === 'left' ? !leftPanelConfig.active : !rightPanelConfig.active) return;

    const fileCount = isRoot ? panelFiles.length : panelFiles.length + 1;

    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex === null ? 0 : prevIndex < fileCount - 1 ? prevIndex + 1 : prevIndex;
        if (newIndex !== null) {
          const file = isRoot ? panelFiles[newIndex] : panelFiles[newIndex - 1];
          if (file) {
            if (panel === 'left') {
              dispatch(setLeftSelectedFile(file.name));
            } else {
              dispatch(setRightSelectedFile(file.name));
            }
          }
        }
        return newIndex;
      });
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex === null ? fileCount - 1 : prevIndex > 0 ? prevIndex - 1 : prevIndex;
        if (newIndex !== null) {
          const file = isRoot ? panelFiles[newIndex] : panelFiles[newIndex - 1];
          if (file) {
            if (panel === 'left') {
              dispatch(setLeftSelectedFile(file.name));
            } else {
              dispatch(setRightSelectedFile(file.name));
            }
          }
        }
        return newIndex;
      });
    } else if (event.key === 'Enter' && selectedIndex !== null) {
      if (!isRoot && selectedIndex === 0) {
        handleGoUp();
      } else {
        const file = isRoot ? panelFiles[selectedIndex] : panelFiles[selectedIndex - 1];
        handleFileClick(file, selectedIndex);
      }
    }
  };

  return (
    <>
      {/* display current path */}
      <div
        className={`absolute -top-2 ${
          panel === 'left' ? 'left-1/4' : 'left-3/4'
        } transform -translate-x-1/2 max-w-[450px] text-center z-20 px-1 ${
          panel === (leftPanelConfig.active ? 'left' : 'right')
            ? 'bg-nortonText text-nortonBackground'
            : 'bg-nortonBackground text-nortonInfo'
        }`}>
        {currentPath.toUpperCase()}
      </div>
      <div
        ref={fileListRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="text-nortonText bg-nortonBackground h-full focus:outline-none relative pt-1">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="text-nortonInfo text-center p-2">Name</div>
          <div className="text-nortonInfo text-center p-2">Size</div>
          <div className="text-nortonInfo text-center p-2">Date</div>
          <div className="text-nortonInfo text-center p-2">Time</div>
        </div>

        {/* go up to parent directory */}
        {!isRoot && (
          <div
            className={`grid grid-cols-[1.5fr_1fr_1fr_1fr] ${
              selectedIndex === 0
                ? 'bg-nortonText text-nortonBackground'
                : 'hover:bg-nortonText hover:text-nortonBackground'
            }`}
            tabIndex={0}
            onClick={handleGoUp}>
            <div className="text-left">..</div>
            <div className="flex items-center justify-center h-full"></div>
            <div className="flex items-center justify-center h-full"></div>
            <div className="flex items-center justify-center h-full"></div>
          </div>
        )}

        {/* display message if folder is empty */}
        {panelFiles.length === 0 && !isRoot && (
          <div className="text-center p-2 text-nortonInfo ">This folder is empty</div>
        )}

        {/* render file list */}
        <div className="h-[410px] overflow-y-auto">
          {' '}
          {panelFiles.map((file: FileInfo, index) => {
            const [fileName, fileExtension] = extractFileNameAndExtension(file.name);

            return (
              <div
                key={file.name + file.creationDate}
                className={`grid grid-cols-[1.5fr_1fr_1fr_1fr] ${
                  selectedIndex === (isRoot ? index : index + 1)
                    ? 'bg-nortonText text-nortonBackground'
                    : 'hover:bg-nortonText hover:text-nortonBackground'
                }`}
                onClick={() => handleFileClick(file, isRoot ? index : index + 1)}
                tabIndex={0}>
                <div className="flex items-center justify-between">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap pl-0.5">{fileName}</span>
                  <span className="text-right">{fileExtension}</span>
                </div>
                <div className="flex items-center justify-center h-full">
                  {file.type === 'directory' ? `►SUB-DIR◄` : formatSize(file.size ?? 0, 'list')}
                </div>
                <div className="flex items-center justify-center h-full">
                  {extractDateTime(file.lastModifiedDate).date}
                </div>
                <div className="flex items-center justify-center h-full">
                  {extractDateTime(file.lastModifiedDate).time}
                </div>
              </div>
            );
          })}{' '}
        </div>

        {/* render vertical lines */}
        {panelFiles.length !== 0 && (
          <div className="absolute inset-y-0 left-[calc(100%-350px)] w-[2px] h-[calc(100%-60px)] bg-nortonText"></div>
        )}
        {panelFiles.length !== 0 && (
          <div className="absolute inset-y-0 left-[calc(100%-250px)] w-[2px] h-[calc(100%-60px)] bg-nortonText"></div>
        )}
        {panelFiles.length !== 0 && (
          <div className="absolute inset-y-0 left-[calc(100%-120px)] w-[2px] h-[calc(100%-60px)] bg-nortonText"></div>
        )}

        {/* render bottom info for file */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] border-t-2 border-nortonText p-2 flex items-center">
          {selectedIndex === 0 && !isRoot ? (
            <div className="text-nortonInfo flex-grow flex items-center justify-between">
              <span className="w-[185px] whitespace-nowrap">..</span>
              <span className="-ml-2 w-[85px] text-center">►UP--DIR◄</span>
              <span>{extractDateTime(panelFiles[0]?.lastModifiedDate).date || '01/01/2025'}</span>
              <span>{extractDateTime(panelFiles[0]?.lastModifiedDate).time || '00:00 AM'}</span>
            </div>
          ) : selectedFile && panelFiles ? (
            <div className="text-nortonInfo flex items-center justify-between">
              <span className="w-[185px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedFile}</span>
              <span className="ml-1 w-[85px] text-center">
                {panelFiles.find((file) => file.name === selectedFile)?.type === 'directory'
                  ? '►SUB-DIR◄'
                  : `${formatSize(panelFiles.find((file) => file.name === selectedFile)?.size ?? 0, 'bottom')}`}
              </span>
              <span className="ml-6 w-[105px] text-center">
                {extractDateTime(panelFiles.find((file) => file.name === selectedFile)?.lastModifiedDate ?? '').date}
              </span>
              <span className="ml-6 w-[105px] text-center">
                {extractDateTime(panelFiles.find((file) => file.name === selectedFile)?.lastModifiedDate ?? '').time}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FileListContent;
