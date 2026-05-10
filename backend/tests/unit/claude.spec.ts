import { test } from '@japa/runner'
import ClaudeService from '#app/Services/ClaudeService'

test.group('ClaudeService', () => {
  test('mock analysis for phishing email', async () => {
    const service = new ClaudeService()
    const result = await service.analyzeEmail(
      'security@fake-bank.com',
      'URGENT: Votre compte va être fermé',
      'Cliquez ici pour vérifier votre compte immédiatement sous peine de fermeture définitive.'
    )

    result.score >= 30
    result.niveau === 'danger' || result.niveau === 'suspect'
    result.categorie.length > 0
    result.explication.length > 0
    result.conseilEnfant.length > 0
  })

  test('mock analysis for safe email', async () => {
    const service = new ClaudeService()
    const result = await service.analyzeEmail(
      'maman@free.fr',
      'Bonjour, pense à acheter du pain',
      'Salut, en rentrant du marché, prends une baguette s\'il te plaît. Bisous.'
    )

    result.score < 30
    result.niveau === 'safe'
  })
})
