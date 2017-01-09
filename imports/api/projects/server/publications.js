/* eslint-disable new-cap */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Projects from '../projects';

Meteor.publish('projects', (query, projection, paginationLimit) => {
  check(query, Object);
  check(projection, Object);
  check(paginationLimit, Number);

  const projectionToAssign = projection;
  projectionToAssign.limit = paginationLimit;
  return Projects.find(query, projectionToAssign);
});

Meteor.publish('projects.edit', function projectsPublication(_id) {
  check(_id, Match.OneOf(String, undefined, null));
  return Projects.find({ _id, owner: this.userId });
});
