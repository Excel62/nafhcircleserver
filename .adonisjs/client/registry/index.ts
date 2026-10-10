/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.new_account.verify_email': {
    methods: ["POST"],
    pattern: '/api/v1/auth/verify-email',
    tokens: [{"old":"/api/v1/auth/verify-email","type":0,"val":"api","end":""},{"old":"/api/v1/auth/verify-email","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/verify-email","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/verify-email","type":0,"val":"verify-email","end":""}],
    types: placeholder as Registry['auth.new_account.verify_email']['types'],
  },
  'auth.new_account.resend_verification': {
    methods: ["POST"],
    pattern: '/api/v1/auth/resend-verification',
    tokens: [{"old":"/api/v1/auth/resend-verification","type":0,"val":"api","end":""},{"old":"/api/v1/auth/resend-verification","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/resend-verification","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/resend-verification","type":0,"val":"resend-verification","end":""}],
    types: placeholder as Registry['auth.new_account.resend_verification']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'transactions.make_deposit': {
    methods: ["POST"],
    pattern: '/transaction/deposit',
    tokens: [{"old":"/transaction/deposit","type":0,"val":"transaction","end":""},{"old":"/transaction/deposit","type":0,"val":"deposit","end":""}],
    types: placeholder as Registry['transactions.make_deposit']['types'],
  },
  'transactions.make_withdrawal': {
    methods: ["POST"],
    pattern: '/transaction/withdrawal',
    tokens: [{"old":"/transaction/withdrawal","type":0,"val":"transaction","end":""},{"old":"/transaction/withdrawal","type":0,"val":"withdrawal","end":""}],
    types: placeholder as Registry['transactions.make_withdrawal']['types'],
  },
  'transactions.set_withdrawal_pin': {
    methods: ["POST"],
    pattern: '/transaction/withdrawal/pin',
    tokens: [{"old":"/transaction/withdrawal/pin","type":0,"val":"transaction","end":""},{"old":"/transaction/withdrawal/pin","type":0,"val":"withdrawal","end":""},{"old":"/transaction/withdrawal/pin","type":0,"val":"pin","end":""}],
    types: placeholder as Registry['transactions.set_withdrawal_pin']['types'],
  },
  'transactions.transfer_funds': {
    methods: ["POST"],
    pattern: '/transaction/transfer',
    tokens: [{"old":"/transaction/transfer","type":0,"val":"transaction","end":""},{"old":"/transaction/transfer","type":0,"val":"transfer","end":""}],
    types: placeholder as Registry['transactions.transfer_funds']['types'],
  },
  'transactions.purchase_subscription': {
    methods: ["POST"],
    pattern: '/transaction/subscription',
    tokens: [{"old":"/transaction/subscription","type":0,"val":"transaction","end":""},{"old":"/transaction/subscription","type":0,"val":"subscription","end":""}],
    types: placeholder as Registry['transactions.purchase_subscription']['types'],
  },
  'transactions.get_subscriptions': {
    methods: ["GET","HEAD"],
    pattern: '/transaction/get-subscriptions',
    tokens: [{"old":"/transaction/get-subscriptions","type":0,"val":"transaction","end":""},{"old":"/transaction/get-subscriptions","type":0,"val":"get-subscriptions","end":""}],
    types: placeholder as Registry['transactions.get_subscriptions']['types'],
  },
  'transactions.get_payment_address': {
    methods: ["GET","HEAD"],
    pattern: '/transaction/payment-address',
    tokens: [{"old":"/transaction/payment-address","type":0,"val":"transaction","end":""},{"old":"/transaction/payment-address","type":0,"val":"payment-address","end":""}],
    types: placeholder as Registry['transactions.get_payment_address']['types'],
  },
  'transactions.get_deposits': {
    methods: ["GET","HEAD"],
    pattern: '/transaction/get-deposits',
    tokens: [{"old":"/transaction/get-deposits","type":0,"val":"transaction","end":""},{"old":"/transaction/get-deposits","type":0,"val":"get-deposits","end":""}],
    types: placeholder as Registry['transactions.get_deposits']['types'],
  },
  'transactions.get_withdrawals': {
    methods: ["GET","HEAD"],
    pattern: '/transaction/get-withdrawals',
    tokens: [{"old":"/transaction/get-withdrawals","type":0,"val":"transaction","end":""},{"old":"/transaction/get-withdrawals","type":0,"val":"get-withdrawals","end":""}],
    types: placeholder as Registry['transactions.get_withdrawals']['types'],
  },
  'transactions.set_withdrawal_address': {
    methods: ["POST"],
    pattern: '/transaction/set-withdrawal-address',
    tokens: [{"old":"/transaction/set-withdrawal-address","type":0,"val":"transaction","end":""},{"old":"/transaction/set-withdrawal-address","type":0,"val":"set-withdrawal-address","end":""}],
    types: placeholder as Registry['transactions.set_withdrawal_address']['types'],
  },
  'transactions.get_incomes': {
    methods: ["GET","HEAD"],
    pattern: '/transaction/get-incomes',
    tokens: [{"old":"/transaction/get-incomes","type":0,"val":"transaction","end":""},{"old":"/transaction/get-incomes","type":0,"val":"get-incomes","end":""}],
    types: placeholder as Registry['transactions.get_incomes']['types'],
  },
  'transactions.get_daily_reward': {
    methods: ["GET","HEAD"],
    pattern: '/transaction/daily-reward',
    tokens: [{"old":"/transaction/daily-reward","type":0,"val":"transaction","end":""},{"old":"/transaction/daily-reward","type":0,"val":"daily-reward","end":""}],
    types: placeholder as Registry['transactions.get_daily_reward']['types'],
  },
  'transactions.claim_daily_reward': {
    methods: ["POST"],
    pattern: '/transaction/claim-daily-reward',
    tokens: [{"old":"/transaction/claim-daily-reward","type":0,"val":"transaction","end":""},{"old":"/transaction/claim-daily-reward","type":0,"val":"claim-daily-reward","end":""}],
    types: placeholder as Registry['transactions.claim_daily_reward']['types'],
  },
  'profile.referral_url': {
    methods: ["GET","HEAD"],
    pattern: '/me/referral-url',
    tokens: [{"old":"/me/referral-url","type":0,"val":"me","end":""},{"old":"/me/referral-url","type":0,"val":"referral-url","end":""}],
    types: placeholder as Registry['profile.referral_url']['types'],
  },
  'admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admins',
    tokens: [{"old":"/api/v1/admins","type":0,"val":"api","end":""},{"old":"/api/v1/admins","type":0,"val":"v1","end":""},{"old":"/api/v1/admins","type":0,"val":"admins","end":""}],
    types: placeholder as Registry['admin.index']['types'],
  },
  'admin.referral_tree': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admins/:id/referral-tree',
    tokens: [{"old":"/api/v1/admins/:id/referral-tree","type":0,"val":"api","end":""},{"old":"/api/v1/admins/:id/referral-tree","type":0,"val":"v1","end":""},{"old":"/api/v1/admins/:id/referral-tree","type":0,"val":"admins","end":""},{"old":"/api/v1/admins/:id/referral-tree","type":1,"val":"id","end":""},{"old":"/api/v1/admins/:id/referral-tree","type":0,"val":"referral-tree","end":""}],
    types: placeholder as Registry['admin.referral_tree']['types'],
  },
  'admin.user_tree': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id/referral-tree',
    tokens: [{"old":"/api/v1/users/:id/referral-tree","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id/referral-tree","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id/referral-tree","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id/referral-tree","type":1,"val":"id","end":""},{"old":"/api/v1/users/:id/referral-tree","type":0,"val":"referral-tree","end":""}],
    types: placeholder as Registry['admin.user_tree']['types'],
  },
  'admin.all_users': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.all_users']['types'],
  },
  'admin.deposits': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/get-deposits',
    tokens: [{"old":"/api/v1/admin/get-deposits","type":0,"val":"api","end":""},{"old":"/api/v1/admin/get-deposits","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/get-deposits","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/get-deposits","type":0,"val":"get-deposits","end":""}],
    types: placeholder as Registry['admin.deposits']['types'],
  },
  'admin.approve_deposit': {
    methods: ["POST"],
    pattern: '/api/v1/admin/approve-deposit/:id',
    tokens: [{"old":"/api/v1/admin/approve-deposit/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/approve-deposit/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/approve-deposit/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/approve-deposit/:id","type":0,"val":"approve-deposit","end":""},{"old":"/api/v1/admin/approve-deposit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.approve_deposit']['types'],
  },
  'admin.reject_deposit': {
    methods: ["POST"],
    pattern: '/api/v1/admin/reject-deposit/:id',
    tokens: [{"old":"/api/v1/admin/reject-deposit/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/reject-deposit/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/reject-deposit/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/reject-deposit/:id","type":0,"val":"reject-deposit","end":""},{"old":"/api/v1/admin/reject-deposit/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.reject_deposit']['types'],
  },
  'admin.get_withdrawals': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/withdrawals',
    tokens: [{"old":"/api/v1/admin/withdrawals","type":0,"val":"api","end":""},{"old":"/api/v1/admin/withdrawals","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/withdrawals","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/withdrawals","type":0,"val":"withdrawals","end":""}],
    types: placeholder as Registry['admin.get_withdrawals']['types'],
  },
  'admin.approve_withdrawal': {
    methods: ["POST"],
    pattern: '/api/v1/admin/approve-withdrawal/:id',
    tokens: [{"old":"/api/v1/admin/approve-withdrawal/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/approve-withdrawal/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/approve-withdrawal/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/approve-withdrawal/:id","type":0,"val":"approve-withdrawal","end":""},{"old":"/api/v1/admin/approve-withdrawal/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.approve_withdrawal']['types'],
  },
  'admin.reject_withdrawal': {
    methods: ["POST"],
    pattern: '/api/v1/admin/reject-withdrawal/:id',
    tokens: [{"old":"/api/v1/admin/reject-withdrawal/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/reject-withdrawal/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/reject-withdrawal/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/reject-withdrawal/:id","type":0,"val":"reject-withdrawal","end":""},{"old":"/api/v1/admin/reject-withdrawal/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.reject_withdrawal']['types'],
  },
  'admin.fund_account': {
    methods: ["POST"],
    pattern: '/api/v1/admin/fund-account',
    tokens: [{"old":"/api/v1/admin/fund-account","type":0,"val":"api","end":""},{"old":"/api/v1/admin/fund-account","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/fund-account","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/fund-account","type":0,"val":"fund-account","end":""}],
    types: placeholder as Registry['admin.fund_account']['types'],
  },
  'admin.get_subscriptions': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/get-subscriptions',
    tokens: [{"old":"/api/v1/admin/get-subscriptions","type":0,"val":"api","end":""},{"old":"/api/v1/admin/get-subscriptions","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/get-subscriptions","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/get-subscriptions","type":0,"val":"get-subscriptions","end":""}],
    types: placeholder as Registry['admin.get_subscriptions']['types'],
  },
  'admin.approve_subscription': {
    methods: ["POST"],
    pattern: '/api/v1/admin/approve-subscription/:id/:action',
    tokens: [{"old":"/api/v1/admin/approve-subscription/:id/:action","type":0,"val":"api","end":""},{"old":"/api/v1/admin/approve-subscription/:id/:action","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/approve-subscription/:id/:action","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/approve-subscription/:id/:action","type":0,"val":"approve-subscription","end":""},{"old":"/api/v1/admin/approve-subscription/:id/:action","type":1,"val":"id","end":""},{"old":"/api/v1/admin/approve-subscription/:id/:action","type":1,"val":"action","end":""}],
    types: placeholder as Registry['admin.approve_subscription']['types'],
  },
  'admin.delete_user': {
    methods: ["DELETE"],
    pattern: '/api/v1/admin/delete-user/:id',
    tokens: [{"old":"/api/v1/admin/delete-user/:id","type":0,"val":"api","end":""},{"old":"/api/v1/admin/delete-user/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/delete-user/:id","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/delete-user/:id","type":0,"val":"delete-user","end":""},{"old":"/api/v1/admin/delete-user/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.delete_user']['types'],
  },
  'admin_auth.signup': {
    methods: ["POST"],
    pattern: '/api/v1/admin/auth/signup',
    tokens: [{"old":"/api/v1/admin/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/admin/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/auth/signup","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/admin/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['admin_auth.signup']['types'],
  },
  'admin_auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/admin/auth/login',
    tokens: [{"old":"/api/v1/admin/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/admin/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/auth/login","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/admin/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['admin_auth.login']['types'],
  },
  'admin_auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/admin/logout',
    tokens: [{"old":"/api/v1/admin/logout","type":0,"val":"api","end":""},{"old":"/api/v1/admin/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/logout","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['admin_auth.logout']['types'],
  },
  'admin_auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/me',
    tokens: [{"old":"/api/v1/admin/me","type":0,"val":"api","end":""},{"old":"/api/v1/admin/me","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/me","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['admin_auth.me']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
