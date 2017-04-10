import React from 'react';
import chai from 'chai';
import { renderIntoDocument } from 'react-addons-test-utils';
import LoginPage from './Login';

describe('render LoginPage', () => {
	it('should render login page', () => {
		const LoginPage = renderIntoDocument(
			<LoginPage />
		)
		
		chai.assert.isDefined(LoginPage, "work");
	})
})