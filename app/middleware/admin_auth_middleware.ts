
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminAuthMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    try {
      // 👇 explicitly authenticate using admin guard
      const admin = await auth.use('admin').authenticate()

      if (!admin) {
        return response.unauthorized({ message: 'Admin access required' })
      }
    } catch (error) {
      return response.unauthorized({
        message: 'Admin access required',
      })
    }
    return next()
  }
}