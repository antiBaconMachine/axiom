import React from 'react';
import renderer from 'react-test-renderer';
import { Bars, Bar } from 'bw-axiom';

function getComponent(props = {}) {
  return renderer.create(
    <Bars { ...props }>
      <Bar percent={ 50 } />
    </Bars>
  );
}

describe('Bars', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('renders with direction', () => {
    ['up', 'down', 'left', 'right'].forEach((direction) => {
      it(direction, () => {
        const component = getComponent({ direction });
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  it('renders with label', () => {
    const component = getComponent({ label: 'Lorem' });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
