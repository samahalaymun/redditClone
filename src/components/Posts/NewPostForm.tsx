import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { TabItem } from "./TabItem";
import { TextInputs } from "./PostForm/TextInputs";
import { ImageUpload } from "./PostForm/ImageUpload";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSetRecoilState } from "recoil";
import { firestore, storage } from "@/src/firebase/clientApp";
import { postState } from "@/src/atoms/PostsAtom";
import { useSelectFile } from "@/src/hooks/useSelectFile";
import { ErrorComponent } from "../Layout/ErrorComponent";


type NewPostFormProps = {
  selected: string;
  user: User;
  community: string;
  communityImageURL?:string;
};
const formTabs: tabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Videos",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  // {
  //   title: "Talk",
  //   icon: BsMic,
  // },
];
export type tabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPostForm: React.FC<NewPostFormProps> = ({
  selected,
  user,
  community,
  communityImageURL,
}) => {
  const [selectedTab, setSelectedTab] = useState(selected || "Post");
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const setPostItems = useSetRecoilState(postState);
  const router = useRouter();
  const [error, setError] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(0);

  const handleCreatePost = async () => {
    const newPost = {
      communityId: community as string,
      communityImageURL: communityImageURL || '',
      body: textInputs.body,
      title: textInputs.title,
      createdAt: serverTimestamp() as Timestamp,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      numberOfComments: 0,
      voteStatus: 0,
    };
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));
      setSelectedFile("");
      setTextInputs({
        title: "",
        body: "",
      });
      setLoading(false);
      //router.push(`/r/${community}`);
      router.back();
    } catch (error: any) {
      setError(error.message);
    }
  };
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      onSelectFile(event.target.files[0]);
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0]);
    }
  };
  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === "title" && value.length > 300) return;
    if (name === "title" && value.length < 300) setCharsRemaining(value.length);
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex padding={4}>
        {selectedTab === "Post" && (
          <TextInputs
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            textInputs={textInputs}
            loading={loading}
            charsRemaining={charsRemaining}
          />
        )}
        {selectedTab === "Images & Videos" && (
          <ImageUpload
            onChange={onSelectImage}
            dragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
        )}
      </Flex>
      {error && <ErrorComponent error="Error creating post" />}
    </Flex>
  );
};

export default NewPostForm;
