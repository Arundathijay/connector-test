import { Route } from "OpenApiRouter";
import { handleApi } from "./index";

describe("Get a rocket", () => {
  it("should return a 200 response", async () => {
    const route: Route = {
      route: "/rockets",
      operation: {
        operationId: "rocketsOne",
        responses: {}
      },
      pathParameters: {}
    };

    const response = handleApi(route);

    expect(response).toMatchSnapshot();
  });
});
