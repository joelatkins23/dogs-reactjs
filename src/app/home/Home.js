import React, { Component } from 'react';
import axios from 'axios';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doglists: [],
      img:'',
      title:'Dogs',
      activeIndex:''
    };
  }
  ondogsclick(childname, name, index){    
    this.setState({'title':childname+' '+name });
    const url=(childname) ? 'https://dog.ceo/api/breed/'+name+'/'+childname+'/images/random': 'https://dog.ceo/api/breed/'+name+'/images/random';
  
    fetch(url)
    .then(async resp => {                   
    const data = await resp.json();
     this.setState({'img':data.message });
     this.setState({'activeIndex':index });
    })
    .catch(error => {
    this.errorMessage = error;
    console.error("There was an error!", error);
    });
  } 
  componentDidMount() {
    let uri = 'https://dog.ceo/api/breeds/list/all';
    fetch(uri)
        .then(async resp => {        
        const data = await resp.json();
        const dogs = data.message; 
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
            // dogslist=dogslist.sort(); 
            this.setState({'doglists':dogslist });
        })
        .catch(error => {
        this.errorMessage = error;
        console.error("There was an error!", error);
        });    
  }

  render() {
    const sidebarele = this.state.doglists ? (      
        <ul className="nav flex-column">
            {this.state.doglists.map((dogs, i) => {           
              return (<li className={`nav-item ${this.state.activeIndex===i? 'active' : ''}`}  key={i} onClick={(e)=>this.ondogsclick(dogs.childname, dogs.name,i)}>
                <a className="nav-link " href="#"  >{dogs.name} {dogs.childname} </a>
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
         <div className="content ">
            <div className="text-center ">
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
