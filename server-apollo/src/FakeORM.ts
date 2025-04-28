import DataLoader from "dataloader";
import { GraphQLError } from "graphql";
import { v4 as uuidv4 } from "uuid";

export interface DBModel {
  id: string;
}

export class FakeORM<T extends DBModel> {
  constructor(private modelName: string, private data: T[]) {}

  findById(id: string): T | undefined {
    console.log("findById", this.modelName, id);
    const d = this.data.find((item) => item.id === id);
    if (!d) {
      throw new GraphQLError("Not Found");
    }
    console.log("useeeeer", d);
    return d;
  }

  findByIds(ids: string[]): T[] {
    console.log("findByIds", this.modelName, ids);
    return this.data.filter((item) => ids.includes(item.id));
  }

  findMany(
    filter?: Partial<T> | Partial<T>[],
    options?: { limit?: number; offset?: number },
    hideLog?: boolean
  ): T[] {
    if (!hideLog) console.log("findMany", this.modelName, filter);
    const limit = options?.limit || 100;
    const offset = options?.offset || 0;
    if (!filter) return this.data.slice(offset, offset + limit);

    if (!Array.isArray(filter)) filter = [filter];

    return this.data
      .filter((item) => {
        return filter.some((filter) =>
          Object.keys(filter).every((key) => {
            return (
              !filter[key as keyof T] ||
              item[key as keyof T] === filter[key as keyof T]
            );
          })
        );
      })
      .slice(offset, offset + limit);
  }

  create(input: Omit<T, "id">): T {
    const object: T = {
      id: uuidv4(),
      ...input,
    } as T;
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
    return this.findMany(filter, undefined, true).length;
  }
}

export type FakeDataSource = Record<string, FakeORM<DBModel>>;

export const getDataLoader = <T extends DBModel>(orm: FakeORM<T>) =>
  new DataLoader<string, T>(async (ids: string[]) => {
    const items = orm.findByIds(ids);
    const itemIdToItem = items.reduce((mapping, item) => {
      mapping[item.id] = item;
      return mapping;
    }, {} as Record<string, T>);
    return ids.map((id) => itemIdToItem[id]);
  });

export const getForeignDataLoader = <T extends DBModel>(
  orm: FakeORM<T>,
  foreignKey: keyof T
) =>
  new DataLoader<string, T[]>(async (foreignIds: string[]) => {
    const items = orm.findMany(
      foreignIds.map((id) => ({ [foreignKey]: id } as Partial<T>))
    );
    const itemIdToItem = items.reduce((mapping, item) => {
      const key = item[foreignKey] as string;
      if (!mapping[key]) {
        mapping[key] = [];
      }
      mapping[key].push(item);
      return mapping;
    }, {} as Record<string, T[]>);
    return foreignIds.map((foreignId) => itemIdToItem[foreignId] || []);
  });
