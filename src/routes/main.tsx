import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "src/components/Layout";
import { Home } from "src/features/misc";

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const mainRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
