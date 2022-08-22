import { Result } from "dispatch";
import { Route } from "OpenApiRouter";
import axios from "axios";

type GetRocketsResponse = {
  data: RocketsOne[];
};
type RocketsOne = {
  id: string;
  company: string;
  country: string;
  main_image: string;
  cost_per_launch: object;
};

async function getRockets() {
  try {
    // use axios to make the http request
    const { data } = await axios.get<GetRocketsResponse>(
      "https://api.spacexdata.com/v3/rockets",
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    //display data from the api
    const result = JSON.stringify(data, null, 4);
    console.log(result);
    return {
      status: 200,
      body: {
        message: data
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log(error);
      return "An unexpected error occurred";
    }
  }
}
export const handleRocket = (_route: Route): Result | null => {
  const rockets = getRockets();

  //display body on the browser
  return {
    status: 200,
    body: {
      message: rockets
    }
  };
};
