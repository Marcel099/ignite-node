import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  let choosenDatabase: string | Uint8Array;

  if (process.env.NODE_ENV === "test") {
    choosenDatabase = "rentx_test";
  } else {
    choosenDatabase = defaultOptions.database;
  }

  return createConnection(
    Object.assign(defaultOptions, {
      database: choosenDatabase,
    })
  );
};
