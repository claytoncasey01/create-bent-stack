import type { StandardSchemaV1Issue } from "@tanstack/react-form"

type FieldMeta = {
  isTouched: boolean
  errors: unknown[]
}

type FieldWithMeta = {
  state: {
    meta: FieldMeta
  }
}

export function getFieldError(field: FieldWithMeta): string | undefined {
  const errors = field.state.meta.errors as StandardSchemaV1Issue[]
  if (!errors?.length) return undefined
  return errors[0]?.message
}

export function isFieldInvalid(field: FieldWithMeta): boolean {
  return field.state.meta.isTouched && field.state.meta.errors.length > 0
}

export function formatFieldErrors(
  field: FieldWithMeta
): Array<{ message?: string }> {
  const errors = field.state.meta.errors as StandardSchemaV1Issue[]
  if (!errors?.length) return []
  return errors.map((error) => ({ message: error?.message }))
}

export const defaultFormOptions = {
  defaultMeta: {
    isTouched: false,
  },
} as const
