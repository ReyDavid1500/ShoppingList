import { useContext } from "react";
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
  const { setLoggedIn } = useContext(UserContext);

  const { showSnackbar } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoaderContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const onHandlerSubmit = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = {
        method: "post",
        url: "https://shoppinglist-api-ctyk.onrender.com/login",
        data: data,
      };
      const response = await axios(config);
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

  return (
    <main className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="flex flex-1 flex-col items-center justify-center pb-5 pt-12 max-[500px]:p-10">
        <h2 className="mb-8 font-medium text-xl max-[500px]:text-center">
          Bienvenid@ a tu lista de compras, inicia tu sesión!
        </h2>
        <BuildingStorefrontIcon className="h-6 w-6 text-black" />
        <form
          className="w-full max-w-sm"
          onSubmit={handleSubmit(onHandlerSubmit)}
        >
          <h2 className="mx-auto mb-6 h-6 w-auto text-slate-900 text-center text-4xl font-bold">
            Login
          </h2>
          <InputUserForm
            htmlFor="email"
            id="email"
            name="email"
            type="text"
            placeholder="youremail@gmail.com"
            title="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <InputUserForm
            htmlFor="password"
            id="password"
            type="password"
            placeholder="password"
            name="password"
            title="Password"
            register={register}
            error={errors?.password?.message}
          />
          <button
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            type="submit"
          >
            <span>Sign in to account</span>
          </button>
        </form>
        <p className="mt-8 text-center"></p>
        <p className="mt-2 text-center">
          <Link to="/signup">Don't have an account?</Link>
        </p>
        <p className="text-center mt-5 font-bold underline text-blue-400"></p>
      </div>
    </main>
  );
};

export default SignIn;
