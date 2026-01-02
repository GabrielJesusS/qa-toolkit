import { BaseSchema, parseAsync, InferOutput } from "valibot";

type GenericSchema = BaseSchema<any, any, any>;

export class StorageController {
  async set(key: string, data: unknown) {
    await chrome.storage.local.set({
      [key]: data,
    });
  }

  async get(key: string): Promise<unknown>;
  async get<T extends GenericSchema>(
    key: string,
    schema: T
  ): Promise<InferOutput<T>>;

  async get<T extends GenericSchema>(
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
