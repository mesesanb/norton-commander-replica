import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import {
  setLeftCurrentPath,
  setRightCurrentPath,
  setLeftFiles,
  setRightFiles,
  setLeftSelectedFile,
  setRightSelectedFile,
  setLeftSelectedFileInfo,
  setRightSelectedFileInfo,
  setLeftPanelConfig,
  setRightPanelConfig,
} from './store/appSlice';
import Breadcrumbs from './components/Breadcrumbs';
import Panel from './components/Panel';
import Button from './components/Button';
import { getFiles, getFileDetails } from './helpers/api';

function App() {
  const leftCurrentPath = useSelector((state: RootState) => state.app.leftCurrentPath);
  const rightCurrentPath = useSelector((state: RootState) => state.app.rightCurrentPath);
  const leftFiles = useSelector((state: RootState) => state.app.leftFiles);
  const rightFiles = useSelector((state: RootState) => state.app.rightFiles);
  const leftSelectedFile = useSelector((state: RootState) => state.app.leftSelectedFile);
  const rightSelectedFile = useSelector((state: RootState) => state.app.rightSelectedFile);
  const leftSelectedFileInfo = useSelector((state: RootState) => state.app.leftSelectedFileInfo);
  const rightSelectedFileInfo = useSelector((state: RootState) => state.app.rightSelectedFileInfo);
  const leftPanelConfig = useSelector((state: RootState) => state.app.leftPanelConfig);
  const rightPanelConfig = useSelector((state: RootState) => state.app.rightPanelConfig);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadLeftFiles = async () => {
      const fetchedFiles = await getFiles(leftCurrentPath);
      dispatch(setLeftFiles(fetchedFiles));
    };
    loadLeftFiles();
  }, [leftCurrentPath, dispatch]);

  useEffect(() => {
    const loadRightFiles = async () => {
      const fetchedFiles = await getFiles(rightCurrentPath);
      dispatch(setRightFiles(fetchedFiles));
    };
    loadRightFiles();
  }, [rightCurrentPath, dispatch]);

  useEffect(() => {
    const loadLeftFileDetails = async () => {
      if (leftSelectedFile) {
        const details = await getFileDetails(leftSelectedFile);
        dispatch(setLeftSelectedFileInfo(details));
      }
    };
    loadLeftFileDetails();
  }, [leftSelectedFile, dispatch]);

  useEffect(() => {
    const loadRightFileDetails = async () => {
      if (rightSelectedFile) {
        const details = await getFileDetails(rightSelectedFile);
        dispatch(setRightSelectedFileInfo(details));
      }
    };
    loadRightFileDetails();
  }, [rightSelectedFile, dispatch]);

  const handleLeftFileClick = async (name: string) => {
    const newPath = leftCurrentPath + name + '/';
    dispatch(setLeftCurrentPath(newPath));
    dispatch(setLeftSelectedFile(name));
  };

  const handleRightFileClick = async (name: string) => {
    const newPath = rightCurrentPath + name + '/';
    dispatch(setRightCurrentPath(newPath));
    dispatch(setRightSelectedFile(name));
  };

  return (
    <div className="bg-nortonBackground text-nortonText min-h-screen font-dos">
      <div className="container mx-auto p-4 ">
        <Breadcrumbs path={leftCurrentPath} />
        <Breadcrumbs path={rightCurrentPath} />
        <div className="flex min-h-[550px] min-w-full">
          <Panel
            config={leftPanelConfig}
            currentPath={leftCurrentPath}
            files={leftFiles}
            selectedFile={leftSelectedFile}
            setSelectedFile={(name: string | null) => dispatch(setLeftSelectedFile(name))}
            setCurrentPath={(path: string) => dispatch(setLeftCurrentPath(path))}
            handleFileClick={handleLeftFileClick}
          />
          <Panel
            config={rightPanelConfig}
            currentPath={rightCurrentPath}
            files={rightFiles}
            selectedFile={rightSelectedFile}
            setSelectedFile={(name: string | null) => dispatch(setRightSelectedFile(name))}
            setCurrentPath={(path: string) => dispatch(setRightCurrentPath(path))}
            handleFileClick={handleRightFileClick}
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-4">
            <Button
              text="FILE LIST"
              onClick={() => dispatch(setLeftPanelConfig({ content: 'fileList' }))}
              className="mr-2"
            />
            <Button
              text="FILE TREE"
              onClick={() => dispatch(setLeftPanelConfig({ content: 'fileTree' }))}
              className="mr-2"
            />
            <Button text="FILE DETAILS" onClick={() => dispatch(setLeftPanelConfig({ content: 'fileDetails' }))} />
          </div>
          <div className="mt-4">
            <Button
              text="FILE LIST"
              onClick={() => dispatch(setRightPanelConfig({ content: 'fileList' }))}
              className="mr-2"
            />
            <Button
              text="FILE TREE"
              onClick={() => dispatch(setRightPanelConfig({ content: 'fileTree' }))}
              className="mr-2"
            />
            <Button text="FILE DETAILS" onClick={() => dispatch(setRightPanelConfig({ content: 'fileDetails' }))} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
