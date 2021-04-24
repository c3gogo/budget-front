
import { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountsPage from './components/Account/AccountsPage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import AccountDetails from './components/Account/AccountDetails'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core'
import { ExpandLess, ExpandMore, Home, AccountBalanceWallet, Euro, Timeline } from '@material-ui/icons'

import { GET_ACCOUNTS } from './graphql/queries'
import { useQuery } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
  root: {
    flewGrow: 1,
  },
  list: {
    width: 250
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}))

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <IndexPage />
      </Router>
    </ApolloProvider>
  );
}

const IndexPage = () => {
  const classes = useStyles()
  const [isDrawerDisplayed, setIsDrawerDisplayed] = useState(false)
  const [openCollapseAccounts, setOpenCollapseAccounts] = useState(false)
  const [openCollapseSituations, setOpenCollapseSituations] = useState(false)

  const { loading, error, data } = useQuery(GET_ACCOUNTS)

  const list = () => (
    <div
      role="presentation"
      onClick={() => setIsDrawerDisplayed(false)}
      onKeyDown={() => setIsDrawerDisplayed}
    >
      <List className={classes.list}>
        <Link to={`/`} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Home fontSize='small'/>
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </Link>
        <ListItem button onClick={(e) => {
          e.stopPropagation()
          setOpenCollapseAccounts(!openCollapseAccounts)
        }}>
            <ListItemIcon>
              <AccountBalanceWallet fontSize='small'/>
            </ListItemIcon>
            <ListItemText primary={'Accounts'} />
            {openCollapseAccounts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCollapseAccounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              data ? data.categories.map(category => {
                return (
                  <Link to={`/accounts/${category.id}`} className={classes.link} >
                    <ListItem button className={classes.nested}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                  </Link>
                )
              }) : null
            }
          </List>
        </Collapse>

        <ListItem button onClick={(e) => {
          e.stopPropagation()
          setOpenCollapseSituations(!openCollapseSituations)
        }}>
            <ListItemIcon>
              <Euro fontSize='small'/>
            </ListItemIcon>
            <ListItemText primary={'Situations'} />
            {openCollapseSituations ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCollapseSituations} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              data ? data.categories.map(category => {
                return (
                  <Link to={`/situations/${category.id}`} className={classes.link} >
                    <ListItem button className={classes.nested}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                  </Link>
                )
              }) : null
            }
          </List>
        </Collapse>
        <Link to={`/`} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Timeline fontSize='small'/>
            </ListItemIcon>
            <ListItemText primary={'Charts'} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  return (
    <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setIsDrawerDisplayed(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {Location}
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Drawer anchor='left' open={isDrawerDisplayed} onClose={() => setIsDrawerDisplayed(false)}>
          {list()}
        </Drawer>
        <Switch>
          <Route exact path="/">
            {data ? <AccountsPage accounts={data.categories} /> : null}
          </Route>
          <Route path="/accounts/:accountId">
            <AccountDetails />
          </Route>
        </Switch>
    </div>
  )
}

export default App;
