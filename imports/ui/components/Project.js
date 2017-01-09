import React from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { favoriteProject } from '../../api/projects/methods.js';

const handleFavoriteProject = (_id) => {
  favoriteProject.call({ _id }, (error) => {
    if (error) Bert.alert(error.reason, 'danger');
  });
};

const Project = ({ project, isFavorited, showSubmitProject }) => (
  <div className="Project">
    <div className="Project-details">
      <a href={ project.url } target="_blank" />
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
          showSubmitProject(project._id);
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
