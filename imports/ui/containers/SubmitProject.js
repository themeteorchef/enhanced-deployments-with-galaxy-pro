import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Projects from '../../api/projects/projects';
import SubmitProject from '../components/SubmitProject';
import { Loading } from '../components/Loading.js';

const composer = ({ projectId }, onData) => {
  const subscription = Meteor.subscribe('projects.edit', projectId);

  if (subscription.ready()) {
    const project = Projects.findOne(projectId);
    onData(null, { project });
  }
};

export default composeWithTracker(composer, Loading)(SubmitProject);
