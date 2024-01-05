import React from "react";

const Header = () => {
    const [searchText, setSearchText] = React.useState<string>("");

    return (
        // <div className="inset-0 mt-24 flex flex-col items-center justify-center p-5 text-center">
        //     <h1 className="text-2xl font-bold tracking-tight text-heading">Get Your Bakery Items Delivered</h1>
        //     <p className="text-sm text-heading lg:text-base xl:text-lg">Get your favorite bakery items baked and delivered to your doorsteps at any time</p>
        //     <div className="mt-10 w-full max-w-3xl">
        //         <form className="w-full">
        //             <div className="relative flex gap-3 rounded border">
        //                 <input className="w-full h-[50px] self-center ps-5 outline-none" id="search" type="text" autoComplete="off" name="search" placeholder="Search your products from here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        //                 <button className="flex h-[50px] min-w-[143px] items-center justify-center bg-accent px-8 font-semibold transition-colors duration-200 hover:bg-slate-300">
        //                     <svg viewBox="0 0 17.048 18" className="h-4 w-4 ltr:mr-2.5 rtl:ml-2.5"><path d="M380.321,383.992l3.225,3.218c.167.167.341.329.5.506a.894.894,0,1,1-1.286,1.238c-1.087-1.067-2.179-2.131-3.227-3.236a.924.924,0,0,0-1.325-.222,7.509,7.509,0,1,1-3.3-14.207,7.532,7.532,0,0,1,6,11.936C380.736,383.462,380.552,383.685,380.321,383.992Zm-5.537.521a5.707,5.707,0,1,0-5.675-5.72A5.675,5.675,0,0,0,374.784,384.513Z" transform="translate(-367.297 -371.285)" fill="currentColor"></path></svg>Search
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

        <div className="relative h-[500px]">
            <div className="absolute inset-0 mt-8 flex w-full flex-col items-center justify-center p-5 text-center md:px-20 lg:space-y-10">
                <h1 className="text-2xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl">Get Your Bakery Items Delivered</h1>
                <p className="text-sm text-heading lg:text-base xl:text-lg">Get your favorite bakery items baked and delivered to your doorsteps at any time</p>
                <div className="w-full max-w-3xl">
                    <form className="w-full">
                        <div className="relative flex rounded md:rounded-md h-14 shadow-lg">
                            <label htmlFor="search" className="sr-only">search</label>
                            <input id="search" type="text" autoComplete="off" className="ps-3 search item-center flex h-full w-full appearance-none overflow-hidden truncate rounded-lg text-sm text-heading placeholder-gray-500 transition duration-300 ease-in-out focus:outline-0 focus:ring-0 bg-white border-y border-transparent focus:border-accent" name="search" placeholder="Search your products from here" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                            <button className="flex h-full min-w-[143px] items-center justify-center rounded-r-md bg-[#009f7f] px-8 font-semibold text-white transition-colors duration-200 hover:bg-[#01856a] focus:bg-[#01856a] focus:outline-0">
                                <svg viewBox="0 0 17.048 18" className="h-4 w-4 mr-2.5 ml-2.5"><path d="M380.321,383.992l3.225,3.218c.167.167.341.329.5.506a.894.894,0,1,1-1.286,1.238c-1.087-1.067-2.179-2.131-3.227-3.236a.924.924,0,0,0-1.325-.222,7.509,7.509,0,1,1-3.3-14.207,7.532,7.532,0,0,1,6,11.936C380.736,383.462,380.552,383.685,380.321,383.992Zm-5.537.521a5.707,5.707,0,1,0-5.675-5.72A5.675,5.675,0,0,0,374.784,384.513Z" transform="translate(-367.297 -371.285)" fill="currentColor">
                                </path>
                                </svg>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Header;