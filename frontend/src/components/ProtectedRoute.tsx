import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props =  {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { accessToken } = useAuth();
    
    if (!accessToken) {
        return <Navigate to="/login" replace />
    }
    return children;
} 