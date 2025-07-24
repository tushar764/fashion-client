import { House, Menu, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "../../config/config";
import DropdownExample from "../ui/dropdown";
import { Button } from "../ui/button";
import { logoutUser } from "../../Store/auth-slice/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useRef, useState } from "react";
import { fetchCartItems } from "../../Store/shop/product-slice/cart-slice/cart-slice";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row gap-4 mb-3 lg:mb-0 lg:items-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.shopCart);

  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [userTappedCart, setUserTappedCart] = useState(false);
  const prevCartLengthRef = useRef(0);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    const cartJustLoaded = cartItems?.length > 0 && prevCartLengthRef.current === 0;
    if (cartJustLoaded && userTappedCart) {
      setOpenCartSheet(true);
    }
    prevCartLengthRef.current = cartItems?.length;
  }, [cartItems, userTappedCart]);

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/logout");
  }

  function handleCartClick() {
    setUserTappedCart(true);
    setOpenCartSheet(true);
  }

  console.log("✅ Cart render state: ", {
    openCartSheet,
    userTappedCart,
    cartItems,
  });

  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={handleCartClick}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span>{cartItems?.length || 0}</span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={Array.isArray(cartItems) ? cartItems : []}
        />
      </Sheet>

      {user && <DropdownExample user={user} onLogout={handleLogout} />}
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-4 md:px-6 py-2">
        <div className="flex w-full justify-between items-center mb-2 lg:mb-0">
          <Link to="/shop/home" className="flex items-center gap-2">
            <House className="h-6 w-6" />
            <span className="font-bold text-base">Ecommerce</span>
          </Link>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Header menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-full max-w-xs">
                <MenuItems />
                {isAuthenticated && (
                  <div className="mt-6">
                    <HeaderRightContent />
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center gap-6 w-full">
          <MenuItems />
        </div>

        {isAuthenticated && (
          <div className="hidden lg:flex">
            <HeaderRightContent />
          </div>
        )}
      </div>
    </header>
  );
}

export default ShoppingHeader;
