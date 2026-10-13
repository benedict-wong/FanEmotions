import blockedWords from '@/data/profanity_en.json'
import ReservedWords from '@/data/reserved_list.json'

interface ProfanityWord {
  id: string
  match: string
  tags: string[]
  severity: number
  exceptions?: string[]
}

function wildcardToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')

  return new RegExp(`^${escaped}$`, 'i')
}

export function isUsernameProfane(username: string): boolean {
  const parts = username.split(/[-_]+/)

  for (const word of blockedWords as ProfanityWord[]) {
    const regex = new RegExp(`^(${word.match})$`, 'i')

    for (const part of parts) {
      if (!regex.test(part)) {
        continue
      }

      const isException = word.exceptions?.some((exception) => wildcardToRegex(exception).test(part))

      if (!isException) {
        return true
      }
    }
  }

  return false
}

export function isUsernameReserved(username: string): boolean {
  return ReservedWords.includes(username)
}

export function getUsernameErrorMessage(existingProfile: boolean, username: string): string | null {
  if (existingProfile) {
    return 'This display name is already taken.'
  }

  if (isUsernameProfane(username)) {
    return 'This display name contains inappropriate language.'
  }

  if (isUsernameReserved(username)) {
    return 'This display name is reserved and cannot be used.'
  }

  return null
}
