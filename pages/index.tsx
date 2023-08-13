import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";

export default function Home() {
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

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-18">
        <div className="col-span-3 p-4 ml-16 mt-[-6.2%]">
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
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
