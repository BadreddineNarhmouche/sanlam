import { memo } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select"; // 👈 ici
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (event: SelectChangeEvent) => void; // ✅ le bon type
}

const DropdownComponent = ({
  label,
  value,
  options,
  onChange,
}: DropdownProps) => {
  const dropdownId = `dropdown-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <FormControl fullWidth>
      <InputLabel id={`${dropdownId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${dropdownId}-label`}
        id={dropdownId}
        value={value}
        label={label}
        onChange={onChange}
        IconComponent={KeyboardArrowDownIcon}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(DropdownComponent);
