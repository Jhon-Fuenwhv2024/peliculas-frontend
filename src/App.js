import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { MediaView } from './components/media/MediaView';
import { TipoView } from './components/tipo/TipoView';
import { DirectorView } from './components/director/DirectorView';
import { GeneroView } from './components/genero/GeneroView';
import { ProductoraView } from './components/productora/ProductoraView';
import { MediaUpdate } from './components/media/MediaUpdate';



const App = () => {
  return <Router forceRefresh>
      <Header/>
      <Switch>
          <Route exact path='/' component={MediaView} />
          <Route exact path='/tipo' component={TipoView} />
          <Route exact path='/tipo/:tipoId' component={TipoView} />
          <Route exact path='/director' component={DirectorView} />
          <Route exact path='/genero' component={GeneroView} />
          <Route exact path='/productora' component={ProductoraView} />
          <Route exact path='/media/edit/:mediaId' component={MediaUpdate} />
          <Redirect to='/' />
      </Switch>
  </Router>

}

export {
  App,
}
