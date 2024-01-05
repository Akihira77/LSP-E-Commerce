import React from "react";
import { Page } from "../utils/styles/index.tsx";
import {
	getAllCategories,
	getAllProductsOrByCategory,
	getAuthUser,
	getMyPreviewCart
} from "../utils/api.ts";
import Product from "../components/catalog/Product.tsx";
import Header from "../components/catalog/Header.tsx";
import Cart from "../components/catalog/Cart.tsx";
import { AuthContext } from "../utils/context/AuthContext.tsx";
import { Category, TProduct } from "../utils/types.ts";

const HomePage = () => {
	const { updateItemsCount, updateTotalPrice } =
		React.useContext(AuthContext);
	const [products, setProducts] = React.useState<TProduct[]>();
	const [tick, setTick] = React.useState(true);
	const [categories, setCategories] = React.useState<Category[]>();

	// const { user } = useAuth();

	React.useEffect(() => {
		const getProducts = async () => {
			const { data } = await getAllProductsOrByCategory();

			setProducts(data.products);
		};

		const findCart = async () => {
			const { data } = await getMyPreviewCart();

			updateItemsCount(data.itemsCount);
			updateTotalPrice(data.totalPrice);
		};

		const getCategories = async () => {
			const { data } = await getAllCategories();

			setCategories(data.categories);
		};

		getCategories();
		getProducts();

		findCart();
	}, [tick]);

	function classNames(classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	const handleChangeCategory = (category: Category) => {
		const productsWithCurrentCategory = products?.filter((product) => {
			if (product.category.id === category.id) {
				return product;
			}
		});

		setProducts(productsWithCurrentCategory);
	};

	return (
		<>
			<Page>
				<Header />
				<div className="flex flex-col">
					{/* <div>
						<Tab.Group>
							<Tab.List className="bg-[#009f7f] rounded-t-lg border-2">
								<div className="text-center bg-white w-full py-3 text-black">
									<h3 className="font-semibold">Category</h3>
								</div>
								<div className="flex space-x-1 rounded-xl p-1">
									{categories &&
										categories.length > 0 &&
										categories.map((category) => (
											<Tab
												key={category.id}
												onChange={() =>
													handleChangeCategory(
														category
													)
												}
												className={({ selected }) =>
													classNames([
														"w-full rounded-lg py-2.5 text-sm font-medium leading-5",
														"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 text-gray",
														selected
															? "bg-white text-[#009f7f] shadow"
															: "text-white  hover:bg-white hover:text-[#009f7f]"
													])
												}
											>
												{category.name}
											</Tab>
										))}
								</div>
							</Tab.List>
							<Tab.Panels className="grid grid-cols-5 items-center p-5 mt-10">
								<Tab.Panel>
									{products &&
										products.map((product) => (
											<Product
												key={product.id}
												product={product}
												flagAfterAddToCart={setTick}
											/>
										))}
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</div> */}
					<div className="grid grid-cols-5 items-center p-5 mt-10">
						{products &&
							products.map((product) => (
								<Product
									key={product.id}
									product={product}
									flagAfterAddToCart={setTick}
								/>
							))}
					</div>
				</div>
				<Cart />
			</Page>
		</>
	);
};

export default HomePage;
