import { google, gmail_v1 } from 'googleapis'
import env from '#contracts/env'
import Senior from '#app/Models/Senior'
import Encryption from '@adonisjs/core/services/encryption'
import { DateTime } from 'luxon'

export default class GmailService {
  private oauth2Client

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI
    )
  }

  getAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    })
  }

  async handleCallback(code: string, senior: Senior): Promise<void> {
    const { tokens } = await this.oauth2Client.getToken(code)

    if (!tokens.access_token) {
      throw new Error('No access token returned from Google')
    }

    senior.oauthTokenEncrypted = Encryption.encrypt(tokens.access_token)

    if (tokens.refresh_token) {
      senior.oauthRefreshTokenEncrypted = Encryption.encrypt(tokens.refresh_token)
    }

    if (tokens.expiry_date) {
      senior.oauthExpiresAt = DateTime.fromMillis(tokens.expiry_date)
    }

    senior.oauthStatus = 'active'
    await senior.save()
  }

  private async getAuthenticatedClient(senior: Senior) {
    if (!senior.oauthTokenEncrypted) {
      throw new Error('No OAuth token for this senior')
    }

    const accessToken = Encryption.decrypt(senior.oauthTokenEncrypted) as string
    const refreshToken = senior.oauthRefreshTokenEncrypted
      ? (Encryption.decrypt(senior.oauthRefreshTokenEncrypted) as string)
      : undefined

    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
      expiry_date: senior.oauthExpiresAt?.toMillis(),
    })

    // Auto-refresh if expired
    this.oauth2Client.on('tokens', async (tokens) => {
      if (tokens.access_token) {
        senior.oauthTokenEncrypted = Encryption.encrypt(tokens.access_token)
      }
      if (tokens.refresh_token) {
        senior.oauthRefreshTokenEncrypted = Encryption.encrypt(tokens.refresh_token)
      }
      if (tokens.expiry_date) {
        senior.oauthExpiresAt = DateTime.fromMillis(tokens.expiry_date)
      }
      await senior.save()
    })

    return google.gmail({ version: 'v1', auth: this.oauth2Client })
  }

  async fetchUnreadEmails(senior: Senior): Promise<gmail_v1.Schema$Message[]> {
    const gmail = await this.getAuthenticatedClient(senior)

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
      maxResults: 20,
    })

    const messages = response.data.messages || []
    const fullMessages: gmail_v1.Schema$Message[] = []

    for (const msg of messages.slice(0, 10)) {
      if (msg.id) {
        const detail = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'metadata',
          metadataHeaders: ['From', 'Subject', 'Date'],
        })
        fullMessages.push(detail.data)
      }
    }

    return fullMessages
  }

  extractEmailData(message: gmail_v1.Schema$Message): {
    from: string
    subject: string
    date: string
    messageId: string
    snippet: string
  } {
    const headers = message.payload?.headers || []
    const getHeader = (name: string) =>
      headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || ''

    return {
      from: getHeader('From'),
      subject: getHeader('Subject'),
      date: getHeader('Date'),
      messageId: message.id || '',
      snippet: message.snippet || '',
    }
  }

  async markAsRead(senior: Senior, gmailMessageId: string): Promise<void> {
    const gmail = await this.getAuthenticatedClient(senior)
    await gmail.users.messages.modify({
      userId: 'me',
      id: gmailMessageId,
      requestBody: {
        removeLabelIds: ['UNREAD'],
      },
    })
  }

  async revokeAccess(senior: Senior): Promise<void> {
    if (senior.oauthTokenEncrypted) {
      const accessToken = Encryption.decrypt(senior.oauthTokenEncrypted) as string
      try {
        await this.oauth2Client.revokeToken(accessToken)
      } catch (error) {
        // Token may already be revoked
      }
    }

    senior.oauthTokenEncrypted = null
    senior.oauthRefreshTokenEncrypted = null
    senior.oauthExpiresAt = null
    senior.oauthStatus = 'revoked'
    await senior.save()
  }
}
