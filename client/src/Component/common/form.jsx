
import { Label, Textarea, Input,  SelectContent } from "../ui/all";
import { Button } from "../../Component/ui/button";
import { Select, SelectTrigger, SelectValue, SelectItem } from "../ui/all";


const types = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
};

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
    function renderInputsByComponentType(getControlItem) {
        const value = formData[getControlItem.name] || "";

      switch (getControlItem.ComponentType) {
            case types.INPUT:
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

            case types.SELECT:
                return (
                    <Select
                        onValueChange={(selectedValue) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: selectedValue,
                            })
                        }
                        value={value}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0
                                ? getControlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                ))
                                : null}
                        </SelectContent>
                    </Select>
                );

            case types.TEXTAREA:
                return (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );

            default:
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value,
                            })
                        }
                    />
                );
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label htmlFor={controlItem.name} className="mb-1">
                            {controlItem.label}
                        </Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
                {buttonText || "Submit"}
            </Button> 
          
        </form>
    );
}

export default CommonForm;
