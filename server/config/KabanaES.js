const {Client} = require('@elastic/elasticsearch')
const fs = require('fs');
const path = require('path');

const caPath = path.resolve(__dirname, 'ca_1717089198529.crt');

const ElasticClient = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'eGBhQhOMvO5In8=FW3Xa',
    
    },
    tls: {
        ca: fs.readFileSync(caPath),
        rejectUnauthorized: true 
    }
})


const testConnectionAndCreateIndex = async () => {
    try {
        const ping = await ElasticClient.ping();
        console.log('Elasticsearch is up:', ping);

        // const health = await ElasticClient.cluster.health();
        // console.log('Cluster health:', health);

        // const info = await ElasticClient.info();
        // console.log('Cluster info:', info);

    } catch (error) {
        console.error('Elasticsearch connection error:', error);
    }
}


module.exports = {
    ElasticClient,
    testConnectionAndCreateIndex
}