import test from 'ava';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Modal from './modal';

test('<Modal /> > renders an modal > not show', t => {
  const props = {
    isShown: false,
    onCloseButtonClick: () => {},
    children: [React.createElement('div', {key: 'children', className: 'modal-children'})],
  };
  const wrapper = shallow(React.createElement(Modal, props));
  t.is(wrapper.find('.modal-mask').length, 0);
});

test('<Modal /> > renders an modal > show', t => {
  const children = [React.createElement('div', {key: 'children', className: 'modal-children'})];
  const props = {
    isShown: true,
    onCloseButtonClick: () => {},
    children,
  };
  const wrapper = shallow(React.createElement(Modal, props));
  t.is(wrapper.find('.modal-mask').length, 1);
  t.is(wrapper.find('.modal').length, 1);
  t.true(wrapper.contains(children));
});

test('<Modal /> > simulates click close button event', t => {
  const props = {
    isShown: true,
    onCloseButtonClick: sinon.spy(),
    children: [React.createElement('div', {key: 'children', className: 'modal-children'})],
  };
  const wrapper = shallow(React.createElement(Modal, props));
  wrapper.find('.modal-close-button').simulate('click');
  t.is(props.onCloseButtonClick.callCount, 1);
});