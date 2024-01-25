import React from "react";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValues = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValues;
  onChange: (value: CountrySelectValues) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValues)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
      />
    </div>
  );
}
