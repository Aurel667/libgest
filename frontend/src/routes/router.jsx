import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider } from "../store/AuthSession";
import { AutoAuth } from "../store/AutoAuth";
import { BookProvider } from "../store/BookStore";
import { LendingProvider } from "../store/LendingStore";
import AdminProtected from "../utils/AdminProtected";
import UserProtected from "../utils/UserProtected";
import GuestProtected from "../utils/GuestProtected";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BooksList from "../pages/user/BooksList";
import BookDetails from "../pages/user/BookDetails";
import LendingsList from "../pages/user/LendingsList";
import LendingDetails from "../pages/user/LendingDetails";
import LendingForm from "../pages/user/LendingForm";
import AdminBooks from "../pages/admin/AdminBooks";
import AdminLendings from "../pages/admin/AdminLendings";
import Layout from "../components/Layout";

export default function Router() {
    return (
        <Routes>
            <Route element={
                <AuthProvider>
                    <BookProvider>
                        <LendingProvider>
                            <Outlet />
                            <AutoAuth />
                        </LendingProvider>
                    </BookProvider>
                </AuthProvider>
            }>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/books" replace />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route element={<GuestProtected />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route path="/books" element={<BooksList />} />
                    <Route element={<UserProtected />}>
                        <Route path="/lendings" element={<LendingsList />} />
                        <Route path="/lendings/:id" element={<LendingDetails />} />
                        <Route path="/lend" element={<LendingForm />} />
                    </Route>

                    <Route element={<AdminProtected />}>
                        <Route path="/admin/books" element={<AdminBooks />} />
                        <Route path="/admin/lendings" element={<AdminLendings />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/books" replace />} />
                </Route>
            </Route>
        </Routes>
    )
}