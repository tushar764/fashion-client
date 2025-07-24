import { Card, CardContent, CardFooter } from "../../Component/ui/all";
import { Button } from "../ui/button";

function AdminProductTile({ product,setFormData,setOpenCreateProductDialog,setCurrentEditedId,handleDelete }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold mb-2  mt-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-muted-foreground" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          
          {product?.salePrice > 0 && (
            <span className="text-lg font-semibold text-green-600">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4 pb-4">
        <Button onClick={()=>{
            setOpenCreateProductDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product);
        }}>Edit</Button>
        <Button onClick={()=>handleDelete(product?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
