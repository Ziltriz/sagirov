import { getAccessToken, getAccessTokenAt, getAccessId } from '@/core/models/User'
import { observable } from 'mobx';

class RootStore {
    states = observable({
      auth: "auth",
      error: '',
      init: false,
      load: false,
      is_auth: false,
      loader: true,
      sidebar: true
    });
  
    user = observable({
      accessToken: getAccessToken(),
      accessTokenAt: getAccessTokenAt(),
      accessId: getAccessId(),
      user: {}
    });

  }
  
  const store = observable(new RootStore());
  export default store;