import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { pillLinkSx } from './theme'
import profileImage from './assets/profile.jpg'

type HealthState = 'checking' | 'success' | 'failure'

const healthColor: Record<HealthState, string> = {
  checking: 'text.disabled',
  success: 'success.main',
  failure: 'error.main',
}

const shellSx = { width: 'min(100%, 860px)', mx: 'auto', px: 3 } as const

const linkRowSx = { flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } } as const

function App() {
  const [health, setHealth] = useState<HealthState>('checking')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
      .then((res) => setHealth(res.ok ? 'success' : 'failure'))
      .catch(() => {
        if (!controller.signal.aborted) setHealth('failure')
      })

    return () => controller.abort()
  }, [])

  const techStack = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Terraform',
    'Kubernetes',
    'GitHub Actions',
    'Playwright',
  ]

  return (
    <Box
      sx={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="main"
        aria-label="Portfolio"
        sx={{ ...shellSx, pt: { xs: '30px', md: '48px' }, pb: 3 }}
      >
        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '140px 1fr' },
            gap: '28px',
            alignItems: 'center',
            mb: 3,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            component="img"
            src={profileImage}
            alt="Tyler Pedersen profile"
            loading="lazy"
            sx={{
              width: 140,
              height: 140,
              borderRadius: '24px',
              objectFit: 'cover',
              boxShadow: '0 18px 30px rgba(15, 23, 42, 0.22)',
              mx: { xs: 'auto', md: 0 },
            }}
          />
          <Box>
            <Typography
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontWeight: 700,
                fontSize: '0.7rem',
                color: 'text.disabled',
                mb: '12px',
              }}
            >
              Salt Lake City, Utah
            </Typography>
            <Typography variant="h1">Hi, I&apos;m Tyler!</Typography>
            <Typography
              sx={{
                mt: '12px',
                maxWidth: '60ch',
                color: 'text.secondary',
                mx: { xs: 'auto', md: 0 },
              }}
            >
              Full-stack web developer engineering production software in banking.
              I focus on reliable delivery, modern cloud infrastructure, and
              practical automation.
            </Typography>
          </Box>
        </Box>

        <Paper variant="outlined" component="section">
          <Typography variant="h2">Projects</Typography>
          <Stack direction="row" spacing={1.25} useFlexGap sx={linkRowSx}>
            <Button component={Link} to="/crypto" sx={pillLinkSx}>
              Crypto Dashboard
            </Button>
          </Stack>
        </Paper>

        <Paper variant="outlined" component="section">
          <Typography variant="h2">Tech Stack</Typography>
          <Stack
            component="ul"
            direction="row"
            spacing={1.25}
            useFlexGap
            aria-label="Tech stack list"
            sx={{ ...linkRowSx, m: 0, p: 0, listStyle: 'none' }}
          >
            {techStack.map((item) => (
              <Chip key={item} component="li" label={item} />
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" component="section">
          <Typography variant="h2">What I Do</Typography>
          <Stack component="ul" spacing={1} sx={{ m: 0, pl: '20px', color: 'text.secondary' }}>
            <Typography component="li">
              Build fullstack systems with React, TypeScript, Express, and
              PostgreSQL.
            </Typography>
            <Typography component="li">
              Ship infrastructure as code using Terraform with automated
              deployment workflows.
            </Typography>
            <Typography component="li">
              Improve release confidence with CI/CD hardening and end-to-end test
              automation.
            </Typography>
          </Stack>
        </Paper>

        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Paper variant="outlined" component="article">
            <Typography variant="h2">Currently Learning</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Going deeper on Kubernetes operations, Terraform patterns, and AI
              tooling for product engineering workflows.
            </Typography>
          </Paper>
          <Paper variant="outlined" component="article">
            <Typography variant="h2">Off the Clock</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Hiking, fishing, and getting outside whenever possible. Building
              software is the work, the mountains are the reset.
            </Typography>
          </Paper>
        </Box>

        <Paper variant="outlined" component="section">
          <Typography variant="h2">Reach Me</Typography>
          <Stack
            direction="row"
            spacing={1.25}
            useFlexGap
            role="list"
            aria-label="Contact links"
            sx={linkRowSx}
          >
            <Button
              role="listitem"
              component="a"
              href="https://trp.dev"
              target="_blank"
              rel="noreferrer"
              sx={pillLinkSx}
            >
              tylerpedersen.com
            </Button>
            <Button role="listitem" component="a" href="mailto:t@trp.dev" sx={pillLinkSx}>
              tyler@tylerpedersen.com
            </Button>
            <Button
              role="listitem"
              component="a"
              href="https://github.com/trpthedev"
              target="_blank"
              rel="noreferrer"
              sx={pillLinkSx}
            >
              GitHub
            </Button>
            <Button
              role="listitem"
              component="a"
              href="https://www.linkedin.com/in/traypedersen/"
              target="_blank"
              rel="noreferrer"
              sx={pillLinkSx}
            >
              LinkedIn
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Box
        component="footer"
        sx={{ ...shellSx, pt: '4px', pb: '36px', textAlign: { xs: 'center', md: 'left' } }}
      >
        <Typography sx={{ color: 'text.disabled', fontSize: '0.86rem' }}>
          © 2026 TRP · Salt Lake City, Utah
        </Typography>
        <Typography
          sx={{
            mt: '6px',
            fontSize: '0.86rem',
            fontWeight: 600,
            color: healthColor[health],
          }}
        >
          API health: {health === 'checking' ? 'checking…' : health}
        </Typography>
      </Box>
    </Box>
  )
}

export default App
