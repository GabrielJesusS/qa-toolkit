import { BaseSchema, parseAsync, InferOutput } from "valibot";

type GenericSchema = BaseSchema<any, any, any>;

class StorageController {
  static async set(key: string, data: unknown) {
    await chrome.storage.local.set({
      [key]: data,
    });
  }

  static async remove(key: string) {
    await chrome.storage.local.remove(key);
  }

  static async get(key: string): Promise<unknown>;
  static async get<T extends GenericSchema>(
    key: string,
    schema: T
  ): Promise<InferOutput<T>>;

  static async get<T extends GenericSchema>(
    key: string,
    schema?: T
  ): Promise<InferOutput<T>> {
    const result = await chrome.storage.local.get(key);

    if (!result[key]) {
      throw new Error(`No data found for key: ${key}`);
    }

    if (typeof schema === "undefined") {
      return result[key];
    }

    const parsedResult = await parseAsync(schema, result[key]);

    return parsedResult;
  }
}

export { StorageController };
