import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent,  } from "../../Component/ui/all";
import CommonForm from "../../Component/common/form";
import { addressFormControls } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "../../Store/shop/product-slice/address-slice/address-slice"; 
import AddressCard from "../../Component/shopping-view/address-card"; 
import { Toaster,toast } from "sonner";



const initialAddressFormData = {
  address: '',
  city: '',
  pincode: '',
  phone: '',
  notes: '',
}

function Address({setCurrentSelectAddress,selectedId}) {

  const [formData, setFormData] = useState(initialAddressFormData)
  const [currentEditedId,setCurrentEditedId]=useState(null)
  const dispatch=useDispatch();
  const{user}=useSelector(state=>state.auth)
  const{addressList}=useSelector(state=>state.shopAddress)


function handleManageAddress(event) {
  event.preventDefault();

if (addressList.length >= 3 && currentEditedId ===null) {
  setFormData(initialAddressFormData)
  toast.error("You can add a maximum of 3 addresses");
  return; // ✅ Prevent further action
}

  // edit manage

  currentEditedId !==null ? dispatch(editAddress({
     userId: user?.id,
      addressId: currentEditedId,
      formData,
  })).then((data)=>{
    if(data?.payload?.success){
      dispatch(fetchAllAddress(user?.id))
      setCurrentEditedId(null)
      setFormData(initialAddressFormData)
    toast.success("Address updated successfully");

    }
  }):

  dispatch(addNewAddress({
    ...formData,
    userId: user?.id
  })).then(data => {
    console.log(data);
    if (data?.payload?.success) {
      dispatch(fetchAllAddress(user?.id));
      setFormData(initialAddressFormData);
    }
  });
}

function handleDeleteAddress(getCurrentAddress){
  console.log(getCurrentAddress)
  dispatch(deleteAddress({userId: user?.id, 
    addressId :getCurrentAddress._id})).then(data=>{
      if(data?.payload.success){
        dispatch(fetchAllAddress(user?.id))
            toast.success("Address deleted successfully");
      }
    })

}
function handleEditAddress(getCurrentAddress){
setCurrentEditedId(getCurrentAddress?._id)
setFormData({
  ...formData,
  address: getCurrentAddress?.address,
  city: getCurrentAddress?.city,
  phone: getCurrentAddress?.phone,
  pincode: getCurrentAddress?.pincode,
  notes: getCurrentAddress?.notes,
  
})
}

  function isFormValid() {
    return Object.keys(formData).map((key) => formData[key] !== '').every((item) => item)
  }

useEffect(() => {
  if (user?.id) {
    dispatch(fetchAllAddress(user.id));
  }
}, [dispatch, user?.id]);

  console.log(addressList,"addressList")
  return (
    <>
          <Toaster position="top-right" /> 
   <div className="mb-5 p-4 grid grid-cols-1 sm:grid-cols-2  gap-2">
  {
  addressList && addressList.length > 0
    ? addressList.map((singleAddressItem, index) => (
        <AddressCard  
        selectedId={selectedId}
       setCurrentSelectAddress={setCurrentSelectAddress}
        
        handleDeleteAddress={handleDeleteAddress}
       handleEditAddress={handleEditAddress}
         key={index} addressInfo={singleAddressItem} />
      ))
    : null
}
  
      <Card>
      

        <CardHeader>
          <CardTitle>{
            currentEditedId !==null ? "Edit Address" :"Add New Address"
            }

</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}         // ✅ must be the actual state object
            setFormData={setFormData}   // ✅ state updater function
            buttonText={
            currentEditedId !==null ? "Edit " :"Add "
            }
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />

        </CardContent>
        
      </Card>

      {/* Optional: Static Header Below */}
      <div>
      
      </div>
    </div>
    </>
  );
}

export default Address;
