import { Route } from "OpenApiRouter";
import { handleHello } from "operations/hello";
import { handleApi } from "services/spaceX";

export interface Result {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

export const dispatch = async (route: Route): Promise<Result | null> => {
  switch (route.operation.operationId) {
    case "hello":
      return await handleHello(route);
    case "rockets":
      return await handleApi(route);
    default:
      return null;
  }
};
