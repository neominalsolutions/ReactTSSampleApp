import React from 'react';
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Ticket } from '../network/taskClient';
import moment from 'moment';
import { DateHelper } from '../utils/dateHelper';

export type TicketCardProps = {
	tickets: Ticket[];
};

function TicketCard({ tickets }: TicketCardProps) {
	return (
		<div className='mt-3 d-flex flex-row flex-wrap'>
			{tickets.map((ticket: Ticket) => {
				return (
					<Card
						key={ticket.id}
						className='p-2 m-3'>
						<Card.Body className='bg-light'>
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
								<Button variant='secondary'>
									{' '}
									Yapılacak Listesine Ekle{' '}
								</Button>
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
