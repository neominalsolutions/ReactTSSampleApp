import React, { useEffect, useState } from 'react';
import * as DOMPurify from 'dompurify';

function FileUploadPage() {
	const [file, setFile] = useState<File>();
	const [src, setSrc] = useState<string>(
		'https://images.unsplash.com/photo-1713008251875-d54f07a2c4e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	);

	useEffect(() => {
		// file state basılıp file state değiştiğine emininiz
		// upload burada yapılabilir.
		uploadFile();
	}, [file]);

	const fileChange = (event: any) => {
		// img preview işlemleri için fileReader sınıfını tercih ederiz.
		// var fileReader = new FileReader();
		// fileReader.readAsDataURL(event.target.files[0]);
		// fileReader.onload = function () {
		// 	console.log('base64', fileReader.result);
		// 	setSrc(fileReader.result as string);
		// };

		console.log('event', event);
		if (event.target.files) {
			// file
			console.log('file', event.target.files[0]);
			setFile(event.target.files[0] as File);
		}

		return;
	};

	const uploadFile = () => {
		if (!file) return;

		// sunucuya göndereceğimiz vakit formData IFormFile olarak çalışırız. sonucu ise base64 string olarak döndürürüz.
		const formData = new FormData();
		formData.append('file', file as File);

		console.log('form-data', formData);

		fetch('https://localhost:7044/api/Files/upload', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((response) => {
				// base64string
				console.log('response', response);
				setSrc(response.base64);
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	const sanitezedImage = DOMPurify.sanitize(
		`<img width="100px" height="100px" src=${src} />`
	);

	return (
		<div>
			{/* image preview işlemi için fileReader sınıfını kullanabiliriz */}

			<div dangerouslySetInnerHTML={{ __html: sanitezedImage }}></div>

			<input
				multiple={false}
				className="form-control"
				type="file"
				onChange={(event) => fileChange(event)}
			/>
			<button className="btn btn-primary" onClick={uploadFile}>
				Upload
			</button>
		</div>
	);
}

export default FileUploadPage;
