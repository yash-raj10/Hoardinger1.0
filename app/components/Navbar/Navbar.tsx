"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { Roboto } from "next/font/google";
import useRegistrationModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import useRentModel from "@/app/hooks/useRentModel";
import { useRouter } from "next/navigation";

// const ProfilePage = useSession();

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface navbarProps {
  currentUser?: SafeUser | null;
}

export default function Navbar({ currentUser }: navbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const registerModel = useRegistrationModel();
  const rentModel = useRentModel();
  const loginModel = useLoginModel();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const src = currentUser?.image;

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  return (
    <div className="z-10 fixed w-full bg-white ">
      <div className={roboto.className}>
        <div className="flex justify-between items-center border shadow-md py-1">
          <div className=" hidden md:flex lg:flex gap-1  items-center ">
            {/* <p>Followers: {ProfilePage.data.}</p> */}
            <svg
              className="h-6 w-6 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className=" font-extrabold text-xl">Hoardinger</span>
          </div>
          <div className="flex border gap-1 border-gray-300 rounded-xl shadow-sm shadow-gray-400 px-2 py-1 m-1">
            <div className=" items-center flex">Search Places</div>
            <span className="border-l border-gray-300 "></span>
            <button className="bg-green-500 text-white rounded-lg p-[4px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>

          {/* ----------------------------------UserMenu--------------------------------------------- */}

          <div className="flex border gap-1 border-gray-300 rounded-xl shadow-sm shadow-gray-400 px-2 py-[2px] m-1">
            <div onClick={onRent} className="items-center flex">
              Add Your&apos;s
            </div>
            <div className="flex gap-1 border-2 rounded-xl px-2 py-[2px]">
              {" "}
              <Link
                href={"/"}
                className="  bg-green-500 flex border gap-1 border-gray-300 rounded-xl shadow-sm shadow-gray-400 p-1 "
              >
                {(src && (
                  <Image
                    alt="image"
                    className="rounded-full"
                    width={24}
                    height={24}
                    src={src}
                  />
                )) || (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[18px] h-[18px] text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
              <div onClick={toggleOpen} className=" flex items-center">
                <AiOutlineMenu />
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className=" absolute rounded-lg shadow-md w-[60vw] md:w-2/4  bg-slate-300 overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  {/* <div
                  onClick={() => {}}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  My Reservations
                </div> */}
                  <div
                    onClick={() => router.push("/properties")}
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    My Hoardings
                  </div>
                  <div
                    onClick={rentModel.onOpen}
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Add Your&apos;s
                  </div>
                  <hr />
                  <div
                    onClick={() => signOut()}
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={loginModel.onOpen}
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Login
                  </div>
                  <div
                    onClick={registerModel.onOpen}
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Sign up
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
