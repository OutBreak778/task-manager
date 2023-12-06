"use client";

import { useGlobalState } from "@/app/context/GlobalProvider";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import img from "../../../public/img1.jpeg";
import Menu from "../../utils/Menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { MdLogout } from "react-icons/md";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { FaBars } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";



const Sidebar = () => {
  const { theme, collapsed, collapsedMenu } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  const handleClick = (link: string) => {
    router.push(link);
  };
  return (
    <SidebarStyled
      theme={theme}
      className="relative w-60 px-3 py-2 flex flex-col justify-between bg-[#212121] rounded-2xl text-[#6c7983]"
      collapsed={collapsed}
    >
      <button className="toggle-nav" onClick={collapsedMenu}>
        {collapsed ? <FaBars /> : <FaArrowLeft />}
      </button>
      <div className="profile mx-4 my-6 p-4 relative rounded-lg transition-colors hover:bg-[#313131] cursor-pointer font-medium flex items-center ">
        <div className="profile-overlay absolute top-0 left-0 w-full h-full backdrop-blur-xs z-0 transition-all rounded-md duration-200 opacity-20 hover:opacity-100"></div>
        <div className="image flex-shrink-0 inline-block overflow-hidden transition-all duration-100 ease-in rounded-full w-[65px] h-[65px]">
          <Image
            className="rounded-full transition-all duration-300 ease-in hover:scale-110"
            src={imageUrl}
            alt="Profile Image"
            width={70}
            height={70}
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="text-lg flex flex-col line-clamp-6 ml-3 leading-relaxed capitalize">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
      </div>

      <ul className="nav-items">
        {Menu.map((item) => {
          const link = item.link;
          return (
            <li
              className={`nav-item p-2 mb-2 relative mx-1 my-0 grid grid-cols-gridList cursor-pointer ${
                pathname === item.link ? "active" : ""
              }`}
              key={item.id}
              onClick={() => handleClick(link)}
            >
              <span>{item.icon}</span>
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="signOut relative m-6 hover:text-[#f8f8f8]">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.3rem"}
          fw={"500"}
          fs={"1rem"}
          icon={<MdLogout className="text-xl text-[#b2becd] " />}
          click={() => signOut(() => router.push("/signin"))}
        />
      </div>
    </SidebarStyled>
  );
};
const SidebarStyled = styled.nav<{collapsed: Boolean}>`
  border: 2px solid ${(props) => props.theme.borderColor2};
  .profile-overlay {
    border: 2px solid ${(props) => props.theme.border}
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};


    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    padding: 0.8rem 0.9rem;
    position: absolute;
    right: -70px;
    top: 1.8rem;

    border-top-right-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;

    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  .nav-item {

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: -16px;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    icon,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
  }

`;

export default Sidebar;
