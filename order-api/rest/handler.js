// Utility functions to send response and error

const sendRes = (res, msg, data, successCode) => {
  if (!data) {
    data = {};
  }
  res.status(successCode || 200).send({success: true, message: msg, data});
};

const sendError = (res, msg, data, errorCode) => {
  if (typeof msg != 'string' && msg.hasOwnProperty('message')) {
    msg = msg.message;
  }
  res.status(errorCode || 400).send({success: false, message: msg, data});
};

export {sendError, sendRes};
