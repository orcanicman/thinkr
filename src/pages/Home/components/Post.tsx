import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post as IPost } from "../../../types/Post";
import ProfileImage from "../../../assets/Profile_Image.png";
import { LikeIcon } from "../../../assets/LikeIcon";
import { RepostIcon } from "../../../assets/RepostIcon";
import { CommentIcon } from "../../../assets/CommentIcon";
import { relativeDateFormatter } from "../../../helpers/relativeDateFormatter";
import { ShareIcon } from "../../../assets/ShareIcon";
import { DotMenuIcon } from "../../../assets/DotMenuIcon";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${post.user?.profile.tag}/${post.id}`)}
      className="flex w-full text-left bg-darkTransparentHighlight hover:bg-darkHighlight rounded-xl mb-8 p-6 -z-10 hover:cursor-pointer duration-75 ease-out transition-all"
      tabIndex={0}
    >
      <div className="mr-6 relative min-w-[4rem]">
        <Link
          onClick={(e) => e.stopPropagation()}
          to={`/${post.user?.profile.tag}`}
        >
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full shadow-black shadow-[inset_0px_0px_6px_rgba(0,0,0,0.5)] opacity-0 hover:opacity-100"></div>
          <img
            alt="Profile"
            src={ProfileImage}
            className="w-16 h-16 rounded-full"
          />
        </Link>
      </div>
      <div className="grow">
        <div className="flex justify-between mb-4 items-start">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-baseline">
              <Link
                onClick={(e) => e.stopPropagation()}
                to={`/${post.user?.profile.tag}`}
                className="text-lg font-bold hover:underline mr-2 max-w-[5rem] sm:max-w-sm overflow-ellipsis overflow-hidden whitespace-nowrap break-words"
              >
                {post.user?.profile.name}
              </Link>
              <Link
                onClick={(e) => e.stopPropagation()}
                to={`/${post.user?.profile.tag}`}
                className="text-gray text-sm hover:underline max-w-[5rem] sm:max-w-sm overflow-ellipsis overflow-hidden whitespace-nowrap break-words"
              >
                @{post.user?.profile.tag}
              </Link>
            </div>
            <div className="text-gray text-sm">
              {relativeDateFormatter(post.createdAt.getTime())}
            </div>
          </div>

          <button
            onClick={(e) => e.stopPropagation()}
            className="hover:bg-mainDark rounded-full p-1.5 duration-75 ease-out transition-all"
          >
            <DotMenuIcon />
          </button>
        </div>

        <div className="mb-8">{post.content}</div>

        <div className="flex justify-between flex-wrap">
          <Button
            className="bg-red"
            icon={<LikeIcon />}
            title="Like"
            amount={post.likes.length}
          />
          <Button
            className="bg-green"
            icon={<RepostIcon />}
            title="Repost"
            amount={0}
          />
          <Button
            className="bg-blue"
            icon={<CommentIcon />}
            title="Comment"
            amount={post.comments.length}
          />
          <Button icon={<ShareIcon />} title="Share" />
        </div>
      </div>
    </div>
  );
};

const Button: React.FC<{
  title: string;
  icon: React.ReactNode;
  amount?: number;
  className?: string | undefined;
  onClick?: () => void;
}> = ({ title, icon, amount, className, onClick }) => {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick();
      }}
      className="border-gray border mx-2 px-2 py-1 rounded-3xl relative hover:bg-mainDark duration-75 transition-all"
    >
      {amount !== undefined && (
        <div
          className={`absolute -top-2 -right-2 text-xs ${
            className ?? "bg-green"
          } px-2 py-[0.0625rem] rounded-full`}
        >
          {Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(amount)}
        </div>
      )}
      <div className={`flex items-center space-x-2 p-1`}>
        <div>{icon}</div>
        <div className="hidden md:block">{title}</div>
      </div>
    </button>
  );
};
