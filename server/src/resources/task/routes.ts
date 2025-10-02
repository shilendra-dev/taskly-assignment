import { createApi } from "@/lib/ApiRouter";
import { createTaskAPI } from "./api/createTask.api";

createApi().post('/task').authSecure(createTaskAPI);