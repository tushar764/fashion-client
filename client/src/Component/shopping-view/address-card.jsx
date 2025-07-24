import { Card, CardContent, CardFooter } from "../../Component/ui/all";
import { Label } from "../../Component/ui/all";
import { Button } from "../../Component/ui/button";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectAddress,
  selectedId
}) {
  const isSelected = selectedId === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectAddress
          ? () => setCurrentSelectAddress(addressInfo)
          : null
      }
      className={`w-full h-fit cursor-pointer rounded-lg shadow-sm transition
         duration-200 border ${
        isSelected ? "border-red-900 ring-2 ring-red-500" : "border-gray-300"
      }`}
    >
      <CardContent className="p-4 space-y-1 text-sm text-gray-700">
        <Label><strong>Address:</strong> {addressInfo?.address}</Label>
        <Label><strong>City:</strong> {addressInfo?.city}</Label>
        <Label><strong>Pincode:</strong> {addressInfo?.pincode}</Label>
        <Label><strong>Phone:</strong> {addressInfo?.phone}</Label>
        <Label><strong>Notes:</strong> {addressInfo?.notes}</Label>
      </CardContent>

      <CardFooter className="p-3 flex justify-between">
        <Button variant="outline" onClick={() => handleEditAddress(addressInfo)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDeleteAddress(addressInfo)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
