const projects = [
  {
    name: 'Meet Together',
    techStack: 'React, Google Forms API',
    description: (
      <div className='content'>
        <p>
          A web page that reccommends groupings of people based on their
          responses to a Google Form. Users can rank the importance/priority of
          each question in the grouping algorithm, which will then reccommend
          groupings based on the user's preferences.
        </p>

        <p>
          This project uses the Google Forms API to pull responses from a Google
          Form, and then vectorizes the responses to find the most similar
          groupings of people. I was responsible for designing the
          reccomendation algorithm and integrating it into the React frontend.
        </p>

        <p>
          Once all the responses are converted to numerical data, we create a
          matrix corresponding to all the responses for that question. We then
          use K-means clustering to group the responses into clusters based on
          each individual question. Then, a heuristic greedy approximation
          algorithm is used to find the optimal grouping of people based on the
          assigned weights.
        </p>

        <p>
          Read more about the algorithm in my "What I've been up to" December
          2023 entry!
        </p>
      </div>
    ),
    githubURL: 'https://github.com/elimelt/meet-together',
    demoGIF: require('./demo-gifs/meet-together-demo.gif')
  },
  {
    name: 'Syntext',
    techStack: 'Express, React, MySQL, Jest, Docker',
    description: (
      <div className='content'>
        <p>
          A typing practice website for programmers to practice typing Java
          syntax. I work as a project manager and developer, leading a team of 6
          other undergraduate students.
        </p>
        <p>
          Throughout this project, I took a deep dive into using React to make
          responsive designs with complex logic, as well as MySQL and Express.js
          to design and implement our back end. In doing so, I learned about
          token based authentication, secure password storage, and got very
          comfortable working with MySQL as both a developer and a database
          administrator.
        </p>

        <p>
          Additionally, I've gained extensive experience with Docker and Jest,
          and have set up unit and integration tests with containerized
          enviornments that correspond 1:1 with the services running in our
          production enviornment. This gives us the ability to run and test our
          site exactly as it will run in deployment, something that has helped
          me catch numerous bugs before pushing to production.
        </p>
      </div>
    ),
    githubURL: 'https://github.com/hcp-uw/syntext',
    demoURL: 'https://syntext.herokuapp.com/',
    demoGIF: require('./demo-gifs/syntext-demo.gif')
  },

  {
    name: 'hotls',
    techStack: 'python',
    description: (
      <div className='content'>
        <p>
          A simple CLI utility that parses a git repository's history and
          returns a ranked list of the hottest files in the repository.
        </p>

        <p>
          hotls was a script that I wrote as a way to gain insight into large
          open source projects. It was always interesting to me to see where all
          the action was happening in a project, and I wanted to see if I could
          automate the process of searching through commits to narrow down the
          most active files in a repository.
        </p>
      </div>
    ),
    githubURL: 'https://github.com/elimelt/hotls',
    demoGIF: require('./demo-gifs/hotls-demo.gif')
  },
  {
    name: 'Multithreaded Game of Life',
    techStack: 'Java',
    description: (
      <div className='content'>
        <p>
          A multithreaded implementation of Conway's Game of Life, a cellular
          automaton that simulates the life and death of cells based on a set of
          rules.
        </p>

        <p>
          This was just a fun project to see how fast I could get the game of
          life to run. I was able to achieve a pretty decent speedup by
          rendering the game in parallel. I also implemented a few different
          rulesets to see how they would affect the simulation.
        </p>
      </div>
    ),
    githubURL: 'https://github.com/elimelt/multithreading-is-life',
    demoGIF: require('./demo-gifs/life-demo.gif')
  },
  {
    name: 'Crypto List',
    techStack: 'Vue, Express',
    description: (
      <div className='content'>
        <p>
          CryptoList makes use of the CoinCap API to pull real time price data
          on various crypto currencies, allowing users to search and filter the
          data with a responsive UI featuring both a light and dark mode.
        </p>

        <p>
          CryptoList was a weekend long project that I undertook to familliarize
          myself with another popular frontend framework, Vue.js. I found this
          alternative approach to front end development a challenging but
          rewarding experience to have under my belt, and after having completed
          this project, I feel confident in my ability to pick up new
          technologies/frameworks when needed.
        </p>

        <p>
          I don't care about crypto currencies at all, but this project seemed
          like a great way to learn Vue.js without having to register for an API
          token. I highly reccomend CoinCap's API if you are ever looking for an
          API to experiment with!
        </p>
      </div>
    ),
    githubURL: 'https://github.com/elimelt/CryptoList',
    demoURL: 'https://elimelt.github.io/CryptoList/',
    demoGIF: require('./demo-gifs/crypto-list-demo.gif')
  },
  {
    name: 'RecipeSearch',
    techStack: 'Express, React',
    description: (
      <div className='content'>
        <p>
          RecipeSearch lets users search for a particular ingredient, which then
          displays recipes that you can use it in. I was able to achieve this
          through TheFreeMealDB's API, although the limitations of their free
          version make the reccomendation a little limited.
        </p>

        <p>
          Recipe search was my first introduction to React.js, and I learned a
          LOT finishing this project. One of my main goals in completing this
          project was to focus on making the design and layout responsive to
          mobile layouts, and I achieved this through a mixture of Bootstrap CSS
          classes, flexbox, and CSS media queries.
        </p>

        <p>
          Not only did I gain a basic understanding of React and Express through
          this project, but I was able to deploy my website to the internet!
          After struggling with CSS for hours, I was VERY pleasently surprised
          with how easy Heroku made deploying this website.
        </p>

        <p>
          Since I am hosting a proxy server to allow CORS for this site, there
          is a 30 second spin up period after 30 minutes of inactivity for my
          API. This is by virtue of cutting costs, but is in no way
          representative of my skills as a developer.
        </p>
      </div>
    ),
    githubURL: 'https://github.com/elimelt/RecipeSearchProduction',
    demoURL: 'https://elimelt.github.io/RecipeSearchProduction/',
    demoGIF: require('./demo-gifs/recipe-search-demo.gif')
  }
].map((project, i) => {
  return { ...project, id: i }
})

export default projects
