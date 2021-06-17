import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginScreen from './Components/LoginScreen'
import HomeScreen from './Components/HomeScreen'
import ProductScreen from './Components/ProductScreen'
import RegisterScreen from './Components/RegisterScreen';

function App() {
  return (
    <Router>
      <Route exact path='/' component={LoginScreen} />
      <Route path='/products' component={HomeScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/product/:id' component={ProductScreen} />
    </Router>
  );
}

export default App;
