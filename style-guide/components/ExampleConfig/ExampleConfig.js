import PropTypes from 'prop-types';
import React, { Component } from 'react';
import extend from 'deep-extend';
import { Base, Tabset, Tab } from 'bw-axiom';
import { filterRender, filterSnippet } from '../../utils/example-filter';
import renderSnippet, { jsxRender, htmlRender } from '../../utils/render-snippet';
import CodeSnippet from '../CodeSnippet/CodeSnippet';
import ComponentProps from './ComponentProps';
import { basePropTypes, mergeState, render } from './utils';
import './ExampleConfig.css';

export default class ExampleConfig extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialPropOptions: PropTypes.object,
    initialProps: PropTypes.object,
    propTypes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    initialPropOptions: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  setProp(component, prop, value) {
    this.setState(extend({}, this.state, {
      [component]: {
        props: {
          [prop]: value,
        },
      },
    }));
  }

  setPropOption(component, prop, option, value) {
    this.setState(extend({}, this.state, {
      [component]: {
        options: {
          [prop]: {
            [option]: value,
          },
        },
      },
    }));
  }

  render() {
    const { children, initialProps, initialPropOptions, propTypes } = this.props;
    const renderState = mergeState(propTypes, initialProps, initialPropOptions, this.state);
    const baseState = mergeState(basePropTypes, initialProps, initialPropOptions, this.state, true);
    const configState = mergeState(propTypes, initialProps, initialPropOptions, this.state, true);
    const example = render(children, propTypes, renderState);
    const jsxSnippet = renderSnippet(filterSnippet(example), jsxRender);
    const htmlSnippet = renderSnippet(filterSnippet(example), htmlRender);

    return (
      <Base className="dm-example">
        <div className="dm-example__visual">
          { filterRender(example) }
        </div>

        <Tabset>
          <Tab title="Properties">
            { Object.keys(propTypes).map((component) =>
              <ComponentProps
                  baseState={ baseState.Base }
                  component={ component }
                  key={ component }
                  propOptions={ configState[component].options }
                  propTypes={ propTypes[component] }
                  propValues={ configState[component].props }
                  setPropOptionValue={ (...a) => this.setPropOption(component, ...a) }
                  setPropValue={ (...a) => this.setProp(component, ...a) }
                  space="x8" />
            ) }
          </Tab>

          { jsxSnippet && (
            <Tab title="React">
              <CodeSnippet language="jsx">{ jsxSnippet }</CodeSnippet>
            </Tab>
          ) }

          { htmlSnippet && (
            <Tab title="HTML">
              <CodeSnippet language="html">{ htmlSnippet }</CodeSnippet>
            </Tab>
          ) }
        </Tabset>
      </Base>
    );
  }
}
