import cartModel from "../../../DB/models/cart.model.js"
import { CouponModel } from "../../../DB/models/coupon.model.js"
import { orderModel } from "../../../DB/models/order.model.js";
import { UserModel } from "../../../DB/models/user.model.js";
import { AppError } from "../../utls/AppError.js";
import { BookModel } from './../../../DB/models/book.model.js';

// export const getPending = async(req, res)=>{
//   const pending = await orderModel.find({status:'pending'})
//   return res.json({message:'success', pending}) 
// } 

// export const reject = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const order = await orderModel.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     if (order.status === 'rejected') {
//       return res.status(400).json({ message: "Order already rejected" });
//     }

//     for (const book of order.books) {
//       await BookModel.findByIdAndUpdate(book.bookId, {
//         $inc: { stock: book.quantity } 
//       });
//     }


//     order.status = 'rejected'
//     await order.save();
//     return res.json({ message: 'success', order });
//   } catch (error) {
//     console.error("Error while rejecting order:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   } 
// }

// export const delivered = async(req, res)=>{
//   const {id} = req.params
//   const order =  await orderModel.findById(id)
//   if(!order){
//     return res.status(404).json({message:"order not found"})
//   }
//   if(order.status === 'delivered'){
//     return res.status(400).json({message:"order already Delivered"})
//   }
  
//   order.status = 'delivered'
//   order.save()
//   return res.json({message:'success', order})
// }

// export const onway = async(req, res)=>{
//   const {id} = req.params
//   const order =  await orderModel.findById(id)
//   if(!order){
//     return res.status(404).json({message:"order not found"})
//   }
//   if(order.status === 'onway'){
//     return res.status(400).json({message:"order already onway"})
//   }
//   if(order.status != 'accepted'){
//     return res.status(400).json({message:"order not accepted"})
//   }
//   order.status = 'onway'
//   await order.save()
//   return res.json({message:'success', onway})
// }

// export const accept = async(req,res)=>{
//   const {id} = req.params
//   const order =  await orderModel.findById(id)
//   if(!order){
//     return res.status(404).json({message:"order not found"})
//   }
//   if(order.status === 'accepted'){
//     return res.status(400).json({message:"order already accepted"})
//   }

//   order.status = 'accepted'
//   order.save()

//   return res.json({message:'success', order})
// }

// export const acceptedOrders = async (req,res)=>{
//   const accepted = await orderModel.find({status:'accepted'})
//   return res.json({message:'success', accepted})
// }

// export const acceptAll = async (req, res) => {
//   try {
//     const result = await orderModel.updateMany(
//       { status: 'pending' },
//       { $set: { status: 'accepted' } }
//     );

//     if (result.modifiedCount > 0) {
//       return res.status(200).json({ message: 'All pending orders have been accepted', modifiedCount: result.modifiedCount });
//     } else {
//       return res.status(200).json({ message: 'No pending orders to accept' });
//     }
//   } catch (error) {
//     console.error("Error accepting all pending orders:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const rejectAll = async (req, res) => {
//   try {
//     const result = await orderModel.updateMany(
//       { status: 'pending' },
//       { $set: { status: 'rejected' } }
//     );

//     if (result.modifiedCount > 0) {
//       return res.status(200).json({ message: 'All orders have been rejected', modifiedCount: result.modifiedCount });
//     } else {
//       return res.status(200).json({ message: 'No pending orders to accept' });
//     }
//   } catch (error) {
//     console.error("Error accepting all pending orders:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const onwayAll = async (req, res) => {
//   try {
//     const result = await orderModel.updateMany(
//       { status: 'accepted' },
//       { $set: { status: 'onway' } }
//     );

//     if (result.modifiedCount > 0) {
//       return res.status(200).json({ message: 'All orders have been onway', modifiedCount: result.modifiedCount });
//     } else {
//       return res.status(200).json({ message: 'No pending orders to accept' });
//     }
//   } catch (error) {
//     console.error("Error accepting all pending orders:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


// export const deliveredAll = async (req, res) => {
//   try {
//     const result = await orderModel.updateMany(
//       { status: 'onway' },
//       { $set: { status: 'delivered' } }
//     );

