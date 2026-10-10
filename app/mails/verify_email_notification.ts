import { BaseMail } from '@adonisjs/mail'

export default class VerifyEmailNotification extends BaseMail {
  subject = 'Verify Your Email — NAFH Circle'

  constructor(
    private name: string,
    private email: string,
    private code: string
  ) {
    super()
  }

  prepare() {
    this.message
      .to(this.email)
      .from('support@nafhcircle.com', 'NAFH Circle')
      .htmlView('verify_email', {
        name: this.name,
        email: this.email,
        code: this.code,
      })
  }
}