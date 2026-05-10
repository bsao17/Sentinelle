import { DateTime } from 'luxon'
import { column, belongsTo, BelongsTo } from '@adonisjs/lucid/orm'
import { Model } from '@adonisjs/lucid/orm'
import User from './User'

export default class Subscription extends Model {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare stripeId: string | null

  @column()
  declare status: string

  @column()
  declare plan: string

  @column.dateTime()
  declare currentPeriodEnd: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
