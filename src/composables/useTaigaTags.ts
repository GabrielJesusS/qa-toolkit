import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { TaigaTagsSchema } from "@/schemas/taiga-tags";
import { safeParseAsync } from "valibot";
import { computed, Ref, ref, watch } from "vue";

const getTaigaTags = async (projectId: number) => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_TAIGA_TAGS,
    data: {
      projectId,
    },
  });

  const parsedData = await safeParseAsync(TaigaTagsSchema, result);

  if (parsedData.success) {
    return parsedData.output;
  }

  return {};
};

function tagsToList(tags: TaigaTagsSchema) {
  return Object.keys(tags).map((key) => ({
    name: key,
    value: key,
    color: null,
  }));
}

export function useTaigaTags(projectId: Ref<string>) {
  const tags = ref<Map<string, TaigaTagsSchema>>(new Map());

  watch(projectId, async () => {
    if (projectId.value === "") return;

    if (!tags.value.has(projectId.value)) {
      const result = await getTaigaTags(Number(projectId.value));
      tags.value.set(projectId.value, result);
    }
  });

  const tagsOptions = computed(() => {
    if (projectId.value === "") return [];

    if (tags.value.has(projectId.value)) {
      return tagsToList(tags.value.get(projectId.value)!);
    }

    return [];
  });

  return {
    tagsOptions,
  };
}
