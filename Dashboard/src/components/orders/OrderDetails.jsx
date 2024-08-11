import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../context/User'
import Loader from '../Loader/Loader'
import { TbArrowBigLeftLineFilled } from 'react-icons/tb'

function OrderDetails() {

  const {id} = useParams()
  const {token} = useContext(UserContext)
  const [order, setOrder] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true) 
  const location = useLocation()
  const getDetails = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL2}/order/getdetails/${id}`, {headers:{
        Authorization: `AmanGRAD__${token}`
      }});
      setOrder(data.order.books)
      console.log(data.order.books)
      setLoading(false)
    } catch (error) {
      const {response} = error
      setError(response?.data?.message || "Error while loading the books")
    }finally{
      setLoading(false)
    }
  }
  useEffect(() =>{
    console.log(location)
    getDetails()
  },[])

  if(loading){
    return <Loader/>
  }
  return (
    <>


<nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Orders</li>
                    <li className="breadcrumb-item active" aria-current="page">Order Details</li>
                    <li className="breadcrumb-item active" aria-current="page">Books</li>
                </ol>
            </nav>

    <div className="component-container ">
    <Link to={location?.state?.from || '/orders'} className='arrow'>
                        <TbArrowBigLeftLineFilled className='main-color-text arrowback-pages' />
                    </Link>
            <div className="container-cards">

      {
        order.map((book)=>

   <div className="card" key={book._id}>
  <img src={book?.mainImage?.secure_url} className="card-img-top" alt="book image" />
  <div className="card-body">
    <h5 className="card-title">{book.title}</h5>
    <p className="card-text">price: {book.unitPrice} ₪</p>
    <p className="card-text">Final price:  {book.finalPrice} ₪</p>
    <p className="card-text">quantity:  {book.quantity} </p>
  </div>
</div>
        )
      }
            </div>

    </div>

    </>
  )
}

export default OrderDetails