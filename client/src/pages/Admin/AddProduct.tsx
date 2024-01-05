import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import { getAllCategories, postProduct } from "../../utils/api.ts";
import { Category, TProduct } from "../../utils/types.ts";
import { formatCurrency } from "../../utility.ts";

export default function AddProduct() {
	const [product, setProduct] = React.useState<TProduct>();
	const [categories, setCategories] = React.useState<Category[]>();

	React.useEffect(() => {
		const getCategories = async () => {
			const { data } = await getAllCategories();

			setCategories(data.categories);
		};

		getCategories();
	}, []);

	const categoryList = () => {
		return (
			<div className="fixed w-full">
				<Listbox
					value={product?.category}
					onChange={(e) => handleChange("category", e)}
				>
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">
								{product && product.category
									? product.category.name
									: "-- Select --"}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
									/>
								</svg>
							</span>
						</Listbox.Button>
						<Transition
							as={React.Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
								{!categories || categories?.length === 0 ? (
									<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
										Nothing found.
									</div>
								) : (
									categories.map((category) => (
										<Listbox.Option
											key={category.id}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active
														? "bg-teal-600 text-white"
														: "text-gray-900"
												}`
											}
											value={category}
										>
											{({ selected }) => (
												<>
													<span
														className={`block truncate ${
															selected
																? "font-medium"
																: "font-normal"
														}`}
													>
														{category.name}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
																stroke="currentColor"
																className="w-6 h-6"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="m4.5 12.75 6 6 9-13.5"
																/>
															</svg>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))
								)}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			</div>
		);
	};

	const handleChange = (propertyName: string, propertyValue: unknown) => {
		setProduct({
			...product!,
			[propertyName]: propertyValue
		});
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : undefined;

		if (file) {
			setProduct({
				...product!,
				imageData: URL.createObjectURL(file),
				imageName: file.name,
				image: file
			});
		}
		return;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		console.log(product);
		if (product) {
			formData.append("name", product.name);
			formData.append("price", product.price);
			formData.append("stock", product.stock.toString());
			formData.append("categoryId", product.category.id.toString());
			formData.append("image", product.image!);

			const { data } = await postProduct(formData);

			alert(data.message);
		}
	};

	return (
		<>
			<section className="bg-gray-100 ms-80 mr-10 h-[675px]">
				<div className="max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-x-16 gap-y-8">
						<div className="rounded-lg bg-white p-8 pt-4 shadow-lg lg:col-span-3">
							<h2 className="text-center mb-4 font-bold text-xl">
								Create New Product
							</h2>
							<form
								action=""
								className="space-y-4"
								encType="multipart/form-data"
								onSubmit={handleSubmit}
							>
								<div className="border-2 rounded-lg bg-[#009f7f] drop-shadow">
									<label
										className="ms-3 text-white py-1 inline-block"
										htmlFor="name"
									>
										Name
									</label>
									<input
										className="w-full rounded border-gray-200 p-3 text-sm"
										placeholder="Name"
										type="text"
										id="name"
										value={product?.name}
										onChange={(e) =>
											handleChange("name", e.target.value)
										}
									/>
								</div>

								<div className="grid grid-cols-2">
									<div className="border-2 rounded-lg drop-shadow min-h-[320px]">
										<label
											className="ms-3 text-black py-1 inline-block"
											htmlFor="image"
										>
											Image
										</label>
										<img
											className="rounded-lg border-gray-200 p-3 text-sm max-w-[250px] max-h-[320px] mx-auto"
											id="image"
											alt="product"
											src={product?.imageData}
										/>

										<div className="flex justify-center py-3">
											<input
												type="file"
												className="border"
												onChange={(e) =>
													handleUpload(e)
												}
											/>
										</div>
									</div>

									<div className="ms-10 grid grid-rows-3 gap-4 w-1/2">
										<div className="border-2 rounded-lg max-h-12 bg-[#009f7f] drop-shadow">
											<label
												className="ms-3 text-white py-1 inline-block"
												htmlFor="price"
											>
												Price
											</label>
											<input
												className="w-full rounded border-gray-200 p-3 text-sm"
												placeholder="Price"
												type="text"
												id="price"
												value={product?.price}
												onChange={(e) =>
													handleChange(
														"price",
														e.target.value
													)
												}
											/>
										</div>

										<div className="border-2 rounded-lg max-h-12 bg-[#009f7f] drop-shadow">
											<label
												className="ms-3 text-white py-1 inline-block"
												htmlFor="stock"
											>
												Stock
											</label>
											<input
												className="w-full rounded border-gray-200 p-3 text-sm"
												placeholder="Stock"
												type="number"
												min={0}
												id="stock"
												value={product?.stock}
												onChange={(e) =>
													handleChange(
														"stock",
														e.target.value
													)
												}
											/>
										</div>

										<div className="border-2 rounded-lg max-h-12 bg-[#009f7f] drop-shadow">
											<label
												className="ms-3 text-white py-1 inline-block"
												htmlFor="category"
											>
												Category
											</label>
											{categoryList()}
										</div>
									</div>
								</div>

								<div className="mt-4">
									<button
										type="submit"
										className="inline-block w-full rounded-lg bg-[#009f7f] shadow-lg px-5 py-3 font-medium text-white"
									>
										Create
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
