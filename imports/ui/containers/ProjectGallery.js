import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { composeWithTracker } from 'react-komposer';
import Projects from '../../api/projects/projects.js';
import ProjectGallery from '../components/ProjectGallery';
import Loading from '../components/Loading.js';

const setPaginationLimit = new ReactiveVar(24);

const composer = ({ filter }, onData) => {
  const paginationLimit = setPaginationLimit.get();
  const subscription = Meteor.subscribeWithPagination('projects', filter, paginationLimit);

  if (subscription.ready()) {
    const projects = Projects.find().fetch();
    setTimeout(() => {
      onData(null, { projects, filter, setPaginationLimit, paginationLimit });
    }, 500);
  }
};

export default composeWithTracker(composer, Loading)(ProjectGallery);
