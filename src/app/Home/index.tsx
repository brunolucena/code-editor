import React from 'react';

import './styles.scss';

import CustomizedTreeView from './CustomizedTreeView';

const Home: React.FC = () => {
  return (
    <div className='home-container'>
      <div className='file-tree-wrapper'>
        <CustomizedTreeView />
      </div>

      <div className='content-wrapper'>content</div>
    </div>
  );
};

export default Home;
