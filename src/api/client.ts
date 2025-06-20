import config from "@/config/api";
import axios from "axios";
import { Configuration, DefaultApi } from "./generated";

export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

const apiConfiguration = new Configuration();

export const api = new DefaultApi(apiConfiguration);

