const projects = [
  {
    id: 1,
    name: "Syntext",
    techStack: "Express, React, MySQL, Jest, Docker",
    description: (
      <>
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
      </>
    ),
    githubURL: "https://github.com/hcp-uw/syntext",
    demoURL: "https://syntext.herokuapp.com/",
    demoGIF: require("./demo-gifs/syntext-demo.gif"),
  },

  {
    id: 3,
    name: "Crypto List",
    techStack: "Vue, Express",
    description: (
      <>
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
      </>
    ),
    githubURL: "https://github.com/elimelt/CryptoList",
    demoURL: "https://elimelt.github.io/CryptoList/",
    demoGIF: require("./demo-gifs/crypto-list-demo.gif"),
  },
  {
    id: 2,
    name: "RecipeSearch",
    techStack: "Express, React",
    description: (
      <>
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
      </>
    ),
    githubURL: "https://github.com/elimelt/RecipeSearchProduction",
    demoURL: "https://elimelt.github.io/RecipeSearchProduction/",
    demoGIF: require("./demo-gifs/recipe-search-demo.gif"),
  },
];

export default projects;
