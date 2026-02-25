
import express from "express";
import upload from "../middleware/upload.js";
import {
  createGallery,
  getAllGallery,
  deleteGallery,
  updateGallery,
  reorderGalleryImages
} from "../controller/gallery.controller.js";

const router = express.Router();

router.post("/", upload.array("images", 10), createGallery);
router.get("/", getAllGallery);
router.delete("/:id", deleteGallery);
router.put("/:id", upload.array("images", 10), updateGallery);
router.patch("/reorder/:id", reorderGalleryImages);

export default router;

