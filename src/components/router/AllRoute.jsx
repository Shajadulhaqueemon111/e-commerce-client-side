import { createBrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import PListing from "../pages/Product-Listing/PListing";

import ProductDetails from "../pages/AllProduct/ProductDetails";
import ViewDetails from "../pages/MostPopular/ViewDetails";
import AdminLayout from "../pages/Admin/AdminLayOut";
import SellerAction from "../pages/Admin/SellerAction";
import AdminApproveSystem from "../pages/Admin/AdminApproveSystem";
import PListingDetails from "../pages/Product-Listing/PListingDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute></MainRoute>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/details/:_id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/view/:_id",
        element: <ViewDetails></ViewDetails>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/admin/Approve",
        element: <AdminApproveSystem />,
      },
      {
        path: "/admin/listing",
        element: <PListing></PListing>,
      },
      {
        path: "/admin/Seller-Uploading-System",
        element: <SellerAction></SellerAction>, // Placeholder
      },
      {
        path: "/admin/Product_View/:_id",
        element: <PListingDetails></PListingDetails>, // Placeholder
      },

      {
        path: "/admin/settings",
        element: <div>Settings Page</div>, // Placeholder
      },
    ],
  },
]);

export default router;
