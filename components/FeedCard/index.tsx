import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { deleteTweetMutation } from "@/graphql/mutations/tweet";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/user";

interface FeedCardProps {
  data: Tweet;
  delBtn: Boolean;
  handleDeleteTweet?:(tweetId: string) => Promise<void>
}

const FeedCard = (props: FeedCardProps) => {
  
  const queryclient = useQueryClient();
  const { data, delBtn } = props;
  console.log(data);
  

 

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer text-white">
      <div className="flex  gap-2">
        <div className="basis-[10%]">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author?.profileImageURL}
              alt="user-image"
              height={40}
              width={40}
            />
          )}
        </div>
        <div className="basis-[90%]">
          <div className="flex justify-between">
            <div>
              <h3>
                {" "}
                <Link href={`/${data.author?.id}`}>
                  {data.author?.firstName} {data.author?.lastName}
                </Link>
              </h3>
              <p className="text-[14.5px]">{data.content}</p>
            </div>
            <div
              onClick={() => {
                if (props.handleDeleteTweet !== undefined)
                {
                  props.handleDeleteTweet(data.id);
                 }
              }}
            >
              {delBtn && <AiOutlineDelete size={20} />}
            </div>
          </div>
          {data.imageURL && (
            <Image src={data.imageURL} alt="image" width={400} height={400} />
          )}
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
