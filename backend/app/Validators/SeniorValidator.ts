import vine from '@vinejs/vine'

export const createSeniorValidator = vine.compile(
  vine.object({
    prenom: vine.string().minLength(1).maxLength(100),
    gmail: vine.string().email().normalizeEmail(),
  })
)

export const updateSeniorValidator = vine.compile(
  vine.object({
    prenom: vine.string().minLength(1).maxLength(100).optional(),
    gmail: vine.string().email().normalizeEmail().optional(),
    actif: vine.boolean().optional(),
    seuilAlerte: vine.number().min(0).max(100).optional(),
  })
)
