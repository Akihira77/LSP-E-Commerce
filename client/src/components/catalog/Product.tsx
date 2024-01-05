import React from "react";
import { formatCurrency } from "../../utility.ts";
import { AuthContext } from "../../utils/context/AuthContext.tsx";
import { addtoCart } from "../../utils/api.ts";
import { ProductType } from "../../utils/types.ts";

type Props = {
	product: ProductType;
	flagAfterAddToCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Product: React.FC<Props> = ({ product, flagAfterAddToCart }) => {
	const { user, itemsCount, updateItemsCount, totalPrice, updateTotalPrice } =
		React.useContext(AuthContext);

	const addToCart = async () => {
		const { data } = await addtoCart(product.id, 1);
		if (data.success) {
			flagAfterAddToCart((prev) => !prev);
			const accumulate = parseInt(
				(totalPrice + parseInt(product.price)).toString()
			);
			updateItemsCount(itemsCount + 1);
			updateTotalPrice(accumulate);
		}
	};

	return (
		<div
			key={product.id}
			className={`border-2 mx-2 shadow-md rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl`}
			role="button"
		>
			<div className="relative flex items-center justify-center">
				<img
					className="w-full h-80 rounded-t"
					src={product.imageData}
					alt={product.name}
				/>
				<div className="absolute top-3 right-3 h-9 w-9">
					<div>
						<button
							className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm text-heading transition-colors hover:border-accent hover:bg-green-700 hover:text-white md:h-9 md:w-9"
							onClick={addToCart}
							disabled={product.stock === 0}
						>
							<svg
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-5 w-5 stroke-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<header className="p-3 md:p-6">
				<div className="mb-2 flex justify-between items-center">
					<span className="text-sm font-semibold text-heading md:text-base">
						{formatCurrency(product.price)}
					</span>
					<span className="text-xs">{product.stock} pc(s)</span>
				</div>
				<h3 className="text-xs text-slate-600 md:text-sm">
					{product.name}
				</h3>
			</header>
		</div>
	);
};

export default Product;
