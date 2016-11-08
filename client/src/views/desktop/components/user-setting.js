import React, {Component, PropTypes} from 'react';

import {updateUserSetting} from 'actions/user-setting-action-creators';

import FlatSelect from 'views/universal/components/flat-select';

export default class UserSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: props.user.setting.language,
      currencyCode: props.user.setting.currencyCode,
    };

    this.handleChangeInput = this._handleChangeInput.bind(this);
  }
  _handleChangeInput(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.name;
    const state = {};

    state[key] = value;
    this.setState(state);

    updateUserSetting(Object.assign({}, this.state, state));
  }
  _createSelectElement(items, initialValue = '', name = null) {
    return (
      <FlatSelect
        className="size__spread"
        value={initialValue}
        name={name}
        onChange={this.handleChangeInput}
        >
        {items.map(item => <option key={item} value={item}>{item}</option>)}
      </FlatSelect>
    );
  }
  render() {
    const user = this.props.user;

    if (user === null) {
      return null;
    }
    return (
      <section className="user-setting">
        <div><img className="user-setting-image" src={user.imageUrl} alt="user"/></div>
        <div className="user-setting-name">{user.name}</div>
        <table>
          <tbody>
            <tr>
              <th>Language</th>
              <td>{this._createSelectElement(user.setting.languages, this.state.language, 'language')}</td>
            </tr>
            <tr>
              <th>Currency code</th>
              <td>{this._createSelectElement(user.setting.currencyCodes, this.state.currencyCode, 'currencyCode')}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

UserSetting.propTypes = {
  user: PropTypes.object.isRequired,
};
