import React from "react";
import { AdminMainLayout, Page } from "../../utils/styles/index.tsx";
import { Address, User } from "../../utils/types.ts";
import { adminGetAllUsers } from "../../utils/api.ts";

const UsersLayout = () => {
	const [users, setUsers] = React.useState<User[]>();
	const [editDialog, setEditDialog] = React.useState(false);
	const [deleteDialog, setDeleteDialog] = React.useState(false);
	const [userChosen, setUserChosen] = React.useState<User>();

	React.useEffect(() => {
		const getUsers = async () => {
			const { data } = await adminGetAllUsers();

			setUsers(data.users);
		};

		getUsers();
	}, []);

	const categoryTemplate = (
		id: number,
		username: string,
		email: string,
		phoneNumber: string,
		role: string,
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
						{username}
					</p>
				</td>
				{/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p className="text-gray-900 whitespace-no-wrap">
					{new Date(createdAt).toLocaleDateString()}
				</p>
			</td> */}
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">{email}</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">
						{phoneNumber}
					</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">{role}</p>
				</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<p className="text-gray-900 whitespace-no-wrap">
						{address.street}, <br />
						{address.city}, {address.state}. <br />
						{address.postalCode}
					</p>
				</td>
				<td className="flex flex-col gap-3 px-5 py-5 border-b border-gray-200 bg-white text-sm items-center">
					<button className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
						<span
							aria-hidden
							className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
						></span>
						<span className="relative">Change Role</span>
					</button>

					<button className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
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
							<div className="text-center">
								<h2 className="text-2xl font-semibold leading-tight">
									Users
								</h2>
							</div>

							<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
								<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
									<table className="min-w-full leading-normal">
										<thead>
											<tr>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
													#Id
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Username
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Email
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Phone Number
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Role
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Address
												</th>
												<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{users &&
												users.length > 0 &&
												users.map(
													({
														id,
														username,
														role,
														email,
														phoneNumber,
														address
													}) =>
														categoryTemplate(
															id,
															username,
															email,
															phoneNumber,
															role,
															address
														)
												)}
										</tbody>
									</table>
									<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
										<span className="text-xs xs:text-sm text-gray-900">
											Showing 1 to {users?.length} of 50
											Entries
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

export default UsersLayout;
