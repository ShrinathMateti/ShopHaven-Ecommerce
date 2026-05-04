import { createBrowserRouter } from "react-router";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import AuthenticationWrapper from "./pages/AuthenticationWrapper";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shop from "./Shop";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductDetails from "./pages/ProductDetailPage/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Account from "./pages/Account/Account";
import Profile from "./pages/Account/Profile";
import Orders from "./pages/Account/Orders";
import Settings from "./pages/Account/Settings";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed/OrderConfirmed";
import ConfirmPayment from "./pages/ConfirmPayment/ConfirmPayment";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { loadProductBySlug } from "./routes/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopApplicationWrapper />,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: "men",
        element: <ProductListPage categoryType={"MEN"} />,
      },
      {
        path: "women",
        element: <ProductListPage categoryType={"WOMEN"} />,
      },
      {
        path: "kids",
        element: <ProductListPage categoryType={"KIDS"} />,
      },
      {
        path: "product/:slug",
        loader: loadProductBySlug,
        element: <ProductDetails />,
      },
      {
        path: "/cart-items",
        element: <Cart />,
      },
      {
        path: "/account-details/",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "orders",
            element: (
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            ),
          },
          {
            path: "settings",
            element: (
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orderConfirmed",
        element: <OrderConfirmed />,
      },
    ],
  },
  {
    path: "/v1",
    element: <AuthenticationWrapper />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/oauth2/callback",
    element: <OAuth2LoginCallback />,
  },
  {
      path:'/confirmPayment',
      element:<ConfirmPayment />
  },
  {
      path:'/admin/*',
      element:<ProtectedRoute><AdminPanel /></ProtectedRoute>
  }
]);
