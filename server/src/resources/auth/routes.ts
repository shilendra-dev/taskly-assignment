import { createApi } from "@/lib/ApiRouter";
import { registerAPI } from "./api/register.api.js";
import { loginAPI } from "./api/login-api.js";

createApi().post('/register').noAuth(registerAPI);
createApi().post('/login').noAuth(loginAPI);