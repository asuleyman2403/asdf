import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchAuthContext } from '../../../store/actions/auth.actions';
import Header from '../../shared/header/Header';
import Storage from '../../pages/storage/Storage';
import Orders from '../../pages/orders/Orders';
import CreateOrder from '../../pages/orders/create/CreateOrder';

class MainLayout extends Component {
  componentDidMount() {
    const access_token = localStorage.getItem('access_token');
    if (!access_token || !localStorage.getItem('refresh_token')) {
      return this.props.history.push('/login');
    } else {
      this.props.fetchAuthContext(access_token);
    }
  }

  render() {
    return (
      <>
        <Header />
        <main className="main">
          <Switch>
            <Route path="/verification" />
            <Route path="/orders" component={Orders} />
            <Route path="/createorder" component={CreateOrder} />
            <Route path="/history" />
            <Route path="/settings" />
            <Route path="/storage" component={Storage} />
          </Switch>
        </main>
      </>
    );
  }
}

export default connect(
  null,
  { fetchAuthContext },
)(MainLayout);
