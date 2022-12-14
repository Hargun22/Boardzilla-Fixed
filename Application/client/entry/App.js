import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import { withRouter } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import { useDispatch } from "react-redux";
import R from "ramda";

import { attemptGetUser } from "_thunks/user";
import Login from "_pages/Login";
import Register from "_pages/Register";
import Dashboard from "_pages/Dashboard";
import Stickies from "_components/Stickies";
import WeatherPage from "_pages/WeatherPage";
import NewsPage from "_pages/NewsPage";
// import SettingsPage from "_pages/SettingsPage";
import LostPage from "_pages/LostPage";
import Navbar from "_components/Navbar/Navbar";
import Footer from "_components/Footer";
import StockPage from "_pages/StockPage";
import Cal from "_pages/Cal";

function App({ location }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => setLoading(false))
      .catch(R.identity);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    !loading && (
      <div>
        <ReactNotification />
        <Navbar pathname={location.pathname} />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/stickies" component={Stickies} />
            <Route path="/weather" component={WeatherPage} />
            <Route path="/stocks" component={StockPage} />
            <Route path="/news" component={NewsPage} />
            <Route path="/calendar" component={Cal} />
            <Route path="*" component={LostPage} />
            {/* <Route path="/home" component={Home} />
            <Route path="/settings" component={SettingsPage} />  */}
          </Switch>
        </div>
        <Footer />
      </div>
    )
  );
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(App);
