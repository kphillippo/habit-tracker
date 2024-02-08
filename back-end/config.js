var config = {
    production: {
        //url to be used in link generation
        url: 'www.habitConnect.com',
        //mongodb connection settings
        database: {
            host: 'cluster.rbzvfkr.mongodb.net',
            port: '27017',
            db:   'Habit_tracker'
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '3421'
        }
    }
};
module.exports = config;