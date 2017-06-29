import React from 'react';
import { Row, Col, Modal, Button, FormGroup, ControlLabel } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import handleSubmitProject from '../../modules/submit-project.js';

export default class SubmitProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
    this.close = this.close.bind(this);
    this.deleteProjectImage = this.deleteProjectImage.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  deleteProjectImage(event) {
    if (confirm('Are you sure? This is permanent!')) {
      Meteor.call('projects.deleteImage', { _id: this.props.project._id }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
      });
    }
  }

  deleteProject(event) {
    if (confirm('Are you sure? This is permanent!')) {
      Meteor.call('projects.delete', { _id: this.props.project._id }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          this.props.onHide();
          Bert.alert('Poof! Project deleted.', 'success');
        }
      });
    }
  }

  close() {
    this.props.onHide();
  }

  componentDidMount() {
    handleSubmitProject({ component: this });
  }

  render() {
    const { project, show } = this.props;
    const title = project ? 'Edit Project' : 'Submit a Project';
    return (<Modal className="SubmitProject" show={ show } onHide={ this.close }>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <form
        ref={submitProjectForm => (this.submitProjectForm = submitProjectForm)}
        onSubmit={event => event.preventDefault()}
      >
        <Modal.Body>
          <Row>
            <Col xs={ 12 }>
              {project && project.image ?
                <div className="EditProjectImage">
                  <div className="EditProjectImage-delete" onClick={this.deleteProjectImage}>
                    <i className="fa fa-remove" />
                  </div>
                  <img src={(project && project.image)} alt="Project Image" />
                </div> :
                <FormGroup>
                  <ControlLabel>Image (optional)</ControlLabel>
                  <input
                    type="file"
                    ref={projectImage => (this.projectImage = projectImage)}
                    name="projetImage"
                    className="form-control"
                  />
                  <p className="form-hint">Recommended dimensions 770 (w) x 412 (h).</p>
                </FormGroup>}
            </Col>
          </Row>
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
                  defaultValue={ project && project.createdBy }
                  className="form-control"
                  placeholder="Doug Funnie"
                />
              </FormGroup>
            </Col>
          </Row>
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
        </Modal.Body>
        <Modal.Footer>
          { project ?
            <a
              href="#"
              className="delete-project"
              onClick={ this.deleteProject }
            >Delete Project</a> :
            '' }
          <Button onClick={ this.close }>Nevermind</Button>
          <Button type="submit" bsStyle="success">
            { project ? 'Update Project' : 'Submit Project' }
          </Button>
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
