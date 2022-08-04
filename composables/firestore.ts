// useLikes
// usePredict

import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { SFProject } from "./SFProject";

// addPredict
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
export const usePredict = (fromId: string) =>
  useAsyncData("predict" + fromId, async () => {
    const db = useFirestore();
    const ref = doc(db, "predict", fromId);
    const data = await getDoc(ref);
    return data.data();
  });

export const incrementPredict = async (fromId: string, toId: string) => {
  const db = useFirestore();
  const data = { update: toId };
  data[toId] = increment(1);
  await setDoc(doc(db, "predict", fromId), data, { merge: true });
};
