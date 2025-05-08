import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const saveAddress = (
  name: string,
  address: string,
  networkName: string
) => {
  console.log(
    `Updating ${name} address on ${networkName} with value ${address}.`
  );

  const filename = join(__dirname, `../data/addresses.json`);

  const newAddresses = JSON.parse(readFileSync(filename, "utf8"));

  newAddresses[networkName][name] = address;

  writeFileSync(filename, JSON.stringify(newAddresses, null, 2));
};
