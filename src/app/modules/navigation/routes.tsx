import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TasksPagesIndex from '../tasks/ui/pages/index';
import NavigationLayoutsMain from './ui/layouts/main';

const Navigator = () => {
  return (
    <NavigationLayoutsMain>
      <Router>
        <Switch>
          <Route path="/sign-in"></Route>
          <Route exact={true} path="/">
            <TasksPagesIndex></TasksPagesIndex>
          </Route>
        </Switch>
      </Router>
    </NavigationLayoutsMain>
  );
};

export default Navigator;
