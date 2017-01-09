/* eslint-disable new-cap */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Projects from '../projects';

Meteor.publish('projects', function projectsPublication(query, projection, paginationLimit) {
  check(query, Object);
  check(projection, Object);
  check(paginationLimit, Number);

  const queryToAssign = query;
  const projectionToAssign = projection;

  const isFavorites = queryToAssign['favoritedBy.userId'];
  const isSubmissions = queryToAssign.owner;

  if (isFavorites) queryToAssign['favoritedBy.userId'] = this.userId;
  if (isSubmissions) queryToAssign.owner = this.userId;

  projectionToAssign.limit = paginationLimit;
  return Projects.find(queryToAssign, projectionToAssign);
});

Meteor.publish('projects.edit', function projectsPublication(_id) {
  check(_id, Match.OneOf(String, undefined, null));
  return Projects.find({ _id, owner: this.userId });
});
