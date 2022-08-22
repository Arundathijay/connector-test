import { Route } from "OpenApiRouter";
import { handleHello } from "operations/hello";
import { handleRocket } from "services/spaceX";

export interface Result {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

//add handleApi route
export const dispatch = async (route: Route): Promise<Result | null> => {
  switch (route.operation.operationId) {
    case "hello":
      return await handleHello(route);
    case "rockets":
      return await handleRocket(route);
    default:
      return null;
  }
};
