import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, UserProvider, NotesProvider } from '@/contexts';
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Completed from "./pages/Completed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <NotesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Landing & Auth routes without layout */}
                  <Route path="/welcome" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Main routes with layout */}
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  <Route path="/new-note" element={<Layout><NewNote /></Layout>} />
                  <Route path="/edit/:id" element={<Layout><EditNote /></Layout>} />
                  <Route path="/note/:id" element={<Layout><NoteDetail /></Layout>} />
                  <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
                  <Route path="/completed" element={<Layout><Completed /></Layout>} />
                  <Route path="/profile" element={<Layout><Profile /></Layout>} />
                  <Route path="*" element={<Layout><NotFound /></Layout>} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </NotesProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
