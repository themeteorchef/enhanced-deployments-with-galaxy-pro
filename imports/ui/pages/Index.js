import React from 'react';
import { browserHistory } from 'react-router';
import TextHeader from '../components/TextHeader';
import ProjectGallery from '../containers/ProjectGallery';

const handleShareProject = (event, user) => {
  event.preventDefault();

  if (user) {
    browserHistory.push('/projects/submit');
  } else {
    browserHistory.push('/signup');
  }
};

const Index = ({ user }) => (
  <div className="Index">
    <TextHeader
      title="What are you building with Meteor?"
      subtitle="I &hearts; Meteor is show and tell for Meteor developers."
      callToAction={{
        onClick(event) { handleShareProject(event, user); },
        label: user ? 'Share a Project' : 'Signup & Share',
      }}
      centered
    />
    <ProjectGallery filter="latest" />
  </div>
);

Index.propTypes = {
  user: React.PropTypes.object,
  showSubmitProject: React.PropTypes.func,
};

export default Index;
