import React from 'react';
import requireAuth from './require_authentication';

const Resources =  () => {
	return (
		<div>
			Super Special Secret Recipe
			<ul>
				<li>1 Cup Pepper</li>
				<li>1 Cup Sugar</li>
				<li>1 Cup Salt</li>
			</ul>
		</div>
	);
}

export default requireAuth(Resources);