import { ethers, Contract } from 'ethers';
import Tickets from './contracts/Tickets.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {

    window.addEventListener('load', async () => {
      
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const tickets = new Contract(
          Tickets.networks[window.ethereum.networkVersion].address,
          Tickets.abi,
          signer
        );

        resolve({tickets, provider});
      }
      resolve({provider: undefined});
      resolve({tickets: undefined});
    });

  });

export default getBlockchain;
