import React, { Component } from 'react';

export default class UserSetting extends Component {
  render() {
    const user = this.props.user;

    if (user == null) {
      return null;
    } else {
      return (
        <ul>
          <li><img src={user.imageUrl} /></li>
          <li>{user.name}</li>
          <li>
            {user.setting.language} / {user.setting.currencyCode}
          </li>
          <li>
            {user.setting.startDate} / {user.setting.startDateSkipOption}
          </li>
        </ul>
      );
    }
  }
}
