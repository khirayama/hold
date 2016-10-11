import React from 'react';

import UserSetting from './user-setting';

import { changeHistory } from '../../actions/app-action-creators';


export default function Setting(props) {
  const state = props.state;

  return (
    <div>
      <span onClick={() => changeHistory('/dashboard')}>Dashboard</span>
      <section className="setting">
        <h2>Setting</h2>
        <UserSetting user={state.user} />
        <a href="/logout">Sign out</a>
      </section>
    </div>
  );
}
