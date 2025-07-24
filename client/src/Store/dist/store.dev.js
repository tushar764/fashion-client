"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authSlice = _interopRequireDefault(require("./auth-slice/auth-slice"));

var _productSlice = _interopRequireDefault(require("./admin/product-slice"));

var _index = _interopRequireDefault(require("./shop/product-slice/index2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    auth: _authSlice["default"],
    adminProducts: _productSlice["default"],
    shopProducts: _index["default"]
  }
});
var _default = store; // ✅ Ensure correct export

exports["default"] = _default;