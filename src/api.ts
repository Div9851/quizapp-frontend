import env from "env";

const GET = (api: string, token: string, queryParams: any = undefined) => {
  const uri = new URL(api, env.backendUri);
  if (queryParams) {
    for (const property in queryParams) {
      uri.searchParams.append(property, queryParams[property]);
    }
  }
  return fetch(uri.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const POST = (api: string, token: string, data: any) => {
  const uri = new URL(api, env.backendUri);
  const requestBody = JSON.stringify(data);
  return fetch(uri.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
};

const PUT = (api: string, token: string, data: any) => {
  const uri = new URL(api, env.backendUri);
  const requestBody = JSON.stringify(data);
  return fetch(uri.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
};

export { GET, POST, PUT };
