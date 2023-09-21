import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingProvider } from "./Contexts/ShoppingContext";
import { SnackbarProvider } from "./Contexts/SnackbarContext";
import { UserProvider } from "./Contexts/UserContext";
import { LoaderProvider } from "./Contexts/LoaderContext";
import ShoppingListApp from "./pages/ShoppingListApp";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <ShoppingListApp /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <UserProvider>
      <ShoppingProvider>
        <SnackbarProvider>
          <LoaderProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </LoaderProvider>
        </SnackbarProvider>
      </ShoppingProvider>
    </UserProvider>
  );
};

export default App;
