import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
