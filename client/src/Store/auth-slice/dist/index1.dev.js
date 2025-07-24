"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logout = exports.setUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null
};
var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: function setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: function logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});
var _authSlice$actions = authSlice.actions,
    setUser = _authSlice$actions.setUser,
    logout = _authSlice$actions.logout; // ✅ Export actions properly

exports.logout = logout;
exports.setUser = setUser;
var _default = authSlice.reducer; // ✅ Ensure default export

exports["default"] = _default;