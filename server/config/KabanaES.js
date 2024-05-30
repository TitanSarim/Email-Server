const {Client} = require('@elastic/elasticsearch')
const fs = require('fs');
const path = require('path');

const caPath = path.resolve(__dirname, 'ca_1717089198529.crt');

const ElasticClient = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'V7ulOXHzp=sVK6gz+3xU',
    
    },
    tls: {
        ca: fs.readFileSync(caPath),
        rejectUnauthorized: true 
    }
})


const testConnectionAndCreateIndex = async () => {
    try {
        // Ping the Elasticsearch cluster
        const ping = await ElasticClient.ping();
        console.log('Elasticsearch is up:', ping);

        // Get cluster health
        const health = await ElasticClient.cluster.health();
        // console.log('Cluster health:', health);

        // Get cluster info
        const info = await ElasticClient.info();
        // console.log('Cluster info:', info);

        // const { body: indexExists } = await ElasticClient.indices.exists({ index: 'user' });
        // if (!indexExists) {
        //     const { body: createIndexResponse } = await ElasticClient.indices.create({
        //         index: 'user',
        //         body: {
        //             mappings: {
        //                 properties: {
        //                     username: { type: 'keyword' },
        //                     email: { type: 'keyword' },
        //                     password: { type: 'text' },
        //                     token: { type: 'text' },
        //                     createdAt: { type: 'date' },
        //                     updatedAt: { type: 'date' }
        //                 }
        //             }
        //         }
        //     });
        //     console.log('Index user created successfully',);
        // }

    } catch (error) {
        console.error('Elasticsearch connection error:', error);
    }
}


module.exports = {
    ElasticClient,
    testConnectionAndCreateIndex
}