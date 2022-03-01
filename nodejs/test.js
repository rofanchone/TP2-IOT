// const fetch = require('node-fetch');

const axios = require('axios').default;

// var data1 = fetch('http://localhost/api/capteur1');
//   fetchPromise.then(response => {
//     console.log(response);
//   });

// console.log(typeof data1);
// console.log(data1);

// data1 = fetch('http://localhost/api/capteur1');
// data1
//   .then (data => data.json()) 
//   .then (data => {
//      console.log(data)
//   })
//   .catch((error) => {
//      console.error(error)
//   })

// async function getData(url) {
//   return fetch(url).then(res => res.json());
// }

// data1 = getData('http://localhost/api/capteur1');
// console.log(data1);

// const data1 = axios.get('http://localhost/api/capteur1')
// .then(data=> console.log(data.data));
// console.log(data);


const baseURL = 'http://localhost/api/capteur1';
let y = [];
let x = [];

// var data1 = (function() {axios.get(baseURL).then((response)=>{
//     for( var i in response.data){
//      y.push( response.data[i]);
//     }
//     return y;
// });

var data1 = (function() {
    axios.get(baseURL).then((response)=>{
        for( var i in response.data){
         y.push( response.data[i]);
        }
        return y;
     
     });
})();

console.log(data1);