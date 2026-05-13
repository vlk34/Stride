export function getSessionToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("__session="))
    ?.split("=")[1];
}

