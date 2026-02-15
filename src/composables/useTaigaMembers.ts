import { browserClient } from "@/core/BrowserClient";
import { HandlerMapEnum } from "@/core/enums/HandlerMapEnum";
import { TaigaMembersSchema } from "@/schemas/taiga-members";
import { safeParseAsync } from "valibot";
import { computed, Ref, ref, watch } from "vue";

const getTaigaMembers = async (projectId: number) => {
  const result = await browserClient.sendMessage({
    type: HandlerMapEnum.GET_TAIGA_MEMBERS,
    data: {
      projectId,
    },
  });

  const parsedData = await safeParseAsync(TaigaMembersSchema, result);

  if (parsedData.success) {
    return parsedData.output;
  }

  return [];
};

function membersToList(members: TaigaMembersSchema) {
  return members.map((member) => ({
    name: member.full_name,
    value: member.id,
  }));
}

export function useTaigaMembers(projectId: Ref<string>) {
  const members = ref<Map<string, TaigaMembersSchema>>(new Map());

  watch(projectId, async () => {
    if (projectId.value === "") return;

    if (!members.value.has(projectId.value)) {
      const result = await getTaigaMembers(Number(projectId.value));
      members.value.set(projectId.value, result);
    }
  });

  const membersOptions = computed(() => {
    if (projectId.value === "") return [];

    if (members.value.has(projectId.value)) {
      return membersToList(members.value.get(projectId.value)!);
    }

    return [];
  });

  return {
    membersOptions,
  };
}
