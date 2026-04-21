"use client"

import { useId } from "react"
import type { ReactNode } from "react"
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form"

import { ControlledFieldShell, getFieldDescribedBy } from "./field-shell"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ControlledSelectOption = {
  disabled?: boolean
  label: ReactNode
  value: string
}

type ControlledSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  className?: string
  contentClassName?: string
  description?: ReactNode
  descriptionClassName?: string
  errorClassName?: string
  id?: string
  label?: ReactNode
  labelClassName?: string
  options: ControlledSelectOption[]
  placeholder?: string
  triggerClassName?: string
}

function ControlledSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  className,
  contentClassName,
  control,
  defaultValue,
  description,
  descriptionClassName,
  disabled,
  errorClassName,
  id,
  label,
  labelClassName,
  name,
  options,
  placeholder = "Select an option",
  rules,
  shouldUnregister,
  triggerClassName,
}: ControlledSelectProps<TFieldValues, TName>) {
  const generatedId = useId()
  const fieldId = id ?? `${name}-${generatedId}`
  const descriptionId = `${fieldId}-description`
  const errorId = `${fieldId}-error`

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
  const value = typeof field.value === "string" ? field.value : null

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
      <Select
        disabled={disabled}
        inputRef={field.ref}
        name={field.name}
        value={value}
        onValueChange={(nextValue) => {
          field.onChange(nextValue)
          field.onBlur()
        }}
      >
        <SelectTrigger
          aria-describedby={getFieldDescribedBy(
            description ? descriptionId : undefined,
            errorMessage ? errorId : undefined
          )}
          aria-invalid={fieldState.invalid}
          className={triggerClassName}
          id={fieldId}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              disabled={option.disabled}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlledFieldShell>
  )
}

export { ControlledSelect }
export type { ControlledSelectOption }
