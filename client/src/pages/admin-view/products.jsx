import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Component/ui/button";
import { addProductFormElements } from "../../config/config";
import CommonForm from "../../Component/common/form";
import { useToast } from "../../Component/ui/all";
import ProductImageUpload from "../../Component/admin-view/image-upload";
import AdminProductTile from "../../Component/admin-view/product-tile";
import { Toaster } from "sonner"; // Import Toaster
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../Component/ui/sheet";

import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../../Store/admin/product-slice";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [openCreateProductsDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setimageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);

  const onSubmit = (event) => {
    event.preventDefault();

    // concept of edit
    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        console.log(data, "edit")
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
        }
      }) :

      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductDialog(false);
          setImageFile(null);
          setFormData(initialFormData);


          toast.success("Product added successfully"); // ✅ Fixed toast usage
        }
      });
  };

  function handleDelete(getCurrentProductId){
  dispatch(deleteProduct(getCurrentProductId)).then(data=>{
    if(data?.payload?.success){
      dispatch(fetchAllProducts());
    }
  })
  }


function isFormValid(){
  return Object.keys(formData)
  .map((key) => formData[key] !=="")
  .every((item)=>item);

}




  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // ✅ Logging to see current state
  // console.log("Form Data:", formData);
  // console.log("Product List:", productList);

  return (
    <Fragment>
      <Toaster richColors position="top-right" /> {/* Add Toaster here */}
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="h-10 w-fit text-sm px-4 py-2"
        >
          Add new Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
            <AdminProductTile
              key={productItem.id || productItem._id}
              setFormData={setFormData}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
              Fill the form to create a new product in the store.
            </SheetDescription>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setimageLoadingState={setimageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
