import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import MovieList from './pages/MovieList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MovieList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
