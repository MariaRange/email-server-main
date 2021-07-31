import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";

@Injectable()
export class MailerService {
  private _transporter: Transporter;

  private email = {
    user: `labo.dental123@gmail.com`,
    pass: `iywtiacuxwahtixz`,
  };

  constructor() {
    this.initTransporter();
    this.verify();
  }

  public get transporter(): Transporter {
    return this._transporter;
  }

  private initTransporter() {
    this._transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: this.email.user,
        pass: this.email.pass,
      },
    });
  }

  private verify() {
    this.transporter.verify().then(() => console.log("Ready for send emails"));
  }
}
