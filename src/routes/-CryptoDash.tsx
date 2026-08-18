import { Link } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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

    fetch('/api/coins/markets?vs_currency=usd&per_page=10', {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`)
        return (await res.json()) as CoinMarket[]
      })
      .then((data) => {
        setCoins(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        // An abort is a deliberate cancel on unmount, not a failure to report.
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load coins')
        setLoading(false)
      })

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
          Top 10 by market cap · prices in USD
        </Typography>

        <Divider sx={{ mb: 2.5 }} />

        {loading && <Typography sx={{ color: 'text.secondary' }}>Loading…</Typography>}

        {error && (
          <Typography sx={{ color: 'error.main' }}>Could not load coins: {error}</Typography>
        )}

        {!loading && !error && (
          <Stack component="ul" spacing={1.5} sx={{ m: 0, p: 0, listStyle: 'none' }}>
            {coins.map((coin) => (
              <Stack
                key={coin.id}
                component="li"
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center' }}
              >
                <Box
                  component="img"
                  src={coin.image}
                  alt=""
                  loading="lazy"
                  sx={{ width: 28, height: 28, borderRadius: '50%' }}
                />
                <Typography sx={{ fontWeight: 600, flex: 1 }}>
                  {coin.name}{' '}
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    {coin.symbol.toUpperCase()}
                  </Box>
                </Typography>
                <Typography>{priceFormat.format(coin.current_price)}</Typography>
                <Typography
                  sx={{
                    minWidth: '4.5rem',
                    textAlign: 'right',
                    fontWeight: 600,
                    color:
                      (coin.price_change_percentage_24h ?? 0) >= 0
                        ? 'success.main'
                        : 'error.main',
                  }}
                >
                  {coin.price_change_percentage_24h?.toFixed(2) ?? '—'}%
                </Typography>
              </Stack>
            ))}
          </Stack>
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
