"use client";

import TagLines from "@/components/TagLines";
import { use, useCallback, useEffect, useState } from "react";
import {
  ChakraProvider,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import InfoPopover from "@/components/InfoPopover";
import NameLoading from "@/components/NameLoading";
import {
  UrlCheckerFun,
  debounce,
  generateRandomString,
  Toaster,
  isAlphaNumeric,
} from "@/utils/Functions";
import Animation from "@/components/Animation";
import { getURLs, setURLs } from "@/utils/localStorage";
import { UrlContext } from "@/Context/UrlContext";
import AllLink from "@/components/AllLink";
import { HOSTNAME, URL_OF_WEBSITE } from "@/utils/constants";
import LinkLogo from "../public/assets/Link.svg";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [currentUrlData, setCurrentUrlData] = useState<urlData>();
  const [outlineCheck, setOutlineCheck] = useState("none");
  const [availableColour, setAvailableColour] = useState<string>("none");
  const [loading, setLoading] = useState<string>("none");
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [urlData, setUrlData] = useState<any>([]);
  const [isMobileView] = useMediaQuery("(max-width: 768px)");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setResultLoading(true);
    let url1: urlData = {
      url: `${longUrl}`,
      short_url: `${
        loading === "right"
          ? shortUrl === "" || shortUrl.length > 15
            ? generateRandomString(7)
            : shortUrl
          : generateRandomString(7)
      }`,
      created_at: new Date(),
      clicks: 0,
    };

    try {
      //the UrlCheckerFun is a function that checks if the url is valid or not
      if (UrlCheckerFun(longUrl).isUrlCorrect) {
        const res = await fetch(`${URL_OF_WEBSITE}api/url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url1.url,
            short_url: url1.short_url,
            created_at: url1.created_at,
            clicks: url1.clicks,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentUrlData(url1);
          setLongUrl("");
          setShortUrl("");
          setAvailableColour("none");
          setLoading("none");

          Toaster({
            message: "URL Zipped successfully",
            typeOf: "success",
            positionOfToast: "top",
            toast: toast,
          });

          // adding info to local storage
          setURLs(url1.url, url1.short_url);
          setResultLoading(false);
        } else {
          Toaster({
            message: "Please enter a valid URL",
            typeOf: "error",
            positionOfToast: "top",
            toast: toast,
          });
          setResultLoading(false);
        }
      } else {
        Toaster({
          message: "Please enter a valid URL",
          typeOf: "error",
          positionOfToast: "top",
          toast: toast,
        });
        setResultLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //how to check that the name contains only alphabets and numbers
  const checkShortUrlName = debounce((name: string) => {
    var pattern = /^[a-zA-Z0-9]+$/;
    if (name.length === 0) {
      setLoading("none");
    } else if (name.length > 15) {
      Toaster({
        message: "Short url should be less than 15 characters",
        typeOf: "error",
        positionOfToast: "top",
        toast: toast,
      });
      setLoading("wrong");
    } else if (!isAlphaNumeric(name)) {
      Toaster({
        message: "Short url should contain only alphabets and numbers",
        typeOf: "error",
        positionOfToast: "top",
        toast: toast,
      });
      setLoading("wrong");
    } else {
      setLoading("loading");
      try {
        fetch(`${URL_OF_WEBSITE}api/search?url=${name}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.available === false) {
              setLoading("wrong");
            } else {
              setLoading("right");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, 500);

  //use to make less api calls to check availability of short url
  const optimizedCheck = useCallback(checkShortUrlName, []);

  useEffect(() => {
    // if (firstRender) {
    //   toast({
    //     position: "top-right",
    //     title: "Update",
    //     description: (
    //       <div>
    //         <p>
    //         We have updated our domain name to{" "}
    //         <a
    //           href="https://zipurl.tech"
    //           className="underline"
    //         >
    //           zipurl.tech
    //         </a>{" "}
    //         {`from zipurl.vercel.app. If you have made any past links, don't worry.
    //         They are live and you can access them from the new domain name as well
    //         as from the old domain.`}
    //         </p>
    //       </div>
    //     ),
    //     status: "info",
    //     duration: 12000,
    //     isClosable: true,
    //   });
    //   setFirstRender(false);
    // }

    let tempData = getURLs().reverse();
    setUrlData(tempData);

    //the UrlCheckerFun is checking weather the url is valid or not and according to that it is setting the outline of the input field
    setOutlineCheck(UrlCheckerFun(longUrl).OuterColour);
  }, [longUrl, outlineCheck, shortUrl]);

  

  return (
    <ChakraProvider>
      <main className="mainpage flex min-h-screen flex-col items-center justify-between pt-24">
        <div className="flex flex-col justify-center items-center">
          <TagLines />
          <form
            onSubmit={handleSubmit}
            className="sm:flex sm:flex-col sm:items-center flex flex-col"
          >
            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className={`w-[315px] h-[30px] sm:w-[499px] sm:h-[40px] text-[12px] sm:text-[16px] bg-white px-4 py-2 focus:outline-4 focus:outline-offset-[1px] ${
                outlineCheck === "none"
                  ? `focus:outline-[#007dfa99]`
                  : `focus:outline-red-500`
              } focus:outline border-[2px] sm:border-none `}
              style={{
                boxShadow: { isMobileView }
                  ? "0px 0.5px 8px -1px #000000"
                  : "0px 0.5px 8px -1px #000000",
                borderRadius: "10px",
              }}
              placeholder="https://github.com/Johndoe"
              required
            />

            <div className="mt-[30px] sm:w-[447px]  flex items-center">
              <div
                style={{
                  boxShadow: "0px 0.5px 8px -1px #000000",
                  borderRadius: "10px",
                }}
                className=" flex justify-start items-center h-[32px] sm:h-[42px] bg-white border-black border-[3px]"
              >
                <div className="h-full border-r-0 border-black bg-black px-3 py-2 flex justify-center items-center">
                  <p className="text-white text-[11px] sm:text-[16px]">
                    {HOSTNAME}/
                  </p>
                </div>
                <div className="h-full w-full flex justify-center items-center">
                  <InputGroup border={"none"}>
                    <Input
                      type="text"
                      placeholder="github"
                      value={shortUrl}
                      onChange={(e) => {
                        setShortUrl(e.target.value);
                        optimizedCheck(e.target.value);
                      }}
                      roundedLeft={"none"}
                      fontSize={isMobileView ? "10px" : "16px"}
                      h={isMobileView ? "30px" : "42px"}
                    />
                    <InputRightElement
                      display={"flex"}
                      alignContent={"center"}
                      h={"full"}
                    >
                      {NameLoading(loading)}
                    </InputRightElement>
                  </InputGroup>
                </div>
              </div>

              <InfoPopover />
            </div>

            <div className="mt-[30px] flex justify-center items-center">
              <button
                type="submit"
                className="text-black flex items-center  hover:text-white border-2 border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-[11px] sm:text-[16px] px-5 py-1.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-black dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                <Image
                  src={LinkLogo}
                  alt="zip it"
                  width={isMobileView ? 14 : 20}
                  height={isMobileView ? 14 : 20}
                  className="mr-2"
                />
                Zip it!
              </button>
            </div>
          </form>

          <UrlContext.Provider
            value={{ urlData, setUrlData, resultLoading, setResultLoading }}
          >
            <AllLink />
          </UrlContext.Provider>

          {/* animation component */}
          <Animation />
        </div>
        <Footer />
      </main>
    </ChakraProvider>
  );
}
