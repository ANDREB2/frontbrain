import React from 'react';

const Navigation = ({onRouteChange, isSigned}) =>{
	if(isSigned){
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className='tc black f3 link dim underline pa3 pointer'>
				 Sing Out 
				</p>
			</nav>
		);
	}else{
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='tc black f5 link dim underline pa3 pointer'>
				 Sing In 
				</p>
				<p onClick={() => onRouteChange('register')} className='tc black f5 link dim underline pa3 pointer'>
				 Register 
				</p>
			</nav>
		);
	}
	
}

export default Navigation;