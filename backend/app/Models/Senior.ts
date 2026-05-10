import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo, hasMany, HasMany } from '@adonisjs/lucid/orm'
import { Model } from '@adonisjs/lucid/orm'
import User from './User'
import EmailAnalysis from './EmailAnalysis'

export default class Senior extends Model {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare prenom: string

  @column()
  declare gmail: string

  @column()
  declare actif: boolean

  @column()
  declare seuilAlerte: number

  @column({ serializeAs: null })
  declare oauthTokenEncrypted: string | null

  @column({ serializeAs: null })
  declare oauthRefreshTokenEncrypted: string | null

  @column.dateTime({ serializeAs: null })
  declare oauthExpiresAt: DateTime | null

  @column()
  declare oauthStatus: string

  @column.dateTime()
  declare lastSyncAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => EmailAnalysis)
  declare emailAnalyses: HasMany<typeof EmailAnalysis>
}
