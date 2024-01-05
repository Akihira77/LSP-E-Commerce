import { Dialog, Transition } from "@headlessui/react";
import React from "react";

type Props = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	phoneNumber: string;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddContact({
	isOpen,
	setIsOpen,
	phoneNumber,
	setPhoneNumber
}: Props) {
	function closeModal() {
		console.log("hit");
		setIsOpen(false);
	}

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("save");
		return;
	};

	const formTemplate = () => {
		return (
			<div className="min-w-content relative inline-block max-w-full align-middle transition-all ltr:text-left rtl:text-right opacity-100 scale-100">
				<button className="absolute top-4 z-[60] inline-block outline-none focus:outline-0 ltr:right-4 rtl:left-4 lg:hidden">
					<span className="sr-only">close</span>
					<svg
						className="h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
				<div className="flex flex-col justify-center min-h-screen p-5 bg-white sm:p-8 md:min-h-0 md:rounded-xl">
					<form className="w-full" onSubmit={handleSave}>
						<div className="flex flex-col">
							<div className="flex w-full items-center md:min-w-[360px]">
								<div className="w-full">
									<input
										className="form-control ps-2 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base rounded-l focus:!border-[#009f7f] !h-12"
										defaultValue={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
										type="tel"
									/>
								</div>
								<button
									data-variant="normal"
									className="inline-flex items-center justify-center shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-[#009f7f] bg-[#009f7f] text-white border border-transparent hover:bg-[#009f7f] px-5 py-0 h-12 !text-sm rounded-r"
								>
									{phoneNumber ? "Update" : "Add"} Contact
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
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
									Add New Contact Number
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
