"use strict";

var _authSlice = _interopRequireDefault(require("../../auth-slice/auth-slice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  isLoading: false,
  productList: []
};
var shoppingProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState: initialState,
  reducers: {},
  extraReducers: function extraReducers(builder) {}
});