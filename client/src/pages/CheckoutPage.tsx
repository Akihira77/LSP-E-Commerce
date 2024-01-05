import React from "react";
import AddContact from "../components/dialog/AddContact.tsx";
import AddShippingAddress from "../components/dialog/AddShippingAddress.tsx";
import { AuthContext } from "../utils/context/AuthContext.tsx";
import { getMyCart, getMyPreviewCart, postCheckout } from "../utils/api.ts";
import { formatCurrency } from "../utility.ts";
import { Address, CartType } from "../utils/types.ts";
import { useNavigate } from "react-router-dom";

export const CheckoutPage: React.FC = () => {
	const { user, totalPrice, updateTotalPrice } =
		React.useContext(AuthContext);
	const [contactDialog, setContactDialog] = React.useState(false);
	const [shippingDialog, setShippingDialog] = React.useState(false);
	const [cartItems, setCartItems] = React.useState<CartType[]>([]);
	const [orderNote, setOrderNote] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState<string>(
		user!.phoneNumber
	);
	const [address, setAddress] = React.useState<Address>(user!.address);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const findCart = async () => {
			const myCart = await getMyCart();
			const myPreviewCart = await getMyPreviewCart();
			const { cart } = myCart.data;

			updateTotalPrice(myPreviewCart.data.totalPrice);
			setCartItems(cart);
		};

		findCart();
	}, []);

	const setContactTemplate = () => {
		return (
			<div className="bg-white p-5 shadow-700 md:p-8">
				<div className="mb-5 flex items-center justify-between md:mb-8">
					<div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009f7f] text-base text-white lg:text-xl">
							1
						</span>
						<p className="text-lg capitalize text-heading lg:text-xl">
							Contact Number
						</p>
					</div>
					<button
						className="flex items-center text-sm font-semibold text-[#009f7f] transition-colors duration-200 hover:text-[#009f7f]-hover focus:text-[#009f7f]-hover focus:outline-0"
						onClick={() => setContactDialog(true)}
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							></path>
						</svg>
						{!user ? "Add" : "Update"}
					</button>
					<AddContact
						isOpen={contactDialog}
						setIsOpen={setContactDialog}
						phoneNumber={phoneNumber}
						setPhoneNumber={setPhoneNumber}
					/>
				</div>
				<div className="w-full">
					<div className=" react-tel-input ">
						<input
							className="form-control ps-4 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-[#009f7f] !h-12"
							value={user ? phoneNumber : "No Phone Number Found"}
							disabled
							type="tel"
						/>
					</div>
				</div>
			</div>
		);
	};

	const setShippingAddressTemplate = () => {
		return (
			<div className="bg-white p-5 shadow-700 md:p-8">
				<div className="mb-5 flex items-center justify-between md:mb-8">
					<div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009f7f] text-base text-white lg:text-xl">
							2
						</span>
						<p className="text-lg capitalize text-heading lg:text-xl">
							Shipping Address
						</p>
					</div>
					<button
						className="flex items-center text-sm font-semibold text-[#009f7f] transition-colors duration-200 hover:text-[#009f7f]-hover focus:text-[#009f7f]-hover focus:outline-0"
						onClick={() => setShippingDialog(true)}
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							></path>
						</svg>
						{!user ? "Add" : "Update"}
					</button>
					<AddShippingAddress
						isOpen={shippingDialog}
						setIsOpen={setShippingDialog}
						address={address}
						setAddress={setAddress}
					/>
				</div>
				{!user ? (
					<div className="grid grid-cols-1 gap-4">
						<span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
							No Address Found
						</span>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4">
						<span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
							{`${user.address.street}, ${user.address.city}, ${user.address.state}. ${user.address.postalCode}`}
						</span>
					</div>
				)}
			</div>
		);
	};

	const addOrderNoteTemplate = () => {
		return (
			<div className="bg-white p-5 shadow-700 md:p-8">
				<div className="mb-5 flex items-center justify-between md:mb-8">
					<div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009f7f] text-base text-white lg:text-xl">
							3
						</span>
						<p className="text-lg capitalize text-heading lg:text-xl">
							Order Note
						</p>
					</div>
				</div>
				<div className="block">
					<div>
						<textarea
							id="orderNote"
							name="orderNote"
							className="flex w-full appearance-none items-center rounded px-4 py-3 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border border-border-base focus:border-[#009f7f]"
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							rows={4}
							onChange={(e) => setOrderNote(e.target.value)}
						></textarea>
					</div>
				</div>
			</div>
		);
	};

	const cartItemTemplate = (
		productName: string,
		quantity: number,
		productPrice: string
	) => {
		return (
			<div key={productName} className="flex justify-between py-2">
				<div className="flex items-center justify-between text-base">
					<span className="text-sm text-slate-500">
						<span className="text-sm font-bold text-black text-heading">
							{quantity}
						</span>
						<span className="mx-2">x</span>
						<span>{productName}</span>
					</span>
				</div>
				<span className="text-sm text-slate-500">
					{formatCurrency(Number(productPrice) * quantity)}
				</span>
			</div>
		);
	};

	const handlePlaceOrder = () => {
		setLoading(true);
		postCheckout().then(({ data }) => {
			setLoading(false);
			console.log(data);
			navigate(`place-order/${data.id}`);
		});
		return;
	};

	return (
		<>
			<div className="h-screen bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
				<div className="m-auto flex w-full max-w-5xl flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
					<div className="w-full space-y-6 lg:max-w-2xl">
						{setContactTemplate()}

						{setShippingAddressTemplate()}

						{/* {addOrderNoteTemplate()} */}
					</div>
					<div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
						<div className="w-full">
							<div className="mb-4 flex flex-col items-center space-x-4 rtl:space-x-reverse">
								<span className="text-base font-bold text-heading">
									Your Order
								</span>
							</div>
							<div className="flex flex-col border-b border-border-200 py-3"></div>
							<div className="mt-4 space-y-2">
								{cartItems.length > 0 &&
									cartItems.map(({ product, quantity }) =>
										cartItemTemplate(
											product.name,
											quantity,
											product.price
										)
									)}
								<div className="flex justify-between">
									<p className="text-sm text-slate-500">
										Sub Total
									</p>
									<span className="text-sm text-slate-500">
										{formatCurrency(totalPrice)}
									</span>
								</div>
							</div>
							<button
								data-variant="normal"
								className={`inline-flex items-center justify-center shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-[#009f7f]-700 ${
									user && cartItems.length > 0
										? "bg-[#009f7f]"
										: "bg-red-600"
								} text-white border border-transparent hover:bg-[#009f7f]-hover px-5 py-0 h-12 mt-5 w-full`}
								disabled={
									user === undefined || cartItems.length === 0
								}
								onClick={handlePlaceOrder}
							>
								{user && cartItems.length > 0
									? "Place Order"
									: "Cart's Empty"}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Loading */}
			{loading && (
				<div className="fixed top-0 left-0 h-full w-full bg-[#FFFFFFB3]"></div>
			)}
		</>
	);
};
