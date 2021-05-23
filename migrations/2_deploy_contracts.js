const Tickets = artifacts.require("Tickets");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Tickets);
};
