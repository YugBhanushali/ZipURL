//slice the url and make url of length 30 and add ... at the end

export function sliceURL(url: string) {
    if (url.length > 30) {
        return url.slice(0, 30) + '...';
    }
    return url;
}