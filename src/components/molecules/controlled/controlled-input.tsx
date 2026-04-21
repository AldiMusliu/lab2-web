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

import { Input } from "@/components/ui/input"

type ControlledInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  className?: string
  description?: ReactNode
  descriptionClassName?: string
  errorClassName?: string
  id?: string
  inputClassName?: string
  label?: ReactNode
  labelClassName?: string
} & Omit<
    React.ComponentProps<typeof Input>,
    | "className"
    | "defaultValue"
    | "id"
    | "name"
    | "onBlur"
    | "onChange"
    | "value"
  >

function ControlledInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  className,
  control,
  defaultValue,
  description,
  descriptionClassName,
  disabled,
  errorClassName,
  id,
  inputClassName,
  label,
  labelClassName,
  name,
  rules,
  shouldUnregister,
  ...inputProps
}: ControlledInputProps<TFieldValues, TName>) {
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
      <Input
        {...inputProps}
        {...field}
        ref={field.ref}
        aria-describedby={getFieldDescribedBy(
          description ? descriptionId : undefined,
          errorMessage ? errorId : undefined
        )}
        aria-invalid={fieldState.invalid}
        className={inputClassName}
        disabled={disabled}
        id={fieldId}
      />
    </ControlledFieldShell>
  )
}

export { ControlledInput }
