import { useMultiStep } from "@hooks";
import { postsApi } from "@store/services/posts";
import { Activity, TCreatePost } from "@store/types/posts";
import { EditorEvents } from "@tiptap/react";
import React, { lazy, Suspense, useState } from "react";
import { createPortal } from "react-dom";
import { ChooseActivity } from "./ChooseActivity";

const FillPostInfo = lazy(() => import("./FillPostInfo"));

interface IProps {
  onRemove?: () => void;
}

const Tool = (props: IProps) => {
  return createPortal(
    <PostToolUI {...props} />,
    document.getElementById("tool") as HTMLElement
  );
};

export default Tool;

const PostToolUI = ({ onRemove }: IProps) => {
  const [createPost, { isLoading }] = postsApi.useCreatePostMutation();
  const [finalPostSchema, setFinalPostSchema] = useState<TCreatePost>({
    activity: "",
    details: {
      heading: "",
      body: "",
      images: [],
    },
  });

  const onHandleChangeHeading: React.ChangeEventHandler<HTMLInputElement> = (
    eve
  ) => {
    setFinalPostSchema((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        heading: eve.target.value,
      },
    }));
  };

  const onHandleChangeBody = ({ editor: e }: EditorEvents["update"]) => {
    setFinalPostSchema((prevState) => ({
      ...prevState,
      details: {
        ...prevState.details,
        body: e.getHTML(),
      },
    }));
  };

  const onChooseActivity = (activity: Activity) => {
    setFinalPostSchema((prevState) => ({
      ...prevState,
      activity,
    }));
    setTimeout(next, 0);
  };

  const handlePost = async () => {
    await createPost(finalPostSchema).unwrap;
    setTimeout(() => {
      onRemove?.();
    }, 0);
  };

  const { step, next } = useMultiStep([
    <ChooseActivity onChoose={onChooseActivity} />,
    <Suspense fallback={<div>Loading...</div>}>
      <FillPostInfo
        activity={finalPostSchema.activity}
        onPost={handlePost}
        onChangeHeading={onHandleChangeHeading}
        onChangeBody={onHandleChangeBody}
      />
    </Suspense>,
  ]);

  return (
    <>
      <div className="rounded-xl p-4 w-[580px] h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-30">
        {step}
      </div>
      <div
        className="w-full h-full bg-slate-900/50 fixed top-0 left-0 z-20 backdrop-blur-xl"
        onClick={onRemove}
      />
    </>
  );
};
