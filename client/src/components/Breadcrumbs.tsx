import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Breadcrumbs: React.FC<{ panel: 'left' | 'right' }> = ({ panel }) => {
  const currentPath = useSelector((state: RootState) =>
    panel === 'left' ? state.app.leftCurrentPath : state.app.rightCurrentPath,
  );

  return (
    <div className="mb-4">
      {currentPath.split('/').map((folder, index) => (
        <span key={index}>{folder}</span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
