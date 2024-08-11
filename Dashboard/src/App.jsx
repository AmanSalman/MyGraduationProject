import React, { useContext, useEffect } from 'react'
import './App.css';
// import Root from './components/routes/Root.jsx';
import Books from './components/books/Books.jsx'; 
import Orders from './components/orders/Orders.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./index.css";
import DeleteBook from './components/books/DeleteBook.jsx';
import AcceptOrder from './components/orders/AcceptOrder.jsx'
import RejectOrder from './components/orders/RejectOrder.jsx';
import Home from './components/Home/Home.jsx';
import Profile from './components/profile/Profile.jsx';
import Register from './components/Register/Register.jsx'
import Login from './components/Register/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import User from './components/users/User.jsx';
import AddCategory from './components/category/AddCategory.jsx';
import Category from './components/category/Category.jsx';
import UpdateBook from './components/books/UpdateBook.jsx';
import DeleteCategory from './components/category/DeleteCategory.jsx';
import UpdateCategory from './components/category/UpdateCategory.jsx';
import DisableUser from './components/users/DisableUser.jsx';
import ActivateUser from './components/users/ActivateUser.jsx';
import ChangePassword from './components/profile/ChangePassword.jsx';
import Dashboard from './components/routes/DashBoard.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import EditProfile from './components/profile/EditProfile.jsx';
import ForgetPassword from './components/Register/ForgetPassword.jsx';
import SendCode from './components/Register/SendCode.jsx';
import CreateBook from './components/books/CreateBook.jsx';
import SubImages from './components/books/SubImages.jsx';
import AddSubIamge from './components/books/DeleteImage.jsx';
import DeleteImage from './components/books/DeleteImage.jsx';
import Coupon from './components/coupon/Coupon.jsx';
import DeleteCoupon from './components/coupon/DeleteCoupon.jsx';
import UpdateCoupon from './components/coupon/UpdateCoupon.jsx';
import CreateCoupon from './components/coupon/CreateCoupon.jsx';
import Accepted from './components/orders/Accepted.jsx';
import OnwayOrder from './components/orders/OnwayOrder.jsx';
import OrderDetails from './components/orders/OrderDetails';
import SentOrders from './components/orders/SentOrders.jsx';
import DeliveredOrder from './components/orders/DeliveredOrder.jsx';
import AcceptAll from './components/orders/changeAll/AcceptAll.jsx';
import Onway from './components/orders/changeAll/Onway.jsx';
import DeliverAll from './components/orders/changeAll/DeliverAll.jsx';
import RejectOrders from './components/orders/changeAll/RejectAll';
import UserOrders from './components/users/UserOrders.jsx';
import ReviewCard from './components/books/ReviewCard.jsx';
import DeleteReview from './components/books/DeleteReview.jsx';

 

export default function App() {


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/books',
        element:<Books/>,
      },
      {
        path:'/addbook',
        element:<CreateBook/>
      },
      {
        path:'/Update/:id',
        element:<UpdateBook/>
      },
      {
        path:'/books/update-subimages/:id',
        element:<SubImages/>
      },
      {
        path:'/deletesubimage/:public_id',
        element:<DeleteImage/>
      },
      {
        path:'/delete/:id',
        element:<DeleteBook/>
      },
      {
        path:'/bookreview/:id',
        element:<ReviewCard/>
      },
      {
        path:'/deleteReview/:id',
        element:<DeleteReview/>
      },
      {
        path:'/orders',
        element:<Orders/>
      },
      {
        path:'/orderDetails/:id',
        element:<OrderDetails/>
      },
      {
        path:'/accepted',
        element:<Accepted/>
      },
      {
        path:'/sendOrders',
        element:<SentOrders/>
      },
      {
        path:'/onway/:id',
        element:<OnwayOrder/>
      },
      {
        path:'/delivered/:id',
        element:<DeliveredOrder/>
      },
      {
        path:'/acceptOrder/:orderId',
        element:<AcceptOrder/>
      },
      {
        path:'/rejectOrder/:orderId',
        element:<RejectOrder/>
      },
      {
        path:'/acceptall',
        element:<AcceptAll/>
      },
      {
        path:'/onwayAll',
        element:<Onway/>
      },
      {
        path:'/deliverAll',
        element:<DeliverAll/>
      },
      {
        path:'/rejectAll',
        element:<RejectOrders/>
      },
      {
        path:'/userOrders/:id',
        element:<UserOrders/>
      },
      {
        path:'/profile',
        element:<Profile/>,
      },
      {
        path:'Editprofile',
        element:<EditProfile/>
      },
      {
        path:'/changepassword',
        element:<ChangePassword/>
      },
      {
        path:'/users',
        element:<User/>
      },
      {
        path:'/users/disable/:id',
        element:<DisableUser/>
      },
      {
        path:'/users/Activate/:id',
        element:<ActivateUser/>
      },
      {
        path:'/addCategory',
        element:<AddCategory/>
      },
      {
        path:'/deleteCategory/:id',
        element:<DeleteCategory/>
      },
      {
        path:'/updateCategory/:slug',
        element:<UpdateCategory/>
      },
      {
        path:'/categories',
        element:<Category/>
      },
      {
        path:'/coupons',
        element:<Coupon/>
      },
      {
        path:'/deleteCoupon/:id',
        element:<DeleteCoupon/>
      },
      {
        path:'/UpdateCoupon/:id',
        element:<UpdateCoupon/>
      },
      {
        path:'/addcoupon',
        element:<CreateCoupon/>
      }
    ]
  },
   {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/forgotPassword',
        element:<SendCode/>
      },
      {
        path:'/sendcode',
        element:<ForgetPassword/>
      },
      {
        path:"*",
        element:<PageNotFound/>
      }
]);
  return (


      <RouterProvider router={router} />

  
  )
}

//  <div className='d-flex '>
  //   <Sidebar/>
  //   <Routes>
  //     <Route path='/' element={<Home/>}/>
  //     <Route path='/register' element={<Register/>} />
  //     <Route path='/books/add' element={<AddBook/>} />
  //     <Route path='/orders' element={<Orders/>}/>
  //     <Route path='/books' element={<Books/>}/>
  //     <Route path='/delete/:id' element={<DeleteBook/>}/>
  //     <Route path='*' element={<PageNotFound/>}/>
  //   </Routes>
  //  </div>