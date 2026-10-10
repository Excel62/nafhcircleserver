/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
      verifyEmail: typeof routes['auth.new_account.verify_email']
      resendVerification: typeof routes['auth.new_account.resend_verification']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    referralUrl: typeof routes['profile.referral_url']
  }
  transactions: {
    makeDeposit: typeof routes['transactions.make_deposit']
    makeWithdrawal: typeof routes['transactions.make_withdrawal']
    setWithdrawalPin: typeof routes['transactions.set_withdrawal_pin']
    transferFunds: typeof routes['transactions.transfer_funds']
    purchaseSubscription: typeof routes['transactions.purchase_subscription']
    getSubscriptions: typeof routes['transactions.get_subscriptions']
    getPaymentAddress: typeof routes['transactions.get_payment_address']
    getDeposits: typeof routes['transactions.get_deposits']
    getWithdrawals: typeof routes['transactions.get_withdrawals']
    setWithdrawalAddress: typeof routes['transactions.set_withdrawal_address']
    getIncomes: typeof routes['transactions.get_incomes']
    getDailyReward: typeof routes['transactions.get_daily_reward']
    claimDailyReward: typeof routes['transactions.claim_daily_reward']
  }
  admin: {
    index: typeof routes['admin.index']
    referralTree: typeof routes['admin.referral_tree']
    userTree: typeof routes['admin.user_tree']
    allUsers: typeof routes['admin.all_users']
    deposits: typeof routes['admin.deposits']
    approveDeposit: typeof routes['admin.approve_deposit']
    rejectDeposit: typeof routes['admin.reject_deposit']
    getWithdrawals: typeof routes['admin.get_withdrawals']
    approveWithdrawal: typeof routes['admin.approve_withdrawal']
    rejectWithdrawal: typeof routes['admin.reject_withdrawal']
    fundAccount: typeof routes['admin.fund_account']
    getSubscriptions: typeof routes['admin.get_subscriptions']
    approveSubscription: typeof routes['admin.approve_subscription']
    deleteUser: typeof routes['admin.delete_user']
  }
  adminAuth: {
    signup: typeof routes['admin_auth.signup']
    login: typeof routes['admin_auth.login']
    logout: typeof routes['admin_auth.logout']
    me: typeof routes['admin_auth.me']
  }
}
