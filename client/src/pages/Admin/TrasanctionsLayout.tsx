import React from "react";
import { adminGetAllTransactions } from "../../utils/api.ts";
import { AdminMainLayout, Page } from "../../utils/styles/index.tsx";
import { Address, User } from "../../utils/types.ts";
import { formatCurrency } from "../../utility.ts";

const TransactionsLayout = () => {
	const [transactions, setTransactions] = React.useState<any[]>();

	React.useEffect(() => {
		const getTransactions = async () => {
			const { data } = await adminGetAllTransactions();

			setTransactions(data.transactions);
		};

		getTransactions();
	}, []);

	const transactionTemplate = (
		id: number,
		totalPrice: string,
		status: string,
		createdAt: string,
		user: User,
		address: Address
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
					<p className="text-gray-900 whitespace-no-wrap">
						{user.email}
					</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">
						{address.street}, <br />
						{address.city}, {address.state}. <br />
						{address.postalCode}
					</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">
						{formatCurrency(totalPrice)}
					</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p
						className={`${
							status === "SUCCESS"
								? "text-green-500"
								: "text-red-500"
						} whitespace-no-wrap`}
					>
						{status}
					</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">
						{new Date(createdAt).toLocaleDateString()}
					</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<button className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
						<span
							aria-hidden
							className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
						></span>
						<span className="relative">Inspect</span>
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
							<div className="text-center">
								<h2 className="text-2xl font-semibold leading-tight">
									Transactions
								</h2>
							</div>

							<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
								<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
									<table className="min-w-full leading-normal">
										<thead>
											<tr>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													#Id
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Email
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Address
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Total Price
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Status
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Created at
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{transactions &&
												transactions.length > 0 &&
												transactions.map(
													({
														id,
														totalPrice,
														status,
														createdAt,
														user,
														address
													}) =>
														transactionTemplate(
															id,
															totalPrice,
															status,
															createdAt,
															user,
															address
														)
												)}
										</tbody>
									</table>
									<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
										<span className="text-xs xs:text-sm text-gray-900">
											Showing 1 to {transactions?.length}{" "}
											of 50 Entries
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

export default TransactionsLayout;
