export type Address = {
	id: number;
	street: string;
	city: string;
	state: string;
	postalCode: string;
};

export type User = {
	id: number;
	username: string;
	phoneNumber: string;
	email: string;
	role: "ADMIN" | "CUSTOMER";
	address: Address;
};

export type CreateUserParams = {
	name: string;
	phoneNumber: string;
	email: string;
	password: string;
	address: Omit<Address, "id">;
};

export type UserLoginParams = {
	email: string;
	password: string;
};

export type Category = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type ProductType = {
	id: number;
	name: string;
	price: string;
	stock: number;
	imageName: string;
	imageData: string;
};

export type CartType = {
	id: number;
	product: ProductType;
	quantity: number;
};

export type TProduct = {
	id: number;
	name: string;
	price: string;
	stock: number;
	imageName: string;
	imageData: string;
	image?: File;
	category: Category;
};
