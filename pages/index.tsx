import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { log } from "console";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast/headless";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryclient = useQueryClient();
  const { user } = useCurrentUser();
  const [profileUrl, setprofileUrl] = useState<any>("");
  useEffect(() => {
    setprofileUrl(user?.profileImageURL);
  }, [user]);

  interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode;
  }

  const sidebarMenuItems: TwitterSidebarButton[] = [
    {
      title: "Home",
      icon: <BiHomeCircle />,
    },
    {
      title: "Explore",
      icon: <BiHash />,
    },
    {
      title: "Notifications",
      icon: <BsBell />,
    },
    {
      title: "Messages",
      icon: <BsEnvelope />,
    },
    {
      title: "BookMarks",
      icon: <BsBookmark />,
    },
    {
      title: "Twitter Blue",
      icon: <BiMoney />,
    },
    {
      title: "More Options",
      icon: <SlOptions />,
    },
    {
      title: "Profile",
      icon: <BiUser />,
    },
  ];

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("googleToken not found");
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("verified success");
      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }

      await queryclient.invalidateQueries(["current-user"]);
    },
    [queryclient]
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-18">
        <div className="col-span-3 p-4 ml-16 mt-[-6.2%] relative">
          <div className="text-2xl px-4 py-3 w-fit cursor-pointer relative top-[1.1rem] left-[4.4%]  text-white transition-all ">
            <BsTwitter />
          </div>
          <div className="m-4 text-lg ">
            <ul className="text-white">
              {sidebarMenuItems.map((item) => {
                return (
                  <li
                    className="flex justify-start hover:bg-gray-600 rounded-full items-center gap-3 w-fit px-4 py-2 cursor-pointer"
                    key={item.title}
                  >
                    <span>{item.icon}</span> <span>{item.title}</span>
                  </li>
                );
              })}
            </ul>
            <button className="bg-[#1d9bf0] rounded-full w-full text-[white] mt-4 p-[5px] text-lg font-semibold">
              Tweet
            </button>
          </div>
          {user && (
            <div className="absolute mt-5 bottom-5 flex gap-2 text-white items-center bg-slate-800 py-2 px-4 rounded-full justify-between">
              {user && (
                <Image
                  className="rounded-full"
                  src={profileUrl}
                  alt="user-Image"
                  height={30}
                  width={30}
                />
              )}
              <div>
                <h3 className="">
                  {user.firstName}
                  {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll no-scrollbar border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        {!user && (
          <div className="col-span-3 p-5">
            <div className="p-5 bg-slate-700 rounded-lg">
              <h2 className="my-2 "> New To Twitter?</h2>
              <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
