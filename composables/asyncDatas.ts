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
    let current = ownerId.substring(0, 6);
    while (current) {
      ret.unshift(owners[current].name);
      current = owners[current].parent;
    }
    return ret.slice(Math.min(offset, Math.max(0, ret.length - 1))).join(" ");
  } catch (e) {
    return ownerId;
  }
};
