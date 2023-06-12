
// i want to store url and short url in local storage in array of objects

export function getURLs() {
    if (typeof window !== 'undefined') {
        const storedData = window.localStorage.getItem('myArray');
        return storedData ? JSON.parse(storedData) : [];
      }
    return [];
}

export function setURLs(url: string, short_url: string) {
    if (typeof window !== 'undefined') {
        const storedData = window.localStorage.getItem('myArray');
        const data = storedData ? JSON.parse(storedData) : [];
        data.push({url, short_url});
        window.localStorage.setItem('myArray', JSON.stringify(data));
    }
}

//remove a object taking args as shorturl from the myArray

export function removeURL(short_url: string) {
    if (typeof window !== 'undefined') {
        const storedData = window.localStorage.getItem('myArray');
        const data = storedData ? JSON.parse(storedData) : [];
        const newData = data.filter((item: any) => item.short_url !== short_url);
        window.localStorage.setItem('myArray', JSON.stringify(newData));
    }
}