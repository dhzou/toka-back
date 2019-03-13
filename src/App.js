import React, { Component } from 'react';
import $axios from 'axios';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch } from 'react-router-dom';

import client from '@/apollo';
import routes from '@/router';
import Layout from '@/layouts';
import Route from '@/components/function/Route';
import login from '@/utils/login';

import '@/styles/common.less';

class App extends Component {

  state = {
    collapsed: false,
    loadUserInfo: true,
    userInfo: {},
  }

  componentDidMount() {
    if(process.env.NODE_ENV === 'development') {
      this.setState({
        userInfo:  {
          userId: 13,
          user: 'HSDPA',
          avatar: '//shp.qpic.cn/hongxiu/0/800218177162_1533550849417/100',
        },
        loadUserInfo: false,
      })
    } else {
      $axios
        .get('/boss/user')
        .then(({ data = {} }) => {
          const { data : { userInfo = {} } , code } = data
          if(code === 0) {
            if(userInfo.userId) {
              this.setState({
                userInfo: {
                  ...userInfo,
                  avatar: '//shp.qpic.cn/hongxiu/0/800218177162_1533550849417/100',
                },
                loadUserInfo: false,
              })
            }
          } else {
            login.login()
          }
        })
        .catch(e => {
          login.login()
        });
    }
  }

  toggleCollapsed = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  }

  render() {
    const { collapsed, loadUserInfo, userInfo } = this.state;

    if(loadUserInfo) return null

    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div style={{ marginLeft: collapsed ? '80px' : '240px' , minWidth: '1200px', transition: 'margin 0.2s' }}>
            <Layout.Header userInfo={userInfo} />
            <Layout.Menu toggleCollapsed={this.toggleCollapsed} />
            <div style={{ padding: '16px' }}>
              <Switch>
                {
                  routes.map(route => (
                    <Route key={route.path} {...route} />
                  ))
                }
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
