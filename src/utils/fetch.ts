import qs from "qs";

enum methodTypes {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export interface headersTypes {
  "Content-Type"?: string;
  token?: string;
}

export interface optionsTypes {
  method?: string;
  body?: any;
  headers?: headersTypes;
}

const _fetch = async (url: string, options: optionsTypes) => {
  let resPromise: Response;
  const headers: Headers = new Headers({
    "Content-Type":
      options?.headers?.["Content-Type"] ?? "application/json;charset=UTF-8",
    token: options?.headers?.token ?? null,
  } as HeadersInit);
  if (
    !options?.method ||
    options?.method === methodTypes.get ||
    options?.method === methodTypes.delete
  ) {
    const pre: string = url.includes("?") ? "&" : "?";
    url += `${options?.body ? pre + qs.stringify(options?.body) : ""}`;
    resPromise = await fetch(url, {
      headers,
    });
    return resPromise;
  } else if (
    options?.method === methodTypes.post ||
    options?.method === methodTypes.put
  ) {
    resPromise = await fetch(url, {
      body: JSON.stringify(options?.body),
      method: options?.method,
      headers,
    });
    return resPromise;
  }
};

export const selfFetch = async (url: string, options: optionsTypes) => {
  const result = await _fetch(url, options);
  if (result?.ok) {
    const contentType = result.headers.get("Content-Type");
    if (contentType) {
      if (contentType.indexOf("json") > -1) {
        return result?.json();
      }
      if (contentType.indexOf("text") > -1) {
        return result?.text();
      }
      if (contentType.indexOf("form") > -1) {
        return result?.formData();
      }
      if (contentType.indexOf("video") > -1) {
        return result?.blob();
      }
    }
    return result?.text();
  } else {
    console.log("error:" + result);
    throw result;
  }
};
