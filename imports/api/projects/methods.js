import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Projects from './projects';
import rateLimit from '../../modules/rate-limit.js';

export const submitProject = new ValidatedMethod({
  name: 'projects.submit',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    url: { type: String, optional: true },
    description: { type: String, optional: true },
  }).validator(),
  run(project) {
    const projectToInsert = project;
    projectToInsert.owner = this.userId;
    return Projects.insert(projectToInsert);
  },
});

export const updateProject = new ValidatedMethod({
  name: 'projects.update',
  validate: new SimpleSchema({
    _id: { type: String },
    title: { type: String },
    url: { type: String },
    description: { type: String },
  }).validator(),
  run(project) {
    const projectUpdate = project;
    const existingProject = Projects.findOne(project._id, { fields: { owner: 1 } });
    if (this.userId && existingProject.owner === this.userId) {
      const projectId = project._id;
      delete projectUpdate._id;
      return Projects.update(projectId, { $set: projectUpdate });
    }
    throw new Meteor.Error('500', 'Sorry, you\'re not allowed to do that!');
  },
});

export const deleteProject = new ValidatedMethod({
  name: 'projects.delete',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const project = Projects.findOne(_id, { fields: { owner: 1 } });
    if (this.userId && project.owner === this.userId) {
      return Projects.remove(_id);
    }
    throw new Meteor.Error('500', 'Sorry, you\'re not allowed to do that!');
  },
});

export const favoriteProject = new ValidatedMethod({
  name: 'projects.favorite',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    try {
      const isFavorited = Projects.findOne({ _id, 'favoritedBy.userId': this.userId });

      if (isFavorited) {
        Projects.update(_id, {
          $inc: { favorites: -1 },
          $pull: { favoritedBy: { userId: this.userId } },
        });
      } else {
        Projects.update(_id, {
          $inc: { favorites: 1 },
          $addToSet: {
            favoritedBy: { userId: this.userId, favoritedAt: (new Date()).toISOString() },
          },
        });
      }
    } catch (exception) {
      console.warn(exception);
    }
  },
});

rateLimit({
  methods: [
    favoriteProject,
  ],
  limit: 5,
  timeRange: 1000,
});
