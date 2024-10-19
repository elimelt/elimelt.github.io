import styled from 'styled-components';
// import image from '../../portrait.JPG';
import GitHubCalendar from 'react-github-calendar';

// Styled components
const Container = styled.div`
  margin: 0 auto;
  max-width: 90%;
  line-height: 1.8;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  line-height: 1.6;
`;


const Text = styled.div`
  max-width: 600px;
  font-size: 1.1rem;
  text-align: justify;
  font-weight: 800;
  margin-bottom: 20px;
`;

const GitHubCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

// Components
const WelcomeMessage = () => (
  <Container>
    <Heading>Welcome to my personal website!</Heading>
    <Content>
      <Text>
        I'm a computer engineering student at UW Seattle, where I primarily focus on systems.
        Outside of my academics, I love using technology to enhance various student
        organizations at UW. This led me to becoming the president of
        the <a href="https://swecc.org">Software Enineering Career Club</a>,
        and a lead on <a href="https://hcp-uw.com">Husky Coding Project</a>'s technology team.
      </Text>

      <Text>
        Outside of my life at school, I've also enjoyed interning at various companies,
        including <a href="https://www.stockcharts.com">StockCharts</a>, <a href="https://doordash.com">DoorDash</a>,
        and most recently <a href="https://www.aws.amazon.com">Amazon Web Services</a>.
      </Text>

      <Text>
        It is slightly unlikely I'll end up updating this, but as of now (October 2024), I'm in my senior year of
        undergrad, and am planning on returning to DoorDash as an intern during Summer 2025, after which I'll
        be joining <a href="https://shv.com/">Sutter Hill Ventures</a> as a codepoint fellow, working at a late-stage observability startup
        called <a href="https://www.observeinc.com">Observe</a>, as well as on SHV's internal development team
        with early-stage startups/founders for six months each. During this time, I'll also be working towards my
        Master's in Computer Science and Engineering at UW as part of the Allen School's combined BS/MS program.
      </Text>

    </Content>
  </Container>
);

const GHCal = ({ username }) => (
  <GitHubCalendarContainer>
    <GitHubCalendar username={username} colorScheme="light" />
  </GitHubCalendarContainer>
);

const Home = () => {
  return (
    <>
      <WelcomeMessage />
      <GHCal username="elimelt" />
    </>
  );
};

export default Home;
