import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewNote from "./pages/NewNote";
import NoteDetail from "./pages/NoteDetail";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Completed from "./pages/Completed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Auth routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Main routes with layout */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/new-note" element={<Layout><NewNote /></Layout>} />
                <Route path="/note/:id" element={<Layout><NoteDetail /></Layout>} />
                <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
                <Route path="/completed" element={<Layout><Completed /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/change-password" element={<Layout><ChangePassword /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
