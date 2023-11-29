//check if URL has protocol and append protocol to URL if does not exist
export function checkProtocol(url: string) {
  const protocolRegex = /^(ftp|http|https):\/\//;

  if (
    !protocolRegex.test(url) &&
    url.match(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    )
  ) {
    console.log("no protocol");
    return "http://" + url;
  }

  return url;
}
