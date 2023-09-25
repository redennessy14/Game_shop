import "./App.css";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductsContextProvider from "./context/productContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ProductsContextProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </ProductsContextProvider>
    </>
  );
}

export default App;
