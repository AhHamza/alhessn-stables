import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) { //children-> <AdminDashboard/>
    const token = localStorage.getItem('alhessn_token')

    if (!token) {
        return <Navigate to="/admin/login" />
    }

    return children
}