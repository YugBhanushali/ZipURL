//slice the url and make url of length 30 and add ... at the end

import { ToastPosition } from '@chakra-ui/react';
import isUrl from 'is-url';
import { customAlphabet, nanoid } from "nanoid";

export function sliceURL(url: string) {
    if (url.length > 30) {
        return url.slice(0, 30) + '...';
    }
    return url;
}

// const debounce = (func: (...args: any[]) => void) => {
//     let timer: NodeJS.Timeout;
//     return function (...args: any[]) {
//       const context = this;
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => {
//         timer = null;
//         func.apply(context, args);
//       }, 500);
//     };
//   };

// function debounce(func: (...args: any[]) => void, timeout = 300) {
//     let timer: NodeJS.Timeout;
//     return (...args: any[]) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         func.apply(this, args);
//       }, timeout);
//     };
//   }

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};



  
  
  const Charactors = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  export function generateRandomString(length: number) {  
    return String(customAlphabet(Charactors, length)());
  }

  export function isAlphaNumeric(str: string) {
    var pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(str);  // returns a boolean
  };
    


const UrlCheckerFun = (url: string) => {
    let obj = {
      isUrlCorrect: false,
      OuterColour: 'none',
    }
    if(url.length === 0) {
      // setOutlineCheck('none');
      obj.isUrlCorrect = false;
      obj.OuterColour = 'none';
      return obj; 
    }
    if (isUrl(url)) {
      if(new URL(url).hostname.split('.').length > 1 && new URL(url).hostname.split('.')[1].length > 0 && new URL(url).hostname !== 'zipurl.tech' ){
        // setOutlineCheck('none');
        obj.isUrlCorrect = true;
        obj.OuterColour = 'none';
        return obj;
      }
      else{
        // setOutlineCheck('4px solid red');
        obj.isUrlCorrect = false;
        obj.OuterColour = '4px solid red';
        return obj;
      }
    } else {
      // setOutlineCheck('4px solid red');
      obj.isUrlCorrect = false;
      obj.OuterColour = '4px solid red';
      return obj;
    }
}

type ToastType = "success" | "error" | "warning" | "info";


const Toaster = ({message,typeOf,positionOfToast="bottom",toast}:{message: string,typeOf:ToastType,positionOfToast:ToastPosition,toast:any}) => {

  toast({
    title: message,
    status: typeOf,
    duration: 3000,
    isClosable: true,
    position: positionOfToast,
  });

}

const UrlValidationForAnalytics = (url:string) => {
  if(url.length === 0) {
      // setUrlCheck(true);
      return true;
  }
  if (isUrl(url)) {            
      if(new URL(url).hostname === 'zipurl.tech' && new URL(url).protocol === 'https:' && new URL(url).pathname.split('/')[1].length > 0){
          // setUrlCheck(true);
          return true;
      }
      else{
          // setUrlCheck(false);
          return false;
      }
  }
  else{
      // setUrlCheck(false);
      return false;
  }
}



  export {debounce, UrlCheckerFun, Toaster, UrlValidationForAnalytics};