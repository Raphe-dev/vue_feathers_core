// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers";
import type { ClientApplication } from "../../client";
import type {
    Task,
    TaskData,
    TaskPatch,
    TaskQuery,
    TaskService,
    IncidentData,
    OtherData
} from "./tasks.class";

export type { Task, TaskData, TaskPatch, TaskQuery, IncidentData, OtherData };

export type TaskClientService = Pick<
    TaskService<Params<TaskQuery>>,
    (typeof taskMethods)[number]
>;

export const taskPath = "tasks";

export const taskMethods = [
    "find",
    "get",
    "create",
    "patch",
    "remove",
] as const;

export const taskClient = (client: ClientApplication) => {
    const connection = client.get("connection");

    client.use(taskPath, connection.service(taskPath), {
        methods: taskMethods,
    });
};

// Add this service to the client service type index
declare module "../../client" {
    interface ServiceTypes {
        [taskPath]: TaskClientService;
    }
}
