import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth.ts";

type Props = {
	children?: React.ReactNode;
};

export const AuthenticatedRoute: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const { loading, user } = useAuth();

	if (loading) {
		return <div>loading</div>;
	} else if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	} else {
		return children;
	}
};

export const AdminRoute: React.FC<Props> = () => {
	const location = useLocation();
	const { loading, user } = useAuth();

	if (loading) {
		return <div>loading</div>;
	} else if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	} else {
		if (user.role === "CUSTOMER") {
			return <Navigate to="/" state={{ from: location }} replace />;
		}
	}
};
