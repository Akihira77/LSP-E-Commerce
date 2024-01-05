import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Address } from "../../utils/types.ts";

type Props = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	address: Address;
	setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

export default function AddShippingAddress({
	isOpen,
	setIsOpen,
	address,
	setAddress
}: Props) {
	function closeModal() {
		setIsOpen(false);
	}

	const handleSetAddress = (propertyName: string, propertyValue: unknown) => {
		setAddress((prev) => {
			return {
				...prev,
				[propertyName]: propertyValue
			};
		});
	};

	const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
		console.log("save");
	};

	const formTemplate = () => {
		return (
			<>
				<div className="min-h-screen p-5 bg-white sm:p-8 md:min-h-0 md:rounded-xl">
					<form className="grid h-full grid-cols-2 gap-5" onSubmit={handleSave}>
						{/* <div>
							<label
								htmlFor="address.state"
								className="mb-3 block text-sm font-semibold leading-none text-body-dark"
							>
								State
							</label>
							<input
								id="address.state"
								name="address.state"
								type="text"
								className="flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border border-border-base rounded focus:border-accent h-12"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								aria-invalid="false"
								value={address?.state}
							/>
						</div> */}
						<div>
							<label
								htmlFor="address.city"
								className="mb-3 block text-sm font-semibold leading-none text-body-dark"
							>
								City
							</label>
							<input
								id="address.city"
								name="address.city"
								type="text"
								className="flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border border-border-base rounded focus:border-accent h-12"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								aria-invalid="false"
								defaultValue={address.city}
								onChange={(e) =>
									handleSetAddress("city", e.target.value)
								}
							/>
						</div>
						<div>
							<label
								htmlFor="address.state"
								className="mb-3 block text-sm font-semibold leading-none text-body-dark"
							>
								State
							</label>
							<input
								id="address.state"
								name="address.state"
								type="text"
								className="flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border border-border-base rounded focus:border-accent h-12"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								aria-invalid="false"
								defaultValue={address.state}
								onChange={(e) =>
									handleSetAddress("state", e.target.value)
								}
							/>
						</div>
						<div>
							<label
								htmlFor="address.zip"
								className="mb-3 block text-sm font-semibold leading-none text-body-dark"
							>
								ZIP
							</label>
							<input
								id="address.zip"
								name="address.zip"
								type="text"
								className="flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border border-border-base rounded focus:border-accent h-12"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								aria-invalid="false"
								defaultValue={address.postalCode}
								onChange={(e) =>
									handleSetAddress(
										"postalCode",
										e.target.value
									)
								}
							/>
						</div>
						<div className="col-span-2">
							<label
								htmlFor="address.street_address"
								className="mb-3 block text-sm font-semibold leading-none text-body-dark"
							>
								Street Address
							</label>
							<textarea
								id="address.street_address"
								name="address.street_address"
								className="flex w-full appearance-none items-center rounded px-4 py-3 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border border-border-base focus:border-accent"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								defaultValue={address.street}
								onChange={(e) =>
									handleSetAddress("street", e.target.value)
								}
								rows={4}
							></textarea>
						</div>
						<button
							data-variant="normal"
							className="inline-flex items-center justify-center shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-accent-700 bg-[#009f7f] text-white border border-transparent px-5 py-0 h-12 w-full col-span-2"
						>
							Save
						</button>
					</form>
				</div>
			</>
		);
	};

	return (
		<Transition appear show={isOpen} as={React.Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={React.Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={React.Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900 text-center"
								>
									Shipping Address
								</Dialog.Title>
								{formTemplate()}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
