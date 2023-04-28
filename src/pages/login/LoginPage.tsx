import React, { useState } from 'react';
import {
	LoginClient,
	LoginModel,
	LoginResult,
} from '../../network/loginClient';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

function LoginPage() {
	const navigate = useNavigate(); // react-router-dom dana gelen hook ile ts den yönlendirme yapılabilir

	const loginService = new LoginClient();
	let [formState, setFormState] = useState<LoginModel>({
		email: 'test@test.com',
		password: 'Test12345?',
	});

	// login service async olduğundan form post methodunu da async tanımladık.
	// LoginResult değerine göre başarılı ise anasayfaya yönlendir. başarılı değilse  hatayı alert verdik.
	const onSubmit = async (event: any) => {
		event.preventDefault(); // formun post edilmesini engelliyoruz
		const result: LoginResult = await loginService.login(formState);

		if (result.isSucceded) {
			navigate('/');
		} else {
			alert(result.errorMessage);
		}
	};

	// formu gönderirken html5 validayonlara takılmaması için noValidate yazık

	return (
		<Row>
			<Col
				className='m-auto'
				md={4}>
				<div className='container p-5'>
					<h1> Giriş </h1>
					<form
						method='post'
						onSubmit={onSubmit}
						noValidate>
						<input
							defaultValue={formState?.email}
							className='form-control'
							type='email'
							placeholder='email'
							onChange={(event) =>
								setFormState({
									...formState,
									email: event.target.value,
								})
							}
						/>
						<br></br>
						<input
							defaultValue={formState.password}
							className='form-control'
							type='password'
							placeholder='password'
							onChange={(event: any) =>
								setFormState({
									...formState,
									password: event.target.value,
								})
							}
						/>
						<br></br>
						<div className='d-flex flex-row'>
							<input
								className='btn btn-success ms-auto'
								type='submit'
								value='Oturum Aç'
							/>
						</div>
					</form>
				</div>
			</Col>
		</Row>
	);
}

export default LoginPage;
