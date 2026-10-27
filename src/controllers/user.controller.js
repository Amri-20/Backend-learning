import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, APiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already exists");
  }

  const avatarLocalPath = req.files?.avatar(0)?.path;
  const coverImageLocalPath = req.files?.coverImage(0)?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar Is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatr.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.tolower,
  });

  const createdUser = await User.findById(user_id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new APiError(500, "Sometyhing went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "Created User Sucessfully")
    );
});

export { registerUser };
