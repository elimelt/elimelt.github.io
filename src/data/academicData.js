const quarters = [
  {
    // update before finals are upon us
    quarterName: "Spring Quarter 2023",
    date: "June 2023",
    content: [
      {
        title: "Classes",
        body: (
          <>
            <p>
              This quarter, I took Data Structures and Parallelism (which is
              UW's unique version of DSA), The Hardware Software Interface, and
              a career seminar on succeeding in the tech industry. In my Data
              Structures and Parallelism course, I completed several large
              projects where I implemented various data structures from scratch,
              all without using any classes in the java.util package. We also took
              a deep dive on parallelism and concurrency, as well as graph algorithms
              like Prim's, Kruskal's, Dijkstra's, and various others.
            </p>

            <p>
              Unfortunately, I also had to learn a fair bit of x86 Assembly, but
              my growing understanding of computer hardware and architecture has
              been a guiding light at the end of this tunnel. This class (HSI)
              has really solidified my understanding of C. Some of my favorite topics
              from this course was learning cache aware programming to optimize 
              array/matrix algorithms, and processes/scheduling and concurrency using
              fork/exec in C. The class also wrapped up with a comparison between the 
              implementation details of java and C, which was super interesting.
            </p>
          </>
        ),
      },
      {
        title: "Projects",
        body: (
          <>
            <p>
              We finally finished our MVP for Syntext, and have deployed our
              site! Now we are working on the interesting parts of the backend
              which is super exciting. So far we've implemented user accounts
              and authentication, and are currently working on a spec for our
              leaderboard API.
            </p>

            <p>
              Implementing a leaderboard has posed to be a very interesting
              systems design question. Although I doubt we will ever have more
              than a few hundred people on the leaderboard, I still want to make
              the leaderboard highly scalable and efficient. I've done a lot of
              research into different storage solutions for real-time updates,
              and am considering either maintaining a leaderboard in-memory with
              user-ids on the server, or using a Redis sorted set to
              automatically update based on new POST requests to the server. At
              the end of the day however, a big factor in this design decision
              will be the price.
            </p>

            <p>
              Besides my work with Syntext, I have also been coding for an RSO
              here at UW called Nexus. I joined this group well after the MVP
              was finished, but I've found this has been good practice working
              on an already established codebase (something that is necessary in
              industry). So far I've implemented a few features, such as email
              verification and an application summary page, and have also been
              working on bug-fixes while waiting on more feedback/mockups from
              the design and UX teams. Working in a group with a dedicated
              UX/design team is definitely a new experience for me, but I am
              liking the fact that I don't have to come up with the style on my
              own, instead just trying to match whatever the Figma mock-ups look
              like.
            </p>
          </>
        ),
      },
      {
        title: "Goals",
        body: (
          <>
            <p>
              This quarter, my goal was to enhance my knowledge of software
              design patterns. To achieve this, I have been studying "Effective
              Java" by Joshua Bloch. Through my readings, I have familiarized
              myself with various design patterns such as Singletons,
              Prototypes, Adapters, and Observers. Though I have yet to use
              these patterns in my code, I have found it fascinating to discover
              how popular frameworks like React and SpringBoot implement them.
              Among the patterns I've studied, the Observer pattern has
              intrigued me the most.
            </p>

            <p>
              In addition, I aimed to start contributing to open-source projects
              that I use. Recently, I made my first "real" contribution by
              addressing an issue in the node-mysql2 module's GitHub repository.
              As a frequent user of the module for Syntext, I noticed that it
              only implemented error codes from the latest release of MySQL 5.7,
              even though MySQL 8.0 had introduced many new error codes. To
              solve this, I modified the current error generator used in mysql2
              to scrape the new source code for MySQL 8.0. I then submitted a
              pull request with the updated error codes and integration tests to
              ensure the codes were thrown in the correct circumstances.
              Although I felt intimidated by working with such large codebases,
              submitting my first pull request to a repository utilized by
              thousands of developers was exhilarating.
            </p>
          </>
        ),
      },
    ],
  },
  {
    quarterName: "Winter Quarter 2023",
    date: "February 2023",
    content: [
      {
        title: "Classes",
        body: (
          <>
            <p>
              During Winter 2023, I was able to successfully petition into an
              exclusive discrete math/logic class for CS majors. Along with
              that, I enrolled in a database management systems course, where I
              learned about MS SQL Server and Azure Cloud. These classes have
              been extremely rewarding, and I have become very proficient in
              SQL. I've already been able to apply much of what I've learned in
              SQL Server to my work with Syntext, which utilizes MySQL. While
              both SQL Server and MySQL have their strengths, I personally
              prefer working with MySQL.
            </p>
          </>
        ),
      },
      {
        title: "Projects",
        body: (
          <>
            <p>
              In my free time, I'm dedicated to working on Syntext, but I've
              also been exploring various areas of frontend development through
              weekend side projects. Although Syntext's development primarily
              focuses on the backend, as our team is mostly comprised of
              frontend developers, I've been responsible for overseeing and
              architecting much of our frontend development. To improve my
              skills, I have been practicing designing UI codebases from a high
              level and implementing various front ends on my own.
            </p>

            <p>
              Despite the seemingly generic nature of the projects assigned in
              my DBSM class, I've gained valuable experience through writing
              queries for large datasets and working on a Java CLI program. This
              program manages users stored in an Azure database using JDBC, and
              through its development, I've learned interesting design patterns
              such as Builder and Model View Controller (though the View was a
              simple CLI program).
            </p>
          </>
        ),
      },
      {
        title: "Goals",
        body: (
          <>
            <p>
              I am pleased to announce that I have successfully secured an
              internship for this upcoming summer with{" "}
              <a href="StockCharts.com">StockCharts</a> as a backend Java
              developer, which was one of my top goals.
            </p>

            <p>
              In addition to this, I have been striving to enhance my skills
              using Docker, and have started utilizing it as a full-stack
              development environment for Syntext. Despite facing configuration
              challenges with Docker Compose, I have managed to establish a
              strong understanding of how our services communicate and interact,
              and have improved my debugging skills through the resolution of
              numerous errors.
            </p>

            <p>
              Another one of my objectives has been to implement test-driven
              development as frequently as possible. As the complexity of the
              projects I am working on continues to increase, it has become
              increasingly important for me to test my code, saving me time by
              composing tests upfront. Prior to embarking on a significant
              project, I like to create a specification that outlines all of the
              functions, classes, and endpoints that I will write, outlining all
              inputs, outputs, schemas, and other relevant details. Recently, I
              learned a few testing frameworks (JUnit for Java, Jest for
              JavaScript), and with their verbosity, writing tests has become
              simpler and quicker. I am eager to become a more methodical and
              disciplined software engineer, and believe that these efforts will
              improve my productivity.
            </p>
          </>
        ),
      },
    ],
  },
  {
    quarterName: "Fall Quarter 2022",
    date: "December 2022",
    content: [
      {
        title: "Classes",
        body: (
          <>
            <p>
              During Autumn 2022, I enrolled in Applied Linear Algebra (with
              Python), Computer Programming 2 (with Java), and Physics 2
              Electricity and Magnetism. Simultaneously, I made the decision to
              transition my major from Electrical and Computer Engineering to
              Computer Engineering.
            </p>
          </>
        ),
      },
      {
        title: "Projects",
        body: (
          <>
            <p>
              This quarter, I had the opportunity to engage in Husky Coding
              Project, a university club that facilitates collaborative
              team-based web development projects spanning an entire academic
              year. My team's project involved creating a website that provides
              typing practice, with a focus on programming syntax, under the
              name "Syntext." I have devoted a substantial portion of my time
              outside of class to work on this project over the course of the
              year.
            </p>

            <p>
              In addition, I found Applied Linear Algebra to be the most
              rewarding class I have taken thus far. Through this course, I
              acquired foundational knowledge in machine learning, including
              k-means clustering, singular value decomposition, model fitting
              and interpolation, as well as data fitting and model creation
              through the use of least squares. This course also featured
              practical projects, such as image compression, video background
              removal, voting prediction models, and principle component
              analysis for analyzing high-dimensional relations between
              datasets.
            </p>
          </>
        ),
      },
      {
        title: "Goals",
        body: (
          <>
            <p>
              Throughout this quarter, I have focused on developing skills that
              will enhance my future career prospects. While maintaining my GPA
              remains a priority, I have devoted a portion of my time each week
              to learning React and reinforcing my Javascript proficiency.
            </p>

            <p>
              In Autumn Quarter, I joined the UW Sensors Energy and Automation
              Lab as a web developer and have since gained valuable experience.
              Due to the departure of our project manager, I assumed a
              leadership role in our team. Although this proved to be a
              challenging experience, we successfully resolved several major
              bugs and redeployed the site with a working backend. Through this
              process, I acquired knowledge on topics such as CORS and AWS keys.
              My tenure with SEAL UW will conclude at the end of the year;
              however, I am grateful for the opportunity to have contributed and
              learned so much about software development and leadership.
            </p>
          </>
        ),
      },
    ],
  },
];

export default quarters;
