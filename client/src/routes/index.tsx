import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductListings from "../screens/ProductListings/ProductListings";
import ProtectedRoute from "./ProtectedRoute";
import AddProductListing from "../screens/ProductListings/ProductLisitings.addProduct";
import SellerView from "../screens/ProductListings/ProductListings.SellerView";
import ViewProductDetails from "../screens/BuyerDashboard/ViewProduct/ViewProductDetails";
import ViewSellerProductListing from "../screens/ProductListings/ProductListing.viewSellerProductListing";
import Login from "../screens/Login";
import SignUp from "../screens/Signup";
import BuyerDashboard from "../screens/BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../screens/SellerDashboard/SellerDashboard";
import AdminDashboard from "../screens/Admin/AdminDashboard";
import Companies from "../screens/Admin/Companies/Companies.index";
import CompanyProductListings from "../screens/Admin/ProductListings/ProductListings.index";
import AddProduct from "../screens/Admin/AddProduct/AddProduct.index";
import AdminInquiries from "../screens/Admin/Inquiries/Inquiries.index";
import InquiryDetails from "../screens/Admin/InquiryDetails/InquiryDetails";

import PageNotFound from "../components/PageNotFound";
import Profile from "../screens/BuyerDashboard/Profile/Profile";
import ForgotPassword from "../screens/ForgotPassword";
import ConfirmPassword from "../screens/ConfirmPassword";

const Routes = () => {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/login" />} />
        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/forgotPassword" exact component={ForgotPassword} />
        <Route path="/confirmPassword" exact component={ConfirmPassword} />
        <Route
          path="/products/:productId"
          exact
          component={ViewProductDetails}
        />
        <ProtectedRoute
          path="/users/:userId/companies/:companyId/productListings/addNew"
          component={AddProductListing}
        />
        <ProtectedRoute
          path="/users/:userId/companies/:companyId/productListings/view"
          component={SellerView}
        />
        <ProtectedRoute
          path="/buyerDashboard/:userId/companies/:companyId/profile"
          component={Profile}
        />
        <ProtectedRoute path="/buyerDashboard" component={BuyerDashboard} />
        <ProtectedRoute path="/sellerDashboard" component={SellerDashboard} />
        <ProtectedRoute path="/admin" component={AdminDashboard} />
        <ProtectedRoute
          path="/users/:userId/companies/:companyId/productListings/:productId/view"
          component={ViewSellerProductListing}
        />
        <ProtectedRoute
          path="/users/:userId/companies/:companyId/productListings"
          component={ProductListings}
        />
        <ProtectedRoute
          path="/admins/companies/:companyId/productListings"
          component={CompanyProductListings}
        />
        <ProtectedRoute
          path="/admins/companies/:companyId/addProduct"
          component={AddProduct}
        />
        <ProtectedRoute path="/admins/companies" component={Companies} />
        <ProtectedRoute
          path="/admins/inquiries/:inquiryId"
          component={InquiryDetails}
        />
        <ProtectedRoute path="/admins/inquiries" component={AdminInquiries} />
        <ProtectedRoute path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
