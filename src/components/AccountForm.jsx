import { Link, useNavigate } from "react-router-dom";
import InputUserForm from "./InputUserForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useState } from "react";
import axios from "axios";
import { SnackbarContext } from "../Contexts/SnackbarContext";

const schema = yup.object().shape({
  name: yup.string().required().min(2, "Name must have over 2 characters"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must have over 8 characters")
    .max(20),
  validatePassword: yup
    .string()
    .required()
    .min(8, "Password must have over 8 characters")
    .max(20)
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

const AccountForm = () => {
  const { showSnackbar } = useContext(SnackbarContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onHandlerSubmit = async (data) => {
    try {
      const config = {
        method: "post",
        url: "https://shoppinglist-api-ctyk.onrender.com/register",
        data: data,
      };
      const response = await axios(config);
      console.log(response);
      showSnackbar("Your Account has been setup Successfully...");
      navigate("/signin");
    } catch (error) {
      if (error.response.status === 400) {
        showSnackbar(`${email} already exists, go to Signin...`);
      }
    }
  };

  const onKeyUpHandler = (e) => {
    if (e.key === "Enter") {
      onHandlerSubmit(e);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="flex flex-1 flex-col items-center justify-center pb-5 pt-12">
        <form
          className="w-full max-w-sm"
          onSubmit={handleSubmit(onHandlerSubmit)}
          onKeyUp={onKeyUpHandler}
        >
          <h1 className="mx-auto mb-6 h-6 w-auto text-slate-900 text-center text-4xl font-bold">
            SignUp
          </h1>
          <InputUserForm
            register={register}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            title="Name"
            error={errors?.name?.message}
            onChange={(e) => setName(e.target.value)}
          />
          <InputUserForm
            register={register}
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            title="Email Address"
            error={errors?.email?.message}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputUserForm
            register={register}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            title="Password"
            error={errors?.password?.message}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputUserForm
            register={register}
            id="validate_password"
            type="password"
            placeholder="Validate Password"
            name="validatePassword"
            title="Validate Password"
            error={errors?.validatePassword?.message}
          />
          <button
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            <span>Sign up</span>
          </button>
          <input type="hidden" name="remember" value={true} />
          <p className="mt-8 text-center">
            {/* <a href="">Forgot password</a> */}
          </p>
          <p className="mt-2 text-center">
            <Link to="/signin">I have an account?</Link>
          </p>
          <p className="text-center mt-5 font-bold underline text-blue-400">
            {/* <Link to="/">Go back!</Link> */}
          </p>
        </form>
      </div>
    </main>
  );
};

export default AccountForm;

//Comparar la validación del Password

//Express con Mongo y Passport (ver tutoriales)
