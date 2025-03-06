import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import FileListContent from './FileListContent';
import FileTreeContent from './FileTreeContent';
import FileDetailsContent from './FileDetailsContent';
import { setLeftCurrentPath, setRightCurrentPath, setLeftSelectedFile, setRightSelectedFile } from '../store/appSlice';

interface PanelProps {
  panel: 'left' | 'right';
}

const Panel: React.FC<PanelProps> = ({ panel }) => {
  const dispatch = useDispatch<AppDispatch>();

  const config = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftPanelConfig : state.app.rightPanelConfig,
  );
  const currentPath = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftCurrentPath : state.app.rightCurrentPath,
  );
  const files = useSelector((state: RootState) => (panel === 'left' ? state.app.leftFiles : state.app.rightFiles));
  const selectedFile = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftSelectedFile : state.app.rightSelectedFile,
  );

  const handleFileClick = async (name: string) => {
    const newPath = currentPath + name + '/';
    if (panel === 'left') {
      dispatch(setLeftCurrentPath(newPath));
      dispatch(setLeftSelectedFile(name));
    } else {
      dispatch(setRightCurrentPath(newPath));
      dispatch(setRightSelectedFile(name));
    }
  };

  let contentComponent;

  switch (config.content) {
    case 'fileList':
      contentComponent = (
        <FileListContent
          files={files}
          onFileClick={handleFileClick}
          selectedFile={selectedFile}
          setSelectedFile={(name: string | null) =>
            panel === 'left' ? dispatch(setLeftSelectedFile(name)) : dispatch(setRightSelectedFile(name))
          }
        />
      );
      break;
    case 'fileTree':
      contentComponent = <FileTreeContent />;
      break;
    case 'fileDetails':
      contentComponent = <FileDetailsContent />;
      break;
    default:
      contentComponent = (
        <FileListContent
          files={files}
          onFileClick={handleFileClick}
          selectedFile={selectedFile}
          setSelectedFile={(name: string | null) =>
            panel === 'left' ? dispatch(setLeftSelectedFile(name)) : dispatch(setRightSelectedFile(name))
          }
        />
      );
  }

  return <div className="w-1/2 min-h-full bg-gray-900 text-white p-2">{contentComponent}</div>;
};

export default Panel;
