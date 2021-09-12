import AddRepeatableListButton from '../components/AddList/AddRepeatableListButton';
import ActiveRepeatableList from './repeatable-lists/ActiveRepeatableList';
import RepeatableList from './repeatable-lists/RepeatableList';
import RepeatableLists from './repeatable-lists/RepeatableLists';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import * as React from 'react';
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  Switch
} from 'react-router-dom';

// eslint-disable-next-line flowtype/no-mixed
const useStyles = makeStyles((theme: { spacing: number=> void}): { [string]: mixed } => ({
  root: {
    display: 'flex',
  },
  appBar: {
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  grow: {
    flexGrow: 1,
  },
  active: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function Page(): React.Element<'div'> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position='absolute' className={classes.appBar}>
          <Toolbar>
            <Button component={Link} to='/' color='inherit'>
              {'Listory'}
            </Button>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <AddRepeatableListButton />
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Switch>
              <Route path='/list/:slug'>
                <React.Suspense fallback={null}>
                  <RepeatableList />
                </React.Suspense>
              </Route>
              <Route path='/:slug'>
                <React.Suspense fallback={null}>
                  <ActiveRepeatableList />
                </React.Suspense>
              </Route>
              <Route path='/'>
                <React.Suspense fallback={null}>
                  <RepeatableLists />
                </React.Suspense>
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}