"use client"

import { useId, useState } from "react"
import type { ReactNode } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"

import { ControlledFieldShell, getFieldDescribedBy } from "./field-shell"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type ControlledDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  buttonClassName?: string
  calendarClassName?: string
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    "className" | "mode" | "onSelect" | "selected"
  >
  className?: string
  description?: ReactNode
  descriptionClassName?: string
  errorClassName?: string
  formatString?: string
  id?: string
  label?: ReactNode
  labelClassName?: string
  placeholder?: string
}

function ControlledDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  buttonClassName,
  calendarClassName,
  calendarProps,
  className,
  control,
  defaultValue,
  description,
  descriptionClassName,
  disabled,
  errorClassName,
  formatString = "PPP",
  id,
  label,
  labelClassName,
  name,
  placeholder = "Pick a date",
  rules,
  shouldUnregister,
}: ControlledDatePickerProps<TFieldValues, TName>) {
  const generatedId = useId()
  const fieldId = id ?? `${name}-${generatedId}`
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`
  const [open, setOpen] = useState(false)

  const { field, fieldState } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  const errorMessage = fieldState.error?.message
    ? String(fieldState.error.message)
    : undefined
  const selectedDate = toDateValue(field.value)

  return (
    <ControlledFieldShell
      className={className}
      description={description}
      descriptionClassName={descriptionClassName}
      descriptionId={description ? descriptionId : undefined}
      error={errorMessage}
      errorClassName={errorClassName}
      errorId={errorMessage ? errorId : undefined}
      htmlFor={fieldId}
      label={label}
      labelClassName={labelClassName}
    >
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)

          if (!nextOpen) {
            field.onBlur()
          }
        }}
      >
        <PopoverTrigger
          render={
            <Button
              aria-describedby={getFieldDescribedBy(
                description ? descriptionId : undefined,
                errorMessage ? errorId : undefined
              )}
              aria-invalid={fieldState.invalid}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
                buttonClassName
              )}
              disabled={disabled}
              id={fieldId}
              type="button"
              variant="outline"
            />
          }
        >
          <CalendarIcon />
          {selectedDate ? (
            format(selectedDate, formatString)
          ) : (
            <span>{placeholder}</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            {...calendarProps}
            className={calendarClassName}
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              field.onChange(date ?? null)
              field.onBlur()
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </ControlledFieldShell>
  )
}

function toDateValue(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsedDate = new Date(value)

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate
    }
  }

  return undefined
}

export { ControlledDatePicker }
