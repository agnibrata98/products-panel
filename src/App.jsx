import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import Home from './components/home/Home'
import ProductCategoryList from './components/categories/ProductCategoryList'
import ProductsDetails from './components/home/ProductsDetails'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import CategoryProducts from './components/categories/CategoryProducts'

function App() {

  return (
    <>
     <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<ProductCategoryList />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
