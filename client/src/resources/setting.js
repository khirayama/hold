import {EntryResource} from '../libs/micro-resource';

export class SettingResource extends EntryResource {
  constructor() {
    super('/api/v1/setting');
  }
}

export default new SettingResource();
