import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Category } from "../../utils/types.ts";

type Props = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	category: Category | undefined;
};

export default function DeleteCategory({ isOpen, setIsOpen, category }: Props) {
	const completeRef = React.useRef(null);

	function closeModal() {
		console.log(isOpen);
		setIsOpen(false);
	}

	const handleDelete = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("delete");
	};

	return (
		<Transition appear show={isOpen} as={React.Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={completeRef}
				onClose={closeModal}
			>
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all text-center">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Delete Confirmation
								</Dialog.Title>
								<form
									className="mt-2"
									onSubmit={handleDelete}
									ref={completeRef}
								>
									<p className="text-sm text-gray-500">
										Are you sure want to delete Category?
										<span className="block py-4 font-bold">
											{`#${category?.id} - ${category?.name}`}
										</span>
									</p>
									<button
										className="rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-accent-700 mt-4"
										data-variant="normal"
									>
										Delete
									</button>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
