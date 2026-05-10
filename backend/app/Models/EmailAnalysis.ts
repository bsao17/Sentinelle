import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo } from '@adonisjs/lucid/orm'
import { Model } from '@adonisjs/lucid/orm'
import Senior from './Senior'

export default class EmailAnalysis extends Model {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare seniorId: string

  @column()
  declare fromEmail: string

  @column()
  declare subject: string

  @column()
  declare gmailMessageId: string | null

  @column.dateTime()
  declare dateReceived: DateTime

  @column()
  declare score: number

  @column()
  declare categorie: string | null

  @column()
  declare niveau: string | null

  @column()
  declare explication: string | null

  @column()
  declare conseilEnfant: string | null

  @column()
  declare indicateurs: string[]

  @column()
  declare alerteEnvoyee: boolean

  @column.dateTime()
  declare alerteEnvoyeeAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Senior)
  declare senior: BelongsTo<typeof Senior>
}
