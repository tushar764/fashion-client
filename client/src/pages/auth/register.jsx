

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AlertContext } from "../../Component/common/AlertContext";
import CommonForm from "../../Component/common/form";
import { registerFormControls } from "../../config/config";
import { registerUser } from "../../Store/auth-slice/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      const { success, message } = data?.payload || {};
      showAlert(message || "Something went wrong", success ? "success" : "error");

      if (success) {
        navigate("/auth/login");
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create a new account</h1>
        <p className="mt-2">
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;

