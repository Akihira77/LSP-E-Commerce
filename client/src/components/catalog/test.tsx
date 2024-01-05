import React from "react";
import AddContact from "../dialog/AddContact.tsx";

export const IniComponent: React.FC = () => {
	const [contactDialog, setContactDialog] = React.useState(false);
	const [billingDialog, setBillingDialog] = React.useState(false);

	return (
		<div className="bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
			<div className="m-auto flex w-full max-w-5xl flex-col items-center rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
				<div className="w-full space-y-6 lg:max-w-2xl">
					{/* Add Contact */}
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
								Add
							</button>
							<AddContact
								isOpen={contactDialog}
								setIsOpen={setContactDialog}
							/>
						</div>
						<div className="w-full">
							<div className=" react-tel-input ">
								<input
									className="form-control ps-4 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-[#009f7f] !h-12"
									placeholder="082380539018"
									disabled={true}
									type="tel"
								/>
								<div className="flag-dropdown ">
									<div
										className="selected-flag"
										title="United States: + 1"
										tabIndex={0}
										role="button"
										aria-haspopup="listbox"
									>
										<div className="flag us">
											<div className="arrow"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Add Billing Address */}
					<div className="bg-white p-5 shadow-700 md:p-8">
						<div className="mb-5 flex items-center justify-between md:mb-8">
							<div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
								<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009f7f] text-base text-white lg:text-xl">
									2
								</span>
								<p className="text-lg capitalize text-heading lg:text-xl">
									Billing Address
								</p>
							</div>
							<button
								className="flex items-center text-sm font-semibold text-[#009f7f] transition-colors duration-200 hover:text-[#009f7f]-hover focus:text-[#009f7f]-hover focus:outline-0"
								onClick={() => setBillingDialog(true)}
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
								Add
							</button>
							<AddBillingAddress
								isOpen={billingDialog}
								setIsOpen={setBillingDialog}
							/>
						</div>
						<div className="grid grid-cols-1 gap-4">
							<span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
								No Address Found
							</span>
						</div>
					</div>

					{/* Add Shipping Address */}
					<div className="bg-white p-5 shadow-700 md:p-8">
						<div className="mb-5 flex items-center justify-between md:mb-8">
							<div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
								<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009f7f] text-base text-white lg:text-xl">
									3
								</span>
								<p className="text-lg capitalize text-heading lg:text-xl">
									Shipping Address
								</p>
							</div>
							<button className="flex items-center text-sm font-semibold text-[#009f7f] transition-colors duration-200 hover:text-[#009f7f]-hover focus:text-[#009f7f]-hover focus:outline-0">
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
								Add
							</button>
						</div>
						<div className="grid grid-cols-1 gap-4">
							<span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
								No Address Found
							</span>
						</div>
					</div>

					{/* Add Order Note */}
					<div className="bg-white p-5 shadow-700 md:p-8">
						<div className="mb-5 flex items-center justify-between md:mb-8">
							<div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
								<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009f7f] text-base text-white lg:text-xl">
									4
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
								></textarea>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
					<div className="w-full">
						<div className="mb-4 flex flex-col items-center space-x-4 rtl:space-x-reverse">
							<span className="text-base font-bold text-heading">
								Your Order
							</span>
						</div>
						<div className="flex flex-col border-b border-border-200 py-3">
							<div className="flex justify-between py-2">
								<div className="flex items-center justify-between text-base">
									<span className="text-sm text-body">
										<span className="text-sm font-bold text-heading">
											2
										</span>
										<span className="mx-2">x</span>
										<span>
											Kirkland Organic Lemonade, 150 ml
										</span>{" "}
										| <span>1 pc(s)</span> <span> </span>
									</span>
								</div>
								<span className="text-sm text-body">$3.00</span>
							</div>
						</div>
						<div className="mt-4 space-y-2">
							<div className="flex justify-between">
								<p className="text-sm text-body">Sub Total</p>
								<span className="text-sm text-body">$3.00</span>
							</div>
						</div>
						<button
							data-variant="normal"
							className="inline-flex items-center justify-center shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-[#009f7f]-700 bg-[#009f7f] text-white border border-transparent hover:bg-[#009f7f]-hover px-5 py-0 h-12 mt-5 w-full"
						>
							Check Availability
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
