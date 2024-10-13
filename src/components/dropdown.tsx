import Select, {
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from "react-select";
import { useMediaQuery } from "usehooks-ts";

interface DropdownProps {
  placeholder: string;
  onChange?:
    | ((
        newValue: SingleValue<{
          value: any;
          label: string;
        }>
      ) => void)
    | undefined;
  value?: { value: any; label: string };
  options: OptionsOrGroups<
    {
      value: any;
      label: string;
    },
    GroupBase<{
      value: any;
      label: string;
    }>
  >;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  useLabel?: boolean;
  labelStyle?: string;
  guideText?: string;
  guideStyle?: string;
  id?: string;
  placement?: "top" | "bottom" | "auto";
}

const Dropdown = ({
  placeholder,
  onChange,
  options,
  value,
  required,
  disabled = false,
  label,
  useLabel,
  labelStyle,
  guideText,
  guideStyle,
  id,
  placement = "bottom",
}: DropdownProps) => {
  const screenWidth = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="w-full h-fit">
      {useLabel && (
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center mb-1 lg:mb-2">
          <label
            htmlFor={id}
            className={`${labelStyle} ${
              required
                ? "after:content-['*'] after:ml-1 after:font-medium after:text-[14px] after:text-red-secondary"
                : ""
            }`}
          >
            {label}
          </label>
          <p className={guideStyle}>{guideText}</p>
        </div>
      )}
      <Select
        id={id}
        required={required}
        isDisabled={disabled}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        isSearchable={true}
        isClearable
        menuPlacement={placement}
        value={value}
        theme={(theme) => ({
          ...theme,
          borderRadius: 12,
          border: "2px",

          colors: {
            ...theme.colors,
            primary: "#000000",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: state.isFocused ? "1px solid #00AB6B" : "1px solid #B0B0B0",
            boxShadow: state.isFocused ? "" : "",
            "&:hover": {
              borderColor: state.isFocused ? "#00AB6B" : "#00AB6B",
              boxShadow: state.isFocused ? "0 0 0 0 #00AB6B" : "0 0 0 0 #00AB6B",
            },
            "&:focus": {
              borderColor: state.isFocused ? "#00AB6B" : "#00AB6B",
              boxShadow: state.isFocused ? "0 0 0 0 #00AB6B" : "0 0 0 0 #00AB6B",
            },
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "12px",
            paddingBottom: "12px",
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            visibility: "hidden",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            margin: "0px",
            fontFamily: "Figtree",
            fontSize: screenWidth ? "16px" : "14px",
            fontWeight: 400,
            color: "#7D7D7D"
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            margin: "0px",
            padding: "0px",
            fontFamily: "Figtree",
            fontSize: screenWidth ? "16px" : "14px",
            fontWeight: 500,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            fontFamily: "Figtree",
            fontSize: screenWidth ? "16px" : "14px",
            fontWeight: 500,
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            maxHeight: 128,
            overflowY: "auto",
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
