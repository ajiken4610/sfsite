import data from "assets/data";

export const useProjectData = (id: string, draft: boolean = true) =>
  useLazyAsyncData(id, async () => {
    return data.projects[id];
  });

export const useOwnersData = () =>
  useAsyncData("owners", async () => {
    return data.owners;
  });

export const getOwnerName = (
  childRef: { [key: string]: { name: string; parent?: string } },
  ownerId: string,
  offset = 2
) => {
  const owners = childRef;
  try {
    let ret: string[] = [];
    let current = ownerId;
    const maxRec = 5;
    let i = 0;
    while (current && i++ < maxRec) {
      ret.unshift(owners[current].name);
      current = owners[current].parent;
    }
    console.log(ret);
    return ret.length > 2 ? ret.slice(offset).join(" ") : ret.join(" ");
  } catch (e) {
    return ownerId;
  }
};
