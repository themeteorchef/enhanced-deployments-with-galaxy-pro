import React, { PropTypes } from 'react';

const TMCCTA = ({ hasVisited, setHasVisited }) => {
  const tutorialLink = "https://themeteorchef.com/tutorials/deploying-with-meteor-galaxy?utm_source=ilovemeteor.com?utm_medium=demo";
  return (
    <div className={`TMCCTA ${hasVisited ? 'has-visited' : ''}`}>
      <i
        className="fa fa-remove"
        onClick={ setHasVisited }
      />
      <p className="title">Learn how to deploy your own Meteor app!</p>
      <p className="subtitle">I &hearts; Meteor is provided as a supplement to <a href={ tutorialLink } onClick={ setHasVisited } target="_blank">Deploying with Meteor Galaxy</a>.</p>
      <a
        className="btn btn-success"
        href={ tutorialLink }
        onClick={ setHasVisited }
        target="_blank"
      >
        Read the Tutorial
      </a>
      <div className="presented-by">
        <p>
          <span>Presented by</span>
          <a target="_blank" href="https://themeteorchef.com">
            <img
              src="https://s3.amazonaws.com/tmc-site-assets/graphics/logo-red.svg"
              alt="The Meteor Chef"
            />
          </a>
        </p>
      </div>
    </div>
  );
}

export default TMCCTA
