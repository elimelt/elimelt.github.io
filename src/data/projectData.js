

const projects = [
    {
        id: 1,
        name: 'Syntext', 
        techStack: 'Express, React, MySQL, Jest, Docker', 
        description: 
        (<>
        <p>
        A typing practice website for programmers 
        to practice typing Java syntax. I work as a 
        project manager and developer, leading a team
        of 6 other undergraduate students.</p>
        <p>
        Throughout this project, I took a deep dive into using React
        to make responsive designs with complex logic, as 
        well as MySQL and Express.js to design and implement our back end.
        In doing so, I learned about token based authentication,
        secure password storage, and got very comfortable working with MySQL
        as both a developer and a database administrator.  
        </p>

        <p>
        Additionally, I've gained extensive experience with
        Docker and Jest, and have set up unit and integration
        tests with containerized enviornments that correspond 1:1 
        with the services running in our production enviornment.
        This gives us the ability to run and test our site exactly as
        it will run in deployment, something that has helped me catch 
        numerous bugs before pushing to production. 
        </p>
        </>),
        githubURL: 'https://github.com/hcp-uw/syntext',
        demoURL: 'https://syntext.herokuapp.com/',
        demoGIF: require('./demo-gifs/syntext-demo.gif')
    },
    
    {
        id: 3,
        name: 'Crypto List', 
        techStack: 'Vue, Express', 
        description: 
        `This project was a weekend dive into Vue.js, as I wanted
        `, 
        githubURL: 'https://github.com/elimelt/CryptoList',
        demoURL:'https://elimelt.github.io/CryptoList/',
        demoGIF: require('./demo-gifs/crypto-list-demo.gif')
    },
    {
        id: 2,
        name: 'RecipeSearch', 
        techStack: 'Express, React', 
        description: 'A website that lets users search for recipes by an ingredient', 
        githubURL: 'https://github.com/elimelt/RecipeSearchProduction',
        demoURL:'https://elimelt.github.io/RecipeSearchProduction/',
        demoGIF: require('./demo-gifs/recipe-search-demo.gif')
    }
];

export default projects;