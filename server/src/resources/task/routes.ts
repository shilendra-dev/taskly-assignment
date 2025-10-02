import { createApi } from "@/lib/ApiRouter";
import { createTaskAPI } from "./api/create-task.api";
import { getTasksAPI } from "./api/get-tasks.api";

createApi().post('/task').authSecure(createTaskAPI);
createApi().get('/tasks').authSecure(getTasksAPI);
