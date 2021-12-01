import axios from "axios";
import { BASE_SERVER, ENV_BASE } from "./config";

axios.defaults.baseURL = BASE_SERVER;
axios.defaults.headers.post["Content-Type"] = "application/json";
