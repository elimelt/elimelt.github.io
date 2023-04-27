

const projects = [
    {
        id: 1,
        name: 'Syntext', 
        techStack: 'Express, React, MySQL', 
        description: 'A typing practice website for programmers to practice typing Java syntax',
        githubURL: 'https://github.com/hcp-uw/syntext',
        demoURL: 'https://syntext.herokuapp.com/',
        demoGIF: require('./demo-gifs/syntext-demo.gif')
    },
    
    {
        id: 3,
        name: 'Crypto List', 
        techStack: 'Vue, Express', 
        description: 'FILLER Crypto List', 
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

module.exports = projects;