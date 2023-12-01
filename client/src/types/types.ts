export interface UrlData {
  id: string;
  longUrl: string;
  shortUrlId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  id: string;
  email: string;
  urls: UrlData[];
}

export interface ErrorType {
  error: boolean;
  message: string;
}
