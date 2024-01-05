import React from "react";
import { AdminMainLayout, Page } from "../../utils/styles/index.tsx";
import { Category } from "../../utils/types.ts";
import { getAllCategories } from "../../utils/api.ts";
import EditCategory from "../../components/admin/EditCategory.tsx";
import DeleteCategory from "../../components/admin/DeleteCategory.tsx";

const CategoriesLayout = () => {
	const [categories, setCategories] = React.useState<Category[]>();
	const [editDialog, setEditDialog] = React.useState(false);
	const [deleteDialog, setDeleteDialog] = React.useState(false);
	const [categoryChosen, setCategoryChosen] = React.useState<Category>();

	React.useEffect(() => {
		const getCategories = async () => {
			const { data } = await getAllCategories();

			setCategories(data.categories);
		};

		getCategories();
	}, []);

	const handleEdit = (category: Category) => {
		setEditDialog(true);
		setCategoryChosen(category);
	};

	const handleDelete = (category: Category) => {
		setDeleteDialog(true);
		setCategoryChosen(category);
	};

	const categoryTemplate = (
		id: number,
		name: string,
		createdAt: string,
		updatedAt: string
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
					<p className="text-gray-900 whitespace-no-wrap">
						{new Date(createdAt).toLocaleDateString()}
					</p>
				</td>
				<td className="flex gap-3 px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<button
						className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
						onClick={() =>
							handleEdit({ id, name, createdAt, updatedAt })
						}
					>
						<span
							aria-hidden
							className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
						></span>
						<span className="relative">Edit</span>
					</button>
					<EditCategory
						isOpen={editDialog}
						setIsOpen={setEditDialog}
						category={categoryChosen}
						setCategory={setCategoryChosen}
					/>

					<button
						className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
						onClick={() =>
							handleDelete({ id, name, createdAt, updatedAt })
						}
					>
						<span
							aria-hidden
							className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
						></span>
						<span className="relative">Delete</span>
					</button>
					<DeleteCategory
						isOpen={deleteDialog}
						setIsOpen={setDeleteDialog}
						category={categoryChosen}
					/>
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
									Categories
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
													Name
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
											{categories &&
												categories.length > 0 &&
												categories.map(
													({
														id,
														name,
														createdAt,
														updatedAt
													}) =>
														categoryTemplate(
															id,
															name,
															createdAt,
															updatedAt
														)
												)}
										</tbody>
									</table>
									<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
										<span className="text-xs xs:text-sm text-gray-900">
											Showing 1 to {categories?.length} of
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

export default CategoriesLayout;
