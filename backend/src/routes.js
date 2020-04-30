const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.get("/", (req, res) => {
    return res.json({message: "Hello World!"});
})

routes.post("/devs", async (req, res) => {
    const { github_username, techs } = req.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
    let { name , avatar_url, bio } = apiResponse.data;

    if (name === null){
        name = apiResponse.data.login;
    }
    
    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray
    })

    return res.json(dev);
})

module.exports = routes;