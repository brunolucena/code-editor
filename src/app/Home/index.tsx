import React from 'react';
import '../../../node_modules/codemirror/lib/codemirror.css';

import './styles.scss';

import CustomizedTreeView from './CustomizedTreeView';
import FileView from './FileView';

const Home: React.FC = () => {
  return (
    <div className='home-container'>
      <div className='file-tree-wrapper'>
        <CustomizedTreeView />
      </div>

      <div className='content-wrapper'>
        <FileView />
      </div>
    </div>
  );
};

export default Home;
