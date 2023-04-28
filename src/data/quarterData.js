const quarters = [
  {
    quarterName: 'Winter Quarter 2023',
    date: 'February 2023',
    content: [
      {
        title: 'Classes',
        body: <></>
      },
      {
        title: 'Projects',
        body: <></>
      },
      {
        title: 'Goals',
        body: <></>
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
              developer, and have already begun learning a lot! Unfortunately,
              the project manager of my team had to take a break from the lab so
              I've been put in charge. So far, we've been able to solve a few
              major bugs and redeploy the site with the backend working,
              although this was a pretty stressful way to learn about CORS and
              AWS keys.
            </p>
          </>
        )
      }
    ]
  }
]

export default quarters
