"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logout = exports.setUser = exports.loginUser = exports.checkAuth = exports.logoutUser = exports.registerUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
}; // Async thunk for user registration

var registerUser = (0, _toolkit.createAsyncThunk)('/auth/register', function _callee(FormData) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:5000/api/auth/register', FormData, {
            withCredentials: true
          }));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Logout function...

exports.registerUser = registerUser;
var logoutUser = (0, _toolkit.createAsyncThunk)('/auth/logout', function _callee2() {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:5000/api/auth/logout', {}, {
            withCredentials: true
          }));

        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Check Auth
// export const checkAuth = createAsyncThunk('/auth/checkauth', async () => {
//     const response = await axios.get("http://localhost:5000/api/auth/checkauth", {
//         withCredentials: true,
//         headers: {
//             'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
//         }
//     });
//     return response.data;
// });

exports.logoutUser = logoutUser;
var checkAuth = (0, _toolkit.createAsyncThunk)('/auth/checkauth', function _callee3() {
  var response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:5000/api/auth/check-auth", {
            withCredentials: true
          }));

        case 3:
          response = _context3.sent;

          if (!response.data.success) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", response.data);

        case 8:
          return _context3.abrupt("return", {
            success: false,
            user: null
          });

        case 9:
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            success: false,
            user: null
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Login 

exports.checkAuth = checkAuth;
var loginUser = (0, _toolkit.createAsyncThunk)('/auth/login', function _callee4(FormData) {
  var response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:5000/api/auth/login', FormData, {
            withCredentials: true
          }));

        case 2:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.loginUser = loginUser;
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
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(registerUser.pending, function (state) {
      state.isLoading = true;
    }) // .addCase(registerUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload; // ✅ Store registered user data
    //     state.isAuthenticated = true;
    // })
    .addCase(registerUser.fulfilled, function (state, action) {
      state.isLoading = false;
      state.user = null; // ✅ Do not store user after registration

      state.isAuthenticated = false; // ✅ Ensure user is NOT logged in
    }).addCase(registerUser.rejected, function (state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    }) // Login side 
    .addCase(loginUser.pending, function (state) {
      state.isLoading = true;
    }) // .addCase(loginUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = !action.payload.success ? null :action.
    // payload.user;
    //     state.isAuthenticated = action.payload.success ? false : true;
    // })
    .addCase(loginUser.fulfilled, function (state, action) {
      // console.log("Login Response:", action.payload);
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null; // ✅ Simplified user assignment

      state.isAuthenticated = action.payload.success; //  ? true : false; // ✅ Fixed isAuthenticated logic
    }).addCase(loginUser.rejected, function (state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    }) // check auth
    .addCase(checkAuth.pending, function (state) {
      state.isLoading = true;
    }).addCase(checkAuth.fulfilled, function (state, action) {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    }) // Logut 
    .addCase(logoutUser.fulfilled, function (state, action) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    }).addCase(checkAuth.rejected, function (state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  }
}); // Export actions and reducer

var _authSlice$actions = authSlice.actions,
    setUser = _authSlice$actions.setUser,
    logout = _authSlice$actions.logout;
exports.logout = logout;
exports.setUser = setUser;
var _default = authSlice.reducer;
exports["default"] = _default;