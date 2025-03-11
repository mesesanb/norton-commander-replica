import React from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { extractDateTime, extractFileNameAndExtension, formatSize } from '../helpers/helpers';

interface FileDetailsContentProps {
  panel: 'left' | 'right';
}

const FileDetailsContent: React.FC<FileDetailsContentProps> = ({ panel }) => {
  // select file info from the redux store
  const fileInfo = useSelector((state: RootState) =>
    panel === 'left' ? state.app.rightSelectedFileInfo : state.app.leftSelectedFileInfo,
  );
  const leftPanelConfig = useSelector((state: RootState) => state.app.leftPanelConfig);

  if (!fileInfo) {
    return (
      <div className="flex justify-center items-center h-full text-nortonInfo">Select a file to view details.</div>
    );
  }

  const { date: creationDate, time: creationTime } = extractDateTime(fileInfo.creationDate);
  const { date: lastModifiedDate, time: lastModifiedTime } = extractDateTime(fileInfo.lastModifiedDate);
  const formattedSize = fileInfo.size ? formatSize(fileInfo.size, 'list') : 'n/a';
  const [fileName, fileExtension] = extractFileNameAndExtension(fileInfo.name);

  return (
    <>
      {/* display info header */}
      <div
        className={`absolute -top-2 ${
          panel === 'left' ? 'left-1/4' : 'left-3/4'
        } transform -translate-x-1/2 max-w-[450px] text-center z-20 px-1 ${
          panel === (leftPanelConfig.active ? 'left' : 'right')
            ? 'bg-nortonText text-nortonBackground'
            : 'bg-nortonBackground text-nortonInfo'
        }`}>
        INFO
      </div>
      <div className="p-2 flex flex-col justify-center h-full">
        <div className="border-b border-gray-400 mb-1"></div>
        <div className="flex justify-between items-center">
          <span className="text-nortonInfo">name:</span>
          <span className="text-right">
            {fileName}
            {fileExtension && `.${fileExtension}`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-nortonInfo">type:</span>
          <span className="text-right">{fileInfo.type}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-nortonInfo">size:</span>
          <span className="text-right">{formattedSize}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-nortonInfo">created:</span>
          <span className="text-right">
            {creationDate} {creationTime}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-nortonInfo">modified:</span>
          <span className="text-right">
            {lastModifiedDate} {lastModifiedTime}
          </span>
        </div>
        <div className="border-t border-gray-400 mt-1"></div>
      </div>
    </>
  );
};

export default FileDetailsContent;
