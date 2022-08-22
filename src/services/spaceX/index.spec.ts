import { Route } from "OpenApiRouter";
import { handleRocket } from ".";

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

    const responses = handleRocket(route);

    expect(responses).toMatchSnapshot();
  });
});
