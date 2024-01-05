import React from "react";
import { User } from "../types.ts";

type AuthContextType = {
	user?: User;
	itemsCount: number;
	totalPrice: number;
	updateAuthUser: (data: User | undefined) => void;
	updateItemsCount: (data: number) => void;
	updateTotalPrice: (data: number) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
	updateAuthUser: () => {},
	updateTotalPrice: () => {},
	updateItemsCount: () => {},
	itemsCount: 0,
	totalPrice: 0
});
