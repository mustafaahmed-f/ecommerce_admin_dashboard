import { getErrObject } from "@/app/_utils/helperMethods/getErrObject";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FieldValues,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { inputFieldType } from "@/app/_types/inputFieldType";
import { Button } from "../../ui/button";
import { cn } from "@/app/_utils/utils";

interface DropListFieldProps<T extends FieldValues> extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
}

function DropListField<T extends FieldValues>({
  name,
  lable,
  fullWidth,
  required,
  placeholder,
  dependency,
  optionsMethod,
  errors,
  watch,
  setValue,
  trigger,
}: DropListFieldProps<T>) {
  const { 0: dropListOptions, 1: setDropListOptions } = useState<string[]>([]);
  const { 0: open, 1: setOpen } = useState<boolean>(false);
  const dependencyValue = dependency ? watch(dependency) : "";
  const fieldValue = watch(name);
  const queryKey = dependency
    ? ["dependency dropListOptions", dependencyValue]
    : ["dropListOptions", fieldValue];

  const errorObj = getErrObject<T>(errors, name);

  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: dependency
      ? () => optionsMethod!(dependencyValue as string)
      : () => optionsMethod!(),
  });

  useEffect(() => {
    if (data) {
      setDropListOptions(data);
      if (!data.includes(fieldValue as string)) {
        setValue(name, "" as PathValue<T, typeof name>); // reset to empty if the current value is invalid
        trigger(name);
      }
    }
  }, [data, setDropListOptions, fieldValue, setValue, name, trigger]);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setValue(name, event.target.value as PathValue<T, typeof name>);
  //   trigger(name);
  // };

  const onSelect = (val: string) => {
    setValue(name, val as PathValue<T, typeof name>);
    trigger(name);
    setOpen(false);
  };

  return (
    <div
      className={`flex flex-col gap-1 ${
        fullWidth ? "col-span-2" : "col-span-1"
      }`}
    >
      <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
        {lable} {required && <span className="ms-1 text-red-500">*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              fullWidth ? "col-span-2" : "col-span-1",
              isError || errorObj ? "border-red-600" : ""
            )}
            id={name}
          >
            {fieldValue
              ? dropListOptions.find((opt) => opt === fieldValue) ??
                placeholder ??
                "Select..."
              : placeholder ?? "Select..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={`Search ${lable}...`} className="h-9" />
            <CommandList>
              {isPending && <CommandEmpty>Loading...</CommandEmpty>}
              {!isPending && dropListOptions.length === 0 && (
                <CommandEmpty>No options found.</CommandEmpty>
              )}

              <CommandGroup>
                {dropListOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => onSelect(option)}
                  >
                    {option}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        fieldValue === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {isError && <p className="mt-1 text-xs text-red-600">{error?.message}</p>}
      {!!errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default DropListField;
