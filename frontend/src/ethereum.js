import { ethers, Contract } from 'ethers';
import NFT from './contracts/NFT.json';

// console.log(NFT);
// NFT.networks[window.ethereum]
// NFT.networks[window.ethereum.networkVersion].address,

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {

      // console.log(NFT.networks);

      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const nft = new Contract(
          NFT.networks[5777].address,
          NFT.abi,
          signer
        );

        resolve({nft});
      }
      resolve({nft: undefined});
    });
  });

export default getBlockchain;
