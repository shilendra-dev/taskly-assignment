import { createApi } from "@/lib/ApiRouter";
import { registerAPI } from "./api/register.api.js";
import { loginAPI } from "./api/login-api.js";
import { meApi } from "./api/me-api";

createApi().post('/register').noAuth(registerAPI);
createApi().post('/login').noAuth(loginAPI);
createApi().get('/me').authSecure(meApi);