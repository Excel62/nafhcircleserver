/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.new_account.verify_email': {
    methods: ["POST"]
    pattern: '/api/v1/auth/verify-email'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['verifyEmail']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['verifyEmail']>>>
    }
  }
  'auth.new_account.resend_verification': {
    methods: ["POST"]
    pattern: '/api/v1/auth/resend-verification'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['resendVerification']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['resendVerification']>>>
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'transactions.make_deposit': {
    methods: ["POST"]
    pattern: '/transaction/deposit'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.make_withdrawal': {
    methods: ["POST"]
    pattern: '/transaction/withdrawal'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.set_withdrawal_pin': {
    methods: ["POST"]
    pattern: '/transaction/withdrawal/pin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.transfer_funds': {
    methods: ["POST"]
    pattern: '/transaction/transfer'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.purchase_subscription': {
    methods: ["POST"]
    pattern: '/transaction/subscription'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.get_subscriptions': {
    methods: ["GET","HEAD"]
    pattern: '/transaction/get-subscriptions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.get_payment_address': {
    methods: ["GET","HEAD"]
    pattern: '/transaction/payment-address'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.get_deposits': {
    methods: ["GET","HEAD"]
    pattern: '/transaction/get-deposits'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.get_withdrawals': {
    methods: ["GET","HEAD"]
    pattern: '/transaction/get-withdrawals'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.set_withdrawal_address': {
    methods: ["POST"]
    pattern: '/transaction/set-withdrawal-address'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.get_incomes': {
    methods: ["GET","HEAD"]
    pattern: '/transaction/get-incomes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.get_daily_reward': {
    methods: ["GET","HEAD"]
    pattern: '/transaction/daily-reward'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'transactions.claim_daily_reward': {
    methods: ["POST"]
    pattern: '/transaction/claim-daily-reward'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'profile.referral_url': {
    methods: ["GET","HEAD"]
    pattern: '/me/referral-url'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admins'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.referral_tree': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admins/:id/referral-tree'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.user_tree': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id/referral-tree'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.all_users': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.deposits': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/get-deposits'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.approve_deposit': {
    methods: ["POST"]
    pattern: '/api/v1/admin/approve-deposit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.reject_deposit': {
    methods: ["POST"]
    pattern: '/api/v1/admin/reject-deposit/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.get_withdrawals': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/withdrawals'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.approve_withdrawal': {
    methods: ["POST"]
    pattern: '/api/v1/admin/approve-withdrawal/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.reject_withdrawal': {
    methods: ["POST"]
    pattern: '/api/v1/admin/reject-withdrawal/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.fund_account': {
    methods: ["POST"]
    pattern: '/api/v1/admin/fund-account'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.get_subscriptions': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/get-subscriptions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.approve_subscription': {
    methods: ["POST"]
    pattern: '/api/v1/admin/approve-subscription/:id/:action'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; action: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.delete_user': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/delete-user/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin_auth.signup': {
    methods: ["POST"]
    pattern: '/api/v1/admin/auth/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin_auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/admin/auth/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin_auth.logout': {
    methods: ["POST"]
    pattern: '/api/v1/admin/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin_auth.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
