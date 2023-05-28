import CreateProduct from "./inventoryMicroservice/CreateProduct";
import Products from "./inventoryMicroservice/products";


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Orders from "./orderMicroservice/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Products />} />

        <Route path="/create" element={<CreateProduct />} />
        <Route path="/orders" element={<Orders />} />

      </Routes >
    </BrowserRouter>


  );
}

export default App;

