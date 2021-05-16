import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AUTH_TOKEN } from '../auth/store/index/actions';
import { clearToken, setToken } from '../auth/store/index/reducer';
import TasksPagesIndex from '../tasks/ui/pages/index';
import NavigationLayoutsMain from './ui/layouts/main';

const Navigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storageEventsListener = function (event: WindowEventMap['storage']) {
      if (event.key === AUTH_TOKEN) {
        if (event.newValue) {
          dispatch(setToken(event.newValue));
        } else {
          dispatch(clearToken());
        }
      }
    };
    window.addEventListener('storage', storageEventsListener);
    return () => window.removeEventListener('storage', storageEventsListener);
  }, []);
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
