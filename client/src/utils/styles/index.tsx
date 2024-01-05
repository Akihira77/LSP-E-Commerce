import styled from "styled-components";
import { InputContainerProps, PageProps } from "./styleTypes.ts";

export const SIDEBAR_WIDTH = 280;

export const InputField = styled.input`
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		background: #131313;
	}
	background: inherit;
	outline: none;
	border: none;
	color: #000;
	font-family: "Inter";
	font-size: 18px;
	width: 100%;
	box-sizing: border-box;
	padding: 0;
	margin: 4px 0;
`;

export const InputContainer = styled.div<InputContainerProps>`
	background-color: ${(props) => props.$backgroundColor || "#FFF;"};
	padding: 12px 16px;
	width: ${(props) => props.$width || "100%;"};
	border: 1px solid black;
	border-radius: 10px;
	box-sizing: border-box;
	::-webkit-scrollbar {
		display: none;
	}
`;

export const InputLabel = styled.label`
	display: block;
	color: #8f8f8f;
	font-size: 14px;
	margin: 4px 0;
`;

export const Button = styled.button`
	width: 100%;
	background-color: #009f7f;
	outline: none;
	border: none;
	font-family: "Inter";
	color: #fff;
	font-size: 16px;
	border-radius: 10px;
	padding: 20px 0;
	font-weight: 500;
	transition: 250ms background-color ease;
	box-sizing: border-box;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
	&:active {
		background-color: #3a1cff;
	}
`;

export const Page = styled.div<PageProps>`
	height: 100%;
	display: ${(props) => props.$display};
	justify-content: ${(props) => props.$justifyContent};
	align-items: ${(props) => props.$alignItems};
	flex-direction: column;
`;

export const AdminSidebar = styled.aside`
	position: absolute;
	top: 0;
	left: 0;
	width: ${SIDEBAR_WIDTH}px;
	// max-height: 100%;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 5px;
		height: 2px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: gray;
		border-radius: 5px;
	}
`;

export const AdminSidebarContainer = styled.ul`
	& > li:hover {
		cursor: pointer;
	}
`;

export const AdminMainLayout = styled.div`
	height: 100%;
	margin-left: ${SIDEBAR_WIDTH + 20}px;
	margin-top: 20px;
`;
