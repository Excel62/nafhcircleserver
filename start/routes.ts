/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import ProfileController from '#controllers/profile_controller'
import TransactionsController from '#controllers/transactions_controller'
import AdminController from '#controllers/admin_controller'
import AdminAuthController from '#controllers/admin_auths_controller'
// import UsersController from '#controllers/users_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('verify-email', [controllers.NewAccount, 'verifyEmail'])
        router.post('resend-verification', [controllers.NewAccount, 'resendVerification'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
        // router.post('/auth/register/:refCode', [NewAccountController, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

  router.group(() => {
    router.post('/deposit', [TransactionsController, 'makeDeposit'])
    router.post('/withdrawal', [TransactionsController, 'makeWithdrawal'])
    router.post('/withdrawal/pin', [TransactionsController, 'setWithdrawalPin'])
    router.post('/transfer', [TransactionsController, 'transferFunds'])
    router.post('/subscription', [TransactionsController, 'purchaseSubscription'])
    router.get('/get-subscriptions', [TransactionsController, 'getSubscriptions'])
    router.get('/payment-address', [TransactionsController, 'getPaymentAddress'])
    router.get('/get-deposits', [TransactionsController, 'getDeposits'])
    router.get('/get-withdrawals', [TransactionsController, 'getWithdrawals'])
    router.post('/set-withdrawal-address', [TransactionsController, 'setWithdrawalAddress'])
    router.get('/get-incomes', [TransactionsController, 'getIncomes'])
    router.get('/daily-reward', [TransactionsController, 'getDailyReward'])
    router.post('/claim-daily-reward', [TransactionsController, 'claimDailyReward'])
  }).prefix('transaction')

  router.get('/me/referral-url', [ProfileController, 'referralUrl']).use(middleware.auth())

  // Admin routes
router.group(() => {
  router.get('/admins', [AdminController, 'index'])
  router.get('/admins/:id/referral-tree', [AdminController, 'referralTree'])
  router.get('/users/:id/referral-tree', [AdminController, 'userTree'])
  router.get('/users', [AdminController, 'allUsers'])
  router.get('/admin/get-deposits', [AdminController, 'deposits'])
  router.post('/admin/approve-deposit/:id', [AdminController, 'approveDeposit'])
  router.post('/admin/reject-deposit/:id', [AdminController, 'rejectDeposit'])
  router.get('/admin/withdrawals', [AdminController, 'getWithdrawals'])
  router.post('/admin/approve-withdrawal/:id', [AdminController, 'approveWithdrawal'])
  router.post('/admin/reject-withdrawal/:id', [AdminController, 'rejectWithdrawal'])
  router.post('/admin/fund-account', [AdminController, 'fundAccount'])
  router.get('/admin/get-subscriptions', [AdminController, 'getSubscriptions'])
  router.post('/admin/approve-subscription/:id/:action', [AdminController, 'approveSubscription'])
  router.delete('/admin/delete-user/:id', [AdminController, 'deleteUser'])
}).prefix('/api/v1').use(middleware.adminAuth())

// Admin auth routes (public)
router.group(() => {
  router.post('/signup', [AdminAuthController, 'signup'])
  router.post('/login', [AdminAuthController, 'login'])
}).prefix('/api/v1/admin/auth')

// Admin protected routes
router.group(() => {
  router.post('/logout', [AdminAuthController, 'logout'])
  router.get('/me', [AdminAuthController, 'me'])
}).prefix('/api/v1/admin').use(middleware.adminAuth())

