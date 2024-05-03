import { httpStatus } from "../constants.js";

const errorHandler = async (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case httpStatus.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrack: err.stack,
      });
      break;

    case httpStatus.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrack: err.stack,
      });
      break;

    case httpStatus.BAD_REQUEST:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrack: err.stack,
      });
      break;

    case httpStatus.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrack: err.stack,
      });
      break;

    default:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrack: err.stack,
      });
      break;
  }
};

export default errorHandler;
