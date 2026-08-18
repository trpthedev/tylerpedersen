import { Controller, Get, Route, Tags } from 'tsoa'

export interface HealthResponse {
  status: string
  /** Seconds since the process started. */
  uptime: number
  timestamp: string
}

@Route('health')
@Tags('Health')
export class HealthController extends Controller {
  /** Liveness/readiness probe target. */
  @Get()
  public async getHealth(): Promise<HealthResponse> {
    return {
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    }
  }
}
