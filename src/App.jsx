import './App.css'
import ProductCard from './components/productCard'
import { FaHome } from "react-icons/fa";

function App() {
  

  return (
    <div>
      <ProductCard name="Apple iPhone 5s" price="$999.99" image="https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjBpcGhvbmV8ZW58MHx8MHx8fDA%3D"/>
      <ProductCard name="Apple laptop" price="$799.99" image="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D"/>
      <ProductCard name="Noke shoes" price="$699.99" image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"/>
      <FaHome className="text-5xl text-blue-500"/>
    </div>
  )
}

export default App
