import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Projects from '../projects';
import rateLimit from '../../../modules/rate-limit.js';
import s3 from '../../../modules/server/s3';

const getFileName = image => image.replace('https://s3.amazonaws.com/i-heart-meteor/', '');

export const submitProject = new ValidatedMethod({
  name: 'projects.submit',
  validate: new SimpleSchema({
    title: { type: String },
    url: { type: String },
    createdBy: { type: String },
    image: { type: Object, blackbox: true },
  }).validator(),
  run(project) {
    const projectToInsert = project;
    projectToInsert.owner = this.userId;
    return s3.putObject(project.image)
    .then((image) => {
      if (image) projectToInsert.image = image;
      return Projects.insert(projectToInsert);
    })
    .catch((error) => {
      throw new Meteor.Error('500', `${error}`);
    });
  },
});

export const updateProject = new ValidatedMethod({
  name: 'projects.update',
  validate: new SimpleSchema({
    _id: { type: String },
    title: { type: String },
    url: { type: String },
    createdBy: { type: String },
    image: { type: Object, blackbox: true, optional: true },
  }).validator(),
  run(project) {
    const projectUpdate = project;
    const existingProject = Projects.findOne(project._id, { fields: { owner: 1 } });
    const imageToUpdate = existingProject.image ? null : projectUpdate.image;

    if (this.userId && existingProject.owner === this.userId) {
      const projectId = project._id;
      delete projectUpdate._id;
      return s3.putObject(imageToUpdate)
      .then((image) => {
        if (image) projectUpdate.image = image;
        return Projects.update(projectId, { $set: projectUpdate });
      })
      .catch((error) => {
        throw new Meteor.Error('500', `${error}`);
      });
    }
    throw new Meteor.Error('500', 'Sorry, you\'re not allowed to do that!');
  },
});

export const deleteProjectImage = new ValidatedMethod({
  name: 'projects.deleteImage',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const project = Projects.findOne(_id, { fields: { image: 1 } });
    const fileName = getFileName(project.image);
    return s3.deleteObject(fileName)
    .then(() => Projects.update(_id, { $set: { image: '' } }))
    .catch((error) => {
      throw new Meteor.Error('500', `${error}`);
    });
  },
});

export const deleteProject = new ValidatedMethod({
  name: 'projects.delete',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const project = Projects.findOne(_id, { fields: { owner: 1, image: 1 } });
    const fileName = getFileName(project.image);
    if (this.userId && project.owner === this.userId) {
      return s3.deleteObject(fileName)
      .then(() => Projects.remove(_id))
      .catch((error) => {
        throw new Meteor.Error('500', `${error}`);
      });
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
