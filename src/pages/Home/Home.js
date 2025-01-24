import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 24px;
`

const Section = styled.div`
  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.41, 0, 0.3, 1) forwards;
  animation-delay: ${props => props.delay}s;
  margin-bottom: 40px;
`

const Paragraph = styled.div`
  margin-bottom: 80px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Text = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.25rem;
  line-height: 1.7;
  color: #e6e6e6;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin: 0;
`

const Link = styled.a`
  color: #4ff4f7;
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
  font-weight: 500;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: currentColor;
    left: 0;
    bottom: -1px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.41, 0, 0.3, 1);
  }

  &:hover {
    color: #7ff8fa;

    &::after {
      transform: scaleX(1);
    }
  }
`

const Home = () => {
  return (
    <Container>
      <Section delay={0.2}>
        <Paragraph>
          <Text>
            You can call me Elijah. I'm currently (as of Winter 2025) a Computer
            Engineering student at the{' '}
            <Link href='https://www.uw.edu/'>University of Washington</Link>,
            studying at the{' '}
            <Link href='https://www.cs.washington.edu/'>
              Allen School of Computer Science and Engineering
            </Link>
            . I have a wide range of interests, but two consistent passions of
            mine are (1) building reliable, highly available systems to solve
            real-world problems, and (2) experimentation.
          </Text>
        </Paragraph>
      </Section>
      <Section delay={0.4}>
        <Paragraph>
          <Text>
            (2) in particular is a really big part of my life. A core tenet of
            mine is to always apply what I learn; after all if I don't build it,
            how do I know I could have? This is pervasive in how I approach my
            formal education and self-learning. Therefore, my other main passion
            is to read and learn about everything I can, and then to build
            something with it as soon as possible. This leads to a lot of short
            lived mini projects, abandoned results from a weekend of
            benchmarking/profiling, and a lot of built up intuition for solving
            unfarmilliar problems quickly.
          </Text>
        </Paragraph>
      </Section>

      <Section delay={0.6}>
        <Paragraph>
          <Text>
            Outside of my academics, I love using software to enhance various
            student organizations at UW. This led me to becoming the president
            of the{' '}
            <Link href='https://swecc.org'>
              Software Engineering Career Club
            </Link>
            , and a lead on{' '}
            <Link href='https://hcp-uw.com'>Husky Coding Project</Link>'s
            technology team. Outside of my life at school, I've also enjoyed
            interning at various companies, including{' '}
            <Link href='https://www.stockcharts.com'>StockCharts</Link>,{' '}
            <Link href='https://doordash.com'>DoorDash</Link>, and most recently{' '}
            <Link href='https://www.aws.amazon.com'>Amazon Web Services</Link>.
          </Text>
        </Paragraph>
      </Section>

      <Section delay={0.8}>
        <Paragraph>
          <Text>
            I'll be joining{' '}
            <Link href='https://shv.com/'>Sutter Hill Ventures</Link> as a
            codepoint fellow, working at{' '}
            <Link href='https://www.observeinc.com'>Observe</Link> on the next
            big thing in observability, as well as on SHV's internal development
            team with early-stage startups/founders for six months each. During
            this time, I'll also be working towards my Master's in Computer
            Science and Engineering at UW as part of the Allen School's combined
            BS/MS program.
          </Text>
        </Paragraph>
      </Section>
    </Container>
  )
}

export default Home
