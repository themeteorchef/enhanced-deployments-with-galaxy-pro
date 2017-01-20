import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/AppNavigation.js';
import SubmitProject from '../containers/SubmitProject';
import TMCCTA from '../components/TMCCTA';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSubmitProject: false, projectId: null, hasVisited: false };
    this.hideSubmitProject = this.hideSubmitProject.bind(this);
    this.showSubmitProject = this.showSubmitProject.bind(this);
    this.setHasVisited = this.setHasVisited.bind(this);
  }

  hideSubmitProject() {
    this.setState({ showSubmitProject: false });
  }

  showSubmitProject(projectId) {
    this.setState({ showSubmitProject: true, projectId });
  }

  setHasVisited() {
    this.setState({ hasVisited: true });

    if (window && window.localStorage) {
      window.localStorage.setItem('ilovemeteorcom_hasVisited', true);
    }
  }

  componentDidMount() {
    if (window && window.localStorage) {
      this.setState({ hasVisited: window.localStorage.getItem('ilovemeteorcom_hasVisited') });
    }
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
      <TMCCTA
        hasVisited={ this.state.hasVisited }
        setHasVisited={ this.setHasVisited }
      />
    </div>);
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
