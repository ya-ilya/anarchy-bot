const {greenChat} = require('../index.js')
const fetch = require("node-fetch");

module.exports = {
    name: '2bqueue',

    async execute(username, args, json) {
        fetch('https://2b2t.io/api/queue?last=true')
            .then(res => res.json())
            .then(res1 => {
                fetch('https://2b2t.io/api/prioqueue?last=true')
                    .then(res => res.json())
                    .then(res2 => {
                        greenChat(`Queue: ${res1[0][1]}; Prio Queue ${res2[0][1]}`)
                    })
            })
    }
}