import React from "react";
import LoginForm from "../components/forms/LoginForm.tsx";
import { Page } from "../utils/styles/index.tsx";

const LoginPage = () => {
	return (
		<Page $display="flex" $justifyContent="center" $alignItems="center">
			<div className="mb-12 bg-[#009f7f] py-4 px-10 rounded text-white">
				<h2>Login</h2>
			</div>

			<LoginForm />
		</Page>
	);
};

export default LoginPage;
