import React, {Component} from 'react';

import FlatSelect from './flat-select';

import {updateUserSetting} from 'actions/user-setting-action-creators';

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
        addedClassName="size__spread"
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
      <section>
        <div><img src={user.imageUrl} alt="user"/></div>
        <h3>{user.name}</h3>
        <table>
          <tbody>
            <tr>
              <th>language</th>
              <td>{this._createSelectElement(user.setting.languages, this.state.language, 'language')}</td>
            </tr>
            <tr>
              <th>currencyCode</th>
              <td>{this._createSelectElement(user.setting.currencyCodes, this.state.currencyCode, 'currencyCode')}</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

UserSetting.propTypes = {
  user: React.PropTypes.object.isRequired,
};
