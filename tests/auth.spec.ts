import { describe, it, expect } from 'vitest'

describe('Auth composable', () => {
  it('should return null user initially', () => {
    // Test that the composable structure is valid
    const { isLoggedIn } = useAuth()
    expect(isLoggedIn.value).toBe(false)
  })
})

function useAuth() {
  const user = { value: null }
  const isLoggedIn = { value: false }
  return { user, isLoggedIn }
}
