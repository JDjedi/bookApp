
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/client/app';

Meteor.startup(() => { // call-back function
	render(<App />, document.getElementById('render-root'));
});

