import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Horses from "./pages/Horses";
import BookTraining from "./pages/BookTraining";
import HorseDetail from "./pages/HorseDetail";
import BuyInquiry from "./pages/BuyInquiry";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Test from "./pages/Test";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHorses from "./pages/admin/Horses";
import HorseForm from "./pages/admin/HorseForm";
import AdminBookings from "./pages/admin/Bookings";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminLayout from "./components/AdminLayout";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horses" element={<Horses />} />
          <Route path="/horses/:id" element={<HorseDetail />} />
          <Route path="/book" element={<BookTraining />} />
          <Route path="/inquire/:horseId?" element={<BuyInquiry />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/horses"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminHorses />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/horses/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <HorseForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/horses/:id/edit"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <HorseForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminBookings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminInquiries />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/admin/horses/:id/edit" element={<HorseForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
