import React from "react";
import { getAuthUser } from "../utils/api.ts";
import { User } from "../utils/types.ts";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

type Menu = {
	id: number;
	item: string;
	link: string;
};

export default function CustomerMenuHeader() {
	const [user, setUser] = React.useState<User>();
	const navigate = useNavigate();

	const handleLogout = () => {
		document.cookie =
			"token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		location.reload();
	};

	React.useEffect(() => {
		const getUser = async () => {
			const { data } = await getAuthUser();

			setUser(data.user);
		};

		getUser();
	}, []);

	const userMenu: Menu[] = [
		{ id: 1, item: "Profile", link: "my-profile" },
		{ id: 2, item: "My Orders", link: "my-orders" },
		{ id: 3, item: "Checkout", link: "checkout-list" }
	];

	const menuItemTemplate = (menu: Menu) => {
		return (
			<div key={menu.id} className="px-1 py-1">
				<Menu.Item>
					{({ active }) => (
						<button
							className={`${
								active ? "text-[#009f7f]" : "text-gray-900"
							} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
							onClick={() => navigate(menu.link)}
						>
							{menu.item}
						</button>
					)}
				</Menu.Item>
			</div>
		);
	};

	return (
		<header
			id="site-header"
			className="site-header-with-search top-0 z-50 w-full transition-all sticky border-b border-border-200 shadow-sm lg:h-22"
		>
			<div className="flex w-full transform-gpu items-center justify-between bg-white px-5 transition-transform duration-300 lg:h-22 lg:px-6 2xl:px-8">
				<div className="flex shrink-0 grow-0 basis-auto flex-wrap items-center ltr:mr-auto rtl:ml-auto lg:w-auto lg:flex-nowrap">
					<a className="inline-flex py-3 mx-auto lg:mx-0" href="/">
						<img
							src="https://codekitapp.com/images/help/free-tailwind-icon@2x.png"
							alt="home"
							className="relative h-[2.125rem] w-16 overflow-hidden"
						/>
					</a>
				</div>
				<div className="flex gap-4 items-center">
					{user && (
						<Menu
							as="div"
							className="relative inline-block text-left"
						>
							<Menu.Button className="inline-flex w-full max-h-[40px] justify-center rounded-md bg-[#009f7f] px-4 py-2 text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
								</svg>
							</Menu.Button>
							<Transition
								as={React.Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
									{userMenu.map((menu) =>
										menuItemTemplate(menu)
									)}
								</Menu.Items>
							</Transition>
						</Menu>
					)}
					<div className="flex shrink-0 items-center space-x-7 rtl:space-x-reverse 2xl:space-x-10">
						<div className="flex items-center space-x-4 rtl:space-x-reverse">
							{!user ? (
								<a
									href="http://localhost:5173/login"
									target="_self"
									rel="noreferrer"
									className="hidden h-9 shrink-0 items-center justify-center rounded border border-transparent bg-[#009f7f] px-4 py-2 max-h-[40px] text-sm font-semibold leading-none text-white outline-none transition duration-300 ease-in-out hover:bg-accent-hover focus:shadow focus:outline-none focus:ring-1 focus:ring-accent-700 sm:inline-flex"
								>
									Login
								</a>
							) : (
								<button
									className="shrink-0 items-center justify-center rounded border border-transparent bg-[#009f7f] px-4 py-4 max-h-[40px] text-sm font-semibold leading-none text-white outline-none transition duration-300 ease-in-out hover:bg-accent-hover focus:shadow focus:outline-none focus:ring-1 focus:ring-accent-700 sm:inline-flex"
									onClick={handleLogout}
								>
									Logout
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
