import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {
    children: React.ReactNode;
}

export default function PublicRoute({ children }: Props) {
    const { accessToken } = useAuth();

    if (accessToken) return <Navigate to="/" replace />

    return children;
}