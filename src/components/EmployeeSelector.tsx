import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export interface IEmployee {
	id: string;
	fullName: string;
}

// propslar içerisinde event ve property olabilir.
export type EmployeProps = {
	employees: IEmployee[];
	onSelected(id: string): void; // event fırmatma şekli
};

function EmployeeSelector({ employees, onSelected }: EmployeProps) {
	const onEmployeeSelect = (event: any) => {
		console.log('id', event.target.value);
		// componentin OnSelected Props'unu tetikle event gönderme yöntemi.
		onSelected(event.target.value);
	};

	// employees varsa kontrolü ile arayüzü doldur yaptık
	// employees && undefined değilse demek, scomponente object basarken mantıklı faka dizi varsa length kontrolü yapalım.

	return (
		<Row className='p-4 me-5'>
			<Col md={6}></Col>
			<Col md={6}>
				<label>
					<b className='text-secondary'>Çalışanlar</b>
				</label>
				<Form.Select
					className='mt-3'
					onChange={(event: any) => onEmployeeSelect(event)}
					size='lg'>
					<option value={'tümü'}>Tümü</option>
					{employees.map((emp: IEmployee) => {
						return (
							<option
								key={emp.id}
								value={emp.id}>
								{emp.fullName}
							</option>
						);
					})}
				</Form.Select>
			</Col>
		</Row>
	);
}

export default EmployeeSelector;
