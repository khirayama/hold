import React from 'react';

import UserSetting from './user-setting';


export default function Setting(props) {
  const state = props.state;

  return (
    <div>
      <section className="setting">
        <h2>Setting</h2>
        <UserSetting user={state.user} />
        <a href="/logout">Sign out</a>
      </section>
    </div>
  );
}
