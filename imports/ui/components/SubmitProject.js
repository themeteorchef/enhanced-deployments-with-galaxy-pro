import React from 'react';
import { Row, Col, Modal, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { deleteProject } from '../../api/projects/methods';
import handleSubmitProject from '../../modules/submit-project.js';

export default class SubmitProject extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  deleteProject(event) {
    if (confirm('Are you sure? This is permanent!')) {
      deleteProject.call({ _id: this.props.project._id }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Poof! Project deleted.', 'success');
        }
      });
    }
  }

  close() {
    this.props.onHide();
    this.setState({ showModal: true });
  }

  componentDidMount() {
    handleSubmitProject({ component: this });
  }

  render() {
    const { project, show } = this.props;
    const title = project ? 'Edit Project' : 'Submit a Project';
    return (<Modal show={ show } onHide={ this.close }>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <form
        ref={submitProjectForm => (this.submitProjectForm = submitProjectForm)}
        onSubmit={event => event.preventDefault()}
      >
        <Modal.Body>
          { project && project.image ? <div className="ProjectPreview">
            <img src={ project.image } alt={ project && project.title } />
          </div> : '' }
          <Row>
            <Col xs={ 12 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <input
                  type="text"
                  ref={projectTitle => (this.projectTitle = projectTitle)}
                  name="title"
                  defaultValue={ project && project.title }
                  className="form-control"
                  placeholder="TacoFinder"
                />
              </FormGroup>
            </Col>
            <Col xs={ 12 } sm={ 6 }>
              <FormGroup>
                <ControlLabel>Created By</ControlLabel>
                <input
                  type="text"
                  ref={projectCreatedBy => (this.projectCreatedBy = projectCreatedBy)}
                  name="createdBy"
                  defaultValue={ project && project.projectCreatedBy }
                  className="form-control"
                  placeholder="Doug Funnie"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <ControlLabel>Project URL</ControlLabel>
            <input
              type="text"
              ref={projectUrl => (this.projectUrl = projectUrl)}
              name="url"
              defaultValue={ project && project.url }
              className="form-control"
              placeholder="https://tacofinder.com"
            />
            <p className="form-hint">Must include protocol (http:// or https://).</p>
          </FormGroup>
          <ControlLabel>Description</ControlLabel>
          <textarea
            ref={projectDescription => (this.projectDescription = projectDescription)}
            name="description"
            defaultValue={ project && project.description }
            className="form-control"
            placeholder="e.g., TacoFinder helps you find the best tacos in your neighborhood."
          />
        </Modal.Body>
        <Modal.Footer>
          { project ?
            <a href="#" onClick={ this.deleteProject }>Delete Project</a> :
            '' }
          <Button onClick={ this.close }>Nevermind</Button>
          <Button type="submit" bsStyle="success">Submit Project</Button>
        </Modal.Footer>
      </form>
    </Modal>);
  }
}

SubmitProject.propTypes = {
  project: React.PropTypes.object,
  show: React.PropTypes.bool,
  onHide: React.PropTypes.func,
};
