import React from 'react';
import ProjectGallery from '../containers/ProjectGallery';

const Popular = () => (
  <div className="Popular">
    <h4 className="page-header">Popular</h4>
    <ProjectGallery filter="popular" />
  </div>
);

Popular.propTypes = {};

export default Popular;
