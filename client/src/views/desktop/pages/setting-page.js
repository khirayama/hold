import React from 'react';

import UserSetting from '../components/user-setting';
import Link from '../components/link';

export default function SettingPage(props) {
  const state = props.state;

  return (
    <div className="setting-page">
      <Link href="/dashboard">Back</Link>
      <section className="setting-page-content">
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
