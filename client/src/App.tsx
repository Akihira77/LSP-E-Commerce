import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AuthContext } from "./utils/context/AuthContext.tsx";
import { User } from "./utils/types.ts";
import Dashboard from "./pages/Admin/Dashboard.tsx";
import Sidebar from "./pages/Admin/Sidebar.tsx";
import UsersLayout from "./pages/Admin/UsersLayout.tsx";
import TransactionsLayout from "./pages/Admin/TrasanctionsLayout.tsx";
import CategoriesLayout from "./pages/Admin/CategoriesLayout.tsx";
import ProductsLayout from "./pages/Admin/ProductsLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import { CheckoutPage } from "./pages/CheckoutPage.tsx";
import CustomerMenuHeader from "./components/CustomerMenuHeader.tsx";
import DeleteProduct from "./pages/Admin/DeleteProduct.tsx";
import EditProduct from "./pages/Admin/EditProduct.tsx";
import AddProduct from "./pages/Admin/AddProduct.tsx";
import InvoicePage from "./pages/InvoicePage.tsx";
import MyOrdersPage from "./pages/MyOrdersPage.tsx";

function App() {
	const [user, setUser] = React.useState<User>();
	const [itemsCount, setItemsCount] = React.useState(0);
	const [totalPrice, setTotalPrice] = React.useState(0);

	return (
		<AuthContext.Provider
			value={{
				user,
				updateAuthUser: setUser,
				itemsCount,
				totalPrice,
				updateItemsCount: setItemsCount,
				updateTotalPrice: setTotalPrice
			}}
		>
			<Routes>
				<Route
					path="admin"
					element={
						<AuthenticatedRoute>
							<Sidebar />
						</AuthenticatedRoute>
					}
				>
					{/* <AuthenticatedRoute> <Sidebar />
					</AuthenticatedRoute>} */}

					<Route index element={<Dashboard />} />
					<Route path="users" element={<UsersLayout />} />
					<Route
						path="transactions"
						element={<TransactionsLayout />}
					/>
					<Route path="categories" element={<CategoriesLayout />} />
					<Route path="products" element={<ProductsLayout />} />
					<Route path="products/create" element={<AddProduct />} />
					<Route path="products/edit/:id" element={<EditProduct />} />
					<Route
						path="products/delete/:id"
						element={<DeleteProduct />}
					/>
				</Route>

				<Route
					path="checkout"
					element={
						<AuthenticatedRoute>
							<CustomerMenuHeader />
							<CheckoutPage />
						</AuthenticatedRoute>
					}
				/>

				<Route
					path="checkout/place-order/:id"
					element={
						<AuthenticatedRoute>
							<CustomerMenuHeader />
							<InvoicePage />
						</AuthenticatedRoute>
					}
				/>

				<Route
					path="my-orders"
					element={
						<AuthenticatedRoute>
							<CustomerMenuHeader />
							<MyOrdersPage />
						</AuthenticatedRoute>
					}
				/>

				<Route
					path=""
					index
					element={
						<>
							<CustomerMenuHeader />
							<HomePage />
						</>
					}
				/>

				<Route
					path="register"
					element={
						<>
							<CustomerMenuHeader />
							<RegisterPage />
						</>
					}
				></Route>
				<Route
					path="login"
					element={
						<>
							<CustomerMenuHeader />
							<LoginPage />
						</>
					}
				></Route>
			</Routes>
			{/* <Outlet /> */}
		</AuthContext.Provider>
	);
}

export default App;
