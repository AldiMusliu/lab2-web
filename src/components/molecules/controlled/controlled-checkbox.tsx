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

import { Checkbox } from "@/components/ui/checkbox"

type ControlledCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  checkboxClassName?: string
  className?: string
  description?: ReactNode
  descriptionClassName?: string
  errorClassName?: string
  id?: string
  label?: ReactNode
  labelClassName?: string
}

function ControlledCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  checkboxClassName,
  className,
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
  rules,
  shouldUnregister,
}: ControlledCheckboxProps<TFieldValues, TName>) {
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
      layout="inline"
    >
      <Checkbox
        aria-describedby={getFieldDescribedBy(
          description ? descriptionId : undefined,
          errorMessage ? errorId : undefined
        )}
        aria-invalid={fieldState.invalid}
        checked={Boolean(field.value)}
        className={checkboxClassName}
        disabled={disabled}
        id={fieldId}
        inputRef={field.ref}
        name={field.name}
        onCheckedChange={(checked) => {
          field.onChange(checked)
          field.onBlur()
        }}
      />
    </ControlledFieldShell>
  )
}

export { ControlledCheckbox }
