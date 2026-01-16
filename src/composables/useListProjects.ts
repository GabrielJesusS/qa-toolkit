import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { ProjectsSchema } from "@/schemas/project";
import { safeParseAsync } from "valibot";
import { onMounted, ref } from "vue";

const listProjects = async () => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.LIST_PROJECTS,
  });

  const parsedData = await safeParseAsync(ProjectsSchema, result);

  if (parsedData.success) {
    return parsedData.output;
  }

  return [];
};

export function useListProjects() {
  const hasLoaded = ref(false);

  const projects = ref<ProjectsSchema>([]);

  onMounted(async () => {
    if (!hasLoaded.value) {
      projects.value = await listProjects();
      hasLoaded.value = true;
    }
  });

  return {
    hasLoaded,
    projects,
  };
}
