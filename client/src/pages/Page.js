import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import RepeatableLists from './repeatable-lists/RepeatableLists';
import AddRepeatableListButton from '../components/AddList/AddRepeatableListButton';
import RepeatableList from './repeatable-lists/RepeatableList';

const useStyles = makeStyles((theme) => ({
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

export default function Page() {
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
              {/* <Button component={NavLink} to='/' exact activeClassName={classes.active} color='inherit'>
                {'Items'}
              </Button> */}
              <AddRepeatableListButton />
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Switch>
              <Route path='/list/:slug'>
                <RepeatableList />
              </Route>
              <Route path='/'>
                <RepeatableLists />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}