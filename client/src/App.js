import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Edit from './pages/Edit'
import Map from './pages/Map'
import Pictures from './pages/Pictures'

function App() {

  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="pages">
            <Routes>
              <Route  
                path="/"
                element={<Home />}
              />

              <Route  
                path="/edit"
                element={<Edit />}
              />

              <Route  
                path="/map"
                element={<Map />}
              />

              <Route  
                path="/pictures"
                element={<Pictures />}
              />
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
