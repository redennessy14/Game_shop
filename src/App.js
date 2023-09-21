import "./App.css";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductsContextProvider from "./context/productContext";

function App() {
  return (
    <>
      <ProductsContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </ProductsContextProvider>
    </>
  );
}

export default App;
