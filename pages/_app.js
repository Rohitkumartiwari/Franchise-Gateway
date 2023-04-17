import "@/styles/globals.css";
import Layout from "../Components/Layout/layout";
import Context from "../context/context";
import { ToastContainer } from "react-toastify";
import "react-range-slider-input/dist/style.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "@/context/authContext";
export default function App({ Component, pageProps }) {
  return (
    <AuthContext>
      <Context>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </Context>
    </AuthContext>
  );
}
