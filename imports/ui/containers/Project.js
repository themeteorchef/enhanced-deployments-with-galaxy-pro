import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Projects from '../../api/projects/projects';
import Project from '../components/Project.js';
import { Loading } from '../components/Loading.js';

const composer = ({ project }, onData) => {
  const isFavorited = Projects.findOne({
    _id: project._id,
    'favoritedBy.userId': Meteor.userId(),
  });

  onData(null, { isFavorited: !!isFavorited });
};

export default composeWithTracker(composer, Loading)(Project);
