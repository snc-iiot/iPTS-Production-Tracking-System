import CountBtn from "@/components/CountBtn";
import ReactSVG from "@/assets/react.svg";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "@/components/theme-provider";
import { AppLayout } from "@/layouts";
import { HomePage } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  const { setTheme } = useTheme();
  setTheme("light");
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
