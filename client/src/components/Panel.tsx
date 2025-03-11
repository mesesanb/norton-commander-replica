import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchFiles } from '../store/appSlice';
import FileListContent from './FileListContent';
import FileTreeContent from './FileTreeContent';
import FileDetailsContent from './FileDetailsContent';

interface PanelProps {
  panel: 'left' | 'right';
}

const Panel: React.FC<PanelProps> = ({ panel }) => {
  const dispatch = useDispatch<AppDispatch>();

  // select panel configuration and current path from the redux store
  const config = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftPanelConfig : state.app.rightPanelConfig,
  );
  const currentPath = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftCurrentPath : state.app.rightCurrentPath,
  );

  const isActive = config.active;

  // fetch files when the panel is active and the content is not 'fileTree'
  useEffect(() => {
    if (isActive && config.content !== 'fileTree') {
      dispatch(fetchFiles({ path: currentPath, panel }));
    }
    // adding currentPath to the dependency array would cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, isActive, panel]);

  // determine which content component to render based on the panel configuration
  let contentComponent;
  switch (config.content) {
    case 'fileList':
      contentComponent = <FileListContent panel={panel} />;
      break;
    case 'fileTree':
      contentComponent = <FileTreeContent panel={panel} currentPath={'/'} />;
      break;
    case 'fileDetails':
      contentComponent = <FileDetailsContent panel={panel} />;
      break;
    default:
      contentComponent = <FileListContent panel={panel} />;
  }

  return (
    <div
      className={`${
        config.content === 'fileTree' ? 'pt-5' : ''
      } w-1/2 mx-0.5 min-w-[550px] max-w-[550px] h-[550px] border-double border-4 border-nortonText bg-nortonBackground overflow-x-hidden overflow-y-auto`}>
      {contentComponent}
    </div>
  );
};

export default Panel;
