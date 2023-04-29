import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket, TicketClient } from '../../network/taskClient';
import { Controller, useForm } from 'react-hook-form';
import Input from '@mui/material/Input';
import { Alert, Button, Stack } from '@mui/material';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

function TicketDetailPage() {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Ticket>({
		defaultValues: {
			description: '',
			employeeName: '',
		},
	});
	const onSubmit = (data: any) => {
		console.log('data', data);
	};

	const param = useParams();

	const ticketClient = new TicketClient();

	useEffect(() => {
		ticketClient.getTicket(param?.id as string).then((response: Ticket) => {
			setValue('description', response.description);
			setValue('employeeName', response.employeeName);
		});
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2}>
				<Controller
					name='description'
					control={control}
					rules={{
						required: true,
						minLength: {
							value: 10,
							message: 'Min 10 karakter olmalıdır',
						},
					}}
					render={({ field }) => <Input {...field} />}
				/>
				<Alert severity='error'>{errors.description?.message}</Alert>

				<Controller
					name='employeeName'
					control={control}
					render={({ field }) => <Input {...field} />}
				/>

				<Button
					type='submit'
					variant='contained'>
					Gönder
				</Button>
			</Stack>
		</form>
	);
}

export default TicketDetailPage;
