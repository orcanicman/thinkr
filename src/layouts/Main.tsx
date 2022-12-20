import React from "react";
import { HighlightedPosts } from "./components/HighlightedPosts/HighlightedPosts";
import { Profile } from "./components/Profile/Profile";
import { TopBar } from "./components/TopBar/TopBar";

interface MainProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="bg-mainDark min-h-screen text-mainLight">
      <TopBar />
      <div className="flex">
        <div className="hidden md:block md:w-[16rem] xl:w-[24rem] p-6">
          <Profile />
        </div>
        <main className="grow p-6">{children}</main>
        <div className="hidden lg:block md:w-[16rem] xl:w-[24rem] p-6">
          <HighlightedPosts />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
