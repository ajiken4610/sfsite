// useLikes
// usePredicts

import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { SFProject } from "./SFProject";

// addPredicts
export class SFProjectData {
  project: SFProject;
  uid: string;
}

export const useLikes = () =>
  useAsyncData("likes", async () => {
    const db = useFirestore();
    const likeDoc = doc(db, "like", "root");
    return (await getDoc(likeDoc)).data() as { [key: string]: number };
  });

export const useLikedProjects = () => {
  return useCookie("liked", { default: (): string[] => [] });
};

export const onPushLike = async (id: string) => {
  if (!useLikedProjects().value.includes(id)) {
    useLikedProjects().value = useLikedProjects().value.concat(id);
    const likes = (await useLikes()).data.value;
    if (likes[id]) {
      likes[id]++;
    } else {
      likes[id] = 1;
    }
    const db = useFirestore();
    const likeDoc = doc(db, "like", "root");
    const data = { update: id };
    data[id] = increment(1);
    await updateDoc(likeDoc, data);
  }
};
export const usePredicts = () => {};
