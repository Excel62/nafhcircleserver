import UserTransformer from '#transformers/user_transformer'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
     const user = auth.getUserOrFail() as User
    return serialize(UserTransformer.transform(user))
  }

  async referralUrl({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail() as User

    const appUrl = env.get('APP_URL')
    return serialize({
      referralCode: user.referralCode,
      referralUrl: `${appUrl}/register?ref=${user.referralCode}`,
    })
  }
}