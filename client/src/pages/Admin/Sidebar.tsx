import { Outlet, useNavigate } from "react-router-dom";
import {
	AdminSidebar,
	AdminSidebarContainer
} from "../../utils/styles/index.tsx";
import React from "react";
import { AuthContext } from "../../utils/context/AuthContext.tsx";

type Sidebar = {
	id: number;
	item: string;
	link: string;
	style: string;
};

const items: Sidebar[] = [
	{ id: 1, item: "Dashboard", link: "", style: "" },
	{ id: 2, item: "Users", link: "users", style: "" },
	{ id: 3, item: "Transactions", link: "transactions", style: "" },
	{ id: 4, item: "Categories", link: "categories", style: "" },
	{ id: 5, item: "Products", link: "products", style: "" },
	{ id: 6, item: "Logs", link: "logs", style: "" }
];

const Sidebar = () => {
	const { user, updateAuthUser } = React.useContext(AuthContext);
	const [sidebarItems, setSidebarItems] = React.useState<Sidebar[]>(items);
	const currentUrl = window.location.href;
	const navigate = useNavigate();

	React.useEffect(() => {
		for (const prop of items) {
			if (currentUrl.includes(prop.item.toLowerCase())) {
				const newSidebarItems = sidebarItems.map(
					({ id, item, link, style }) => {
						if (prop.id === id) {
							return {
								id,
								item,
								link,
								style: "font-bold"
							};
						}
						return {
							id,
							item,
							link,
							style: ""
						};
					}
				);

				setSidebarItems(newSidebarItems);
				break;
			}
		}
	}, [currentUrl]);

	const handleLogout = () => {
		document.cookie =
			"token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		updateAuthUser(undefined);
		return;
	};

	const handleClick = (prop: Sidebar) => {
		navigate(prop.link);
	};

	return (
		<>
			<AdminSidebar>
				<AdminSidebarContainer>
					<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl border-r-4 shadow-blue-gray-900/5">
						<div className="mb-2 p-4">
							<h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
								LSP E-Commerce
							</h5>
						</div>
						<nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
							<ul>
								{sidebarItems.map((sidebar) => (
									<li
										key={sidebar.id}
										onClick={() => handleClick(sidebar)}
										role="button"
										tabIndex={0}
										className={`${sidebar.style} flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none`}
									>
										{sidebar.item}
									</li>
								))}
								<li
									role="button"
									tabIndex={0}
									className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
									onClick={handleLogout}
								>
									Logout
								</li>
							</ul>
						</nav>
					</div>
					<div className="w-full px-4 mb-8 mx-auto ">
						<div className="text-sm text-gray-700 py-1">
							Made by
							<a
								className="text-gray-700 font-semibold ps-2"
								href="https://www.github/com/Akihira77"
								target="_blank"
							>
								Andika Wahyu Permadi
							</a>
						</div>
					</div>
				</AdminSidebarContainer>
			</AdminSidebar>
			<Outlet />
		</>
	);
};

export default Sidebar;
