import React, {Component} from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import './reportWebVitals';
//import ConfigPerfil from './components/perfil/ConfigPerfil';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');

    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow:  clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const urlImg = fetch('http://localhost:3001/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              inputUrl: this.state.input
            })
          }).then((resp)=> resp.json())
            .then((dados)=> {
              return dados;
            });


      const visualise = ()=>{
        urlImg.then((a)=>{
          console.log('visualise',a);
        });
      }

      //visualise();

      const processa = ()=>{   
        urlImg.then(result => {
          
          const data = result;
          this.displayFaceBox(this.calculateFaceLocation(data));
          
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(entries => {
              if (entries) {
                this.setState(Object.assign(this.state.user, {entries: entries}));
              }
            })
          }).catch(error => console.log('error', error));
        }
        processa();
     
        //https://stackoverflow.com/questions/74329008/how-can-i-get-clarifai-api-to-respond-on-my-request
  }

  OnRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
      this.setState({route: route});
    }else{
      this.setState({route: route});
    }
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
     <>
        <div className="App">
          <Navigation isSigned={isSignedIn} onRouteChange={this.OnRouteChange}/>
          {route === 'home'
          ? <div>
              <Logo />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : (
              route === 'signin'
              ?<SignIn loadUser={this.loadUser} onRouteChange={this.OnRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.OnRouteChange}/>
            )

          }
        </div>
        
        <ParticlesBg type="cobweb" bg={true} />
     </>
    );
  }
}
//
export default App;
