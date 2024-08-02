"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "../../utils";

type KeyValuePair = {
  label: string;
  value: string;
};

type InputOptions = KeyValuePair[];

export function Combobox({
  options,
  buttonText,
  onChange,
}: {
  options: InputOptions;
  buttonText: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleItemSelected = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    onChange(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((opt) => opt.value === value)?.label
            : buttonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                key={"sort-created-desc"}
                value={"sort-created-desc"}
                onSelect={handleItemSelected}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "sort-created-desc" ? "opacity-100" : "opacity-0"
                  )}
                />
                By Published date, desc.
              </CommandItem>
              <CommandItem
                key={"sort-created-asc"}
                value={"sort-created-asc"}
                onSelect={handleItemSelected}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "sort-created-asc" ? "opacity-100" : "opacity-0"
                  )}
                />
                By Published date, ascending
              </CommandItem>
              <CommandItem
                key={"sort-modified-desc"}
                value={"sort-modified-desc"}
                onSelect={handleItemSelected}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "sort-modified-desc" ? "opacity-100" : "opacity-0"
                  )}
                />
                By Modified date, desc.
              </CommandItem>
              <CommandItem
                key={"sort-modified-asc"}
                value={"sort-modified-asc"}
                onSelect={handleItemSelected}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "sort-modified-asc" ? "opacity-100" : "opacity-0"
                  )}
                />
                By Modified date, ascending
              </CommandItem>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={handleItemSelected}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
