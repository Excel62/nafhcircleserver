import Deposit from '#models/deposit'
import Transaction from '#models/transaction'
import User from '#models/user'
import Withdrawal from '#models/withdrawal'
import type { HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid'
import mail from '@adonisjs/mail/services/main'
import Income from '#models/income'
import DailyReward from '#models/daily_reward'
import { DateTime } from 'luxon'

export default class TransactionsController {

    // set withdrawal pin
    async setWithdrawalPin({ request, response, auth }: HttpContext) {
        const user = auth.getUserOrFail() as User
        const { pin } = request.body()
        // Validate input

        try {
            console.log('Received pin:', pin) // Debug log

            if (!pin || isNaN(pin) || Number(pin) <= 0) {
                return response.badRequest({ message: 'Pin is required and must be a positive number' })
            }
            user.withdrawalPin = pin
            user.isPinSet = true
            await user.save()
            return response.json({
                message: 'Pin set successfully',
            })

        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while setting your pin' })
        }

    }

    // set withdrawal address
    async setWithdrawalAddress({ request, response, auth }: HttpContext) {
        const user = auth.getUserOrFail() as User
        const { address } = request.body()
        // Validate input

        try {
            if (!address) {
                return response.badRequest({ message: 'Address is required' })
            }
            user.withdrawalAddress = address
            user.isAddressSet = true
            await user.save()
            return response.json({
                message: 'Address set successfully',
            })

        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while setting your address' })
        }

    }

    async makeDeposit({ request, response, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const { amount } = request.body()
        // Validate input

        try {
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                return response.badRequest({ message: 'Amount is required and must be a positive number' })
            }
            await Deposit.create({
                userId: user.id,
                amount: Number(amount),
                status: 'pending',
                transactionId: uuidv4(),
            })
            return response.json({
                message: 'Deposit made successfully',
            })
        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while processing your deposit' })
        }

    }

    // make withdrawal
    async makeWithdrawal({ request, response, auth }: HttpContext) {
        const user = auth.getUserOrFail() as User
        const { amount, pin } = request.body()
        // Validate input

        try {
            // Check withdrawal pin
            if (!pin || isNaN(pin) || Number(pin) <= 0) {
                return response.badRequest({ message: 'Pin is required and must be a positive number' })
            }
            const withdrawalPin = await User.findBy('withdrawalPin', pin)
            if (!withdrawalPin) {
                return response.badRequest({ message: 'Invalid withdrawal pin or pin hasn\'t been set' })
            }
            if (withdrawalPin.id !== user.id) {
                return response.badRequest({ message: 'Invalid withdrawal pin or pin hasn\'t been set' })
            }
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                return response.badRequest({ message: 'Amount is required and must be a positive number' })
            }
            if (Number(amount) > user.referralEarnings) {
                return response.badRequest({ message: 'Insufficient balance for withdrawal' })
            }

            const transactionId = uuidv4()
            await Withdrawal.create({
                userId: user.id,
                amount: Number(amount),
                status: 'pending',
                transactionId
            })
            // send email to user
            await mail.send((message) => {
                message.from('support@nafhcircle.com', 'NAFH Circle')
                message.to(user.email)
                message.subject('Withdrawal Request')
                message.htmlView('withdrawal', {
                    amount: Number(amount),
                    userName: user.fullName,
                    transactionId
                })
            })
            return response.json({
                message: 'Withdrawal request submitted successfully',
            })
        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while processing your withdrawal' })
        }
    }

    // transfer funds to another user
    async transferFunds({ request, response, auth }: HttpContext) {
        const sender = auth.getUserOrFail()
        const { recipientEmail, amount } = request.body()
        // Validate input

        try {
            if (!recipientEmail || !recipientEmail.includes('@')) {
                return response.badRequest({ message: 'Valid recipient email is required' })
            }
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                return response.badRequest({ message: 'Amount is required and must be a positive number' })
            }
            const recipient = await User.findBy('email', recipientEmail)
            if (!recipient) {
                return response.badRequest({ message: 'Invalid recipient email' })
            }
            await Transaction.create({
                userId: sender.id,
                amount: Number(amount),
                transactionType: 'transfer',
                status: 'pending',
                transactionId: uuidv4(),
            })
            recipient.referralEarnings += Number(amount)
            await recipient.save()
            return response.json({
                message: `Successfully transferred ${amount} USD to ${recipientEmail}`,
            })
        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while processing your transfer' })
        }
    }

    // purchase subscription
    async purchaseSubscription({ request, response, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const { amount } = request.body()
        // Validate input

        try {
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                return response.badRequest({ message: 'Amount is required and must be a positive number' })
            }
            // check if user has already purchased a subscription
            const isSubscribed = await User.findBy('isSubscribed', true)
            // get uesr transactions where transaction type is subscription and status is pending
            const pendingSubscriptions = await Transaction.query().where('transaction_type', 'subscription').where('status', 'pending').where('user_id', user.id).first()

            if (isSubscribed) {
                return response.badRequest({ message: 'You have already purchased a subscription' })
            }
            if (pendingSubscriptions) {
                return response.badRequest({ message: 'You have pending subscriptions, please wait for confirmation' })
            }
            await Transaction.create({
                userId: user.id,
                amount: Number(amount),
                transactionType: 'subscription',
                status: 'pending',
                transactionId: uuidv4(),
            })
            await mail.send((message) => {
                message
                    .to(user.email)
                    .subject('Your subscription is pending — NAFH Circle')
                    .htmlView('subscribe', {
                        user: {
                            name: user.fullName,
                            email: user.email,        // ✅ add this
                            dashboardUrl: `https://nafhcircle.com/register?ref=${user.referralCode}`
                        }
                    })
            })
            return response.json({
                message: 'Subscription purchase successful,pending confirmation',
            })
        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while processing your purchase' })
        }
    }
    // get payments address
    async getPaymentAddress({ response, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        // list of payment addresses
        const adresses = [
            '0xAd9C391E35595A35Bb700083F3D12968FA5A4524',
            '0x508F8acE82D2E6445b7955fF68e7223742D80e7D',
            '0xa8947e20bb74190394bcf0af25dbed770d4e444e',
            '0xe606f760728893ef91ddd3983ad47cc0029b3f40',
            '0x508F8acE82D2E6445b7955fF68e7223742D80e7D',
            '0x86BbeA89eCAaFf6597501d8DCEAB820219aa1826',
            '0x79cb4b1e4c5c075261e23a9b15ed5b4da2006414',
            '0x982334975f3401fd50f0585a83a1b7196863b6b5',
            '0xec0396CFcCd0Ad68EC1a03f490647EE848378830',
            '0x9efc2d8282070e3baf423e0c6d49418c8c2cc934',
        ]
        // Validate input
        try {
            if (!user) {
                return response.unauthorized({ message: 'Unauthorized' })
            }
            //   send random address from the list
            const randomAddress = adresses[Math.floor(Math.random() * adresses.length)]
            return response.json({
                address: randomAddress,
            })
        } catch (e) {
            return response.internalServerError({ message: 'An error occurred while fetching your payment address' })
        }
    }

    // get user deposit
    async getDeposits({ response, auth }: HttpContext) {
        const user = auth.getUserOrFail()

        const deposits = await Deposit.query().where('userId', user.id).orderBy('created_at', 'desc')
        return response.ok({
            deposits: deposits.map((deposit) => ({
                id: deposit.id,
                amount: deposit.amount,
                status: deposit.status,
                transactionId: deposit.transactionId,
                createdAt: deposit.createdAt,
            }))
        })
    }

    // get user withdrawals
    async getWithdrawals({ response, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const userRecord = await User.findBy('id', user.id)
        const withdrawals = await Withdrawal.query().where('userId', user.id).orderBy('created_at', 'desc')

        return response.ok({
            withdrawals: withdrawals.map((withdrawal) => ({
                id: withdrawal.id,
                amount: withdrawal.amount,
                status: withdrawal.status,
                transactionId: withdrawal.transactionId,
                address: userRecord?.withdrawalAddress,
                createdAt: withdrawal.createdAt,
            }))
        })

    }

    // get all subscriptions from transactions where transaction type is subscription
    async getSubscriptions({ response, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const subscriptions = await Transaction.query().where('user_id', user.id).where('transaction_type', 'subscription').orderBy('created_at', 'desc')
        return response.ok({
            subscriptions: subscriptions.map((subscription) => ({
                id: subscription.id,
                amount: subscription.amount,
                status: subscription.status,
                transactionId: subscription.transactionId,
                createdAt: subscription.createdAt,
            }))
        })
    }

    // get all incomes
    async getIncomes({ response, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const incomes = await Income.query().where('userId', user.id).orderBy('created_at', 'desc')
        return response.ok({
            incomes: incomes.map((income) => ({
                id: income.id,
                amount: income.amount,
                type: income.type,
                circle: income.circle,
                level: income.level,
                status: income.status,
                createdAt: income.createdAt,
            }))
        })
    }


    // get daily reward
    async getDailyReward({ response, auth }: HttpContext) {
        const user = await auth.getUserOrFail()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const expiry = new Date()
        expiry.setHours(12, 0, 0, 0)
        if (new Date() >= expiry) expiry.setDate(expiry.getDate() + 1)

        const reward = await DailyReward.query()
            .where('user_id', user.id)
            .where('created_at', '>=', today.toISOString())
            .first()

        if (!reward) {
            return response.json({
                status: 'pending',
                amount: 0.3,
                expiresAt: expiry.toISOString(),
            })
        }

        return response.json(reward)
    }

    async claimDailyReward({ response, auth }: HttpContext) {
        const user = await auth.getUserOrFail()

        const now = new Date()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const expiry = new Date()
        expiry.setHours(12, 0, 0, 0)

        // check if reward expired (past 12 PM today)
        if (now > expiry) {
            return response.status(400).json({ message: "Today's reward has expired. Come back tomorrow!" })
        }

        // check if already claimed today
        const existing = await DailyReward.query()
            .where('user_id', user.id)
            .where('created_at', '>=', today.toISOString())
            .first()

        if (existing) {
            return response.status(400).json({ message: 'You have already claimed your daily reward today' })
        }

        const userBalance = await User.findBy('id', user.id)
        if (!userBalance) {
            return response.status(404).json({ message: 'User balance not found' })
        }

        const currentUsdt = Number(userBalance.referralEarnings) || 0
        userBalance.merge({ referralEarnings: Number((currentUsdt + 0.3).toFixed(8)) })
        await userBalance.save()

        // create reward record
        const reward = await DailyReward.create({
            userId: user.id,
            amount: 0.3,
            status: 'claimed',
           expiresAt: DateTime.fromJSDate(expiry),
        })
        // also add reward to user's income
        await Income.create({
            userId: user.id,
            amount: 0.3,
            type: 'Daily reward',
            circle: "Daily reward",
            level: 1,
            status: 'claimed',
        })
        return response.json(reward)
    }
}

