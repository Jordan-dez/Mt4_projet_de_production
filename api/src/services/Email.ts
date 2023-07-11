import { Client } from 'node-mailjet';

export class Email {

  private client: Client;
  
  constructor() {
    this.client = new Client({
      apiKey: process.env.MJ_APIKEY ||  '85378a29d48d2cf6305102673aba2915',
      apiSecret: process.env.MJ_APISECRET || 'f2f92ce9f22557b053809e345a68b72e'
    });
  }

  async sendMagicLink(to: string, link: string, title: string) {
    console.info('Sending magic link to: ' + to);
    const request = await this.client
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": process.env.MJ_EMAIL_FROM || 'yajoah@gmail.com',
              "Name": process.env.MJ_EMAIL_NAME || 'MT4 Groupe-8'
            },
            "To": [
              {
                "Email": to,
              }
            ],
            "Subject": title.toUpperCase() + " : Votre lien magique",
            "HTMLPart": `
<p>Bonjour,</p>
<p>Cliquez sur le lien afin de vous identifier. Le lien sera valable pendant 30 minutes.</p>
<p><a href=" + ${link} + ">Connexion</a>
<p>Si le lien dessus ne fonctionne pas, copiez/collez le lien suivant dans votre navigateur :</a>
<pre>${link}</pre>
`,
          }
        ]
      });
  }

}
