import { Result } from "dispatch";
import { Route } from "OpenApiRouter";
import axios from "axios";

export const handleApi = (_route: Route): Result | null => {
  interface Rockets {
    id: string;
    country: string;
    company: string;
    main_image: string;
    cost_per_launch: object;
    curruncy: string;
  }

  // type GetRocketsResponse = {
  //   data: RocketsOne[];
  // };

  function getRockets() {
    try {
      // const data: GetRocketsResponse
      const data = axios.get<Rockets>("https://api.spacexdata.com/v3/rockets", {
        headers: {
          Accept: "application/json"
        }
      });
      console.log(JSON.stringify(data, null, 4));

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  return {
    status: 200,
    body: {
      message: "Get the rockets"
    }
  };
  getRockets();
};

// interface User {
//   name: string;
//   age: string;
// }

// function getUsers(): Promise<User[]> {
//   // For now, consider the data is stored on a static `users.json` file
//   return (
//     axios.get<any>("https://api.spacexdata.com/v3")
//       // the JSON body is taken from the response
//       .then((res) => res.json())
//       .then((res) => {
//         // The response has an `any` type, so we need to cast
//         // it to the `User` type, and return it from the promise
//         return res as User[];
//       })
//   );
// }

// const rocket = getUsers();
// console.log(rocket);
