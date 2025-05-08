import { ethers, network } from "hardhat";

import { saveAddress } from "./address.helpers";
import { verifyContract } from "./explorer.helpers";

const hre = require("hardhat");
const networkName = network.name;

async function main() {
  // Deploy ConduitController
  const ConduitController = await hre.ethers.getContractFactory(
    "ConduitController"
  );
  const conduitController = await ConduitController.deploy();

  await conduitController.deployed();
  saveAddress("ConduitController", conduitController.address, networkName);

  console.log("ConduitController deployed at:", conduitController.address);
  // wait for a 30 seconds
  await new Promise((resolve) => setTimeout(resolve, 30000));
  await verifyContract(conduitController.address, []);

  const conduitControllerAddress = conduitController.address;

  // Deploy Seaport
  const Seaport = await hre.ethers.getContractFactory("Seaport");
  const seaport = await Seaport.deploy(conduitControllerAddress);

  await seaport.deployed();
  saveAddress("Seaport", seaport.address, networkName);

  console.log("Seaport deployed at:", seaport.address);
  // wait for a 30 seconds
  await new Promise((resolve) => setTimeout(resolve, 30000));
  await verifyContract(seaport.address, [conduitControllerAddress]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
