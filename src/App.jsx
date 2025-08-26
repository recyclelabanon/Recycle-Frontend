import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { BlogProvider } from "./Admin/Context/BlogContext.jsx";
import { AuthProvider } from "./Admin/Context/AuthContext.jsx";
import { NewsProvider } from "./Admin/Context/NewsContext.jsx";
import { TeamProvider } from "./Admin/Context/TeamContext.jsx";
import { EventProvider } from "./Admin/Context/EventContext.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
        <Navbar />
        <main className="flex-grow">
          <BlogProvider>
            <NewsProvider>
              <TeamProvider>
                <EventProvider>
                  <Outlet />
                </EventProvider>
              </TeamProvider>
            </NewsProvider>
          </BlogProvider>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;