import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TasksPagesIndex from '../tasks/ui/pages/index';

const Navigator = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in"></Route>
        <Route exact={true} path="/">
          <TasksPagesIndex></TasksPagesIndex>
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigator;
