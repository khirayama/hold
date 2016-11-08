import React, {PropTypes} from 'react';

import UserSetting from 'views/desktop/components/user-setting';

import Link from 'views/universal/components/link';

export default function SettingPage(props) {
  const state = props.state;
  const key = '_setting-page';

  return (
    <div key={key} className="page setting-page">
      <div className="back-button">
        <Link href="/dashboard"><span className="icon">arrow_back</span></Link>
      </div>
      <section className="setting-page-content">
        <UserSetting user={state.user}/>
        <a className="link" href="/logout">Sign out</a>
      </section>
    </div>
  );
}

SettingPage.propTypes = {
  state: PropTypes.object.isRequired,
};
