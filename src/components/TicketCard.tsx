import React from 'react';
import { Alert, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Ticket } from '../network/taskClient';
import moment from 'moment';
import { DateHelper } from '../utils/dateHelper';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/features/ticketSlice';
import { Link } from 'react-router-dom';

export type TicketCardProps = {
	tickets: Ticket[];
};

function TicketCard({ tickets }: TicketCardProps) {
	// bir aksiyonun tetiklenmesi için useDispatch hook kullanırız.
	const dispatch = useDispatch<AppDispatch>();
	const ticketState = useSelector((state: RootState) => state.ticketState);

	const isSelected = (ticketId: string) => {
		if (ticketState.items.find((x) => x.id == ticketId)) {
			return true;
		}

		return false;
	};

	return (
		<div className='mt-3 d-flex flex-row flex-wrap'>
			<div style={{ width: '100vw' }}>
				{ticketState.succeeded && (
					<Alert variant='success'>{ticketState.status}</Alert>
				)}
				{ticketState.succeeded == false && (
					<Alert variant='warning'>{ticketState.status}</Alert>
				)}
			</div>
			{tickets.map((ticket: Ticket) => {
				return (
					<Card
						key={ticket.id}
						className='p-2 m-3'>
						<Card.Body
							className={
								isSelected(ticket.id)
									? 'bg-warning text-dark'
									: 'bg-white'
							}>
							<Card.Title className='text-primary'>
								Görev Sahibi:
								<br></br>
								<small className='text-muted'>
									{ticket.employeeName}
								</small>
							</Card.Title>
							<Card.Text className='text-secondary'>
								{ticket.description}
							</Card.Text>
							<Card.Text>
								<Button
									onClick={() => {
										// dispatch ile redux üzerinden action tetikleriz.
										dispatch(add(ticket));
									}}
									variant='secondary'>
									{' '}
									Yapılacak Listesine Ekle{' '}
								</Button>
							</Card.Text>
							<Card.Text>
								<Link to={`/ticket-detail/${ticket.id}`}>
									Detay
								</Link>
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className='text-muted'>
								{moment(ticket.startDate).format(
									'DD/MM/YYYY HH:mm'
								)}
								-{DateHelper.formatDate(ticket.endDate)}
							</small>
						</Card.Footer>
					</Card>
				);
			})}
		</div>
	);
}

export default TicketCard;
