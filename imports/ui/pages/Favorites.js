import React from 'react';
import ProjectGallery from '../containers/ProjectGallery';

const Favorites = () => (
  <div className="Favorites">
    <h4 className="page-header">Favorites</h4>
    <ProjectGallery filter="favorites" />
  </div>
);

Favorites.propTypes = {};

export default Favorites;
