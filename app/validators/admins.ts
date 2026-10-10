import vine from '@vinejs/vine'

export const adminSignupValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)

export const adminLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)