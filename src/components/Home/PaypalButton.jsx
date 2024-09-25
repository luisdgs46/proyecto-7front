import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PropTypes from "prop-types";

export default class PaypalButton extends React.Component {
	render() {
		const createOrder = (data, actions) => {
			return actions.order
				.create({
					purchase_units: [{
						description: 'Autos',
						amount: {
							currency_code: 'USD',
							value: this.props.valor,
						},
					}],

					application_context: {
						shipping_preference: 'NO_SHIPPING',
					},
				}).
				then(orderID => {

					return orderID;
				},
				);
		};
		const onApprove = payment => {

			console.log('The payment was succeeded!', payment);

		};
		const onCancel = data => {

			console.log('The payment was cancelled!', data);

		};
		const onError = error => {

			console.log('Error!', error);

		};
		const options = {
			'client-id': 'AcjUpD1MINOI45QUxPw04w7yepPMwir03tOUrBA9Yswl-owbHBoehYcmI9Y1V8oiPuACgt89k1tWCJ_m',
		};
		return (
			<PayPalScriptProvider options={options}>
				<PayPalButtons
					onApprove={onApprove}
					onCancel={onCancel}
					onError={onError}
					createOrder={createOrder}
				/>
			</PayPalScriptProvider>
		);
	}
}


PayPalButtons.propTypes = {   valor: PropTypes.elementType.isRequired, };