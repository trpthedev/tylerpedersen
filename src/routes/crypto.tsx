import { createFileRoute } from '@tanstack/react-router'
import CryptoDash from './-CryptoDash'

export const Route = createFileRoute('/crypto')({
  component: CryptoDash,
})
