
// // SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Tickets{
  address payable public admin;
  mapping (address => mapping(uint => uint)) owners_quantity;
  mapping (uint => uint) avaiable_tickets;
  mapping (uint => Params) cities;

struct Params{
  bytes name;
  bytes description;
  uint price;
  bytes picture;
}

//0 geneva, 1 austin, 2 zurich, 3 los angeles
  uint[] PRICES = [100000000000000000 wei, 
                   200000000000000000 wei,
                   300000000000000000 wei,
                   400000000000000000 wei];
  
  constructor() {
    admin = payable(msg.sender);
    // setting amount of tickets
    avaiable_tickets[0] = 10; //geneva
    avaiable_tickets[1] = 10; //austin
    avaiable_tickets[2] = 10; //zurich
    avaiable_tickets[3] = 10; //los angeles
  }

 /*
  Adding new cities to consumers buy tickets
  only admin
 */
  function addNewCity(bytes memory _name, bytes memory _description, uint memory _price, bytes memory _picture) external {
    require(msg.sender == admin, 'only admin!');
    cities[]
  }

  function buyTicket(uint _qtd, uint _city_id)payable external{
    require(avaiable_tickets[_city_id] >= _qtd, 'not enough tickets for this city');
    require(msg.value == PRICES[_city_id] * _qtd, 'Payment must be the right one, check them up');

    avaiable_tickets[_city_id] -= _qtd;
    owners_quantity[msg.sender][_city_id] += _qtd;
  }
  
  
  //amount of each city
  function getTicketsAmount(uint _city_id) view external returns(uint){
    
    return avaiable_tickets[_city_id];
  }
  
  //amount of my tickets 
  function getMyTicketsAmount(uint _city_id) view external returns(uint){
    
   return owners_quantity[msg.sender][_city_id];
  }
  
  /*
    supplying more tickets to determined city
    only admin
  */
  function addMoreTickets(uint _city_id, uint _qtd) external {
      require(msg.sender == admin);
      avaiable_tickets[_city_id] += _qtd;
  }
  
  function spendTicket(uint _city_id, uint _qtd) external{
      require(owners_quantity[msg.sender][_city_id] >= _qtd, 'You must have at least the amount of tickets you claim');
      owners_quantity[msg.sender][_city_id] -= _qtd;
  }
  
  
  function widrawFunds() external{
    require(msg.sender == admin);
    admin.transfer(address(this).balance);
    
    }

//   modifier onlyAdm{
//       require(msg.sender == admin);
//       _;
//   }


}
