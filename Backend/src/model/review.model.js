
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Overall rating (4.5 / 5)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    // Review text
    review: {
      type: String,
      required: true,
      trim: true
    },

    
    ratingBreakdown: {
      accommodation: { type: Number, min: 1, max: 5 },
      tourGuides: { type: Number, min: 1, max: 5 },
      itinerary: { type: Number, min: 1, max: 5 },
      customerService: { type: Number, min: 1, max: 5 },
      valueForMoney: { type: Number, min: 1, max: 5 },
      safety: { type: Number, min: 1, max: 5 },
      transportation: { type: Number, min: 1, max: 5 },
      food: { type: Number, min: 1, max: 5 }
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// Ensure a user can only leave one review per package
reviewSchema.index({ user: 1, package: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);