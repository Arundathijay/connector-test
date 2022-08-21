import { Handle } from "apiHandle";
import { Route } from "OpenApiRouter";

export const handleApi = (_route: Route): Handle | null => {
  return {
    status: 200,
    body: {
      message: "Get a rocket"
    }
  };
};
