const quarters = [
  {
    // update before finals are upon us
    quarterName: 'Spring Quarter 2023',
    date: 'June 2023',
    content: [
      {
        title: 'Classes',
        body: (
        <>
          <p>
            This quarter I took Data Structures and Parallelism (UW's fun twist on DSA),
            The Hardware Software Interface, and a career seminar on succeeding in the tech 
            industry. So far I've done a few large projects where I implemented various 
            data structures from the ground up (without using any classes in the java.util package). 
            In the coming weeks we will be covering graph algorithms, as well as parallelism/multithreading.
          </p>

          <p>
            Despite my wishes, I've also had to learn a fair bit of x86 Assembly, but luckily my growing 
            understanding of computer hardware and architecure has been a guiding light at the end of this 
            tunnel. This class (HSI) has really solidified my understanding of C. I can't imagine ever 
            completing any large projects without at least using C++, but it's nice to learn more about the
            perspective of programming from the hardware side of things. 
          </p>
        </>
        )
      },
      {
        title: 'Projects',
        body: (
        <>
          <p>
            We finally finished our MVP for Syntext, and have deployed our site! Now we are working on the 
            interesting parts of the backend which is super exciting. So far we've implemented user accounts
            and authentication, and are currently working on a spec for our leaderboard API. 
          </p>

          <p>
            Implementing a leaderboard has posed to be a very interesting systems design question. Although I doubt 
            we will ever have more than a few hundred people on the leaderboard, I still want to make the leaderboard
            highly scalable and efficient. I've done a lot of research into different storage solutions for real-time 
            updates, and am considering either maintaining a learboard in-memory with user-ids on the server, or using
            a redis sorted set to automatically update based on new POST requests to the server. At the end of the day 
            however, a big factor in this design desicion will be the price.
          </p>

          <p>
            Besides my work with Syntext, I have also been coding for an RSO here at UW called <a href="https://nexusatuw.com/">Nexus</a>. 
            I joined this group well after the MVP was finished, but I've found this has been good practice working on an already established
            codebase (something that is nessesary in industry). So far I've implemented a few features, such as email verification and an 
            application summary page, and have also been working on bug-fixes while waiting on more feedback/mockups from the design and UX teams. 
            Working in a group with a dedicated UX/design team is definitely a new experience for me, but I am liking the fact that I don't have 
            to come up with the style on my own, instead just trying to match whatever the Figma mock-ups look like.
          </p>
        </>
        )
      },
      {
        title: 'Goals',
        body: (
        <>
          <p>

          </p>

          <p>

          </p>

          <p>
            
          </p>
        </>
        )
      }
    ]
  },
  {
    quarterName: 'Winter Quarter 2023',
    date: 'February 2023',
    content: [
      {
        title: 'Classes',
        body: (
        <>
          <p>
            Winter 2023 I petitioned into a CS majors-only discrete math/logic class, and took a database 
            management systems class (MS SQL Server and Azure Cloud). I also just applied to my new major!
            So far, my databases class has been super rewarding, and I feel very comfortable with SQL now.
            I've already been able to apply much of what I've learned in SQL Server to my work with Syntext
            using MySQL. I prefer MySQL by far though.
          </p>
        </>
        )
      },
      {
        title: 'Projects',
        body: (
        <>
          <p>
            I'm still spending most of my free time working on Syntext, but have also done a few side projects 
            over the past couple weekends to learn about particular areas of frontend development. Most of the code  I write for 
            Syntext is in the backend, since our team is comprised of mainly frontend developers, but I've still had
            to oversee and architect much of our front end as well. Thus, I wanted practice both designing the codebase 
            of a UI from a high level, as well as getting hands on experience implementing a few front ends by myself.  
          </p>

          <p>
            Although pretty generic, the projects that we are working on in my DBSM class have taught me some very useful
            skills. I've gotten a lot of practice writing queries over very large datasets, and also got to work on a simple
            Java CLI program that manages users stored in an Azure database using JDBC. Throughout this project I learned a bunch 
            of interesting design patterns, including Builder and Model View Controller (granted the View was a simple CLI program).  
          </p>
        </>
        )
      },
      {
        title: 'Goals',
        body: (
        <>
          <p>
            It was definitely a goal of mine to find an intnernship for this Summer, and I succeeded! I am very excited to announce
            that I will be interning at <a href="StockCharts.com">StockCharts</a> this Summer as a backend Java developer!
          </p>

          <p>
            Besides this, I want to really up my skills using Docker, and have started using it as a full-stack development enviornment 
            for Syntext. There are quite a few configuration challenges that come along with Docker Compose, but after hooking 
            everything up manually I understand very graularlly how all of our services communicate and interact. I've also gotten WAY 
            better at debugging due to some erroneous errors I've had to solve. 
          </p>

          <p>
            Another goal of mine is to practice test driven development as much as possible. As the complexity of the projects I'm working 
            on continues to grow, I've found it more and more nessesary to test my code, and as a bonus, I save a lot of time by writing 
            tests up front. Typically, when I start a large project, I like to make a sort of spec for all of the functions, classes, endpoints
            etc. that I'm going to write, detailing all of the inputs, outputs, schemas and whathaveyou. I recently learned my first few testing 
            frameworks (JUnit for Java, Jest for JavaScript), and with the verbosity of these frameworks, the tests practically write themselves,
            or rather they are a spec in and of themselves. I'm hoping that this will boost my productivity, but am also just excited to become a 
            more diciplined and methodical software engineer.
          </p>
        </>
        )
      }
    ]
  },
  {
    quarterName: 'Winter Quarter 2023',
    date: 'February 2023',
    content: [
      {
        title: 'Classes',
        body: (
        <>
          <p>
            Winter 2023 I petitioned into a CS majors-only discrete math/logic class, and took a database 
            management systems class (MS SQL Server and Azure Cloud). I also just applied to my new major!
            So far, my databases class has been super rewarding, and I feel very comfortable with SQL now.
            I've already been able to apply much of what I've learned in SQL Server to my work with Syntext
            using MySQL. I prefer MySQL by far though.
          </p>
        </>
        )
      },
      {
        title: 'Projects',
        body: (
        <>
          <p>
            I'm still spending most of my free time working on Syntext, but have also done a few side projects 
            over the past couple weekends to learn about particular areas of frontend development. Most of the code  I write for 
            Syntext is in the backend, since our team is comprised of mainly frontend developers, but I've still had
            to oversee and architect much of our front end as well. Thus, I wanted practice both designing the codebase 
            of a UI from a high level, as well as getting hands on experience implementing a few front ends by myself.  
          </p>

          <p>
            Although pretty generic, the projects that we are working on in my DBSM class have taught me some very useful
            skills. I've gotten a lot of practice writing queries over very large datasets, and also got to work on a simple
            Java CLI program that manages users stored in an Azure database using JDBC. Throughout this project I learned a bunch 
            of interesting design patterns, including Builder and Model View Controller (granted the View was a simple CLI program).  
          </p>
        </>
        )
      },
      {
        title: 'Goals',
        body: (
        <>
          <p>
            It was definitely a goal of mine to find an intnernship for this Summer, and I succeeded! I am very excited to announce
            that I will be interning at <a href="StockCharts.com">StockCharts</a> this Summer as a backend Java developer!
          </p>

          <p>
            Besides this, I want to really up my skills using Docker, and have started using it as a full-stack development enviornment 
            for Syntext. There are quite a few configuration challenges that come along with Docker Compose, but after hooking 
            everything up manually I understand very graularlly how all of our services communicate and interact. I've also gotten WAY 
            better at debugging due to some erroneous errors I've had to solve. 
          </p>

          <p>
            Another goal of mine is to practice test driven development as much as possible. As the complexity of the projects I'm working 
            on continues to grow, I've found it more and more nessesary to test my code, and as a bonus, I save a lot of time by writing 
            tests up front. Typically, when I start a large project, I like to make a sort of spec for all of the functions, classes, endpoints
            etc. that I'm going to write, detailing all of the inputs, outputs, schemas and whathaveyou. I recently learned my first few testing 
            frameworks (JUnit for Java, Jest for JavaScript), and with the verbosity of these frameworks, the tests practically write themselves,
            or rather they are a spec in and of themselves. I'm hoping that this will boost my productivity, but am also just excited to become a 
            more diciplined and methodical software engineer.
          </p>
        </>
        )
      }
    ]
  },
  {
    quarterName: 'Fall Quarter 2022',
    date: 'December 2022',
    content: [
      {
        title: 'Classes',
        body: (
          <>
            <p>
              Autumn 2022 I took Applied Linear Algebra (with python), Computer
              Programming 2 (with Java), and Physics 2 Electricity and
              Magnitetism. Uncoincidentally, I also decided to change my major
              from Electrical and Computer Engineering to Computer Engineering.
            </p>
          </>
        )
      },
      {
        title: 'Projects',
        body: (
          <>
            <p>
              This quarter I joined Husky Coding Project, a club on campus where
              students form teams to complete a year-long web-development project.
              We decided to make a website for typing practice, but specifically 
              geared towards programming syntax (Syntext). This project will be what 
              I spend the bulk of my time outside of class working on this year.
            </p>

            <p>
              Applied Linear Algebra was by far the most rewarding class I've
              taken up to this point. We learned many foundational topics in
              machine learning, such as k-means clustering, singular value
              decomposition, model fitting/interpolation, and fitting
              data/creating models with least squares. Applications included
              projects where we implemented image compression, background
              removal of videos, voting prediction models, and principle
              component analysis to analyze large high-dimensional relations
              between datasets.
            </p>
          </>
        )
      },
      {
        title: 'Goals',
        body: (
          <>
            <p>
              I made it a goal of mine this quarter to shift my focus towards
              learning skills that will benefit be later in my career. Although
              I'm still trying to maintain my GPA, I want to concentrate less
              single-mindedly on school, opting to spend at least a few hours a
              week learning React and strengthening my Javascript skills.
            </p>

            <p>
              I joined the UW Sensors Energy and Automation Lab as a web
              developer during Autumn Quarter, and have already begun learning a lot! 
              Unfortunately, the project manager of my team had to take a break from the lab so
              I was put in charge. So far, we've been able to solve a few
              major bugs and redeploy the site with the backend working,
              although this was a pretty stressful way to learn about CORS and
              AWS keys. I am only planning on staying with the lab until the end of
              the year, but I am glad I was able to make an impact and learn so 
              much about software development, while also gaining leadership experience 
              during my time with SEAL UW.
            </p>
          </>
        )
      }
    ]
  }
]

export default quarters
