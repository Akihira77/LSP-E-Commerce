import React from "react";
import { AuthContext } from "../../utils/context/AuthContext.tsx";
import { formatCurrency } from "../../utility.ts";
import { getMyCart, putQuantityCartItem, removeItemInCart } from "../../utils/api.ts";
import { CartType } from "../../utils/types.ts";
import { useNavigate } from "react-router-dom";

type Props = {
    onClose: () => void;
}

export default function Checkout({ onClose }: Props) {
    const { itemsCount, totalPrice, updateItemsCount, updateTotalPrice } = React.useContext(AuthContext);
    const [cartItems, setCartItems] = React.useState<CartType[]>([]);
    const navigate = useNavigate();

    const handleMinus = async (cartItemId: number, quantity: number) => {
        const { data } = await putQuantityCartItem(cartItemId, quantity - 1);
        const { cart } = data;

        setCartItems(cart);
        calculate(cart);
    }

    const handlePlus = async (cartItemId: number, quantity: number) => {
        const { data } = await putQuantityCartItem(cartItemId, quantity + 1);
        const { cart } = data;

        setCartItems(cart);
        calculate(cart);
    }

    const handleRemove = async (cartItemId: number) => {
        const { data } = await removeItemInCart(cartItemId);
        const { cart } = data;

        setCartItems(cart);
        calculate(cart);
    }


    const handleCheckout = () => {
        // return window.open("http://localhost:5173/checkout");
        return navigate("checkout");
    }

    const calculate = (carts: CartType[]) => {
        let updatedItemsCount = 0, updatedTotalPrice = 0;

        carts.forEach(({ product, quantity }) => {
            updatedItemsCount += quantity;
            updatedTotalPrice += Number(product.price) * quantity;
        });

        updateItemsCount(updatedItemsCount);
        updateTotalPrice(updatedTotalPrice);
    }

    React.useEffect(() => {
        const findCart = async () => {
            const { data } = await getMyCart();
            const { cart } = data;
            // console.log(cart);

            setCartItems(cart);
        }

        findCart();
    }, []);

    const emtpyTemplate = () => {
        return (<div className="flex h-full flex-col items-center justify-center" style={{ opacity: 1 }}>
            <svg width="140" height="176" viewBox="0 0 231.91 292"><defs><linearGradient id="linear-gradient" x1="1" y1="0.439" x2="0.369" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#029477"></stop><stop offset="1" stopColor="#009e7f"></stop></linearGradient></defs><g id="no_cart_in_bag_2" data-name="no cart in bag 2" transform="translate(-1388 -351)"><ellipse id="Ellipse_2873" data-name="Ellipse 2873" cx="115.955" cy="27.366" rx="115.955" ry="27.366" transform="translate(1388 588.268)" fill="#ddd" opacity="0.25"></ellipse><path id="Path_18691" data-name="Path 18691" d="M29.632,0H170.368A29.828,29.828,0,0,1,200,30.021V209.979A29.828,29.828,0,0,1,170.368,240H29.632A29.828,29.828,0,0,1,0,209.979V30.021A29.828,29.828,0,0,1,29.632,0Z" transform="translate(1403 381)" fill="#009e7f"></path><path id="Rectangle_1852" data-name="Rectangle 1852" d="M30,0H170a30,30,0,0,1,30,30v0a30,30,0,0,1-30,30H12.857A12.857,12.857,0,0,1,0,47.143V30A30,30,0,0,1,30,0Z" transform="translate(1403 381)" fill="#006854"></path><path id="Rectangle_1853" data-name="Rectangle 1853" d="M42,0H158a42,42,0,0,1,42,42v0a18,18,0,0,1-18,18H18A18,18,0,0,1,0,42v0A42,42,0,0,1,42,0Z" transform="translate(1403 381)" fill="#006854"></path><path id="Path_18685" data-name="Path 18685" d="M446.31,246.056a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,246.056Zm0-53.294A23.3,23.3,0,1,0,469.9,216.056,23.471,23.471,0,0,0,446.31,192.762Z" transform="translate(1056.69 164.944)" fill="#006854"></path><path id="Path_18686" data-name="Path 18686" d="M446.31,375.181a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,375.181Zm0-53.294A23.3,23.3,0,1,0,469.9,345.181,23.471,23.471,0,0,0,446.31,321.887Z" transform="translate(1057.793 95.684)" fill="#009e7f"></path><circle id="Ellipse_2874" data-name="Ellipse 2874" cx="28.689" cy="28.689" r="28.689" transform="translate(1473.823 511.046)" fill="#006854"></circle><circle id="Ellipse_2875" data-name="Ellipse 2875" cx="15.046" cy="15.046" r="15.046" transform="translate(1481.401 547.854) rotate(-45)" fill="#009e7f"></circle><path id="Path_18687" data-name="Path 18687" d="M399.71,531.27a71.755,71.755,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392,78.392,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z" transform="translate(1060.579 -35.703)" fill="#006854"></path><path id="Path_18688" data-name="Path 18688" d="M412.913,527.786a78.419,78.419,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.785,71.785,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z" transform="translate(1060.566 -35.704)" fill="#006854"></path><path id="Path_18689" data-name="Path 18689" d="M583.278,527.786a78.417,78.417,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.768,71.768,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z" transform="translate(970.304 -35.704)" fill="#006854"></path><path id="Path_18690" data-name="Path 18690" d="M570.075,531.27a71.77,71.77,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407,78.407,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z" transform="translate(970.318 -35.703)" fill="#006854"></path><path id="Path_18692" data-name="Path 18692" d="M301.243,287.464a19.115,19.115,0,0,1,8.071,9.077,19.637,19.637,0,0,1,1.6,7.88v26.085a19.349,19.349,0,0,1-9.672,16.957c-10.048-6.858-16.544-17.742-16.544-30S291.2,294.322,301.243,287.464Z" transform="translate(1292.301 101.536)" fill="url(#linear-gradient)"></path><path id="Path_18693" data-name="Path 18693" d="M294.371,287.464a19.115,19.115,0,0,0-8.071,9.077,19.637,19.637,0,0,0-1.6,7.88v26.085a19.349,19.349,0,0,0,9.672,16.957c10.048-6.858,16.544-17.742,16.544-30S304.419,294.322,294.371,287.464Z" transform="translate(1118.301 101.536)" fill="url(#linear-gradient)"></path></g></svg>
            <h4 className="mt-6 text-base font-semibold">No products found</h4>
        </div>)
    }

    const cartItemTemplate = (cartItemId: number, imgSrc: string, productName: string, productPrice: string, productStock: number, quantity: number) => {
        return <div key={cartItemId} className="flex items-center border-b border-solid border-border-200 border-opacity-75 px-4 py-4 text-sm sm:px-6" style={{ opacity: "1" }}>
            <div className="flex-shrink-0">
                <div className="flex overflow-hidden flex-col-reverse items-center w-8 h-24 bg-gray-100 text-heading rounded-full">
                    <button className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 hover:!bg-gray-100" onClick={() => handleMinus(cartItemId, quantity)}>
                        <span className="sr-only">minus</span>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3 w-3 stroke-2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path>
                        </svg>
                    </button>
                    <div className="flex flex-1 items-center justify-center px-3 text-sm font-semibold text-heading">{quantity}</div>
                    <button className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 hover:!bg-gray-100" onClick={() => handlePlus(cartItemId, quantity)}>
                        <span className="sr-only">plus</span>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="md:w-4.5 h-3.5 w-3.5 stroke-2.5 md:h-4.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="relative mx-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-gray-100 sm:h-16 sm:w-16">
                <img alt={productName} loading="lazy" decoding="async" data-nimg="fill" className="object-contain" sizes="(max-width: 768px) 100vw" src={imgSrc} style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }} />
            </div>
            <div className="w-full">
                <h3 className="font-bold text-heading">{productName}</h3>
                <p className="my-2.5 font-semibold text-[#009F7F]">{formatCurrency(productPrice)}</p>
                <span className="text-xs text-body">{quantity} X 1 pc(s) / {productStock} pc(s)</span>
            </div>
            <span className="font-bold text-heading ltr:ml-auto rtl:mr-auto">{formatCurrency(Number(productPrice) * quantity)}</span>
            <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-0 ms-3" onClick={() => handleRemove(cartItemId)}>
                <span className="sr-only">remove</span>
                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </button>
        </div>
    }

    return (
        <section className="relative flex h-full flex-col">
            <header className="fixed top-0 z-10 flex w-full max-w-xl items-center justify-between border-b border-border-200 border-opacity-75 bg-light px-6 py-4 -ms-6">

                {/* Cart Items Count */}
                <div className="flex font-semibold text-[#009f7f]">
                    <svg width="24" height="22" className="shrink-0" viewBox="0 0 12.686 16"><g transform="translate(-27.023 -2)"><g transform="translate(27.023 5.156)"><g><path d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z" transform="translate(-53.023 -101.005)" fill="currentColor"></path></g></g><g transform="translate(30.274 2)"><g><path d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z" transform="translate(-157.039)" fill="currentColor"></path></g></g></g></svg>
                    <span className="flex ms-2">{itemsCount} Item</span>
                </div>

                {/* Close */}
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#009f7f] text-white text-muted transition-all duration-200" onClick={onClose}>
                    <span className="sr-only">close</span>
                    <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </header>

            <div className="grow pt-16 pb-20">
                {itemsCount === 0 ? (emtpyTemplate())
                    :
                    cartItems.length > 0 && cartItems.map(({ id, product, quantity }) => (
                        cartItemTemplate(id, product.imageData, product.name, product.price, product.stock, quantity)
                    ))
                }

            </div>
            <footer className="fixed bottom-0 z-10 w-full max-w-xl bg-white px-6 -ms-6 py-5">
                <button className="flex h-12 w-full justify-between rounded-full bg-[#009f7f] p-1 text-sm font-bold shadow-lg transition-colors hover:bg-accent-hover focus:bg-accent-hover focus:outline-0 md:h-14" onClick={handleCheckout}>
                    <span className="flex h-full flex-1 items-center px-5 text-white">Checkout</span>
                    <span className="flex h-full shrink-0 items-center rounded-full bg-white px-5 text-[#009f7f]">{formatCurrency(totalPrice)}</span>
                </button>
            </footer>
        </section>
    )
}