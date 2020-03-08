import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircle from '@material-ui/icons/AddCircle';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import List from './list/List';
import Lists from './lists/Lists';

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
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar position='absolute' className={classes.appBar}>
          <Toolbar>
            <Button component={Link} to='/' color='inherit'>Listory</Button>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton component={Link} to='/create' color='inherit'>
                <AddCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Switch>
              <Route path='/:slug'>
                <List />
              </Route>
              <Route path='/'>
                <Lists />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}