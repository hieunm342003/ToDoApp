import React from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { options } from "../lib/data";
const DateTimeFilter = ({ dateTimeOptions, setDateTimeOptions }) => {

 return (
     <Combobox items={options} value={dateTimeOptions} onValueChange={(value) => setDateTimeOptions(value)}>
      <ComboboxInput  value={options.find(item => item.value === dateTimeOptions)?.label || ""}/>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item.value}
             
            >
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default DateTimeFilter