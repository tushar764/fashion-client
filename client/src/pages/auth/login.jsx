

import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import CommonForm from "../../Component/common/form";
import { loginFormControls } from "../../config/config";
import { loginUser } from "../../Store/auth-slice/auth-slice";
import { useDispatch } from "react-redux";
import { AlertContext } from "../../Component/common/AlertContext";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const dispatch = useDispatch();
  const { showAlert } = useContext(AlertContext);

  const [formData, setFormData] = useState(initialState);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      const { success, message } = data?.payload || {};
      showAlert(message || "Something went wrong", success ? "success" : "error");
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in</h1>
        <p className="mt-2">
          Don't have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
