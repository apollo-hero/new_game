"use strict";

module.exports = class ResponseData {
  
  static ok(res, msg, data = null) {
    var idata = {
      status: 0,
      message: 'success',
      response:msg,
    };
    if (data) {
      idata = { ...idata,  result: data };
    }
    return res.status(200).json(idata);
  }

  static warning(res, msg, data = null) {
    var idata = {
      status: 0,
      message: 'warning',
      response:msg,
    };
    if (data) {
      idata = { ...idata, result: data };
    }
    return res.status(201).json(idata);
  }

  static error(res, msg, data = null) {
    var idata = {
      status: 500,
      message: "error",
      response:msg,
    };
    if (data) {
      idata = { ...idata, result: data };
    }
    return res.status(500).json(idata);
  }

  static unauthorize(res, msg, data = null) {
    var idata = {
      status: 401,
      message: "unauthorize",
      response:msg,
    };
    if (data) {
      idata = { ...idata, result: data };
    }
    return res.status(401).json(idata);
  }

  static notfound(res, msg, data = null) {
    var idata = {
      status: 404,
      message: 'not found',
      response:msg,
    };
    if (data) {
      idata = { ...idata, result: data };
    }
    return res.status(404).json(idata);
  }
};
