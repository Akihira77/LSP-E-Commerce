import React from "react";
import {
    Button,
    InputContainer,
    InputField,
    InputLabel,
} from "../../utils/styles/index.tsx";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postRegisterUser } from "../../utils/api.ts";
import { CreateUserParams } from "../../utils/types.ts";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserParams>();

    const onSubmit = async (data: CreateUserParams) => {
        try {
            await postRegisterUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(errors);

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <InputContainer>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <InputField
                            id="name"
                            type="text"
                            required
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                        <InputField
                            id="phone-number"
                            type="tel"
                            required
                            {...register("phoneNumber", {
                                required: "Phone Number is required",
                            })}
                        />
                    </InputContainer>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <InputContainer>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <InputField
                            id="email"
                            type="emai;"
                            required
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <InputField
                            id="password"
                            type="password"
                            required
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </InputContainer>
                </div>


                {/* Address */}
                <div style={{ display: "flex", gap: "1rem" }}>
                    <InputContainer>
                        <InputLabel htmlFor="address-street">Street</InputLabel>
                        <InputField
                            id="address-street"
                            type="text"
                            required
                            {...register("address.street", {
                                required: "Address Street is required",
                            })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor="address-city">City</InputLabel>
                        <InputField
                            id="address-city"
                            type="text"
                            required
                            {...register("address.city", {
                                required: "Address City is required",
                            })}
                        />
                    </InputContainer>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <InputContainer>
                        <InputLabel htmlFor="address-state">State</InputLabel>
                        <InputField
                            id="address-state"
                            type="text"
                            required
                            {...register("address.state", {
                                required: "Address State is required",
                            })}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor="address-postalCode">Postal Code</InputLabel>
                        <InputField
                            id="address-postalCode"
                            type="text"
                            required
                            {...register("address.postalCode", {
                                required: "Address State is required",
                            })}
                        />
                    </InputContainer>
                </div>

                <Button className={styles.button}>Create My Account</Button>
                <div className={styles.footerText}>
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
