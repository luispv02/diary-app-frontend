import { BrowserRouter } from "react-router";
import { AppRoutes } from "./router/AppRoutes";
import { ToastMsg } from "./components/ui/ToastMsg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "./components/ui/ScrollToTop";

const queryClient = new QueryClient()

export const DiaryApp = () => {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>

        <ScrollToTop />
        <AppRoutes />
        <ToastMsg />
        
      </QueryClientProvider>
    </BrowserRouter>
  );
};