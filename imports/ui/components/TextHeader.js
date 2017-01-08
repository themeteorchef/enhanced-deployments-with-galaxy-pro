import React from 'react';
import { Button } from 'react-bootstrap';

const TextHeader = ({ title, subtitle, centered, callToAction }) => (
  <header className={`TextHeader ${centered ? 'text-center' : ''}`}>
    { title ? <h1>{ title }</h1> : '' }
    { subtitle ? <p>{ subtitle }</p> : '' }
    { callToAction ?
      <Button bsStyle="success" onClick={ callToAction.onClick }>
        { callToAction.label }
      </Button> : ''
    }
  </header>
);

TextHeader.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  centered: React.PropTypes.bool,
  callToAction: React.PropTypes.object,
};

export default TextHeader;
