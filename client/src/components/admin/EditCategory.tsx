import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Category } from "../../utils/types.ts";

type Props = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	category: Category | undefined;
	setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
};

export default function EditCategory({
	isOpen,
	setIsOpen,
	category,
	setCategory
}: Props) {
	function closeModal() {
		setIsOpen(false);
	}

	const handleEdit = (value: string) => {
		setCategory({
			...category!,
			name: value
		});
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
									Edit Category
								</Dialog.Title>
								<div className="my-5">
									<input
										defaultValue={category?.name}
										className="border px-4 py-2 w-full"
										onChange={(e) =>
											handleEdit(e.target.value)
										}
									/>
								</div>

								<div className="mt-3 flex justify-end">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={closeModal}
									>
										Save
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
