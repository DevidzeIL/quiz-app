import { useRoutes } from "react-router-dom";
import { mainRoutes } from "./main";

export const AppRoutes = () => {
  const routes = mainRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
