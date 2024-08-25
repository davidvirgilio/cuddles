const path = require('path')

module.exports =  {
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname: 's3.eu-west-3.amazonaws.com',
                port: '',
                pathname:'/cuddles.storage/**',
            },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src')],
    },

}


// https://cuddlesstorage.s3.us-east-2.amazonaws.com/cat-owner.jpg