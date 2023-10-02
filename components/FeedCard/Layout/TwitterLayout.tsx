import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import {
  BiHash,
  BiHomeCircle,
  BiImageAlt,
  BiMoney,
  BiUser,
} from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import {CiLogin} from "react-icons/ci"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";


interface TwitterlayoutProps {
  children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems = useMemo(
    () => [
      {
        title: "",
        icon: <BsTwitter />,
        link: "/",
      },
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Login",
        icon: <CiLogin />,
        link: "/LoginPage",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More Options",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    [user?.id]
  );

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["curent-user"]);
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-18">
        <div className="col-span-3  sm:col-span-3  flex sm:justify-end lg:justify-end md:justify-end justify-center pr-4 mt-[-1.2%]  relative ">
          <div>
           
            <div className="m-4 text-lg ">
              <ul className="text-white">
                {sidebarMenuItems.map((item) => {
                  return (
                    <li key={item.title}>
                      <Link
                        className="flex justify-start hover:bg-gray-600 rounded-full items-center gap-3 w-fit pr-[12px] pl-[12px] pt-[5px] pb-[12px] cursor-pointer "
                        href={item.link}
                      >
                        <span className=" text-xl">{item.icon}</span>
                        <span className="hidden sm:hidden md:inline lg:inline">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-2 ">
                <button className="hidden sm:hidden md:block lg:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="block sm:block  md:hidden lg:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  <BsTwitter />
                </button>
              </div>
              
            </div>
          </div>
          <div className="absolute  bottom-5 ">
            {user && (
              <div className=" mt-5 flex gap-4 text-white items-center bg-slate-800 py-2 px-4 rounded-full">
                {user && user.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={40}
                    width={40}
                  />
                )}
                <div className="hidden sm:hidden md:block lg:block">
                  <h3 className="">
                    {user.firstName}
                    {user.lastName}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-9 md:col-span-5 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll no-scrollbar border-gray-600">
          {props.children}
        </div>
        <div className="hidden sm:col-span-4 md:col-span-4  lg:col-span-3 p-5 sm:block lg:block md:block text-white">
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            <div className="px-4 py-2 bg-slate-800 rounded-lg">
              <h1 className="my-2 text-lg sm:text-[1rem] md:text-[1.5rem] lg:text-xl mb-5">Users you may know</h1>
              {user?.recommendedUsers?.map((el) => (
                <div className="flex items-center gap-3 mt-2" key={el?.id}>
                  {el?.profileImageURL && (
                    <Image
                      src={el?.profileImageURL}
                      alt="user-image"
                      className="rounded-full"
                      width={60}
                      height={60}
                    />
                  )}
                  <div className="">
                    <div className="text-lg sm:text-[1rem] md:text-[1.5rem] lg:text-lg">
                      {el?.firstName} {el?.lastName}
                    </div>
                    <Link
                      href={`/${el?.id}`}
                      className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg mt-3"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Twitterlayout;
