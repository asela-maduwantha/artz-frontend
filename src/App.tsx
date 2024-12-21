import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <>
    <ToastContainer position="top-right" />
    <AppRoutes/></>
  );
}

export default App;