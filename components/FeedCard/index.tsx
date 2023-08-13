import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";

const FeedCard = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer text-white">
      <div className="flex  gap-2">
        <div className="basis-[10%]">
          <Image
            className="rounded-full"
            src={
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="user-image"
            height={50}
            width={50}
          />
        </div>
        <div className="basis-[90%]">
          <h3>Yash Diwaker</h3>
          <p className="text-[14.5px]">
            Hi my name is yash . I play bgmi daily approx 2 hrs. now i am
            addicted to this game. Hi my name is yash . I play bgmi daily approx
            2 hrs. now i am addicted to this game.
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
