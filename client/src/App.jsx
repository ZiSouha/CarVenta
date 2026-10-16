import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import CarDetails from "./pages/CarDetails"
import Cars from "./pages/Cars"
import Home from './pages/Home'
import MyBookings from "./pages/MyBookings"
import Services from "./pages/Services"
import React, { useState } from 'react'
import Footer from "./components/Footer"
import Layout from "./pages/owner/Layout"
import Dashboard from "./pages/owner/Dashboard"
import AddCar from "./pages/owner/AddCar"
import ManageCars from "./pages/owner/ManageCars"
import ManageBookings from "./pages/owner/ManageBookings"
import Analytics from "./pages/owner/Analytics"
import PublicAnalytics from "./pages/Analytics"
import ManageUsers from "./pages/owner/ManageUsers"
import ActivityLogs from "./pages/owner/ActivityLogs"
import HomeCMS from "./pages/owner/HomeCMS"
import Settings from "./pages/owner/Settings"
import DamageReports from "./pages/owner/DamageReports"
import LiveChatAdmin from "./pages/owner/LiveChatAdmin"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./components/Login"
import Blog from "./pages/Blog"
import Careers from "./pages/Careers"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Business from "./pages/Business"
import HowItWorksPage from "./pages/HowItWorksPage"
import Insurance from "./pages/Insurance"
import Cookies from "./pages/Cookies"
import Guidelines from "./pages/Guidelines"
import Safety from "./pages/Safety"
import Help from "./pages/Help"
import Status from "./pages/Status"
import Press from "./pages/Press"
import ChatWidget from "./components/ChatWidget"
import LiveChat from "./components/LiveChat"
import MyProfile from "./pages/MyProfile"
import Favorites from "./pages/Favorites"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import VerifyEmail from "./pages/VerifyEmail"
import { Toaster } from 'react-hot-toast'
import { useAppContext } from "./context/AppContext"
import ScrollToTop from "./components/ScrollToTop"
import CookieConsent from "./components/CookieConsent"
import Referral from "./pages/Referral"
import Membership from "./pages/Membership"
import Documents from "./pages/Documents"
import Verification from "./pages/Verification"
import PaymentSuccess from "./pages/PaymentSuccess"
import Promotions from "./pages/Promotions"

const App = () => {
  const { showLogin } = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
      <ScrollToTop />
      <CookieConsent />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #E2E8F0',
            padding: '16px',
            color: '#1E293B',
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      {!isOwnerPath && <LiveChat />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/business" element={<Business />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/help" element={<Help />} />
        <Route path="/status" element={<Status />} />
        <Route path="/press" element={<Press />} />
        <Route path="/analytics" element={<PublicAnalytics />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="cms" element={<HomeCMS />} />
          <Route path="settings" element={<Settings />} />
          <Route path="damage-reports" element={<DamageReports />} />
          <Route path="live-chat" element={<LiveChatAdmin />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
