import { SFProjectData } from "~~/composables/firestore";
import projectData from "assets/projectData.json";
export default projectData as {
  owners: {
    [key: string]: {
      name: string;
      description: string;
      childIds?: string[];
      parent?: string;
      icon?: string;
    };
  };
  projects: { [key: string]: SFProjectData };
  bigrams: any;
};
