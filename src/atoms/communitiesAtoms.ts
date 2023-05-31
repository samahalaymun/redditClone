import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}
export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity: Community;
  snippetsFetched:boolean
}
export const defaultCommunity: Community = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public",
  imageURL:""
};
const defaultCommunityState: CommunityState = {
  mySnippets: [],
  currentCommunity: defaultCommunity,
  snippetsFetched:false
};
export const CommunityState = atom<CommunityState>({
  key: "CommunityState",
  default: defaultCommunityState,
});
