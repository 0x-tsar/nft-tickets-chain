
// // SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Tickets{
  address payable public admin;
  mapping (address => mapping(uint => uint)) owners_quantity;
  mapping (uint => uint) public avaiable_tickets;
  mapping (uint => Params) public cities;
  uint public cities_quantity = 4;

struct Params{
  string name;
  string description;
  uint price;
  string picture;
  uint amount;
}

//0 geneva, 1 austin, 2 zurich, 3 los angeles
  uint[] PRICES = [100000000000000000 wei, 
                   100000000000000000 wei,
                   200000000000000000 wei,
                   200000000000000000 wei];

  event Evento (address caller, bool update);
  
  constructor() {
    admin = payable(msg.sender);
    // setting amount of tickets
    // redundant fix it later
    avaiable_tickets[0] = 10; //geneva
    avaiable_tickets[1] = 10; //austin
    avaiable_tickets[2] = 10; //zurich
    avaiable_tickets[3] = 10; //los angeles  

    cities[0] = Params({
      name:'Geneva - Switzerland',
      description:'',
      price: 100000000000000000 wei,
      picture: 'http://2.bp.blogspot.com/-FtDOe2XYNvg/UvazJl9CCFI/AAAAAAAALA8/oP3qBmQzlvE/s1600/Z%C3%BCrich1.jpg',
      amount: 10
    });

    cities[1] = Params({
      name:'Austin - Texas',
      description:'',
      price: 100000000000000000 wei,
      picture: 'https://images.thinkadvisor.com/contrib/content/uploads/sites/415/2019/12/2019-12-12-austin-texas_Shutterstock_MI.jpg',
      amount: 10
    }); 
    
    cities[2] = Params({
      name:'Zurich - Switzerland',
      description:'',
      price: 200000000000000000 wei,
      picture: 'https://www.euandopelomundo.com/wp-content/uploads/2018/06/o_que_fazer_em_zurique_11.jpg',
      amount: 10
    }); 
    
     cities[3] = Params({
      name:'Los Angeles - California',
      description:'',
      price: 200000000000000000 wei,
      picture: 'https://california.onegoviaja.com/wp-content/uploads/2019/12/tudo-sobre-los-angeles-1140x694.jpg',
      amount: 10
    }); 
    
 
  

  }

 /*
  Adding new cities for consumers buy tickets
  only admin
 */
  // function addNewCity(bytes memory _name, bytes memory _description, uint memory _price, bytes memory _picture) external {
  //   require(msg.sender == admin, 'only admin!');
  // }

  function buyTicket(uint _qtd, uint _city_id)payable external{
    require(avaiable_tickets[_city_id] >= _qtd, 'not enough tickets for this city');
    require(msg.value == PRICES[_city_id] * _qtd, 'Payment must be the right one, check them up');

    //also change Params.amount here, remove amount.
    cities[_city_id].amount -= _qtd;
    avaiable_tickets[_city_id] -= _qtd;
    owners_quantity[msg.sender][_city_id] += _qtd;

    emit Evento(msg.sender, true);
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
