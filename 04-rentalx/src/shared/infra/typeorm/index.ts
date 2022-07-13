import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  let choosenHost: string;
  let choosenDatabase: string | Uint8Array;

  if (process.env.NODE_ENV === "test") {
    choosenHost = "localhost";
    choosenDatabase = "rentx_test";
  } else {
    choosenHost = host;
    choosenDatabase = defaultOptions.database;
  }

  return createConnection(
    Object.assign(defaultOptions, {
      host: choosenHost,
      database: choosenDatabase,
    })
  );
};
