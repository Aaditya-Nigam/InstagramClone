import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AppLayout } from "./components/layout/AppLayout";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App=()=>{

  const {checkAuth,isCheckingAuth,authUser}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return <h1>Loading..</h1>
  }

  const router=createBrowserRouter([
    {
      path: "/SignUp",
      element: <SignUp/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/",
      element: <AppLayout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;