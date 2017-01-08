import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';
import { submitProject, updateProject } from '../api/projects/methods';

let component;

const handleSubmit = () => {
  let method = submitProject;
  const project = {
    title: component.projectTitle.value,
    url: component.projectUrl.value,
    description: component.projectDescription.value,
    createdBy: component.projectCreatedBy.value,
  };

  if (this.props.project) {
    method = updateProject;
    project._id = component.props.project._id;
  }

  method.call(project, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Project submitted! Thanks for sharing.', 'success');
    }
  });
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
