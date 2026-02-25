//import { body } from "express-validator";
import { body, param } from "express-validator";


export const createFaqValidation = [
  body("question").notEmpty().withMessage("Question is required"),
  body("answer").notEmpty().withMessage("Answer is required"),
];

export const updateFaqValidation = [
  body("question").optional().notEmpty(),
  body("answer").optional().notEmpty(),
];
//import { body, param } from "express-validator";

export const idValidation = [
  param("id").isMongoId().withMessage("Invalid FAQ ID"),
];