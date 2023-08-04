import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  

  /*
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8000/', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    makeAPICall();
  }, [])

  */
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8000/posts', {mode:'cors'})
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
        console.log(result);
      });
  }, []);
    

  return (
    <div className="App">
      <Router>
          <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
      </Router>
    </div>
  );
}

export default App;
