import { createApi } from "@/lib/ApiRouter";
import { registerAPI } from "./api/register.api.js";

createApi().post('/register').noAuth(registerAPI);