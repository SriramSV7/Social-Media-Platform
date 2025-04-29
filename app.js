import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import CreatePost from './components/Post/CreatePost';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create-post" component={CreatePost} />
      </Switch>
    </Router>
  );
};

export default App;
