import React from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

const handleFavoriteProject = (_id) => {
  Meteor.call('projects.favorite', { _id }, (error) => {
    if (error) Bert.alert(error.reason, 'danger');
  });
};

const Project = ({ project, isFavorited, showSubmitProject }) => (
  <div className="Project">
    <div className="Project-details">
      <a href={ project.url } target="_blank" />
      <div className="Project-image">
        <img src={ project.image || 'https://s3.amazonaws.com/i-heart-meteor/ihm-placeholder.png'} alt={project.title} />
      </div>
      <header>
        <h4>{ project.title }</h4>
        <p>by { project.createdBy }</p>
      </header>
    </div>
    <footer>
      <p
        onClick={() => (
          Meteor.userId() ?
          handleFavoriteProject(project._id) :
          browserHistory.push('/signup')
        )}
        className={`favorite ${isFavorited ? 'is-favorited' : ''}`}
      >
        <i className="fa fa-heart" /> { project.favorites }
      </p>
      { Meteor.userId() === project.owner ?
        <a onClick={(event) => {
          event.preventDefault();
          browserHistory.push(`/projects/${project._id}`);
        }} href="#">Edit</a> :
        '' }
    </footer>
  </div>
);

Project.propTypes = {
  project: React.PropTypes.object,
  isFavorited: React.PropTypes.bool,
  showSubmitProject: React.PropTypes.func,
};

export default Project;
