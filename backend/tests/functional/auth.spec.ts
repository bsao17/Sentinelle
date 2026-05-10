import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'

test.group('Auth', () => {
  test('register a new user', async ({ client }: { client: ApiClient }) => {
    const response = await client.post('/api/auth/register').json({
      email: 'test@sentinelle.app',
      password: 'password123',
      prenom: 'Test',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      user: { email: 'test@sentinelle.app' },
      token: response.body().token,
    })
  })

  test('reject duplicate email', async ({ client }: { client: ApiClient }) => {
    const response = await client.post('/api/auth/register').json({
      email: 'test@sentinelle.app',
      password: 'password123',
    })

    response.assertStatus(409)
  })

  test('login with valid credentials', async ({ client }: { client: ApiClient }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'test@sentinelle.app',
      password: 'password123',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      user: { email: 'test@sentinelle.app' },
      token: response.body().token,
    })
  })

  test('reject invalid credentials', async ({ client }: { client: ApiClient }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'test@sentinelle.app',
      password: 'wrongpassword',
    })

    response.assertStatus(401)
  })

  test('get authenticated user', async ({ client }: { client: ApiClient }) => {
    const login = await client.post('/api/auth/login').json({
      email: 'test@sentinelle.app',
      password: 'password123',
    })

    const response = await client
      .get('/api/auth/me')
      .bearerToken(login.body().token)

    response.assertStatus(200)
    response.assertBodyContains({ email: 'test@sentinelle.app' })
  })

  test('reject unauthenticated access', async ({ client }: { client: ApiClient }) => {
    const response = await client.get('/api/auth/me')

    response.assertStatus(401)
  })
})
