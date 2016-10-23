import React from 'react';

import UserSetting from './user-setting';

import {changeHistory} from '../../actions/app-action-creators';

import Link from './link';

export default function SettingPage(props) {
  const state = props.state;

  return (
    <div>
      <Link href="/dashboard">Back</Link>
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
