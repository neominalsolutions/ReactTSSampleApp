import { configureStore } from '@reduxjs/toolkit';
import ticketSlice from './features/ticketSlice';

export const store = configureStore({
	reducer: {
		ticketState: ticketSlice, // store ticketState yönetebilmek için slice bağlarız. Burada istediğimiz kadar slice ile çalışabilir.
		// counterState:counterSlice
	},
});

// Uygulamadaki tüm stateleride RootState denilen type üzerinden kullanacağız.
export type RootState = ReturnType<typeof store.getState>;
// Actionları AppDispatch tipinde kullanıcaz
export type AppDispatch = typeof store.dispatch;
