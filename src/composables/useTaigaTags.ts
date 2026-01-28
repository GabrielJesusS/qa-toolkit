import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { TaigaTagsSchema } from "@/schemas/taiga-tags";
import { safeParseAsync } from "valibot";
import { Ref, ref, watch } from "vue";

type Option = {
  name: string;
  value: string;
  color: string | null;
};

const getTaigaTags = async (projectId: number) => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_TAIGA_TAGS,
    data: {
      projectId,
    },
  });

  const parsedData = await safeParseAsync(TaigaTagsSchema, result);

  if (parsedData.success) {
    const mappedData = Object.keys(parsedData.output).map((key) => ({
      name: key,
      value: key,
      color: null,
    }));

    return mappedData;
  }

  return [];
};

export function useTaigaTags(projectId: Ref<string>) {
  const hasLoaded = ref(false);

  const tagsOptions = ref<Option[]>([]);

  watch(projectId, async () => {
    if (projectId.value === "") return;

    if (!hasLoaded.value) {
      tagsOptions.value = await getTaigaTags(Number(projectId.value));
      hasLoaded.value = true;
    }
  });

  return {
    hasLoaded,
    tagsOptions,
  };
}
