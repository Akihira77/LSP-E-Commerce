import React from "react";
import RegisterForm from "../components/forms/RegisterForm.tsx";
import { Page } from "../utils/styles/index.tsx";

const RegisterPage = () => {
	return (
		<Page $display="flex" $justifyContent="center" $alignItems="center">
			<div className="mb-12 bg-[#009f7f] py-4 px-10 rounded text-white">
				<h2>Register</h2>
			</div>
			<RegisterForm />
		</Page>
	);
};

export default RegisterPage;
