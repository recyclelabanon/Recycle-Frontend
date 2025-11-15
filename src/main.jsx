import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

// 🔹 Pages
import Home from "./Pages/Home.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Initiatives from "./Pages/Initiatives.jsx";
import Team from "./Pages/Team.jsx";
import Contacts from "./Pages/Contact.jsx";
import JoinUs from "./components/JoinUs.jsx";
import InitiativesDetails from "./components/InitiativesDetails.jsx";
import Donate from "./Pages/Donates.jsx";
import Event from "./Pages/Events.jsx";
import Blog from "./Pages/Blogs.jsx";
import Layout from "./Admin/Components/Layout.jsx";
import Dashboard from "./Admin/Pages/Dashboard.jsx";
import Blogs from "./Admin/Pages/Blogs.jsx";
import Teams from "./Admin/Pages/TeamsAdmin.jsx";
import Programs from "./Admin/Pages/Programs.jsx";
import ContactAdmin from "./Admin/Pages/Contact.jsx";
import BlogDetail from "./components/BlogDetails.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import NewBlog from "./Admin/Components/NewBlog.jsx";
import EditBlog from "./Admin/Components/EditBlog.jsx";
import NewNews from "./Admin/Components/NewNews.jsx";
import NewsAdmin from "./Admin/Pages/News.jsx";
import EditNews from "./Admin/Components/EditNews.jsx";
import NewsPage from "./Pages/News.jsx";
import NewsDetail from "./components/BlogDetails.jsx";
import NewTeam from "./Admin/Components/NewTeam.jsx";
import EditTeam from "./Admin/Components/EditTeam.jsx";
import EventAdmin from "./Admin/Pages/EventAdmin.jsx";
import NewEvent from "./Admin/Components/NewEvent.jsx";
import EditEvent from "./Admin/Components/EditEvent.jsx";
import EventDetailsPage from "./components/Event/EventDetailsPage.jsx";
import EventRegistrations from "./Admin/Pages/EventRegistrations.jsx";
import NewsletterAdmin from './Admin/Pages/NewsletterAdmin.jsx';
import HomeHero from "./Admin/Pages/HomeHero";
import AdminDonationHero from "./Admin/Pages/AdminDonationHero";
import AdminHomepageWorkSection from "./Admin/Pages/AdminHomepageWorkSection";
import AdminHomepageParticipate from "./Admin/Pages/AdminHomepageParticipate.jsx";
import HireUsAdmin from "./Admin/Pages/HireUsAdmin.jsx";
import AdminQuote from "./Admin/Pages/AdminQuote.jsx";
import AdminNewsletterSettings from "./Admin/Pages/AdminNewsletterSettings.jsx";
import AdminSubscribers from "./Admin/Pages/AdminSubscribers.jsx";
import AdminFooterSettings from "./Admin/Pages/AdminFooterSettings.jsx";
import AdminAboutUs from './Admin/Pages/AdminAboutUs.jsx';
import AdminApp from "./Admin/Pages/AdminApp.jsx";
import TeamAdmin from "./Admin/Pages/TeamAdmin.jsx";
import PartnerAdmin from "./Admin/Pages/PartnerAdmin.jsx";
import AdminLogin from "./Admin/Pages/Login.jsx";


import AdminContactEditor from "./Admin/Pages/AdminContactEditor.jsx";
import AdminMessagesViewer from "./Admin/Pages/AdminMessagesViewer.jsx";
import AdminProgrammesEditor from "./Admin/Pages/AdminProgrammesEditor.jsx";
import AdminDonationPageHero  from "./Admin/Pages/AdminDonationPageHero.jsx";
import AdminContactHero from "./Admin/Pages/AdminContactHero";
import AdminInitiatives from "./Admin/Pages/AdminInitiatives.jsx";




import "./index.css";

