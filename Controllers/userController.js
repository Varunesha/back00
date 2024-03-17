import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import signup from "../Models/signup.js";
import productdata from "../Models/product.js";
import orderdata from "../Models/order.js";
const saltRounds = 10;

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.send("we need a token, please give us next time");
  } else {
    jwt.verify(token, "jwt-Secret-key", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticated" });
      } else {
        next();
      }
    });
  }
};

const createAccount = asyncHandler(async (req, res) => {
  const { username, email, password, address, mobile } = req.body;
  console.log(req.body);
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.send(err);
    }
    const userdata = new signup({
      name: username,
      email: email,
      password: hash,
      address: address,
      mobile: mobile
    });
    await userdata.save();
    res.json({
      status: 200,
      message: "Account Created Successfully"
    });
  });
});

const placeOrder = asyncHandler(async (req, res) => {
  const {
    name,
    mobile,
    email,
    currentdate,
    productname,
    imageurl,
    quantity,
    price,
    address,
    paymentstatus,
    orderstatus
  } = req.body;
  console.log(req.body);

  const orderdetails = new orderdata({
    name: name,
    mobile: mobile,
    email: email,
    currentdate: currentdate,
    productname: productname,
    imageurl: imageurl,
    quantity: quantity,
    price: price,
    address: address,
    paymentstatus: paymentstatus,
    orderstatus: orderstatus
  });
  await orderdetails.save();
  res.json({
    status: 200,
    message: "Order Placed Successfully"
  });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  console.log(req.query);
  const user = await signup.find({ email: email });
  console.log(user);
  if (user != "") {
    bcrypt.compare(password, user[0].password, (error, response) => {
      if (response) {
        const id = user[0]._id;
        const token = jwt.sign({ id }, "jwt-Secret-key", {
          expiresIn: "1d" //10 - 10 sec
        });
        res.cookie("token", token);
        return res.json({ auth: true, token: token, result: user });
      } else {
        return res.send({
          message: "Wrong username/password combination!"
        });
      }
    });
  } else {
    res.send({ auth: false, message: "no User exist." });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, imageurl, price, description, category } = req.body;

  const productdetails = new productdata({
    name: name,
    imageurl: imageurl,
    price: price,
    description: description,
    category: category
  });
  await productdetails.save();
  res.json({
    status: 200,
    message: "Product Added Successfully"
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const productData = await productdata.find({});
  res.status(200).send(productData);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const productData = await orderdata.find({ email: email });
  res.status(200).send(productData);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orderData = await orderdata.find({ orderstatus: "pending" });
  res.status(200).send(orderData);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id, productname, imageurl, price, description, category } = req.body;
  console.log(req.body);
  await productdata.updateOne(
    { _id: id },
    {
      $set: {
        name: productname,
        imageurl: imageurl,
        price: price,
        description: description,
        category: category
      }
    }
  );
  res.json({ status: 200, message: "Product Updated Successfully" });
});

const updateOrder = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    mobile,
    email,
    currentdate,
    productname,
    imageurl,
    quantity,
    price,
    address,
    paymentstatus,
    orderstatus
  } = req.body;
  await orderdata.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        mobile: mobile,
        email: email,
        currentdate: currentdate,
        productname: productname,
        imageurl: imageurl,
        quantity: quantity,
        price: price,
        address: address,
        paymentstatus: paymentstatus,
        orderstatus: orderstatus
      }
    }
  );
  res.json({ status: 200, message: "Order Delivered Successfully" });
});

const deleteproduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await productdata.deleteOne({ _id: id });
  res.json({ status: 200 });
});

export {
  createAccount,
  verifyJWT,
  userLogin,
  addProduct,
  getAllProducts,
  getMyOrders,
  getAllOrders,
  updateProduct,
  deleteproduct,
  updateOrder,
  placeOrder
};
