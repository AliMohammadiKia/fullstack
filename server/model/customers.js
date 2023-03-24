import { model, Schema } from "mongoose";

const customerSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  favoriteColors: {
    type: Array,
    default: [],
  },
});

export default model("customers", customerSchema);
