import { Controller, Get, Query, Response, Route, Tags } from 'tsoa'

/** Subset of CoinGecko's /coins/markets entries that the dashboard needs. */
export interface CoinMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number | null
  total_volume: number
  price_change_percentage_24h: number | null
  last_updated: string
}

export interface ErrorResponse {
  message: string
}

@Route('coins')
@Tags('Coins')
export class CoinsController extends Controller {
  /**
   * Market data for the top coins by market cap. Proxies CoinGecko so the API
   * key stays server-side.
   *
   * @param vsCurrency Currency to price against, e.g. "usd".
   * @param order Sort order, e.g. "market_cap_desc" or "volume_desc".
   * @param perPage Results per page. CoinGecko caps this at 250.
   * @param page 1-based page number.
   */
  @Get('markets')
  @Response<ErrorResponse>(502, 'CoinGecko request failed')
  public async getMarkets(
    @Query('vs_currency') vsCurrency = 'usd',
    @Query('order') order = 'market_cap_desc',
    @Query('per_page') perPage = 20,
    @Query('page') page = 1,
  ): Promise<CoinMarket[]> {
    // Read per request rather than at module load so the values stay in step
    // with the environment the process is actually running in. `||` rather than
    // `??` because an unset GitHub variable arrives as an empty string.
    const baseUrl = (
      process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3'
    ).replace(/\/+$/, '')
    const apiKey = process.env.COINGECKO_API_KEY

    const url = new URL(`${baseUrl}/coins/markets`)
    url.searchParams.set('vs_currency', vsCurrency)
    url.searchParams.set('order', order)
    url.searchParams.set('per_page', String(perPage))
    url.searchParams.set('page', String(page))

    const response = await fetch(url, {
      // Demo keys use this header; Pro keys use x-cg-pro-api-key. Without a key
      // the public tier still answers, just at a lower rate limit.
      headers: apiKey ? { 'x-cg-demo-api-key': apiKey } : {},
    })

    if (!response.ok) {
      const error = new Error(
        `CoinGecko responded ${response.status}`,
      ) as Error & { status?: number }
      error.status = 502
      throw error
    }

    return (await response.json()) as CoinMarket[]
  }
}
