// /*
// const asyncHandler=(requestHandler)=>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next)).catch((err)=>{next(err)})
//     }
// }
// */

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     // res.status(error.statusCode || 500).json({
//     //   success: false,
//     //   message: error.message,
//     // });
//     console.error("Original error:", error);

//   next(error);
//   }
// };

// export { asyncHandler };



const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncHandler };
