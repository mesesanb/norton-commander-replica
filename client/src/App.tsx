import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setLeftPanelConfig, setRightPanelConfig } from './store/appSlice';
import Panel from './components/Panel';
import Button from './components/Button';
import AsciiCursor from './components/AsciiCursor';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const rightPanelConfig = useSelector((state: RootState) => state.app.rightPanelConfig);
  const leftPanelConfig = useSelector((state: RootState) => state.app.leftPanelConfig);
  const currentFilePath = useSelector((state: RootState) => state.app.leftCurrentPath);

  return (
    <div className="bg-nortonBackground text-nortonText min-h-screen font-dos cursor-none flex items-center justify-center">
      <div className="container mx-auto p-4 w-[1124px]">
        <div className="flex relative">
          {/* left and right panels */}
          <Panel panel="left" />
          <Panel panel="right" />
        </div>
        {/* breadcrumb as a mock command input */}

        <div className="flex justify-between w-[1108px] bg-black pl-1">
          <span className="text-white">
            {currentFilePath}
            {'>'}
            <input type="text" className="bg-black cursor-none text-white outline-none border-none" />
          </span>
        </div>
        {/* buttons to switch between panels */}
        <div className="flex justify-between w-[1108px] bg-black">
          <div className="bg-black">
            <span className="text-white pl-1">1</span>
            <Button
              text="FILE LIST"
              onClick={() => {
                dispatch(setLeftPanelConfig({ content: 'fileList', active: true }));
                dispatch(setRightPanelConfig({ ...rightPanelConfig, active: false }));
              }}
              className="mr-2"
            />
            <span className="text-white"> 2</span>
            <Button
              text="FILE TREE"
              onClick={() => {
                dispatch(setLeftPanelConfig({ content: 'fileTree', active: true }));
                dispatch(setRightPanelConfig({ ...rightPanelConfig, active: false }));
              }}
              className="mr-2"
            />
            <span className="text-white"> 3</span>
            <Button
              text="FILE DETAILS"
              onClick={() => {
                dispatch(setRightPanelConfig({ content: 'fileDetails', active: true }));
                dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: false }));
              }}
            />
          </div>
          <div className="pr-0.5">
            <span className="text-white"> 4</span>
            <Button
              text="FILE LIST"
              onClick={() => {
                dispatch(setRightPanelConfig({ content: 'fileList', active: true }));
                dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: false }));
              }}
              className="mr-2"
            />
            <span className="text-white"> 5</span>
            <Button
              text="FILE TREE"
              onClick={() => {
                dispatch(setRightPanelConfig({ content: 'fileTree', active: true }));
                dispatch(setLeftPanelConfig({ ...leftPanelConfig, active: false }));
              }}
              className="mr-2"
            />
            <span className="text-white"> 6</span>
            <Button
              text="FILE DETAILS"
              onClick={() => {
                dispatch(setLeftPanelConfig({ content: 'fileDetails', active: true }));
                dispatch(setRightPanelConfig({ ...rightPanelConfig, active: false }));
              }}
            />
          </div>
        </div>
      </div>
      <AsciiCursor />
    </div>
  );
}

export default App;
