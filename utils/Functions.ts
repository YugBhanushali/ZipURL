//slice the url and make url of length 30 and add ... at the end

export function sliceURL(url: string) {
    if (url.length > 30) {
        return url.slice(0, 30) + '...';
    }
    return url;
}

const debounce = (func: (...args: any[]) => void) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

export {debounce};