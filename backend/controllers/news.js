const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const News = require("../models/News");
const asyncHandler = require("../middleware/async");




// @desc      Get all news
// @route     GET /api/news/
// @access    Public
exports.getallNews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single news
// @route     GET /api/news/news id
// @access    Public
exports.getNews = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorResponse(`No news in this id`), 404);
  }

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc      Add news
// @route     POST /api/news
// @access    Private
exports.addNews = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published news
  const newspublished = await News.findOne({
    user: req.user.id,
  });

  // if (req.body.catname === newspublished.catname) {
  //   return next(new ErrorResponse(`Same news `, 400));
  // }
  const news = await News.create(req.body);

  res.status(201).json({
    success: true,
    data: news,
  });
});

// @desc      Update news
// @route     PUT /api/v1/news/newsId
// @access    Private
exports.updateNews = asyncHandler(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(
    req.params.newsId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc      Delete news
// @route     DELETE /api/news/newsId
// @access    Private
exports.deleteNews = asyncHandler(async (req, res, next) => {
  try {
    let news = await News.findById(req.params.id);
    if (!news) {
      return next(
        new ErrorResponse(`No news with id ${req.params.id}`, 400)
      );
    }
    await News.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// // PHOTO

// exports.CatPhotoUpload = asyncHandler(async (req, res, next) => {
//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400));
//   }

//   const file = req.files.file;
//   console.log(file);

//   // Make sure the image is a photo
//   if (!file.mimetype.startsWith("image")) {
//     return next(new ErrorResponse(`Please upload an image file`, 400));
//   }

//   // Check filesize
//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//         400
//       )
//     );
//   }

//   file.mv(
//     `${__dirname}/../../frontend/public/uploads/${file.name}`,
//     async (err) => {
//       if (err) {
//         console.error(err);
//         return next(new ErrorResponse(`Problem with file upload`, 500));
//       }

//       const files = `/uploads/${file.name}`;

//       res.status(200).json({
//         success: true,
//         data: files,
//       });
//     }
//   );
// });


// mani
// From Manikanta Nayar to Everyone:  07:34 PM
// @desc      Upload photo for doctor
// @route     PUT /api/v1/tutor/photo
// @access    Private
exports.newsphotoUpload = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;
  console.log(file);

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.mv(
    `${__dirname}/../../my-app/public/uploads/${file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }

      const files = `/uploads/${file.name}`;

      res.status(200).json({
        success: true,
        data: files,
      })
    }
  )
}
)
