"use client";
import { inputFieldType } from "@/app/_types/inputFieldType";
import {
  FieldValues,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import { getErrObject } from "@/app/_utils/helperMethods/getErrObj";

interface DateFieldProps<T extends FieldValues> extends inputFieldType<T> {
  register: UseFormRegister<T>;
  errors: any;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  isNumber?: boolean;
  isPassword?: boolean;
}

function DateField<T extends FieldValues>({
  name,
  errors,
  lable,
  required,
  setValue,
  watch,
  trigger,
}: DateFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const errorObj = getErrObject<T>(errors, name);

  const watchedValue = watch(name);

  function handleDateChange(date: Date | undefined) {
    setDate(date);
    setValue(
      name,
      date?.toISOString().split("T")[0] as PathValue<T, typeof name>,
    );
    trigger(name);
    setOpen(false);
  }

  useEffect(() => {
    if (watchedValue) setDate(new Date(watchedValue));
  }, [watchedValue]);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="date" className="mb-1 text-sm font-medium text-gray-700">
        {lable}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={(date) => handleDateChange(date)}
            startMonth={new Date(new Date().getFullYear() - 5, 0)}
            endMonth={new Date(new Date().getFullYear() + 5, 11)}
          />
        </PopoverContent>
      </Popover>
      {errorObj && (
        <p className="mt-1 text-xs text-red-600">{errorObj.message}</p>
      )}
    </div>
  );
}

export default DateField;
