import { checkProtocol } from "../src/utils/checkProtocol";
import { isUrlValid } from "../src/utils/isUrlValid";

describe("URL Validation", () => {
  describe("Check protocol", () => {
    it("should prepend protocol as url is passed without protocol", () => {
      const url = "google.com";

      const urlWithProtocol = checkProtocol(url);
      expect(urlWithProtocol).toBe("http://" + url);
    });

    it("should return the same URL as protocol already exists", () => {
      const url = "http://google.com";

      const urlWithProtocol = checkProtocol(url);
      expect(urlWithProtocol).toBe(url);
    });
  });

  describe("Vaild URL", () => {
    it("valid URL with protocol", () => {
      const url = "http://google.com";
      const urlWithProtocol = checkProtocol(url);

      expect(isUrlValid(urlWithProtocol)).toBeTruthy();
    });

    it("valid URL without protocol", () => {
      const url = "google.com";
      const urlWithProtocol = checkProtocol(url);

      expect(isUrlValid(urlWithProtocol)).toBeTruthy();
    });
  });

  describe("Invalid URL", () => {
    it("should return false as URL is invalid", () => {
      const url = "random_string+-";

      expect(isUrlValid(url)).toBeFalsy();
    });
  });
});
