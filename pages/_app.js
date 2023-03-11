import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import {Provider} from "react-redux";
import store from '../redux/store'
import RouteGuard from "../components/RouteGuard";

const MyApp = ({ Component, pageProps }) => (
  
  <div>
    <RouteGuard>
      <Provider store={store}>
        <NFTMarketplaceProvider>
          <NavBar />

          <div className="container">
          <Component {...pageProps} />
          </div>
          <Footer />
        </NFTMarketplaceProvider>
      </Provider>
    </RouteGuard>
  </div> 
);

export default MyApp;
