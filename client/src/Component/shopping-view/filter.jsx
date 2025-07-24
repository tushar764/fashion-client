import { Fragment } from "react"
import { filterOptions } from "../../config/config"
// import { Check } from "lucide-react"
import { Checkbox, } from "../ui/checkbox"
import { DropdownMenuSeparator } from "../../Component/ui/dropdown";



function ProductFilter({ filters, handleFilters }) {

    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text=lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {
                                    filterOptions[keyItem].map(option =>
                                        <label className="flex items-center gap-2 font-normal">
                                            <Checkbox
                                                checked={
                                                    filters &&
                                                    Object.keys(filters).length > 0 &&
                                                    filters[keyItem] &&
                                                    filters[keyItem].indexOf(option.id) > -1
                                                }
                                                onCheckedChange={() => handleFilters(keyItem, option.id)}
                                            />
                                            {option.label}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                    </Fragment>
                ))}
            </div>
        </div>
    )

}
export default ProductFilter