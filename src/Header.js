import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Doc xTract Services
          </Typography>
          <Tabs value={props.activeTab} onChange={props.handleTabClick}>
            <Tab value="welcome" label="Welcome" />
            <Tab value="getting-started" label="Getting Started" />
            <Tab value="tryoutui" label="Tryout" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
