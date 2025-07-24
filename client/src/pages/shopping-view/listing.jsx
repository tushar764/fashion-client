


import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "../../Component/shopping-view/product-tile";
import ProductDetailsDialog from "../../Component/shopping-view/product-detail";

import React, { useEffect, useState } from "react";
import ProductFilter from "../../Component/shopping-view/filter";

import { addToCart, fetchCartItems } from "../../Store/shop/product-slice/cart-slice/cart-slice";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioItem
} from "../../Component/ui/dropdown";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../Component/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

import { sortOptions } from "../../config/config";
import { fetchAllFilteredProducts, fetchProductDetails } from "../../Store/shop/product-slice/index2";
import { useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

function ShoppingListing() {
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector((state) => state.shopProducts);
    const { user } = useSelector((state) => state.auth);
    const {cartItems}=useSelector(state=>state.shopCart)

    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const categorySearchParams=searchParams.get('category')

    

    function handleSort(value) {
        setSort(value);
    }


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

    function createSearchParamsHelper(filterParams) {
        const queryParams = [];
        for (const [key, value] of Object.entries(filterParams)) {
            if (Array.isArray(value) && value.length > 0) {
                const paramValue = value.join(',');
                queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
            }
        }
        console.log(queryParams, 'queryParams array');
        return queryParams.join("&");
    }

    function handleFilter(getSectionId, getCurrentOption) {
        console.log(getSectionId, getCurrentOption);
        let cpyFilters = { ...filters };
        const indexofCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexofCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            };
        } else {
            const indexofCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if (indexofCurrentOption === -1) {
                cpyFilters[getSectionId].push(getCurrentOption);
            } else {
                cpyFilters[getSectionId].splice(indexofCurrentOption, 1);
            }
        }

        setFilters(cpyFilters);
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
    }

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    }, [categorySearchParams]);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    useEffect(() => {
        if (filters !== null && sort !== null) {
            dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
        }
    }, [dispatch, filters, sort]);

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails]);

console.log("productList:", productList);

    return (

        <>
            <Toaster richColors position="top-center" />
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
                <ProductFilter filters={filters} handleFilters={handleFilter} />
                <div className="bg-background w-full rounded-lg shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-extrabold">All Products</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground">{productList.length} products</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                                        <ArrowUpDownIcon className="h-4 w-4" />
                                        <span>Sort by</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                        {sortOptions.map((sortItem) => (
                                            <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                                {sortItem.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {productList && productList.length > 0
                            ? productList.map(productItem => (
                                <ShoppingProductTile
                                    handleGetProductDetails={handleGetProductDetails}
                                    key={productItem.id}
                                    product={productItem}
                                    handleAddtoCart={handleAddtoCart}
                                />
                            ))
                            : null}
                    </div>
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

export default ShoppingListing;


