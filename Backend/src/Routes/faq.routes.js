import express from "express";
import {
  createFaq,
  getAllFaqs,
  searchFaqs,
  getActiveFaqs,
  updateFaq,
  deleteFaq,
  toggleFaqStatus,
} from "../controller/faq.controller.js";
//import validation from "../middleware/validation.js";

import {
  createFaqValidation,
  updateFaqValidation,
  idValidation,
} from "../validator/faq.validation.js";
import validation from "../middleware/validation.js";

const router = express.Router();

/* ========= ADMIN ROUTES ========= */
router.post(
  "/",
  validation.validate(createFaqValidation),  // ✅ wrap here
  createFaq
);

router.put(
  "/:id",
  validation.validate(updateFaqValidation),  // ✅ wrap here
  updateFaq
);
//router.post("/", createFaqValidation, createFaq);
router.get("/admin", getAllFaqs);
//router.put("/:id", updateFaqValidation, updateFaq);
//router.delete("/:id", deleteFaq);
router.delete(
  "/:id",
  validation.validate(idValidation),
  deleteFaq
);
//router.patch("/toggle/:id", toggleFaqStatus);
router.patch(
  "/toggle/:id",
  validation.validate(idValidation),
  toggleFaqStatus
);

/* ========= USER ROUTE ========= */
router.get("/search", searchFaqs);
router.get("/", getActiveFaqs);

export default router;