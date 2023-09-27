import "./App.css";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductsContextProvider from "./context/productContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <>
      <ProductsContextProvider>
        <AuthContextProvider>
          <ToastContainer />
          <BrowserRouter>
            <Navbar />
            <Routing />
          </BrowserRouter>
        </AuthContextProvider>
      </ProductsContextProvider>
    </>
  );
}

export default App;
