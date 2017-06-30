import browserHistory from 'react-router';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const submitProject = (method, project, image) => {
  if (image) project.image = image; // eslint-disable-line
  Meteor.call(method, project, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push((project._id ? `/projects/${project._id}` : '/'));
      const submitOrUpdate = project._id ? 'updated' : 'submitted';
      Bert.alert(`Project ${submitOrUpdate}! Thanks for sharing.`, 'success');
    }
  });
};

const handleImageUpload = (target, callback) => {
  const reader = new FileReader();
  const file = target.files[0];
  reader.readAsDataURL(file);
  reader.onload = () => { callback({ data: reader.result, name: file.name, type: file.type, size: file.size }); };
};

const handleSubmit = () => {
  let method = 'projects.submit';
  const imageInput = component.projectImage;

  const project = {
    title: component.projectTitle.value,
    url: component.projectUrl.value,
    createdBy: component.projectCreatedBy.value,
  };

  if (component.props.project) {
    method = 'projects.update';
    project._id = component.props.project._id;
  }

  if (imageInput.files.length) {
    handleImageUpload(imageInput, image => submitProject(method, project, image));
  } else {
    submitProject(method, project);
  }
};

const validate = () => {
  $(component.submitProjectForm).validate({
    rules: {
      title: {
        required: true,
      },
      createdBy: {
        required: true,
      },
      url: {
        required: true,
        url: true,
      },
      description: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'A title is required.',
      },
      createdBy: {
        required: 'Who created this project?',
      },
      url: {
        required: 'What is the URL for this project?',
        url: 'Please enter a valid URL.',
      },
      description: {
        required: 'What\'s a description for this project?',
      },
    },
    submitHandler() {
      handleSubmit();
    },
  });
};

export default function handleSubmitProject(options) {
  component = options.component;
  validate();
}
