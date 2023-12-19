const entries = [
  {
    name: "Fall Updates 2023",
    date: "December 2023",
    content: [
      {
        title: "Some Personal Updates",
        body: (
          <>

            <p>
              I recently participated in DubHacks 2023, where my team and I created a web page that reccommends groupings
              of people based on their responses to a Google Form. We used the Google Forms API to retrieve the responses
              to any existing form, and allowed the user to rank the importance of each question. We then used a pretty crazy
              algorithm to find the optimal groupings of people based on their responses to the form.
            </p>

            <p>
            To summarize it briefly, we created clusters of people, one for each question (using K-means). We then created a
            Matrix of the distances between each person in each cluster, and then used a greedy algorithm to find the most
            balanced groupings of people by sorting each row of people.
            </p>

            <p>
            First, we picked k individuals with the worst average rankings for each question relative to the other respondants as
            representatives for each group. Then, we continued to assign the remaining respondents to their best group representative.
            We referred to this as "balanced groupings" since it ensured that each person would be assigned to a group that they
            were at least semi-compatible with.
            </p>

            <p>
              Next, we selected the k "most popular" individuals as representatives, which were the people who had the highest average rankings
              for each question, assigning the remaining n - k people to their most compatible group representative. We referred to this as
              "selfish groupings", since it would lead to the less "popular" people being assigned to groups that they were barely compatible with.
            </p>

            <p>
              This was hardly an optimal algorithm, and almost certainly wasn't the best possible way to group people, but it did prove
              to be an interesting and effective heuristic.
            </p>

            <p>
              As an officer of a few clubs, I've been pretty busy this quarter. As a leader of
              HCP, I've been working on a few projects, including our <a href="https://hcp-uw.vercel.app/">new website</a>, and a
              couple project starter templates for members to use. Check out the docs and starter app I created for <a href="https://github.com/hcp-uw/react-fastapi-starter-template/tree/main">fastapi and react</a>!
            </p>

            <p>
              I'm also about to kick off a new technical mock interview program for SWECC in the next few weeks, which I'm super excited about.
              Over 50 people have already signed up, so I definitely have my work cut out for me.
            </p>
          </>
        )
      },
      {
        title: "Some School Updates",
        body: (
          <>
            <p>
              As we speak, I'm writing this update instead of studying for my CSE 312 midterm.
            </p>

            <p>
              This quarter, I'm taking CSE 312 (Foundations of Computing II) and CSE 333 (Systems Programming).
              I'm really enjoying both classes so far, but especially CSE 333. I've always been interested in
              low-level programming, and this class has been a great way to solidify my understanding of C++.
            </p>

            <p>
              So far in 333, we've implemented the C file I/O library using POSIX system calls, created a file
              indexer and search engine, and are currently working on implementing the IO portion of a simple
              HTTP server in C++.
            </p>

            <p>
              I <em>guess</em> I'm also enjoying CSE 312 (a probability and statistics class), but only because
              a few of our assignments involve coding in python. It is a pretty unfortunate situation when you
              are able to brute force a counting problem in python, but struggle to solve it using combinatorics.
              Still definitely a great class though. We've gotten to create a spam detector using Naive Bayes classification,
              and are currently working implementing a bloom filter for large dataset membership queries.
            </p>
          </>
        )
      }
    ]
  },

  {
    name: "Summer Updates 2023",
    date: "September 2023",
    content: [
      {
        title: "Projects",
        body: (
        <>
          <p>
            This summer, I worked as a backend software engineering intern at 
            &nbsp;<a href={'https://stockcharts.com'}>StockCharts.com</a>. StockCharts
            is a small but established company that provides data visualization tools
            and market analysis commentary for investors. Part of our buisness model
            inclues partnering with market experts to create content that gets published
            on our site worldwide. 
          </p>

          <p>
            Throughout the last month and a half of my internship, I was tasked with fully
            redesigning and architecting a new backend for our article publishing platform 
            (called Composer), with the stipulation that I needed to do it all using only
            Java HTTP Servlets and JDBC (C3P0 Driver). At StockCharts, we operate under the design philosophy of
            simplicity, and this means avoiding complex dependencies and frameworks at all costs.
            The previous version of Composer (composer-v2) was written using Jersy, a framework that
            is no longer used anywhere else in our codebase. Composer-v2 was also written several years
            ago, and was not designed with extensibility or maintainability in mind. 
            Although these constraints posed a challenge, I believe it pushed me to become a better
            developer and software architect, since there were no shortcuts available or frameworks
            to enforce good design practices. 
          </p>

          <p>
            The first step in this process was admitting that I needed to learn a lot more about 
            Java enterprise design patterns if I didn't want to create even more technical debt
            for another developer to replace later on. I started by trying to fully understand the 
            system requirements and use cases for Composer, and then I began to research different
            architectural patterns that would fit our needs. After consulting countless resources, including 
            &nbsp;<a href="https://www.martinfowler.com/books/eaa.html">
              Martin Fowler's Patters of Enterprise Application Architecture
            </a>, <a href="https://www.youtube.com/@GOTO-">
              countless talks given at various conferences  
            </a>, and many more blogs and articles. I eventually settled on a combination
            of MVC and Domain Driven Design, with my own implementation of various components that would usually 
            be provided by a framework (request routers, parameter/request body validation middleware, etc.).
          </p>

          <p>
            After I had a solid understanding of the architecture I wanted to implement, I began drafting a specification
            to propose to my manager. One of the most important aspects of the new system was the seperation of controller logic that handled 
            requests from the buisness logic that operated on domain entities. This was a major issue with the previous version
            of Composer, since the controller logic was tightly coupled with the buisness logic, and the controller was responsible
            for almost everything that happend in the system outside of executing SQL queries (which were handled by a Data Access layer).
            I also wanted to make sure that the new system was highly extensible, so I designed it to be modular, with each
            service being independent of the others. This meant that I could easily add new services to the system without having to
            worry about breaking existing functionality, while also being able to change existing services without fear of hidden dependencies.
          </p>

          <p>
            Additionally, a robust and extensible data model was a major priority of mine, since Composer-v2 
            had a very limited scope initially, but was added onto over time with many new edge cases and 
            unforseen requirements. This made adding new features a complex task that required a deep understanding
            of the codebase and implementation details of each and every controller that was downstream of the new feature.
            To solve this, I considered various storage solutions, including NoSQL databases like MongoDB or DynamoDB,
            but ultimately decided approaches like single-table design would make our schema too rigid in terms of the indexes
            we had at our desposal for maintaining query efficiency. Ultimately, I decided to use a relational database, since
            many of our existing services already used MySQL, and it allowed for the extensibility I was looking for.
          </p>

          <p>
            Next, I began modeling the domain entities and their relationships, while also documenting the high-level 
            interface of each service in my spec. After thorougly testing the current version of Composer to make sure I didn't
            miss any use-cases, I proposed my new design to my manager and was given the green light to begin development.
          </p>

          <p>
            There were countless challenges I faced during the implementation of this project, but I will highlight a few of the most
            interesting ones here. The first major challenge I faced was the fact that I had to implement a custom router for the
            system, since I was not using a framework like Spring or Jersy. I decided to use what was essentially a n-ary tree to store
            the path segments of each endpoint, as well as a request processor that found the corresponding endpoint for a given request.
            I made heavy use of the Command Handler Pattern, whereby each endpoint was represented by a Command object that contained
            the corresponding behavior needed to validate a request and call a service method. This allowed me to easily add new endpoints
            to the system without having to modify the router or request processor, since I could just add a new Command object to the
            system and it would be automatically registered with the router. This had the added benefit of creating a centralized 
            declarative API specification within the codebase where I registered each command.  
          </p>

          <p>
            Another major challenge throughout this project was remaining conformant with the original API functionality of Composer-v2.
            Since I wasn't replacing the frontend, I had to make sure that the new backend was able to handle all of the requests that
            the frontend was sending. This meant that I had to reengineer the API from the frontend, which was a very tedious process.
            I ended up spending a lot of time using CURL to send requests to the old backend and then comparing the responses to the new
            backend. There was a lot of deprecated and unused functionality in the old API, so I had to make sure that I was only
            reimplementing the endpoints that were actually needed, something that complicated the process even further.
          </p>

          <p>
            In order to break this process up into smaller chunks, I first created a detailed API specification for Composer-v2, and then
            began implementing endpoints one-by-one after getting a high-level overview of the system. I started with the endpoints that
            were most critical to the functionality of the frontend, and then worked my way down the list.
          </p>

          <p>
            In retrospect, I am very proud of the finished product, but think it would have been much easier to implement, not to mention
            more maintainable, if I had used a framework like SpringBoot. However, I am glad that I was able to learn so much about
            Java enterprise design patterns, and software architecture more generally.
          </p>

        
        </>
        )
      }
    ]
  },
  {
    // update before finals are upon us
    name: "Spring Updates 2023",
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
              all without using any classes in the java.util library. We also took
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

            <p>
              I recently won my first hackathon (DevMatch June 2023), and am super happy 
              I had the opportunity to participate. It was a little different from most
              hackathons I've partaken in, as we were tasked with fixing bugs in an existing 
              codebase. I ended up scoring the highest in terms of number of bugs fixed within
              the time limit.
            </p>

            <p>
              I also recently started my first SWE internship, and have really deepended my
              understanding of the Java web ecosystem. Although server-side development
              with core Java (Servlets API) has proven to be much slower, I've learned a ton due to the 
              lack of abstracted complexity compared to using a framework like SpringBoot.
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
    name: "Winter Updates 2023",
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
    name: "Fall Updates 2022",
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
].map((entry, index) => ({ ...entry, id: index }));

/* 


entry: {
  entryName: str
  date: str
  content: [{
    title: str
    body: jsx
  }]
}

ex:
{
  entryName: "test",
  date: "today",
  content: [
    {
      title: "Jingle Bells",
      body: (<p>Hello again, world</p>)
    }
  ]
}
*/

export default entries;
