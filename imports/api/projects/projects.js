import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Projects = new Mongo.Collection('Projects');

Projects.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Projects.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const ProjectsSchema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the owner of this project.',
  },
  url: {
    type: String,
    label: 'The url of this project.',
  },
  title: {
    type: String,
    label: 'The title of this project.',
  },
  createdBy: {
    type: String,
    label: 'The name of the creator of this project.',
  },
  createdAt: {
    type: String,
    label: 'The name of the creator of this project.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  favorites: {
    type: Number,
    label: 'The number of favorites for this project.',
    defaultValue: 0,
  },
  favoritedBy: {
    type: [Object],
    label: 'The favorites for this project.',
    defaultValue: [],
  },
  'favoritedBy.$.userId': {
    type: String,
    label: 'The ID of the user who favorited this project.',
  },
  'favoritedBy.$.favoritedAt': {
    type: String,
    label: 'The date and time when this project was favorited by the user.',
  },
});

Projects.attachSchema(ProjectsSchema);

export default Projects;
