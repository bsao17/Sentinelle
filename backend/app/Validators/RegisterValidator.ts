import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(128),
    prenom: vine.string().minLength(1).maxLength(100).optional(),
    nom: vine.string().minLength(1).maxLength(100).optional(),
  })
)
