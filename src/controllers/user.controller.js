import { asyncHandler } from "../utils/asyncHandler.js";
import { APiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";


const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "Chalne lga hai bhai",
  // });

  const { fullName, email, username, password } = req.body;
  console.log("email:", email);
  // if (fullName === "") {
  //   throw new APiError(400, "Full name is required");
  // }
  if (
    [fullName, email, username, password].some((feild) => feild?.trim() === "")
  ) {
    throw new APiError(400, "All feilds are required");
  }
});

export { registerUser };
