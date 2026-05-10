import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#app/Models/User'
import Senior from '#app/Models/Senior'
import EmailAnalysis from '#app/Models/EmailAnalysis'
import Subscription from '#app/Models/Subscription'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      email: 'demo@sentinelle.app',
      password: 'password123',
      prenom: 'Bruno',
      nom: 'Demo',
    })

    const senior = await Senior.create({
      userId: user.id,
      prenom: 'Micheline',
      gmail: 'micheline.dupont@gmail.com',
      actif: true,
      seuilAlerte: 60,
      oauthStatus: 'pending',
    })

    await Senior.create({
      userId: user.id,
      prenom: 'Roger',
      gmail: 'roger.martin@gmail.com',
      actif: true,
      seuilAlerte: 50,
      oauthStatus: 'active',
    })

    await EmailAnalysis.create({
      seniorId: senior.id,
      fromEmail: 'security@bank-account-verify.com',
      subject: 'URGENT : Votre compte bancaire va être désactivé',
      dateReceived: new Date(),
      score: 85,
      categorie: 'phishing',
      niveau: 'danger',
      explication: 'Email frauduleux imitant une banque. Le domaine "bank-account-verify.com" est suspect et l\'urgence est une technique d\'hameçonnage classique.',
      conseilEnfant: 'Contactez Micheline pour la prévenir de ne cliquer sur aucun lien et de ne pas répondre.',
      indicateurs: ['Domaine suspect', 'Création d\'urgence', 'Demande d\'action immédiate'],
      alerteEnvoyee: true,
    })

    await EmailAnalysis.create({
      seniorId: senior.id,
      fromEmail: 'newsletter@amazon.fr',
      subject: 'Vos offres de la semaine',
      dateReceived: new Date(),
      score: 5,
      categorie: 'newsletter',
      niveau: 'safe',
      explication: 'Newsletter commerciale légitime de la part d\'Amazon France.',
      conseilEnfant: 'Aucune action nécessaire.',
      indicateurs: [],
      alerteEnvoyee: false,
    })

    await Subscription.create({
      userId: user.id,
      status: 'active',
      plan: 'solo',
    })
  }
}
