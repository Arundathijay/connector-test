import path from "path";
import chalk from "chalk";
import express from "express";
// import { dispatch } from "./dispatch";
import { handle } from "./apiHandle";

import { getOpenApiRouter } from "utils/openApi";

const PORT = 4444;

void (async () => {
  const app = express();
  // const specPath = path.resolve("spec.yml");
  // const maybeRouter = await getOpenApiRouter(specPath);

  // if (!maybeRouter) {
  //   return;
  // }

  //const newrouter = maybeRouter;

  const specApi = path.resolve("apiSpec.yml");
  const getroute = await getOpenApiRouter(specApi);

  if (!getroute) {
    return;
  }

  const router = getroute;

  app.all("*", async (req, res) => {
    // Log request
    console.log(
      chalk`{dim ${new Date()
        .toTimeString()
        .substring(0, 8)}} {magenta http} {green ${req.method}} ${req.path}`
    );

    // Set headers
    res.setHeader("Content-Type", "application/json");

    try {
      const routerResult = router.match(req.path, req.method);
      if (!routerResult) {
        res.status(404).send({ message: "not found" });
        return;
      }
      const endpoint = await handle(routerResult);

      if (!endpoint) {
        res.status(501).send({ message: "not implemented" });
        return;
      }

      // const result = await dispatch(routerResult);

      // if (!result) {
      //   res.status(501).send({ message: "not implemented" });
      //   return;
      // }

      // Set additional headers
      if (endpoint?.headers) {
        Object.entries(endpoint?.headers).forEach(
          ([headerName, headerValue]) => {
            res.setHeader(headerName, headerValue);
          }
        );
      }

      res.status(endpoint.status).send(endpoint?.body);
      return;
    } catch (err) {
      console.log(
        chalk`{dim ${new Date()
          .toTimeString()
          .substring(0, 8)}} {magenta http} {red ERROR} ${err}`
      );
      res.status(500).send({ message: "something went wrong" });
    }
  });

  app.listen(PORT, () => {
    console.log(
      chalk`{dim ${new Date()
        .toTimeString()
        .substring(
          0,
          8
        )}} {magenta Unify} {green READY} http://localhost:${PORT}`
    );
  });
})();
