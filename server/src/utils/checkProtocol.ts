//check if URL has protocol and append protocol to URL if does not exist
export function checkProtocol(url: string) {
  const protocolRegex = /^(ftp|http|https):\/\//;

  if (!protocolRegex.test(url)) {
    console.log("no protocol");
    return "http://" + url;
  }

  return url;
}
