import { Router } from "express";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} from "../controllers/customers.js";

const router = Router();

// CRUD

router.get("/", getAllCustomers);
router.get("/getCustomer", getCustomerById);
router.post("/create", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
