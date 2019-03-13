import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const load = page => process.env.NODE_ENV === 'development'
  ? require(`@/pages/${page}`).default
  : Loadable({
    loader: () => import(`@/pages/${page}`),
    loading: () => <Spin size="small" />,
  });

const routes = [
  {
    path: '/',
    exact: true,
    component: load('demo'),
  },
  {
    path: '/activity',
    exact: true,
    component: load('activity/list'),
  },
  {
    path: '/activity/add',
    exact: true,
    component: load('activity/detail'),
  },
  {
    path: '/activity/edit/:activityId',
    component: load('activity/detail'),
  }
];

// 404 页面
routes.push({
  path: '*',
  component: load('404'),
})

export default routes;
