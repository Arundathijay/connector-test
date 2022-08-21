import { Route } from "OpenApiRouter";
import { handleApi } from ".";

describe("Get a rocket", () => {
  it("should return a 200 response", async () => {
    const route: Route = {
      route: "/rockets",
      operation: {
        operationId: "rockets",
        responses: {}
      },
      pathParameters: {}
    };

    const responses = handleApi(route);

    expect(responses).toMatchSnapshot();
  });
});
