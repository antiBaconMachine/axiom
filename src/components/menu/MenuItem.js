import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Base } from 'bw-axiom';
import './MenuItem.css';

export default class MenuItem extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    disabled: PropTypes.bool,
  };

  render() {
    const { children, active, disabled, ...rest } = this.props;
    const classes = classnames('ax-menu__item', {
      'ax-menu__item--active': active,
      'ax-menu__item--disabled': disabled,
    });

    return (
      <Base
          Component="li"
          className={ classes }
          textSize="headline"
          textStrong={ true }>
        <button { ...rest } className="ax-menu__item-button" disabled={ disabled }>
          { children }
        </button>
      </Base>
    );
  }
}
