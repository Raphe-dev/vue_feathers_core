import type { Boards } from "project-template-backend";

import { Params, Query, ServiceInstance } from "feathers-pinia";
import { computed, ComputedRef, Reactive, reactive, Ref, ref } from "vue";

import { useFeathersService } from "@/feathers-client";
const BoardsService = useFeathersService("boards");

export type useFindResults = Reactive<{
  total: Ref<number>;
  data: ComputedRef<ServiceInstance<Boards>[]>;
  next: () => void;
  canNext: ComputedRef<boolean>;
}>;

export const useFindCustom = (params: Params<Query>, pageSize?: Ref<number>): useFindResults => {
  const query: Query = params.query || {};
  if (pageSize) query.$limit = pageSize;
  query.$skip = 0;

  const total = ref(0);

  const getData = async () => {
    const response = await BoardsService.find({ ...params, query });
    total.value = response.total;
  };
  const data: ComputedRef<ServiceInstance<Boards>> = computed<ServiceInstance<Boards>[]>(
    () => BoardsService.findInStore(params).data,
  );

  const next = async (): Promise<ServiceInstance<Boards>[]> => {
    return await BoardsService.find({ query: { $limit: query.$limit, $skip: data.value.length } });
  };

  const canNext = computed<boolean>((): boolean => {
    if (total?.value) return data.value.length < total.value;
    return false;
  });

  getData();

  return reactive({
    total,
    data,
    next,
    canNext,
  }) as useFindResults;
};
