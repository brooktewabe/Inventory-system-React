import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import NotFoundPage from "./Pages/NotFoundPage";
import Account, { userLoader } from "./Pages/Account";
import SignUp from "./Pages/SignUp";
import ValidatedLoginForm from "./Pages/Login";
import ChangePassword from "./Pages/ChangePassword";
import Dashboard from "./Pages/Dashboard"
import Books from './Pages/Books'
import Owners from './Pages/Owners'
import AddBook from './Pages/AddBook'
import EditProduct from './Pages/EditProduct'
import Inventory from "./Pages/Inventory";
import AddProduct from "./Pages/AddProduct";
import StockMovement from "./Pages/StockMovement";
import ViewMovementDetail from './Pages/ViewMovementDetail'
import Sales from "./Pages/Sales";
import RecordSale from "./Pages/RecordSale";
import SalesHistory from "./Pages/SalesHistory";
import ViewSaleDetail from "./Pages/ViewSaleDetail";
import Notification from "./Pages/Notification";
import Report from "./Pages/Report";

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/inventory' element={<Inventory/>}/>
        <Route path='/sales' element={<Sales/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/sales-history' element={<SalesHistory/>}/>
        <Route path='/stock-movement' element={<StockMovement/>}/>
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/movement-detail/:id' element={<ViewMovementDetail/>}/>
        <Route path='/sales-detail/:id' element={<ViewSaleDetail/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/add-book' element={<AddBook />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />
        <Route path='/record-sale/:id' element={<RecordSale />} />
        <Route path='/books' element={<Books />} />
        <Route path='/owners' element={<Owners />} />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/account/:id' element={<Account  />} loader={userLoader} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<ValidatedLoginForm />} />
        <Route path='/changepassword/:id' element={<ChangePassword />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
