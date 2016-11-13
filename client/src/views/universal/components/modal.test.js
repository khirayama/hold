import test from 'ava';

import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Modal from './modal';
import IconButton from './icon-button';

test('<Modal /> > renders an modal', t => {
  const children = [React.createElement('div', {key: 'children', className: 'modal-children'})];
  const props = {children};
  const wrapper = shallow(React.createElement(Modal, props));
  t.is(wrapper.find('.modal-mask').length, 1);
  t.is(wrapper.find('.modal').length, 1);
  t.true(wrapper.contains(children));
});

test('<Modal /> > simulates click close button event', t => {
  const props = {children: [React.createElement('div', {key: 'children', className: 'modal-children'})]};
  const handleClickCloseButton = sinon.spy(Modal.prototype, '_handleClickCloseButton');
  const wrapper = shallow(React.createElement(Modal, props));
  wrapper.find(IconButton).simulate('click');
  t.is(handleClickCloseButton.callCount, 1);
  handleClickCloseButton.restore();
});
