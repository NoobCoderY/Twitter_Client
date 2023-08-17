import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps{
  data:Tweet
}

const FeedCard = (props: FeedCardProps) => {
  const {data}=props
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer text-white">
      <div className="flex  gap-2">
        <div className="basis-[10%]">
          {
           data.author?.profileImageURL && (
              <Image
              className="rounded-full"
              src={
                data.author?.profileImageURL
              }
              alt="user-image"
              height={40}
              width={40}
            />
            )
        }
        </div>
        <div className="basis-[90%]">
          <h3>{data.author?.firstName}{ data.author?.lastName}</h3>
          <p className="text-[14.5px]">
           {data.content}
          </p>
          <div className="flex  mt-2 text-xl items-center justify-between p-2 w-[89%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
