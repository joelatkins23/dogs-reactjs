import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doglists: [],
      img:'',
      title:'Dogs'
    };
  }
  ondogsclick(childname, name){    
    this.setState({'title':childname+' '+name });
    const url=(childname) ? 'https://dog.ceo/api/breed/'+name+'/'+childname+'/images/random': 'https://dog.ceo/api/breed/'+name+'/images/random';
    axios.get(url)
    .then(res => {
      const img = res.data.message;
      this.setState({'img':img });
    })
  } 
  componentDidMount() {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        const dogs = res.data.message; 
        const dogslist=[]; 
        Object.keys(dogs).map((key) => {
          const item={};
          if(dogs[key].length>0){
            dogs[key].map((catergoty_dogs) => {  
              const itemchild={};
              itemchild['name']=key;
              itemchild['childname']=catergoty_dogs;
              dogslist.push(itemchild);
            })
          }else{
            item['name']=key;
            item['childname']='';
            dogslist.push(item);
          }
         
          
        } );   
        this.setState({'doglists':dogslist });
      })
  }

  render() {
    const sidebarele = this.state.doglists ? (      
        <ul className="nav flex-column">
            {this.state.doglists.map((dogs, i) => {           
              return (<li className="nav-item" key={i} >
                <a className="nav-link " href="#" onClick={(e)=>this.ondogsclick(dogs.childname, dogs.name)} >{dogs.childname} {dogs.name}</a>
              </li> )
          })}           
        </ul>     
      ) : null; 
    return (
       <div className="container-fulid">
         <div className="header text-center">
            <h2>{this.state.title}</h2>
         </div>
         <div className="sidebar">
         {sidebarele}
         </div>
         <div className="content mt-5">
            <div className="container text-center mt-5">
                <div className="img-content">
                    <img className="image-rsponisve" src={this.state.img} alt=""/>
                </div>               
            </div>
         </div>
       </div>
    );
  }
}

export default Home;
