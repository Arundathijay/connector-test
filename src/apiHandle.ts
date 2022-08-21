import { Route } from "OpenApiRouter";
import { handleApi } from "./services/spaceX";

export interface Handle {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

export const handle = async (route: Route): Promise<Handle | null> => {
  switch (route.operation.operationId) {
    case "rocket":
      return await handleApi(route);
    default:
      return null;
  }
};
