import React from 'react';
import { createRoot } from 'react-dom/client';
import CloudinaryUpload from './CloudinaryUpload';

const TestContainer = () => {
  console.log('TestContainer is rendering');
  return (
    <div>
      <CloudinaryUpload />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<TestContainer />);