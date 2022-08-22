import { Route } from "OpenApiRouter";
import { handleRocket } from "./services/spaceX";

export interface Handle {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

export const handle = async (route: Route): Promise<Handle | null> => {
  switch (route.operation.operationId) {
    case "rocket":
      return await handleRocket(route);
    default:
      return null;
  }
};
