"use client"

import { useId } from "react"
import { useController } from "react-hook-form"
import { ControlledFieldShell, getFieldDescribedBy } from "./field-shell"
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form"

import type { ReactNode } from "react"

import { Textarea } from "@/components/ui/textarea"

type ControlledTextareaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  className?: string
  description?: ReactNode
  descriptionClassName?: string
  errorClassName?: string
  id?: string
  label?: ReactNode
  labelClassName?: string
  textareaClassName?: string
} & Omit<
    React.ComponentProps<typeof Textarea>,
    | "className"
    | "defaultValue"
    | "id"
    | "name"
    | "onBlur"
    | "onChange"
    | "value"
  >

function ControlledTextarea<
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
  label,
  labelClassName,
  name,
  rules,
  shouldUnregister,
  textareaClassName,
  ...textareaProps
}: ControlledTextareaProps<TFieldValues, TName>) {
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
      <Textarea
        {...textareaProps}
        {...field}
        ref={field.ref}
        aria-describedby={getFieldDescribedBy(
          description ? descriptionId : undefined,
          errorMessage ? errorId : undefined
        )}
        aria-invalid={fieldState.invalid}
        className={textareaClassName}
        disabled={disabled}
        id={fieldId}
      />
    </ControlledFieldShell>
  )
}

export { ControlledTextarea }
