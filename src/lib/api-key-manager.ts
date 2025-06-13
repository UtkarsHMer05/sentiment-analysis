export class ApiKeyManager {
  private static readonly API_KEY_STORAGE_KEY = "sentiment_api_key";

  static setApiKey(apiKey: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    }
  }

  static getApiKey(): string {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.API_KEY_STORAGE_KEY) || "";
    }
    return "";
  }

  static clearApiKey(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    }
  }

  static hasApiKey(): boolean {
    return this.getApiKey().length > 0;
  }
}
