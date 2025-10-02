import { createApi } from "@/lib/ApiRouter";
import { createTaskAPI } from "./api/create-task.api";
import { getTasksAPI } from "./api/get-tasks.api";
import { updateTaskAPI } from "./api/update-task.api";

createApi().post('/task').authSecure(createTaskAPI);
createApi().get('/tasks').authSecure(getTasksAPI);
createApi().put('/task/:id').authSecure(updateTaskAPI);
