import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ FIX: Import hooks
import { useSearchParams } from "react-router-dom"; // ✅ FIX: Import this too
import { Input } from "../../Component/ui/all";
import { getSearchResults, resetSearchResults } from "../../Store/shop/product-slice/search-slice/search-slice";
import ShoppingProductTile from "../../Component/shopping-view/product-tile"; // ✅ adjust this path if needed
import { toast, Toaster } from "sonner";
import { fetchCartItems, addToCart } from "../../Store/shop/product-slice/cart-slice/cart-slice";
import { fetchProductDetails } from "../../Store/shop/product-slice/index2"; // ✅ adjust path as needed
import ProductDetailsDialog from "../../Component/shopping-view/product-detail";

function SearchProducts() {

    const [keyword, setKeyword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
    const { searchResults } = useSelector(state => state.shopSearch)
    const { productDetails } = useSelector(state => state.shopProducts)
    const { cartItems } = useSelector((state) => state.shopCart)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    useSelector(state => state.shopCart)
    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                // dispatch(getSearchResults(keyword))
                dispatch(getSearchResults({ keyword }))
            }, 1000)
        }
        else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword])



    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        const getCartItems = cartItems || []; // ✅ already an array

        const currentCartItem = getCartItems.find((item) => {
            const id = item.productId || item.product?._id;
            return id === getCurrentProductId;
        });

        const currentQuantity = currentCartItem?.quantity || 0;

        if (currentQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getTotalStock} items in stock. You already have ${currentQuantity} in cart.`);
            return;
        }

        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    toast.success("Product added successfully");
                } else {
                    toast.error("Failed to add product");
                }
            });
    }


    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails]);

    console.log(searchResults, "searchResults")
    return (
        <>

            <Toaster richColors position="top-center" />
            <div className="container mx-auto md:px-6 px-4 py-8">
                <div className="flex justify-center mb-8">
                    <div className="w-full flex items-center">
                        <Input
                            value={keyword} name="keyword" onChange={(event) => setKeyword(event.target.value)}
                            type="text"
                            className="py-6"
                            placeholder="Search Products ..."
                        />
                    </div>
                </div>
                {
                    !searchResults.length ?
                        <h1 className="text-5xl font-extrabold">No results found</h1>
                        : null
                }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {searchResults.map((item) => (
                        <ShoppingProductTile handleAddtoCart={handleAddtoCart} 
                        handleGetProductDetails={handleGetProductDetails } 
                        key={item._id || item.id} product={item} />
                    ))}
                </div>
                <ProductDetailsDialog
                    open={openDetailsDialog}
                    setOpen={setOpenDetailsDialog}
                    productDetails={productDetails}
                />
            </div>
        </>
    );
}

export default SearchProducts;
