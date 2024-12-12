import React, { useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import GitHubCalendar from 'react-github-calendar'
const GLIDER = [
  [0, 4],
  [0, 5],
  [1, 4],
  [1, 5],
  [10, 4],
  [10, 5],
  [10, 6],
  [11, 3],
  [11, 7],
  [12, 2],
  [12, 8],
  [13, 2],
  [13, 8],
  [14, 5],
  [15, 3],
  [15, 7],
  [16, 4],
  [16, 5],
  [16, 6],
  [17, 5],
  [20, 2],
  [20, 3],
  [20, 4],
  [21, 2],
  [21, 3],
  [21, 4],
  [22, 1],
  [22, 5],
  [24, 0],
  [24, 1],
  [24, 5],
  [24, 6],
  [34, 2],
  [34, 3],
  [35, 2],
  [35, 3]
]

const FRAME_RATE = 100
const CELL_SIZE = 25
const CELL_COLORS = [
  'rgba(66, 135, 245, 0.2)',
  'rgba(245, 66, 135, 0.2)',
  'rgba(135, 245, 66, 0.2)'
]

const PageWrapper = styled.div`
  overflow: scroll;
  width: 100%;
  position: relative;
  padding: 20px 0;
  z-index: -10;
`

const CanvasBackground = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -9999;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 90%;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(8px);
  padding: 20px;
  border-radius: 8px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
  align-items: center;
  margin-top: 20px;
  line-height: 1.6;
`

const Text = styled.p`
  max-width: 600px;
  font-size: 1.1rem;
  text-align: justify;
  font-weight: bold;
  margin-bottom: 20px;

  a {
    color: #4287f5;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const GitHubCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  z-index: 2;
  position: relative;
`
const WelcomeMessage = () => (
  <Container>
    <Content>
      <Text>
        I'm a computer engineering student at UW Seattle, where I primarily
        focus on systems. Outside of my academics, I love using technology to
        enhance various student organizations at UW. This led me to becoming the
        president of the{' '}
        <a href='https://swecc.org'>Software Engineering Career Club</a>, and a
        lead on <a href='https://hcp-uw.com'>Husky Coding Project</a>'s
        technology team.
      </Text>

      <Text>
        Outside of my life at school, I've also enjoyed interning at various
        companies, including{' '}
        <a href='https://www.stockcharts.com'>StockCharts</a>,{' '}
        <a href='https://doordash.com'>DoorDash</a>, and most recently{' '}
        <a href='https://www.aws.amazon.com'>Amazon Web Services</a>.
      </Text>

      <Text>
        It is slightly unlikely I'll end up updating this, but as of now
        (October 2024), I'm in my senior year of undergrad, and am planning on
        returning to DoorDash as an intern during Summer 2025, after which I'll
        be joining <a href='https://shv.com/'>Sutter Hill Ventures</a> as a
        codepoint fellow, working at a late-stage observability startup called{' '}
        <a href='https://www.observeinc.com'>Observe</a>, as well as on SHV's
        internal development team with early-stage startups/founders for six
        months each. During this time, I'll also be working towards my Master's
        in Computer Science and Engineering at UW as part of the Allen School's
        combined BS/MS program.
      </Text>
    </Content>
  </Container>
)

const GHCal = ({ username }) => (
  <GitHubCalendarContainer>
    <GitHubCalendar username={username} colorScheme='light' />
  </GitHubCalendarContainer>
)

const Home = () => {
  const canvasRef = useRef(null)
  const gridRef = useRef(null)
  const animationFrameRef = useRef(null)
  const lastUpdateRef = useRef(0)

  const initializeGrid = useCallback((width, height) => {
    const cols = Math.floor(width / CELL_SIZE)
    const rows = Math.floor(height / CELL_SIZE)
    const grid = Array(rows)
      .fill()
      .map(() =>
        Array(cols)
          .fill()
          .map(() => ({
            alive: false,
            color: CELL_COLORS[Math.floor(Math.random() * CELL_COLORS.length)]
          }))
      )

    const createGliderGun = (startX, startY, direction = 1) => {
      GLIDER.forEach(([y, x]) => {
        const newY = startY + y
        const newX = direction === 1 ? startX + x : startX - x
        if (newY >= 0 && newY < rows && newX >= 0 && newX < cols) {
          grid[newY][newX] = {
            alive: true,
            color: CELL_COLORS[Math.floor(Math.random() * CELL_COLORS.length)]
          }
        }
      })
    }

    const offset = Math.floor(Math.random() * 20) - 10
    createGliderGun(Math.floor(cols * 0.2), Math.floor(rows * 0.4) + offset, 1)
    createGliderGun(Math.floor(cols * 0.8), Math.floor(rows * 0.6) - offset, -1)

    return grid
  }, [])

  const nextGeneration = useCallback(grid => {
    if (!grid?.length) return []
    const rows = grid.length
    const cols = grid[0].length

    return grid.map((row, i) =>
      row.map((cell, j) => {
        let neighbors = 0
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue
            const ni = (i + di + rows) % rows
            const nj = (j + dj + cols) % cols
            if (grid[ni][nj].alive) neighbors++
          }
        }

        const shouldMutate = Math.random() < 0.001
        return {
          alive: cell.alive
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3,
          color: shouldMutate
            ? CELL_COLORS[Math.floor(Math.random() * CELL_COLORS.length)]
            : cell.color
        }
      })
    )
  }, [])

  const drawGrid = useCallback((ctx, grid) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.alive) {
          const x = j * CELL_SIZE
          const y = i * CELL_SIZE

          const gradient = ctx.createRadialGradient(
            x + CELL_SIZE / 2,
            y + CELL_SIZE / 2,
            0,
            x + CELL_SIZE / 2,
            y + CELL_SIZE / 2,
            CELL_SIZE / 2
          )

          gradient.addColorStop(0, cell.color)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.roundRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1, 4)
          ctx.fill()
        }
      })
    })
  }, [])

  const updateGame = useCallback(
    timestamp => {
      if (!gridRef.current) return

      if (timestamp - lastUpdateRef.current >= FRAME_RATE) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        drawGrid(ctx, gridRef.current)
        gridRef.current = nextGeneration(gridRef.current)
        lastUpdateRef.current = timestamp
      }

      animationFrameRef.current = requestAnimationFrame(updateGame)
    },
    [drawGrid, nextGeneration]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gridRef.current = initializeGrid(canvas.width, canvas.height)
    }

    updateDimensions()
    animationFrameRef.current = requestAnimationFrame(updateGame)
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [initializeGrid, updateGame])

  return (
    <PageWrapper>
      <CanvasBackground ref={canvasRef} />
      <WelcomeMessage />
      <GHCal username='elimelt' />
    </PageWrapper>
  )
}

export default Home
