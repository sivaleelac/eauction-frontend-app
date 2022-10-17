import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import LoginComponent from './components/person/LoginComponent';
import RegisterComponent from './components/person/RegisterComponent';
import SellerHome from './components/seller/SellerHome';
import AddProduct from './components/seller/AddProduct';
import ProductBidsList from './components/seller/ProductBidsList';
import ProductList from './components/seller/ProductList';
import BuyerHome from './components/buyer/BuyerHome';
import BidProduct from './components/buyer/BidProduct';
import UpdateBidProduct from './components/buyer/UpdateBidProduct';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
          <Route path = "/" element={<LoginComponent />} />
          <Route path = "/login" element={<LoginComponent />} />
          <Route path = "/register" element={<RegisterComponent />} />
          <Route path = "/seller" element={<SellerHome />} />
          <Route path = "/seller/addproduct" element={<AddProduct />} />
          <Route path = "/seller/products" element={<ProductList />} />
          <Route path = "/seller/productbids" element={<ProductBidsList />} />
          <Route path = "/buyer" element={<BuyerHome />} />
          <Route path = "/buyer/bidproduct" element={<BidProduct />} />
          <Route path = "/buyer/updatebidproduct" element={<UpdateBidProduct />} />
      </Routes> 
      <Footer />
    </Router>  
  );
}

export default App;
