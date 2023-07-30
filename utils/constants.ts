const tagLineList = [
    "Shorten, Customize, and Share Your Links Effortlessly",
    "Experience Lightning-Fast URL Shortening with ZipURL",
    "Maximize Your Online Presence with Compact, Memorable Links",
    "Customize Your Shortened URLs for Brand Consistency and Recognition",
    "Track and Analyze the Performance of Your Shortened Links in Real Time",
    "Enhance User Experience with Neat and Concise URLs",
    "Secure and Reliable Link Shortening for Peace of Mind",
    "Boost Your Social Media Engagement with Compact and Shareable Links",
    "Efficiently Manage and Organize Your Shortened URLs",
    "Unlock the Potential of Short Links for Marketing and Campaigns"
];

const ZipURLExapmle = [
    {
        longURL:"https://www.google.com/../../...?....",
        shortURL:"https://zipurl.tech/google",
    },
    {
        longURL:"https://www.facebook.com/../../...?....",
        shortURL:"https://zipurl.tech/facebook",
    },
    {
        longURL:"https://www.youtube.com/../../...?....",
        shortURL:"https://zipurl.tech/youtube",
    },
    {
        longURL:"https://www.youtube.com/../../...?....",
        shortURL:"https://zipurl.tech/designYT",
    },
    {
        longURL:"https://www.youtube.com/../../...?....",
        shortURL:"https://zipurl.tech/codingYT",
    },
    {
        longURL:"https://www.instagram.com/../../...?....",
        shortURL:"https://zipurl.tech/instagram",
    },
    {
        longURL:"https://www.twitter.com/../../...?....",
        shortURL:"https://zipurl.tech/twitter",
    },
    {
        longURL:"https://www.linkedin.com/../../...?....",
        shortURL:"https://zipurl.tech/linkedin",
    },
    {
        longURL:"https://www.pinterest.com/../../...?....",
        shortURL:"https://zipurl.tech/pinterest",
    },
    {
        longURL:"https://www.linkedin.com/../../...?....",
        shortURL:"https://zipurl.tech/myprofile",
    },
    {
        longURL:"https://medium.com/../../...?....",
        shortURL:"https://zipurl.tech/medium",
    },
    {
        longURL:"https://www.quora.com/../../...?....",
        shortURL:"https://zipurl.tech/quora",
    },
    {
        longURL:"https://medium.com/../../...?....",
        shortURL:"https://zipurl.tech/blogOnMarketing",
    },
]

let Production = true;

const URL_OF_WEBSITE =  Production ? "https://zipurl.vercel.app/" : "http://localhost:3000/";

const HOSTNAME = Production ? "zipurl.vercel.app" : "localhost:3000";

const SHORT_WEBSITE_URL = Production ? "https://zipurl.vercel.app/" : "http://localhost:3000/";

export { tagLineList, ZipURLExapmle, URL_OF_WEBSITE , HOSTNAME , SHORT_WEBSITE_URL}