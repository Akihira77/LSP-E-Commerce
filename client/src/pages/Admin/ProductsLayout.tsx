import React from "react";
import { adminGetProducts } from "../../utils/api.ts";
import { AdminMainLayout, Page } from "../../utils/styles/index.tsx";
import { Category, Product } from "../../utils/types.ts";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utility.ts";

const ProductsLayout = () => {
	const [products, setProducts] = React.useState<Product[]>();
	const [editDialog, setEditDialog] = React.useState(false);
	const [deleteDialog, setDeleteDialog] = React.useState(false);
	const [categoryChosen, setCategoryChosen] = React.useState<Product>();
	const navigate = useNavigate();

	React.useEffect(() => {
		const getProducts = async () => {
			const { data } = await adminGetProducts();

			// console.log(data.products);
			setProducts(data.products);
		};

		getProducts();
	}, []);

	const productTemplate = (
		id: number,
		name: string,
		img: string,
		price: string,
		stock: number,
		category: Category
	) => {
		return (
			<tr key={id}>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<div className="flex items-center">
						<div className="ml-3">
							<p className="text-gray-900 whitespace-no-wrap">
								{id}
							</p>
						</div>
					</div>
				</td>

				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">{name}</p>
				</td>

				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<img
						className="mx-auto"
						src={img}
						alt="product"
						height={"120px"}
						width={"80px"}
					/>
				</td>

				<td className="px-5 py-5 text-center border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">
						{category.name}
					</p>
				</td>

				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<span className="text-gray-900 whitespace-no-wrap">
						{formatCurrency(price)} /
					</span>

					<span className="text-gray-900 whitespace-no-wrap">
						{stock} pc(s)
					</span>
				</td>

				<td className="flex items-center justify-center gap-3 px-5 py-5 border-b border-gray-200 bg-white text-sm min-h-[150px]">
					<button
						className="relative px-3 py-1 font-semibold text-green-900 leading-tight h-[30px]"
						onClick={() => navigate(`edit/${id}`)}
					>
						<span
							aria-hidden
							className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
						></span>
						<span className="relative">Edit</span>
					</button>

					<button
						className="relative px-3 py-1 font-semibold text-red-900 leading-tight h-[30px]"
						onClick={() => navigate(`delete/${id}`)}
					>
						<span
							aria-hidden
							className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
						></span>
						<span className="relative">Delete</span>
					</button>
				</td>
			</tr>
		);
	};

	return (
		<Page>
			<AdminMainLayout>
				<div className="antialiased font-sans bg-gray-200 h-[90vh]">
					<div className="container mx-auto px-4 sm:px-8">
						<div className="py-8">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-semibold leading-tight">
									Products
								</h2>

								<div
									className="bg-[#009f7f] text-white py-3 px-5 rounded-lg"
									onClick={() => navigate("create")}
								>
									<button>Create</button>
								</div>
							</div>

							<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
								<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
									<table className="min-w-full leading-normal">
										<thead>
											<tr>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													#Id
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Name
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Image
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Category
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Price / Stock pc(s)
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{products &&
												products.length > 0 &&
												products.map(
													({
														id,
														name,
														imageData,
														price,
														category,
														stock
													}) =>
														productTemplate(
															id,
															name,
															imageData,
															price.toString(),
															stock,
															category
														)
												)}
										</tbody>
									</table>
									<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
										<span className="text-xs xs:text-sm text-gray-900">
											Showing 1 to {products?.length} of
											50 Entries
										</span>
										<div className="inline-flex mt-2 xs:mt-0">
											<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
												Prev
											</button>
											<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
												Next
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</AdminMainLayout>
		</Page>
	);
};

export default ProductsLayout;
