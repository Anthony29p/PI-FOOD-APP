

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreation from './components/RecipeCreation';
import Detail from './components/Detail';


function App() {

  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component= {LandingPage}/>
        <Route path='/home' component= {Home}/>
        <Route path='/recipes/:id' component= {Detail}/>
        <Route path='/recipes' component= {RecipeCreation}/>
      </Switch>   
    </div>
    </BrowserRouter>
  );
}

export default App;
