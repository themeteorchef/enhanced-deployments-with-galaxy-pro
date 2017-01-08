/* eslint-disable new-cap */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Projects from '../projects';

Meteor.publish('projects', function projectsPublication(filter, paginationLimit) {
  check(filter, Match.OneOf(String, undefined, null));
  check(paginationLimit, Number);

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

  projection.limit = paginationLimit;
  return Projects.find(query, projection);
});

Meteor.publish('projects.edit', function projectsPublication(_id) {
  check(_id, Match.OneOf(String, undefined, null));
  return Projects.find({ _id, owner: this.userId });
});
