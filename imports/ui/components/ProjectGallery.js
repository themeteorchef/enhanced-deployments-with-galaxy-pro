import React from 'react';
import { Alert } from 'react-bootstrap';
import Project from '../containers/Project';

export default class ProjectGallery extends React.Component {
  notFoundString(filter) {
    return {
      latest: 'Hmm, no projects have been submitted yet!',
      popular: 'Well, this is boring. Nothing seems to be popular right now!',
      favorites: 'You haven\'t favorited anything yet, friend.',
      submissions: 'You haven\'t submitted anything yet, friend.',
    }[filter];
  }

  componentDidMount() {
    const { setPaginationLimit } = this.props;
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1000)) {
        setPaginationLimit.set(this.props.paginationLimit + 24);
      }
    });
  }

  render() {
    const { projects, showSubmitProject, filter } = this.props;
    return (<div className="ProjectGallery">
    { projects.length === 0 ?
      <Alert bsStyle="warning">{ this.notFoundString(filter) }</Alert> :
      projects.map(project => (
        <Project
          showSubmitProject={ showSubmitProject }
          key={ project._id }
          project={ project }
        />
      ))}
    </div>);
  }
}

ProjectGallery.propTypes = {
  projects: React.PropTypes.array,
  filter: React.PropTypes.string,
  setPaginationLimit: React.PropTypes.object,
  paginationLimit: React.PropTypes.number,
  showSubmitProject: React.PropTypes.func,
};
