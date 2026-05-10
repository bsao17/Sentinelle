import { DateTime } from 'luxon'
import { column, beforeSave, hasMany, HasMany, hasOne, HasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { Model } from '@adonisjs/lucid/orm'
import Senior from './Senior'
import EmailAnalysis from './EmailAnalysis'
import Subscription from './Subscription'

const AuthFinder = withAuthFinder(() => hash.use('bcrypt'))(Model)

export default class User extends compose(AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare prenom: string | null

  @column()
  declare nom: string | null

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Senior)
  declare seniors: HasMany<typeof Senior>

  @hasMany(() => EmailAnalysis)
  declare emailAnalyses: HasMany<typeof EmailAnalysis>

  @hasOne(() => Subscription)
  declare subscription: HasOne<typeof Subscription>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'stl_',
  })

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.use('bcrypt').make(user.password)
    }
  }
}
