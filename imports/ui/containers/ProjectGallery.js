import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { composeWithTracker } from 'react-komposer';
import Projects from '../../api/projects/projects.js';
import ProjectGallery from '../components/ProjectGallery';
import { Loading } from '../components/Loading.js';

const setPaginationLimit = new ReactiveVar(24);

const composer = ({ filter }, onData) => {
  const query = {
    latest: {},
    popular: {},
    favorites: { 'favoritedBy.userId': this.userId },
    submissions: { owner: this.userId },
  }[filter];

  const projection = {
    latest: { sort: { createdAt: -1 } },
    popular: { sort: { favorites: -1 } },
    favorites: { sort: { 'favoritedBy.favoritedAt': -1 } },
    submissions: { sort: { createdAt: -1 } },
  }[filter];

  const paginationLimit = setPaginationLimit.get();
  const subscription = Meteor.subscribe('projects', query, projection, paginationLimit);

  if (subscription.ready()) {
    const projects = Projects.find(query, projection).fetch();
    setTimeout(() => {
      onData(null, { projects, filter, setPaginationLimit, paginationLimit });
    }, 500);
  }
};

export default composeWithTracker(composer, Loading)(ProjectGallery);
