import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";


function App() {
  return (
    <HelmetProvider> <>
    <ToastContainer position="top-right" />
    <AppRoutes/></></HelmetProvider>
   
  );
}

export default App;