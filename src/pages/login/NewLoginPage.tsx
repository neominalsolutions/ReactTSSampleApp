import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	LoginClient,
	LoginModel,
	LoginResult,
} from '../../network/loginClient';
import { Alert, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { QueryClient, useMutation } from 'react-query';
import { updateAbility } from '../../casl/Ability';
import { AbilityContext } from '../../casl/Can';
import { LocalStorageService } from '../../storage/LocalStorageService';

function NewLoginPage() {
	// register net core ortamındaki asp-for yada html name alanı, forma hangi field register edileceğini yönetir.
	// handleSubmit formun post edilmesini yönetir.
	// watch formdaki alanların valuelarını takip etmek için kullanılır
	// formState => formun güncel state verir.
	const ability = useContext(AbilityContext);
	const loginService = new LoginClient();
	const navigate = useNavigate(); // hooklar sadece function body içerisinde çağırılırlar.

	useEffect(() => {
		// const navigate = useNavigate();
		// hook içerisinde hook çağırılmaz.
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginModel>({
		defaultValues: {
			email: 'test@test.com',
			password: 'Test12345?',
		},
	});

	// POST,PUT,DELETE,PATCH isteklerin server state değiştiğinden client state değişmesi lazım bu sebep ile mutation kullanıyoruz useMutation Hook. GET işlemlerinde ise Query tercih ediyoruz useQuery
	const loginMutation = useMutation({
		mutationFn: async (formValue: LoginModel) => {
			// axios get,post,put,delete sarmalladık.
			return await loginService.login(formValue);
		},
		onSuccess: (result: LoginResult, formData: LoginModel) => {
			// gönderilen data payload bilgisi formData
			// formData post işlemi sonunda alacağımız result bilgisi
			console.log('onSuccess', result, formData);
			if (result.isSucceded) {
				updateAbility(ability, LocalStorageService.getUserInfo());
				navigate('/');
			}
		},
		onError: (result: LoginResult) => {
			// if (result.isSucceded == false) {
			// 	alert(result.errorMessage);
			// }

			console.log('onError', result);
		},
		onSettled(data, error, variables, context) {
			// loading hide işlemi yapabiliriz.
			console.log('onSettled', variables, data, error, context);
			// işlem hatalı yada hatasız sonlansada buraya girer
			// try-catch deki finally bloğu anlamına gelir
		},
		onMutate(formData: LoginModel) {
			// burada ise todo listesine yeni bir item append etmemiz gerekirse ekleme işlemini bu method içerisinde dönen sonucu göre yapıyoruz.
			console.log('listeye-eklenecek-olan-item', formData);
		},
	});

	//const queryClient = new QueryClient();

	const onSubmit: SubmitHandler<LoginModel> = async (formValue) => {
		console.log('formValue', formValue);

		// mutation üzerinden post,put,delete,patch çağırma işlemlerinde aşağıdaki gibi yönetiyoruz.
		await loginMutation.mutateAsync(formValue);
		// git todo-list cache key değerini boz yeniden refecth et.
		// queryClient.invalidateQueries(['todo-list']);

		// if (result.isSucceded) {
		// 	navigate('/');
		// } else {
		// 	alert(result.errorMessage);
		// }
	};

	return (
		<Row>
			{loginMutation.isLoading && <>... Loading</>}
			{loginMutation.isError && (
				<Alert variant={'danger'}>
					{loginMutation.error.errorMessage}
				</Alert>
			)}
			<Col
				className='m-auto'
				md={4}>
				<div className='container p-5'>
					<h1> Giriş </h1>
					<form
						method='post'
						onSubmit={handleSubmit(onSubmit)}
						noValidate>
						<input
							{...register('email', {
								required: {
									value: true,
									message: 'E-posta boş geçilemez',
								},
								validate: (value) => {
									// custom bir input validation varsa validate ile yazabiliri
									return (
										value.includes('@') ||
										'E-posta formatına uygun giriniz'
									);
								},
							})} // form name email state bağladık
							className='form-control'
							type='email'
							placeholder='email'
						/>
						<span className='text-danger'>
							{errors.email?.message}
						</span>
						<br></br>
						<input
							{...register('password', {
								required: {
									value: true,
									message: 'Parola boş geçilemez',
								},
								minLength: {
									value: 8,
									message:
										'parola en az 8 karakter olmalıdır',
								},
								validate: (value) => {
									return (
										[
											/[a-z]/,
											/[A-Z]/,
											/[0-9]/,
											/[^a-zA-Z0-9]/,
										].every((pattern) =>
											pattern.test(value)
										) ||
										'must include lower, upper, number, and special chars'
									);
								},
							})}
							className='form-control'
							type='password'
							placeholder='password'
						/>
						<span className='text-danger'>
							{errors.password?.message}
						</span>
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

export default NewLoginPage;
