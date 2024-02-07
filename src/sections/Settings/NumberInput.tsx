import { useState, useEffect } from "react";
import { Input } from "./Settings.styles";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
};

const NumberInput = ({ value: initialValue, onChange }: NumberInputProps) => {
  const [value, setValue] = useState(`${initialValue}`);

  useEffect(() => {
    if (value.length > 0) {
      const parsedValue = parseInt(value, 10);
      if (parsedValue > 0 && parsedValue !== initialValue) {
        onChange(parsedValue);
      } else if (value.length === 1) {
        onChange(0);
      }
    } else {
      onChange(0);
    }
  }, [value]);

  useEffect(() => {
    setValue(`${initialValue}`);
  }, [initialValue]);

  return (
    <Input
      width={80}
      textAlign="right"
      inputMode="numeric"
      value={value}
      onChangeText={(nextValue: string) => {
        setValue(nextValue);
      }}
    />
  );
};

export default NumberInput;
