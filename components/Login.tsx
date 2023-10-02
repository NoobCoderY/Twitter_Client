import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
const Login = () => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { push } = useRouter();

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
      push("/");
    },
    [queryClient]
  );

  async function handleLogout(event: any) {
    if (window.localStorage.getItem("__twitter_token")) {
      window.localStorage.removeItem("__twitter_token");
      await queryClient.invalidateQueries(["curent-user"]);
    }
  }

  return (
    <>
      <div className="col-span-0 sm:col-span-4 md:col-span-4  lg:col-span-3 p-5 text-white">
        {!user ? (
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        ) : (
          <div className="px-4 py-1 bg-slate-800 rounded-lg flex items-center justify-between gap-3">
            <h1 className="my-2 text-lg sm:text-[1rem] md:text-[1.5rem] lg:text-xl ">
              Logout
            </h1>
            <span className="cursor-pointer" onClick={handleLogout}>
              <FiLogOut size={18} />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
