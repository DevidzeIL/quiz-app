import { useTheme } from "src/providers/ThemeContext";
import "./MainLayout.css";
import { MoonIcon } from "../UI/MoonIcon";
import { SunIcon } from "../UI/SunIcon";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`main-layout ${theme}-theme`}>
      <button className="button-theme " onClick={toggleTheme}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
      <main>{children}</main>
    </div>
  );
};
