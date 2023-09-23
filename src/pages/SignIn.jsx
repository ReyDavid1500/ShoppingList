import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputUserForm from "../components/InputUserForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { SnackbarContext } from "../Contexts/SnackbarContext";
import { LoaderContext } from "../Contexts/LoaderContext";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const SignIn = () => {
  const { setLoggedIn, loggedIn } = useContext(UserContext);

  const { showSnackbar } = useContext(SnackbarContext);
  const { setIsLoading, isLoading } = useContext(LoaderContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onKeyUpHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onHandlerSubmit);
    }
  };

  const onHandlerSubmit = async (data) => {
    setIsLoading(true);
    try {
      const config = {
        method: "post",
        url: "https://shoppinglist-api-ctyk.onrender.com/login",
        data: data,
      };
      const response = await axios(config);
      console.log(response);
      setLoggedIn(response.data);
      localStorage.setItem("USER_TOKEN", response.data.token);
      navigate("/");
      showSnackbar("Inicio de sesión exitoso...");
    } catch (error) {
      if (error.response.status === 401) {
        showSnackbar("Invalid email or password...");
      }
    }
    setIsLoading(false);
  };

  //hacer un efecto que vea si tiene loogedIn, !loggedIn queda en la vista sino se va al "/".

  return (
    <main className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="flex flex-1 flex-col items-center justify-center pb-5 pt-12">
        <BuildingStorefrontIcon className="h-6 w-6 text-black" />
        <h1 className="mb-8 font-medium text-xl">
          Bienvenid@ a tu lista de compras, inicia tu sesión!
        </h1>
        <form
          onKeyUp={onKeyUpHandler}
          className="w-full max-w-sm"
          onSubmit={handleSubmit(onHandlerSubmit)}
        >
          <h1 className="mx-auto mb-6 h-6 w-auto text-slate-900 text-center text-4xl font-bold">
            Login
          </h1>
          <InputUserForm
            htmlFor="email"
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            title="Email Adress"
            register={register}
            error={errors?.email?.message}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputUserForm
            htmlFor="password"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            title="Password"
            register={register}
            error={errors?.password?.message}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            <span>Sign in to account</span>
          </button>
          <input type="hidden" name="remember" value={true} />
          <p className="mt-8 text-center">
            {/* <a href="">Forgot password</a> */}
          </p>
          <p className="mt-2 text-center">
            <Link to="/signup">Don't have an account?</Link>
          </p>
          <p className="text-center mt-5 font-bold underline text-blue-400">
            {/* <Link to="/">Go back!</Link> */}
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignIn;

//Usar Regular Expressions para validar el correo
//input correo componetizar y que reciba por props el error en caso de que el correo sea invalido
//boton desabilitado si no hay nada escrito
//onSubmit hacer console.log(data)

//react hook Form
