import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import navRouter from './config';
import styles from './index.less';

const currentPath = window.location.pathname;
const openKeys = navRouter.map(item => item.path || item.name)
const selectKeys = [];

(function _recursive(navRouter) {
  navRouter.forEach(item => {
    if (item.children) {
      _recursive(item.children);
    } else if (currentPath === item.path) {
      selectKeys.push(item.path || item.name);
    }
  })
})(navRouter);

const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

class LeftMenu extends React.Component {

  state = {
    collapsed: false,
    selectKeys: [],
    openKeys: [],
  }

  toggleCollapsed = () => {
    const { toggleCollapsed } = this.props;
    this.setState({
      collapsed: !this.state.collapsed,
    });
    toggleCollapsed && toggleCollapsed();
  }

  getNavMenuItems = (navRouter, parent) => {
    if (!navRouter) {
      return [];
    }
    return navRouter.map(item => this.getSubMenuOrItem(item, parent)).filter(item => item);
  };

  getSubMenuOrItem = (item, parent) => {
    if (item.children) {
      return (
        <Menu.SubMenu
          title={
            item.icon ?
              (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              )
              :
              item.name
          }
          key={item.path || item.name}
        >
          {this.getNavMenuItems(item.children, item)}
        </Menu.SubMenu>
      );
    }
    return <Menu.Item key={item.path || item.name}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  conversionPath = path => path && path.indexOf('http') === 0 ? path : `/${path || ''}`.replace(/\/+/g, '/');

  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    if (itemPath.indexOf('http') === 0) {
      return (
        <a href={itemPath} target='_blank'>
          {icon}
          <span>{item.name}</span>
        </a>
      );
    }
    return (
      <Link to={itemPath}>
        {icon}
        <span>{item.name}</span>
      </Link>
    );
  };

  render() {
    return (
      <div className={`${styles.leftMenu} ${this.state.collapsed ? styles.leftMenuMin : null}`}>
        <span className={styles.logo}>BOSS</span>
        <Icon
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggleCollapsed}
          className={styles.collapseIcon}
        />
        <Menu
          defaultSelectedKeys={selectKeys}
          defaultOpenKeys={openKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {this.getNavMenuItems(navRouter)}
        </Menu>
      </div>
    );
  }
}

export default LeftMenu;
