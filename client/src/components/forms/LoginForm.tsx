import React from "react";
import {
    Button,
    InputContainer,
    InputField,
    InputLabel,
} from "../../utils/styles/index.tsx";
import styles from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserLoginParams } from "../../utils/types.ts";
import { postLoginUser } from "../../utils/api.ts";
import { AuthContext } from "../../utils/context/AuthContext.tsx";

const LoginForm = () => {
    const { register, handleSubmit } = useForm<UserLoginParams>();
    const navigate = useNavigate();
    const { updateAuthUser } = React.useContext(AuthContext);

    const onSubmit = async (input: UserLoginParams) => {
        try {
            const { data } = await postLoginUser(input);

            updateAuthUser(data.user);
            if (data.user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputField
                    id="email"
                    type="email"
                    {...register("email", {
                        required: true,
                    })}
                />
            </InputContainer>
            <InputContainer>
                <InputLabel htmlFor="password">Password</InputLabel>
                <InputField
                    id="password"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                />
            </InputContainer>
            <Button className={styles.button}>Login</Button>
            <div className={styles.footerText}>
                <span>Don't have an account? </span>
                <Link to="/register">Register</Link>
            </div>
        </form>
    );
};

export default LoginForm;
