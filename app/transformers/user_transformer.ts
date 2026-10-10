import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'uuid',
      'fullName',
      'email',
      'country',
      'phoneNumber',
      'referralCode',
      'referredBy',
      'referralEarnings',
      'totalReferrals',
      'isSubscribed',
      'withdrawalAddress',
      'isAddressSet',
      'withdrawalPin',
      'isPinSet',
      'createdAt',
      'updatedAt',
      'initials',
    ])
  }
}
