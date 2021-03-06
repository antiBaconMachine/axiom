import React from 'react';
import renderer from 'react-test-renderer';
import { ChartKeyItem } from 'bw-axiom';

function getComponent() {
  return renderer.create(
    <ChartKeyItem label="Ipsum">Lorem</ChartKeyItem>
  );
}

describe('ChartKeyItem', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
