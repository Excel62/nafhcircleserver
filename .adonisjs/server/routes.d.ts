import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.new_account.verify_email': { paramsTuple?: []; params?: {} }
    'auth.new_account.resend_verification': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'transactions.make_deposit': { paramsTuple?: []; params?: {} }
    'transactions.make_withdrawal': { paramsTuple?: []; params?: {} }
    'transactions.set_withdrawal_pin': { paramsTuple?: []; params?: {} }
    'transactions.transfer_funds': { paramsTuple?: []; params?: {} }
    'transactions.purchase_subscription': { paramsTuple?: []; params?: {} }
    'transactions.get_subscriptions': { paramsTuple?: []; params?: {} }
    'transactions.get_payment_address': { paramsTuple?: []; params?: {} }
    'transactions.get_deposits': { paramsTuple?: []; params?: {} }
    'transactions.get_withdrawals': { paramsTuple?: []; params?: {} }
    'transactions.set_withdrawal_address': { paramsTuple?: []; params?: {} }
    'transactions.get_incomes': { paramsTuple?: []; params?: {} }
    'transactions.get_daily_reward': { paramsTuple?: []; params?: {} }
    'transactions.claim_daily_reward': { paramsTuple?: []; params?: {} }
    'profile.referral_url': { paramsTuple?: []; params?: {} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.referral_tree': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user_tree': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.all_users': { paramsTuple?: []; params?: {} }
    'admin.deposits': { paramsTuple?: []; params?: {} }
    'admin.approve_deposit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reject_deposit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.get_withdrawals': { paramsTuple?: []; params?: {} }
    'admin.approve_withdrawal': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reject_withdrawal': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.fund_account': { paramsTuple?: []; params?: {} }
    'admin.get_subscriptions': { paramsTuple?: []; params?: {} }
    'admin.approve_subscription': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'action': ParamValue} }
    'admin.delete_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_auth.signup': { paramsTuple?: []; params?: {} }
    'admin_auth.login': { paramsTuple?: []; params?: {} }
    'admin_auth.logout': { paramsTuple?: []; params?: {} }
    'admin_auth.me': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'transactions.get_subscriptions': { paramsTuple?: []; params?: {} }
    'transactions.get_payment_address': { paramsTuple?: []; params?: {} }
    'transactions.get_deposits': { paramsTuple?: []; params?: {} }
    'transactions.get_withdrawals': { paramsTuple?: []; params?: {} }
    'transactions.get_incomes': { paramsTuple?: []; params?: {} }
    'transactions.get_daily_reward': { paramsTuple?: []; params?: {} }
    'profile.referral_url': { paramsTuple?: []; params?: {} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.referral_tree': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user_tree': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.all_users': { paramsTuple?: []; params?: {} }
    'admin.deposits': { paramsTuple?: []; params?: {} }
    'admin.get_withdrawals': { paramsTuple?: []; params?: {} }
    'admin.get_subscriptions': { paramsTuple?: []; params?: {} }
    'admin_auth.me': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'transactions.get_subscriptions': { paramsTuple?: []; params?: {} }
    'transactions.get_payment_address': { paramsTuple?: []; params?: {} }
    'transactions.get_deposits': { paramsTuple?: []; params?: {} }
    'transactions.get_withdrawals': { paramsTuple?: []; params?: {} }
    'transactions.get_incomes': { paramsTuple?: []; params?: {} }
    'transactions.get_daily_reward': { paramsTuple?: []; params?: {} }
    'profile.referral_url': { paramsTuple?: []; params?: {} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.referral_tree': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.user_tree': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.all_users': { paramsTuple?: []; params?: {} }
    'admin.deposits': { paramsTuple?: []; params?: {} }
    'admin.get_withdrawals': { paramsTuple?: []; params?: {} }
    'admin.get_subscriptions': { paramsTuple?: []; params?: {} }
    'admin_auth.me': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.new_account.verify_email': { paramsTuple?: []; params?: {} }
    'auth.new_account.resend_verification': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'transactions.make_deposit': { paramsTuple?: []; params?: {} }
    'transactions.make_withdrawal': { paramsTuple?: []; params?: {} }
    'transactions.set_withdrawal_pin': { paramsTuple?: []; params?: {} }
    'transactions.transfer_funds': { paramsTuple?: []; params?: {} }
    'transactions.purchase_subscription': { paramsTuple?: []; params?: {} }
    'transactions.set_withdrawal_address': { paramsTuple?: []; params?: {} }
    'transactions.claim_daily_reward': { paramsTuple?: []; params?: {} }
    'admin.approve_deposit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reject_deposit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.approve_withdrawal': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.reject_withdrawal': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.fund_account': { paramsTuple?: []; params?: {} }
    'admin.approve_subscription': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'action': ParamValue} }
    'admin_auth.signup': { paramsTuple?: []; params?: {} }
    'admin_auth.login': { paramsTuple?: []; params?: {} }
    'admin_auth.logout': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'admin.delete_user': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}