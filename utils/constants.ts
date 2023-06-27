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
        shortURL:"https://zipurl.vercel.app/google",
    },
    {
        longURL:"https://www.facebook.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/facebook",
    },
    {
        longURL:"https://www.youtube.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/youtube",
    },
    {
        longURL:"https://www.youtube.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/designYT",
    },
    {
        longURL:"https://www.youtube.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/codingYT",
    },
    {
        longURL:"https://www.instagram.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/instagram",
    },
    {
        longURL:"https://www.twitter.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/twitter",
    },
    {
        longURL:"https://www.linkedin.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/linkedin",
    },
    {
        longURL:"https://www.pinterest.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/pinterest",
    },
    {
        longURL:"https://www.linkedin.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/myprofile",
    },
    {
        longURL:"https://medium.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/medium",
    },
    {
        longURL:"https://www.quora.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/quora",
    },
    {
        longURL:"https://medium.com/../../...?....",
        shortURL:"https://zipurl.vercel.app/blogOnMarketing",
    },
]

let Production = true;

const URL_OF_WEBSITE =  Production ? "https://zipurl.tech/" : "http://localhost:3000/";

const HOSTNAME = Production ? "zipurl.tech" : "localhost:3000";

export { tagLineList, ZipURLExapmle, URL_OF_WEBSITE , HOSTNAME}