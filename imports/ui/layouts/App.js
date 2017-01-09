import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/AppNavigation.js';
import SubmitProject from '../containers/SubmitProject';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSubmitProject: false, projectId: null };
    this.hideSubmitProject = this.hideSubmitProject.bind(this);
    this.showSubmitProject = this.showSubmitProject.bind(this);
  }

  hideSubmitProject() {
    this.setState({ showSubmitProject: false });
  }

  showSubmitProject(projectId) {
    this.setState({ showSubmitProject: true, projectId });
  }

  render() {
    return (<div>
      <AppNavigation />
      <Grid>
        {React.cloneElement(this.props.children, {
          hideSubmitProject: this.hideSubmitProject,
          showSubmitProject: this.showSubmitProject,
        })}
      </Grid>
      { this.state.showSubmitProject ? <SubmitProject
        show={ this.state.showSubmitProject }
        onHide={ this.hideSubmitProject }
        projectId={ this.state.projectId }
      /> : '' }
    </div>);
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
