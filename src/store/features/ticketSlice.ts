// slice uygulamadaki client state değiştiren yöneten kod parçalarıdır.

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../../network/taskClient';

export interface TicketState {
	items: Ticket[];
	succeeded?: boolean | undefined;
	status: 'SameExist' | 'Added' | '';
}

// yani state ilk uygulama load olduğunda aşağıdaki initial değerler üzerinden çalışsın
const initialState: TicketState = {
	items: [],
	succeeded: undefined,
	status: '',
};

// createSlice function ile action ve redurcerlar tek bir yerden yönetilebiliyorr
export const ticketSlice = createSlice({
	name: 'ticket', // unique bir slice ismi state güncellenirken buradaki isim üzerinden güncellenecek
	initialState,
	reducers: {
		add: (state: TicketState, action: PayloadAction<Ticket>) => {
			const isExist = state.items.find((x) => x.id == action.payload.id);

			if (isExist == undefined) {
				state.items.push(action.payload);
				state.status = 'Added';
				state.succeeded = true;
			} else {
				state.status = 'SameExist';
				state.succeeded = false;
			}

			// güncellenmiş state değerini döndür.
			return state;
		},
		remove: (state: TicketState, action: PayloadAction<string>) => {
			return state;
		},
	},
});

export const { add, remove } = ticketSlice.actions; // actionlarda componentler üzerinden state değiştirmek için çağırılır bu sebepten dolayı actionlarımızda export ettik.
export default ticketSlice.reducer; // reducer ile store bağlantılı olmak zorundadır. Store state değişimini reducer üzerinden takip eder o yüzden store dosyasında reducerları tanıtmamız gerektiği için burada export ettik.
