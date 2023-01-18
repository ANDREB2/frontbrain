import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({box, imageUrl})=>{
	const styleBox = {
		top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol
	}
	return (
		<div className='center ma'>
			<div className='absolute mt2 img'>
				<img id='inputimage' alt='clarifai api' src={imageUrl} width='500px' heigh='auto'/>

				<div className='bounding-box' style={styleBox}>
			</div>
			</div>
		</div>
	);
}
export default FaceRecognition;