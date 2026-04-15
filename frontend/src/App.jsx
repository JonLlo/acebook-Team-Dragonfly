import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import Footer from "./components/Footer";

// docs: https://reactrouter.com/en/main/start/overview
const protectedRoute = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

// const guestOnlyRoute = (element) => (
//   <ProtectedRoute ifAuthenticated>{element}</ProtectedRoute>
// );

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/posts", element: protectedRoute(<FeedPage />) },
  { path: "/profile", element: protectedRoute(<ProfilePage />) },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";

// import "./App.css";
// import { HomePage } from "./pages/Home/HomePage";
// import { LoginPage } from "./pages/Login/LoginPage";
// import { SignupPage } from "./pages/Signup/SignupPage";
// import { FeedPage } from "./pages/Feed/FeedPage";
// import { ProfilePage } from "./pages/Profile/ProfilePage";

// // docs: https://reactrouter.com/en/main/start/overview
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//   },
//   {
//     path: "/profile",
//     element: <ProfilePage />,
//   },
//   {
//     path: "/posts",
//     element: (
//     <ProtectedRoute>
//       <FeedPage />
//     </ProtectedRoute>
//     )},
// ]);

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;
