import _ from 'lodash';
import qs from 'qs';

const redirect_uri = () => encodeURIComponent(`${window.location.protocol}//yux.yuewen.com/yhboss/login?yux_return_url=${window.location.href}`);

const params = {
  client_id: 'yuxyux',
  redirect_uri: redirect_uri('login'),
};

const PASSPORT = {
  loginUrl: `https://sso.yuewen.com/sso/signin`,
  logoutUrl: 'https://sso.yuewen.com/sso/signout',
};

export default {
  /**
   * 登录接口
   * @method login
   * @param args
   */
  login(args = {}) {
    const passedJson = _.merge(
      {},
      params,
      {
        redirect_uri: redirect_uri('login'),
      },
      args
    );
    window.location.href = `${PASSPORT.loginUrl}?${qs.stringify(passedJson)}`
  },
  /*
  * 登出接口
  * @method logout
  * */
  logout() {
    window.location.href = `${window.location.protocol}//yux.yuewen.com/yhboss/logout?yux_return_url=${window.location.href}`;
  },
};
