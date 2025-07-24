import { useEffect, useState } from "react";
import ProductImageUpload from "../../Component/admin-view/image-upload";
import { Button } from "../../Component/ui/button";
import { addFeatureImage, getFeatureImages } from "../../Store/common-slice/common-slice";
import { useDispatch, useSelector } from "react-redux";
function AdminDashboard() {


    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setimageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector(state => state.commonFeature);

    console.log(uploadedImageUrl, "uploadedImageUrl")

    function handleUploadFeatureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages())
                setImageFile(null)
                setUploadedImageUrl("")
            }
        })

    }

    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch])
    console.log(featureImageList, "")

    return (
        <div>
            
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setimageLoadingState={setimageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling={true}

            />
            <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
                Upload
            </Button>
            <div className="flex flex-col gap-4 mt-5">
                {featureImageList && featureImageList.length > 0 ? (
                    featureImageList.map((featureImgItem, index) => (
                        <div className="relative" key={index}>
                            <img
                                src={featureImgItem.image}
                                alt={`Feature ${index}`}
                                className="w-full h-[300px] object-cover rounded-xl"
                            />
                        </div>
                    ))
                ) : null}
            </div>
        </div>

    )

}
export default AdminDashboard;