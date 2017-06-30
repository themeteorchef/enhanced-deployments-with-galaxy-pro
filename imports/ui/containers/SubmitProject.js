import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Projects from '../../api/projects/projects';
import SubmitProject from '../components/SubmitProject';
import { Loading } from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('projects.edit', params.projectId);

  if (subscription.ready()) {
    const project = Projects.findOne(params.projectId);
    onData(null, { project });
  }
};

export default composeWithTracker(composer, Loading)(SubmitProject);
