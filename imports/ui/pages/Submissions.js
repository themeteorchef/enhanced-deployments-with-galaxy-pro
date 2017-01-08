import React from 'react';
import ProjectGallery from '../containers/ProjectGallery';

const Submissions = () => (
  <div className="Submissions">
    <h4 className="page-header">Submissions</h4>
    <ProjectGallery filter="submissions" />
  </div>
);

Submissions.propTypes = {};

export default Submissions;
