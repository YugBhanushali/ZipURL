/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "localhost",
            "localhost:3000",
            "github.com",
            "githubusercontent.com",
            "avatars.githubusercontent.com",
            "avatars0.githubusercontent.com",
            "www.google.com",
            "youtube.com",
            "medium.com",
            "wikimedia.org",
            "commons.wikimedia.org",
            "avatar.vercel.sh",
            "faisalman.github.io",
            "avatars.dicebear.com",
            "res.cloudinary.com",
            "pbs.twimg.com",
            "d2vwwcvoksz7ty.cloudfront.net",
            "lh3.googleusercontent.com",
            "media.cleanshot.cloud",
            "localhost.in",
            "supabase.com",
        ],
    },
}

module.exports = nextConfig
