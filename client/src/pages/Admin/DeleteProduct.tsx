import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TProduct } from "../../utils/types.ts";
import { getProductByid, removeProduct } from "../../utils/api.ts";
import { formatCurrency } from "../../utility.ts";

export default function DeleteProduct() {
	const { id } = useParams();
	const [product, setProduct] = React.useState<TProduct>();
	const navigate = useNavigate();

	React.useEffect(() => {
		const pullProduct = async () => {
			const { data } = await getProductByid(Number(id));

			setProduct(data.product);
			console.log(data.product);
		};

		pullProduct();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { data } = await removeProduct(Number(id));

		alert(data.message);

		setTimeout(() => {
			navigate("/admin/products", { replace: true });
		}, 1000);
	};

	return (
		<>
			<section className="bg-gray-100 ms-80 mt-8 mr-10">
				<div className="max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-x-16 gap-y-8">
						<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
							<h2 className="text-center mb-8 font-bold text-xl">
								Delete Product
							</h2>
							<form
								action=""
								className="space-y-4"
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
										readOnly
									/>
								</div>

								<div className="grid grid-cols-2">
									<div className="border-2 rounded-lg drop-shadow">
										<label
											className="ms-3 text-black py-1 inline-block"
											htmlFor="image"
										>
											Image
										</label>
										<img
											className="rounded-lg border-gray-200 p-3 text-sm max-w-[250px] max-h-[320px] mx-auto"
											id="image"
											src={product?.imageData}
										/>
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
												value={formatCurrency(
													product?.price
												)}
												readOnly
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
												type="text"
												id="stock"
												value={`${product?.stock} pc(s)`}
												readOnly
											/>
										</div>

										<div className="border-2 rounded-lg max-h-12 bg-[#009f7f] drop-shadow">
											<label
												className="ms-3 text-white py-1 inline-block"
												htmlFor="category"
											>
												Category
											</label>
											<input
												className="w-full rounded border-gray-200 p-3 text-sm"
												placeholder="Category"
												type="text"
												id="category"
												value={product?.category.name}
												readOnly
											/>
										</div>
									</div>
								</div>

								<div className="mt-4">
									<button
										type="submit"
										className="inline-block w-full rounded-lg bg-red-600 shadow-lg px-5 py-3 font-medium text-white"
									>
										Delete
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
