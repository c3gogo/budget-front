
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountsPage from './components/Account/AccountsPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import AccountDetails from './components/Account/AccountDetails'

const useStyles = makeStyles((theme) => ({
  root: {
    flewGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  }
}))

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

function App() {
  const classes = useStyles()
  const Location = 'Home'
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {Location}
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <AccountsPage />
            </Route>
            <Route path="/accounts/:accountId">
              <AccountDetails />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
