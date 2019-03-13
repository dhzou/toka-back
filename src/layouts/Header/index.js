import React, { PureComponent } from 'react';
import { Spin, Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import styles from './Header.less';
import { withRouter } from 'react-router-dom';

import login from '@/utils/login';

class Header extends PureComponent {
  state = {
    visible: true,
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      login.logout();
      return;
    }
  };

  render() {

    const { userInfo } = this.props
    const currentUser = userInfo || {}

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header style={{padding: 0}}>
        <div className={styles.header}>
          <div className={styles.right}>
            {
              currentUser.userId ?
                (
                  <Dropdown overlay={menu}>
                    <span className={`${styles.action} ${styles.account}`}>
                      <Avatar
                        size="small"
                        className={styles.avatar}
                        src={currentUser.avatar}
                        alt="avatar"
                      />
                      <span className={styles.name}>{currentUser.user}</span>
                    </span>
                  </Dropdown>
                )
                :
                <Spin size="small" style={{marginLeft: 8, marginRight: 8}}/>
            }
          </div>
        </div>
      </Layout.Header>
    ) ;
  }
}

export default withRouter(Header);
