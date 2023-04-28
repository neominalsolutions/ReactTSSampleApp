import { resolve } from 'path';
import React, { useEffect } from 'react';

function Promises() {
	// ticketsları get
	// p1 1 saniye beklemeli çalısın
	const p1 = new Promise((resolve, reject) => {
		// yapılacak işlemler apidan veri çek yada bir kaç operasyon yap.

		setTimeout(() => {
			resolve('promise-1');
		}, 1000);
	});

	// employee get
	const p2 = new Promise((resolve, reject) => {
		resolve('promise-2');
	});

	useEffect(() => {
		p1.then((response) => {
			console.log('p1', response);
			// setState() yap
		}).catch((err) => {
			console.log('p-1 err', err);
		});

		p2.then((res) => {
			console.log('p2', res);
		}).catch((err) => {
			console.log('p2-err', err);
		});

		// promiselerde birden fazla then ile response değiştirebiliriz.

		p1.then((response) => {
			// response transform edilebilir.
			return { message: response };
		}).then((message) => {
			console.log('message', message);
		});

		// promiseler birleştirilip zincir halinde yazılabilir. promise chain

		p1.then((res) => {
			console.log('zincirin ilk halkası', res);
			// p1 isteği resolve olmadan p2 istedeiğine geçme
			// promisleri sıralı bir şekilde iç içe çalıştırmak için bir teknik.
			// p1 isteğinden sonra p2 döndürdük
			return p2;
		}).then((p2Response) => {
			console.log('zincirin ikinci halkası', p2Response);
		});

		// sıralı bie şekilde zincir kodu yazmak için aşağıda 2 yöntem mevcut

		// api isteklerini promise ise sarmallama.
		var p11 = new Promise((resolve, resject) => {
			let response = {
				users: [],
				todos: [],
				comments: [],
			};
			// 1.yöntem
			const api1 = fetch('https://jsonplaceholder.typicode.com/users')
				.then((api1Res) => {
					// console.log('userRequest', api1Res.json());

					api1Res.json().then((data: any) => {
						response.users = data;
					});

					return fetch('https://jsonplaceholder.typicode.com/todos');
				})
				.then((api2Res) => {
					// console.log('api2Res', api2Res.json());

					api2Res.json().then((data: any) => {
						response.todos = data;
					});
					return fetch(
						'https://jsonplaceholder.typicode.com/comments'
					);
				})
				.then((api3Res) => {
					api3Res.json().then((data: any) => {
						response.comments = data;
					});

					return api3Res;

					// console.log('api3Res', api3Res.json());
				});

			resolve(response);
		}).then((response) => {
			console.log('all-res', response);
		});

		//2.yöntem
		// fetch('1api').then((response) => {
		// 	fetch('2api').then((response2) => {
		// 		fetch('3api');
		// 	});
		// });

		//3.yöntem

		const api1 = fetch('https://jsonplaceholder.typicode.com/users');

		const api2 = fetch('https://jsonplaceholder.typicode.com/todos');

		const api3 = fetch('https://jsonplaceholder.typicode.com');

		// not:sıralı işlemlerde birden fazla kaynaktan veri çekme ihtiyacı olursa tüm bu kayanakalardaki veriler promise all ile çözebiliriz.

		const pAll = Promise.all([api1, api2, api3]);

		pAll.then((response) => {
			console.log('response', response);
		});

		// ES7 ile birlikte artık senkron kodlar gibi yazılan async await yapına döndük.

		const fetchAsync = async () => {
			// async await yapıları async keyword ile işaretlenmiş function içerisinde kullanılabilir.
			// senkron bir şekilde çalıştık.
			try {
				let res1 = await (await api1).json();
				console.log('res1', res1);
				let res2 = await (await api2).json();
				console.log('res2', res2);
				let res3 = await (await api3).json();
				console.log('res3', res3);
			} catch (error) {
				console.log('err', error);
				// yukarıdaki api isteklerinden birinde hata meydana gelirse catch düşer
			} finally {
				// hata olsun olmasın yapılacak işlemler.
			}
		};

		fetchAsync(); // çağırdık
	}, []);

	return <div>Promises</div>;
}

export default Promises;
