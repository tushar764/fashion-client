"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminSidebarMenuItems = exports.loginFormControls = exports.registerFormControls = void 0;
var registerFormControls = [{
  name: "userName",
  label: "User Name",
  placeholder: "Enter your user name",
  componentType: "input",
  type: "text"
}, {
  name: "email",
  label: "Email",
  placeholder: "Enter your email",
  componentType: "input",
  type: "email"
}, {
  name: "password",
  label: "Password",
  placeholder: "Enter your password",
  componentType: "input",
  type: "password"
}]; //   Login form method

exports.registerFormControls = registerFormControls;
var loginFormControls = [{
  name: "email",
  label: "Email",
  placeholder: "Enter your email",
  componentType: "input",
  type: "email"
}, {
  name: "password",
  label: "Password",
  placeholder: "Enter your password",
  componentType: "input",
  type: "password"
}];
exports.loginFormControls = loginFormControls;
var adminSidebarMenuItems = [{
  id: 'dashboard',
  label: 'Dashboard',
  path: '/admin/dashboard'
}, {
  id: 'products',
  label: 'products',
  path: '/admin/products'
}, {
  id: 'orders',
  label: 'orders',
  path: '/admin/orders'
}];
exports.adminSidebarMenuItems = adminSidebarMenuItems;