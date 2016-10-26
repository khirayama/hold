import React, {Component, PropTypes} from 'react';

import UserSetting from '../components/user-setting';
import Link from '../components/link';

import {startPage} from 'actions/app-action-creators';

export default class SettingPage extends Component {
  componentDidMount() {
    startPage();
  }
  render() {
    const state = this.props.state;
    const key = '_setting-page';

    if (!state.ready) {
      return <div key={key} className="page setting-page"></div>;
    }

    return (
      <div key={key} className="page setting-page">
        <Link href="/dashboard">Back</Link>
        <section className="setting-page-content">
          <h2>Setting</h2>
          <UserSetting user={state.user}/>
          <a href="/logout">Sign out</a>
        </section>
      </div>
    );
  }
}

SettingPage.propTypes = {
  state: PropTypes.object.isRequired,
};