//     if (result.modifiedCount > 0) {
//       return res.status(200).json({ message: 'All orders have been delivered', modifiedCount: result.modifiedCount });
//     } else {
//       return res.status(200).json({ message: 'No pending orders to accept' });
//     }
//   } catch (error) {
//     console.error("Error accepting all pending orders:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const create = async (req,res,next)=>{
  const cart = await cartModel.findOne({userId:req.user._id})
  if(!cart || cart.books.length == 0 ){
    return next(new AppError(`cart is empty`, 400))
  }

  req.body.books = cart.books

  let coupon
  if(req.body.couponName){
    coupon = await CouponModel.findOne({name:req.body.couponName})
    if(!coupon){
      return next(new AppError(`coupon not found`, 404))
    }
    if(coupon.status == 'inactive'){
      return next(new AppError(`coupon is inactive`, 400))
    }
    if(coupon && coupon.usedBy && coupon.usedBy.includes(req.user._id)){
      return next(new AppError(`coupon already used`, 400))
    }
    req.body.coupon = coupon
  }

  let finalBooksList = []
  let subTotal = 0 
  for(let book of req.body.books){
    const checkBook = await BookModel.findOne({
      _id: book.bookId,
      stock: { $gte: book.quantity }
    });
        if(!checkBook){
          return next(new AppError(`book quantity not available`, 400))
    }

    book = book.toObject()
    book.title = checkBook.title
    book.unitPrice = checkBook.price
    book.Discount = checkBook.Discount
    book.finalPrice = book.quantity * checkBook.finalPrice
    book.mainImage = checkBook.mainImage
    subTotal+=book.finalPrice
    finalBooksList.push(book)
  }
  const user = await UserModel.findById(req.user._id)
  if(!req.body.phone){
    req.body.phone = user.phone
  }

  const order = await orderModel.create({
    userId:req.user._id,
    books:finalBooksList,
    finalPrice:subTotal - (subTotal * ((req.body.coupon?.Amount || 0 )/100)),
    Address:req.body.Address,
    phone:req.body.phone,
    coupon:req.body.coupon,
    status:'pending',
  })

  
  if(order){
    for(const book of req.body.books){
      const updateBook = await BookModel.findOneAndUpdate(
        { _id: book.bookId },
        { $inc: { stock: -book.quantity } }
      )
    }

    if (req.body.coupon) {
      await CouponModel.findByIdAndUpdate({_id:req.body.coupon._id}, {
        $addToSet:{
          usedBy:req.user._id
        }
      })
    }

    await cartModel.findOneAndUpdate({userId:req.user._id}, {
        books:[]
    })
 
  
  }

  return res.status(201).json({message:'success', order})
} 

export const orders = async (req, res) => {
  const orders = await orderModel.find({}).populate({
    path: 'userId',
    select: 'username-_id' 
});
  return res.json({message:'success', orders})
}

export const getOrdersCounts = async (req,res)=>{
  const orders = await orderModel.find()
  const acceptedOrders = orders.filter(order =>
    order.status === 'delivered'
  ).length
  const rejectedOrders = orders.filter(order =>
    order.status ==='rejected'
  ).length
  const ordersCount = orders.length
  return res.status(200).json({message:'success', acceptedOrders, rejectedOrders, ordersCount});
}

export const orderdetails = async (req,res,next)=>{
  const {id} = req.params
  const order =  await orderModel.findById(id)
  if(!order){
    return next(new AppError(`order not found`, 404))
  }
  return res.json({message:'success', order})
}

export const updateOrderStatus = async (req,res,next) =>{
  const {id} = req.params
  const {status} = req.body
  const validStatuses = ['pending','accepted', 'rejected', 'delivered', 'onway'];
  if (!validStatuses.includes(status)) {
    return next(new AppError(`Invalid status`, 400))
  }
  const order =  await orderModel.findById(id)
  if(!order){
    return next(new AppError(`order not found`, 404))
  }
  order.status = status
  order.save()
  return res.json({message:'success', order})
}

export const updateAll = async (req,res,next)=>{
  const {currentStatus, newStatus} = req.body
  const validStatuses = ['pending','accepted', 'rejected', 'delivered', 'onway'];
  if (!validStatuses.includes(currentStatus) ||!validStatuses.includes(newStatus)) {
    return next(new AppError(`Invalid status`, 400))
  }

  const result = await orderModel.updateMany(
    { status: currentStatus },
    { $set: { status: newStatus } }
  );

  if (result.modifiedCount > 0) {
    return res.status(200).json({ message: 'All orders have been updated', modifiedCount: result.modifiedCount });
  } else {
    return res.status(200).json({ message: 'orders to change' });
  }
}

export const userOrders = async (req,res)=>{
  const orders = await orderModel.find({userId:req.user._id})
  return res.json({message:'success', orders})
}

export const userOrdersAdmin = async (req,res)=>{
  const {id} = req.params
  const orders = await orderModel.find({userId:id});
  return res.json({message:'success', orders})
}


export const sales = async (req, res) => {
  try {
    const salesData = await orderModel.aggregate([
      { $unwind: { path: '$books', preserveNullAndEmptyArrays: true } }, // Unwind the books array and preserve empty arrays
      {
        $group: {
          _id: { $month: { date: '$createdAt', timezone: 'UTC' } }, // Group by the month of order creation with UTC timezone
          totalSales: { $sum: '$books.quantity' }, // Sum the quantities
          totalRevenue: { $sum: { $multiply: ['$books.quantity', '$books.finalPrice'] } } // Sum the revenues
        }
      },
      { $sort: { '_id': 1 } } // Sort by month in ascending order
    ]);

    // Calculate total sales for the year
    const totalSalesYear = salesData.reduce((acc, month) => acc + (month.totalSales || 0), 0);

    // Initialize sales data for all months with zero sales
    const monthsData = Array.from({ length: 12 }, (_, index) => ({
      _id: index + 1,
      totalSales: 0,
      totalRevenue: 0,
    }));

    // Update actual sales data for existing months
    salesData.forEach(month => {
      monthsData[month._id - 1] = {
        _id: month._id,
        totalSales: month.totalSales || 0,
        totalRevenue: month.totalRevenue || 0,
      };
    });

    // Calculate percentage of total sales for each month
    const salesDataWithPercentages = monthsData.map(month => ({
      ...month,
      percentage: ((month.totalSales / totalSalesYear) * 100 || 0).toFixed(2)
    }));

    res.json(salesDataWithPercentages); // Return the aggregated data as JSON
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}