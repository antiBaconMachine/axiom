import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ExampleConfig } from 'style-guide';
import { MirroredColumnChart, Heading, Weak } from 'bw-axiom';
import ContextDemoComponent from './ContextDemoComponent';
import { data, chartKey } from './data';

export default class MirroredColumnChartExample extends Component {
  static propTypes = {
    components: PropTypes.shape({
      MirroredColumnChart: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { components } = this.props;

    const propTypes = {
      MirroredColumnChart: components.MirroredColumnChart,
    };

    const initialProps = {
      MirroredColumnChart: {
        ContextComponent: ContextDemoComponent,
        chartKey,
        data,
        height: '10rem',
        label: (
          <Heading style="display">
            <Weak>57%</Weak>
          </Heading>
        ),
        labelColumnWidth: '10rem',
        reflectionData: data,
        reflectionLabel: (
          <Heading style="display">
            <Weak>67%</Weak>
          </Heading>
        ),
      },
    };

    return (
      <ExampleConfig
          initialProps={ initialProps }
          propTypes={ propTypes }>
        <MirroredColumnChart { ...initialProps.MirroredColumnChart }  />
      </ExampleConfig>
    );
  }
}