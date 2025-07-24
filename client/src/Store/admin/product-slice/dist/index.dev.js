"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewProduct = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _User = require("../../../../../back/Models/User");

var _authRoutes = require("../../../../../back/Routes/auth-routes");

var initialState = {
  isLoading: false,
  productList: []
};
var addNewProduct = (0, _toolkit.createAsyncThunk)("/products/addnewproduct", function _callee(FormData) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axiox.post('http://localhost:5000/api/admin/products/add/formData'));

        case 2:
          result = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.addNewProduct = addNewProduct;
var adminProductsSlice = (0, _toolkit.createSlice)({
  name: 'adminProducts',
  initialState: {},
  extraReducers: function extraReducers(builder) {}
});