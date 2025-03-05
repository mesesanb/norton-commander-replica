import React from 'react';

interface BreadcrumbsProps {
  path: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  const parts = path.split('/').filter((part) => part !== '');
  const breadcrumbs = ['/'].concat(parts);

  return (
    <div className="mb-4">
      {breadcrumbs.map((part, index) => (
        <span key={index}>
          {part}
          {index < breadcrumbs.length - 1 && ' / '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
