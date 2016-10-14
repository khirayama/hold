import React from 'react';

import UserSetting from './user-setting';

import {changeHistory} from '../../actions/app-action-creators';

export default function SettingPage(props) {
  const state = props.state;

  const toDashboard = () => {
    changeHistory('/dashboard');
  };

  return (
    <div>
      <span onClick={toDashboard}>Back</span>
      <section className="setting">
        <h2>Setting</h2>
        <UserSetting user={state.user}/>
        <a href="/logout">Sign out</a>
      </section>
    </div>
  );
}

SettingPage.propTypes = {
  state: React.PropTypes.object.isRequired,
};
