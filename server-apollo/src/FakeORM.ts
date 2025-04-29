import DataLoader from "dataloader";
import { v4 as uuidv4 } from "uuid";

export interface DBModel {
  id: string;
}

export class FakeORM<T extends DBModel> {
<<<<<<< Updated upstream
  constructor(
    private modelName: string,
    private data: T[]
  ) {}

  findById(id: string): T | undefined {
    console.log(this.data.find((item) => item.id === id));
    return this.data.find((item) => item.id === id);
=======
  private data: T[];

  constructor(
    private modelName: string,
    initialData: T[] = []
  ) {
    this.data = initialData;
  }

  createLoader(): DataLoader<string, T> {
    console.log("createLoader", this.modelName);
    return new DataLoader(async (ids: readonly string[]) => {
      const results = this.data.filter((item) => ids.includes(item.id));
      const resultMap = new Map(results.map((item) => [item.id, item]));
      return ids.map(
        (id) => resultMap.get(id) ?? new Error(`Not found: ${id}`)
      );
    });
  }

  findById(loader: DataLoader<string, T>, id: string): Promise<T> {
    console.log("findById", this.modelName, id);
    return loader.load(id);
>>>>>>> Stashed changes
  }

  async findByIds(loader: DataLoader<string, T>, ids: string[]): Promise<T[]> {
    console.log("findByIds", this.modelName, ids);
    return await loader
      .loadMany(ids)
      .then((results) => results.filter((r): r is T => !(r instanceof Error)));
  }

  async findMany(
    loader: DataLoader<string, T>,
    filter?: Partial<T> | Partial<T>[],
    options?: { limit?: number; offset?: number },
    hideLog?: boolean
  ): Promise<T[]> {
    if (!hideLog) console.log("findMany", this.modelName, filter);

    const limit = options?.limit || 100;
    const offset = options?.offset || 0;

    let filtered = this.data;

    if (filter) {
      if (!Array.isArray(filter)) filter = [filter];
      const filters = filter as Partial<T>[];
      filtered = this.data.filter((item) =>
        filters.some((f) =>
          Object.entries(f).every(
            ([key, val]) => !val || item[key as keyof T] === val
          )
        )
      );
    }

    const ids = filtered.slice(offset, offset + limit).map((item) => item.id);
    return this.findByIds(loader, ids);
  }

  create(input: Omit<T, "id">): T {
    const object: T = { id: uuidv4(), ...input } as T;
    this.data.push(object);
    return object;
  }

  update(id: string, input: Partial<T>): T {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    this.data[index] = { ...this.data[index], ...input };
    return this.data[index];
  }

  delete(id: string): void {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    this.data.splice(index, 1);
  }

  count(filter?: Partial<T> | Partial<T>[]): number {
    let filtered = this.data;
    if (filter) {
      if (!Array.isArray(filter)) filter = [filter];
      const filters = filter as Partial<T>[];
      filtered = this.data.filter((item) =>
        filters.some((f) =>
          Object.entries(f).every(
            ([key, val]) => !val || item[key as keyof T] === val
          )
        )
      );
    }
    return filtered.length;
  }
}

export type FakeDataSource = Record<string, FakeORM<DBModel>>;
