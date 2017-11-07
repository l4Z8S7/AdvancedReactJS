export default function({dispatch}) {
	return next => action => {
		//if action does not have payload or the payload does not have then property, just send it on
		if (!action.payload || !action.payload.then) {
			return next(action);
		}

		//make sure the action's promise resolved
		action.payload
		.then(res => res.json())
		.then(data => dispatch({...action, payload: data}));
	}
}