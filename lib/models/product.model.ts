import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true},
  title: { type: String, required: true },
  currencySymbol: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  priceHistory: [
    {
      price: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    }
  ],
  discountRate: { type: Number },
  lowestPrice: { type: Number },
  highestPrice: { type: Number },
  averagePrice: { type: Number },
  category: { type: String },
  stars: { type: Number },
  ratings: { type: Number },
  available: { type: Boolean, default: true },
  image: { type: String, required: true },
  description: { type: String },
  users: [
    {
      email: { type: String, required: true },
    }
  ], default: [],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;