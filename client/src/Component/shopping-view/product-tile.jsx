
import { categoryOptionsMap, brandOptionsMap } from '../../config/config';
import { CardContent, CardFooter } from '../ui/all';
import { Button } from '../ui/button';
import { Badge } from '../ui/checkbox';

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product._id)}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
              Out of Stock
            </Badge>
          ) : product.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
              Only {product.totalStock} left
            </Badge>
          ) : null}

          {product.salePrice > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-600">Sale</Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{categoryOptionsMap[product.category]}</span>
            <span>{brandOptionsMap[product.brand]}</span>
          </div>

          <div className="flex justify-between items-center mt-2">
            {product.salePrice > 0 ? (
              <>
                <span className="line-through text-lg font-semibold text-primary">
                  ₹{product.price}
                </span>
                <span className="text-sm text-muted-foreground">₹{product.salePrice}</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-primary">₹{product.price}</span>
            )}
          </div>
        </CardContent>

        <CardFooter>
          {product.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddtoCart(product._id, product.totalStock);
              }}
              className="w-full"
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </div>
    </div>
  );
}

export default ShoppingProductTile;
