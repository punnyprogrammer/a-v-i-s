import { DateTime } from 'luxon'
import { BaseModel, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
// import { BaseModel, beforeCreate, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
// import uuid from "uuid"

export default class User extends BaseModel {

  // If using MySQL <= 8.012
  // @beforeCreate()
  // public static async generateUuid(user: User) {
  //   user.uuid = uuid.v4()
  // }
  // public static async generatePasswordSalt(user: User) {
  //     user.passwordSalt = await Hash.make(uuid.v4())
  // }

  @beforeUpdate()
  public static async hashPassword(user: User) {
    if( user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column.date()
  public emailVerifiedAt: DateTime

  @column({ serializeAs: null})
  public password: string

  @column({ serializeAs: null})
  public passwordSalt: string

  @column()
  public resetToken: string

  @column.date()
  public resetTokenExpires: DateTime

  @column()
  public uuid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
