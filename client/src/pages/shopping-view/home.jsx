import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "sonner";

import { fetchAllFilteredProducts, fetchProductDetails } from "../../Store/shop/product-slice/index2";
import { addToCart, fetchCartItems } from "../../Store/shop/product-slice/cart-slice/cart-slice";
import { getFeatureImages } from "../../Store/common-slice/common-slice";

import ProductDetailsDialog from "../../Component/shopping-view/product-detail";
import ShoppingProductTile from '../../Component/shopping-view/product-tile';

import {
  Airplay, BabyIcon, ChevronLeft, ChevronRight,
  CloudLightning, ShirtIcon, ShoppingBasket, UmbrellaIcon,
  WashingMachine, WatchIcon, Images, Heater, Shirt
} from 'lucide-react';

import { Card, CardContent } from '../../Component/ui/all';

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon }
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList, productDetails } = useSelector(state => state.shopProducts);
  const { featureImageList } = useSelector(state => state.commonFeature);
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shopCart);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.setItem('filters', JSON.stringify({ [section]: [item.id] }));
    navigate('/shop/listing');
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // ✅ Proper Stock Validation Here
  const handleAddtoCart = (productId, totalStock = 0) => {
    const existingItem = cartItems?.find(item =>
      item?.productId === productId || item?.product?._id === productId
    );
    const currentQuantity = existingItem?.quantity || 0;

    if (currentQuantity + 1 > totalStock) {
      toast.error(`Only ${totalStock} items in stock. You already have ${currentQuantity} in cart.`);
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" richColors />
      
      {/* Image Slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 && featureImageList.map((slide, index) => (
          <img
            key={index}
            src={slide?.image}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/80 text-white p-2 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Category Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} onClick={() => handleNavigateToListingPage(item, 'category')}
                  className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} onClick={() => handleNavigateToListingPage(item, 'brand')}
                  className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {productList && productList.length > 0 && productList.map((item) => (
              <ShoppingProductTile
                key={item._id}
                product={item}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={() => handleAddtoCart(item._id, item.totalStock ?? 0)} // ✅ stock passed
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
