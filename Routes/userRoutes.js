import express from "express";
import {
  addProduct,
  createAccount,
  deleteproduct,
  getAllOrders,
  getAllProducts,
  getMyOrders,
  placeOrder,
  updateOrder,
  updateProduct,
  userLogin
} from "../Controllers/userController.js";
const router = express.Router();
router.post("/createaccount", createAccount);
router.post("/placeorder", placeOrder);
router.get("/userlogin", userLogin);
router.post("/addproduct", addProduct);
router.get("/getallproducts", getAllProducts);
router.get("/getallorders", getAllOrders);
router.get("/getmyorders", getMyOrders);
router.put("/editproduct", updateProduct);
router.put("/updateorder", updateOrder);
router.delete("/deleteproduct", deleteproduct);

export default router;
