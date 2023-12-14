
const nextConfig = {
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
}

module.exports = nextConfig

// https://cuddlesstorage.s3.us-east-2.amazonaws.com/cat-owner.jpg