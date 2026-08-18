import { Link } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { pillLinkSx } from '../theme'
import { useEffect, useState } from 'react'

/** Mirrors the CoinMarket interface the api returns from /api/coins/markets. */
type CoinMarket = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap_rank: number | null
  price_change_percentage_24h: number | null
}

const priceFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export default function CryptoDash() {
  const [coins, setCoins] = useState<CoinMarket[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCoins() {
      try {
        const res = await fetch('/api/coins/markets?vs_currency=usd&per_page=20', {
          signal: controller.signal,
        })

        if (!res.ok) throw new Error(`Request failed with ${res.status}`)

        setCoins((await res.json()) as CoinMarket[])
      } catch (err: unknown) {
        // An abort is a deliberate cancel on unmount, not a failure to report.
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load coins')
      } finally {
        // finally still runs on abort, so don't touch state after unmount.
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadCoins()

    return () => controller.abort()
  }, [])

  return (
    <Box sx={{ width: 'min(100%, 860px)', mx: 'auto', px: 3, py: 6 }} component="main">
      <Paper variant="outlined" component="section">
        <Typography variant="h2">
          <RocketLaunchIcon fontSize="small" sx={{ mr: 1, verticalAlign: '-0.2em' }} />
          Crypto Dashboard
        </Typography>

        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 1.5 }}>
          Top 20 by market cap · prices in USD
        </Typography>

        <Divider sx={{ mb: 2.5 }} />

        {loading && <Typography sx={{ color: 'text.secondary' }}>Loading…</Typography>}

        {error && (
          <Typography sx={{ color: 'error.main' }}>Could not load coins: {error}</Typography>
        )}

        {!loading && !error && (
          <Box
            component="ul"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              m: 0,
              p: 0,
              listStyle: 'none',
            }}
          >
            {coins.map((coin) => (
              // mt/p are reset because the theme's MuiPaper `outlined` override
              // adds section-card spacing that a grid of cards doesn't want.
              <Card key={coin.id} component="li" variant="outlined" sx={{ mt: 0, p: 0 }}>
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: 'center', mb: 1.5 }}
                  >
                    <Box
                      component="img"
                      src={coin.image}
                      alt=""
                      loading="lazy"
                      sx={{ width: 36, height: 36, borderRadius: '50%' }}
                    />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
                        {coin.name}
                      </Typography>
                      <Typography sx={{ color: 'text.disabled', fontSize: '0.78rem' }}>
                        {coin.symbol.toUpperCase()} · #{coin.market_cap_rank ?? '—'}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ fontSize: '1.35rem', fontWeight: 700 }}>
                      {priceFormat.format(coin.current_price)}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color:
                          (coin.price_change_percentage_24h ?? 0) >= 0
                            ? 'success.main'
                            : 'error.main',
                      }}
                    >
                      {(coin.price_change_percentage_24h ?? 0) >= 0 ? '▲' : '▼'}{' '}
                      {Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Paper>

      <Paper variant="outlined" component="section">
        <Stack direction="row" spacing={1.25} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button component={Link} to="/" sx={pillLinkSx}>
            Back home
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
