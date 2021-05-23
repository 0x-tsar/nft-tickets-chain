import React, { Component, useState, useEffect, setState } from 'react';
import getBlockchain from './ethereum.js';
import axios from 'axios';
import Header from './Header.js';
import { ethers } from 'ethers';

class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      tickets_contract: null,
      places: [],
      cities: [],
      avaiable_tickets: [],
      city_quantity: 0,
      loading: true
    }

    this.buyTicket = this.buyTicket.bind(this)
    this.card = React.createRef();
    // this.tipImageOwner = this.tipImageOwner.bind(this)
    // this.tipImageBronze = this.tipImageBronze.bind(this)
    // this.tipRealBronze = this.tipRealBronze.bind(this)
    // this.captureFile = this.captureFile.bind(this)
  }

  async componentWillMount() {
    // await this.loadWeb3()
    // await this.loadBlockchainData()

   

 

      this.reload()
    }



    async reload(){
      const { tickets, provider } = await getBlockchain();
      this.setState({account: provider.provider.selectedAddress});
      this.setState({tickets_contract: tickets});
      
      const a = await this.state.tickets_contract.cities_quantity.call();
      const quantity = parseInt(a);
          
      for(let i=0;i<quantity;i++){
        const city = await this.state.tickets_contract.cities(i);
        this.setState({
        cities: [...this.state.cities, city]
      })



    //   contract.on("Transfer", (to, amount, from) => {
    //     console.log(to, amount, from);
    // });

      // tickets.on('block', (block)=>{
      //   console.log(block);
      // }) 
// Subscribe to event calling listener when the event occurs.

  
      // const avaiable = await this.state.tickets.avaiable_tickets(i);
      // this.setState({
      //   avaiable_tickets
      // })
  
      // let wei = ethers.utils.parseEther(this.state.cities[0].price.toString())
      // let wei = ethers.utils.formatEther(this.state.cities[0].price.toString())
      // console.log(this.state.cities[0].price.toString());
      // console.log(wei);
      
      // let originalText = ethers.utils.parseBytes32String(bytes32)
      // "Hello World!"
   
    }
    
    // this.setState({tickets.})
      //nft.tokenURI returns the BaseURL from the standard NFT and also append the 'id' of the token you are searching
      // const tokenURI = await nft.tokenURI(0);
      // const { data } = await axios.get(tokenURI);
      // setTokenInfo(data.result);
      
      // this.state.images = []
      
      // for(let i=0;i<3;i++){
      //    const tokenURI = await nft.tokenURI(i);
      //    const { data } = await axios.get(tokenURI);
         
      //   //  this.state.images.push(...this.state.images, data.result)

      //    this.setState({
      //     images: [...this.state.images, data.result]
      //   })

      // }

      // console.log(this.state.images);

  }

  buyTicket = async (cityId) =>{

    // function buyTicket(uint _qtd, uint _city_id)payable external{
    // const valor = ethers.utils.formatEther(this.state.cities[cityId].price.toString())
    const valor = this.state.cities[cityId].price.toString();
    console.log(valor);
    // console.log(parseInt(this.state.cities[cityId].price));
      // console.log(valor);
    // console.log(`id: ${cityId}`);
    // this.state.tickets_contract.buyTicket(parseInt(cityId), valor).send({from: this.state.account, value: valor}).on('transactionHash', (hash) => {
    // console.log('working');
    // })

  //   const isTransactionMined = async(transactionHash) => {
  //     const txReceipt = await provider.getTransactionReceipt(transactionHash);
  //     if (txReceipt && txReceipt.blockNumber) {
  //         return txReceipt;
  //     }
  // }


  // const filter = {
  //   address: "0x523FC80EE9F12778449E59BFDCB982F925E8F9ea",
  //   topics: [
  //       // the name of the event, parnetheses containing the data type of each event, no spaces
  //       ethers.utils.id("Evento(address,bool)")
  //   ]

  //   }

    // this.state.tickets_contract.once(filter, () => {
    //     // do whatever you want here
    //     // I'm pretty sure this returns a promise, so don't forget to resolve it
    //     console.log(filter);
    //     console.log('it works...');

    //   this.state.cities = [];
    //   this.state.avaiable_tickets = [];
    //   this.state.city_quantity = 0;
        
    //     this.reload()
    //   })
    
    const tx = await this.state.tickets_contract.buyTicket(parseInt(1), parseInt(cityId),
   {from: this.state.account, value: valor}).then((args)=>{
      // console.log('works');
      // console.log(args);
      const hash = args.hash;
      // const teste = this.state.tickets_contract.getTransaction(hash);
      console.log(hash);
      // console.log(this.state.tickets_contract)
      this.state.tickets_contract.filters.Evento();


      
      // this.state.cities = [];
      // this.state.avaiable_tickets = [];
      // this.state.city_quantity = 0;
      // // loading: true

      // this.reload()
     
    })

    

     

    
  }


  render() {
    return (

      <div>

  <Header account={this.state.account}></Header>


    <div className='container' style={{display: "flex", marginTop:'2rem'}}>
      

      {
         this.state.cities.map((item,key)=>{
          return(
            
            <div
            ref={this.card}
            className="card" style={{width: '18rem',  marginLeft:'1rem'}} key={key}>
              <img src={item.picture} className="card-img-top" alt="..."></img>
              <div className="card-body">
              <h5 className="card-title"> {item.name}</h5>

              {
            item.description !== '' ? 
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> 
            : <p className="card-text">{item.description}</p> 
            }
        
                <a href="#" className="btn btn-primary" chave={key}
                onClick={(event)=>{
                  // console.log(event.currentTarget.attributes[2].value);
                  this.buyTicket(parseInt(event.currentTarget.attributes[2].value));
                }}
                >Buy Ticket {ethers.utils.formatEther(item.price.toString())} Ether</a>
                <h6 style={{marginTop:'0.5rem'}}>Tickets Avaiable: {item.amount.toString()}</h6>
              </div>
              {/* <div className='id_city' style={{display:'none'}}>{key}</div> */}
          </div>

            );
    
          })
      }
    
    </div>





      </div>
    );
  }
}

export default App;