// ✅ Context Providers
import { AuthProvider } from "./Admin/Context/AuthContext.jsx";
import { BlogProvider } from "./Admin/Context/BlogContext.jsx";
import { NewsProvider } from "./Admin/Context/NewsContext.jsx";
import { EventProvider } from "./Admin/Context/EventContext.jsx";
import { TeamProvider } from "./Admin/Context/TeamContext.jsx";
import { PartnerProvider } from "./Admin/Context/PartnerContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ Wrap app with all providers */}
      <AuthProvider>
        <BlogProvider>
          <NewsProvider>
            <EventProvider>
              <TeamProvider>
                <PartnerProvider>
                  <Routes>
                    <Route path="/" element={<App />}>
                      {/* Auth Routes */}
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                      <Route index element={<Home />} />
                      <Route path="admin/login" element={<AdminLogin />} />

                      {/* Admin Routes */}
                      <Route
                        path="admin"
                        element={
                          <PrivateRoute>
                            <Layout />
                          </PrivateRoute>
                        }
                      >
                        <Route index element={<Dashboard />} />
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="blogs/new" element={<NewBlog />} />
                        <Route path="blogs/edit/:id" element={<EditBlog />} />
                        <Route path="news" element={<NewsAdmin />} />
                        <Route path="news/new" element={<NewNews />} />
                        <Route path="news/edit/:id" element={<EditNews />} />
                        <Route path="teams" element={<Teams />} />
                        <Route path="teams/new" element={<NewTeam />} />
                        <Route path="teams/edit/:id" element={<EditTeam />} />
                        <Route path="events" element={<EventAdmin />} />
                        <Route path="events/new" element={<NewEvent />} />
                        <Route path="events/edit/:id" element={<EditEvent />} />
                        <Route path="events/registrations/:id" element={<EventRegistrations />} />
                        <Route path="programs" element={<Programs />} />
                        <Route path="contacts" element={<ContactAdmin />} />
                        <Route path="newsletter" element={<NewsletterAdmin />} />

                        <Route path="home-hero" element={<HomeHero />} />
                        <Route path="donation-hero" element={<AdminDonationHero />} />
                        <Route path="homepage-work" element={<AdminHomepageWorkSection />} />
                        <Route path="homepage-participate" element={<AdminHomepageParticipate />} />
                        <Route path="hire-us" element={<HireUsAdmin />} />
                        <Route path="quote" element={<AdminQuote />} />
                        <Route path="newsletter-settings" element={<AdminNewsletterSettings />} />
                        <Route path="subscribers" element={<AdminSubscribers />} />
                        <Route path="footer-settings" element={<AdminFooterSettings />} />
                        <Route path="about-us" element={<AdminAboutUs />} />
                        <Route path="team-partner" element={<AdminApp />} />
                        <Route path="team-admin" element={<TeamAdmin />} />
                        <Route path="partners" element={<PartnerAdmin />} />

                         <Route path="contact-editor" element={<AdminContactEditor />} />
                        <Route path="messages" element={<AdminMessagesViewer />} />
                        <Route path="programmes-editor" element={<AdminProgrammesEditor />} />
                        <Route path="donation-page-hero" element={<AdminDonationPageHero />} />
                        <Route path="contact-hero" element={<AdminContactHero />} />
                        <Route path="initiatives" element={<AdminInitiatives />} />



                        






                        <Route path="*" element={<h1>Page not found</h1>} />
                      </Route>

                      {/* Frontend Routes */}
                      <Route path="about" element={<AboutUs />} />
                      <Route path="initiatives" element={<Initiatives />} />
                      <Route path="initiatives/:id" element={<InitiativesDetails />} />
                      <Route path="team" element={<Team />} />
                      <Route path="contacts" element={<Contacts />} />
                      <Route path="news" element={<NewsPage />} />
                      <Route path="news/:slug" element={<NewsDetail />} />
                      <Route path="blog" element={<Blog />} />
                      <Route path="blog/:slug" element={<BlogDetail />} />
                      <Route path="events" element={<Event />} />
                      <Route path="events/:id" element={<EventDetailsPage />} />
                      <Route path="donate" element={<Donate />} />
                      <Route path="joinus" element={<JoinUs />} />
                      <Route path="*" element={<h1>Page not found</h1>} />
                    </Route>
                  </Routes>
                </PartnerProvider>
              </TeamProvider>
            </EventProvider>
          </NewsProvider>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
