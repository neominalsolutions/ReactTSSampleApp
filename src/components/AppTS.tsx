import React from 'react';
import logo from './logo.svg';
import './App.css';

// ts de interfaceler apidan çekilecek olan nesnelerin modellerini oluşturmak için tercih ediliyor
export interface IPerson {
	firstname: string; // required
	middlename?: string; // optional
	lastname: string;
}

export interface IContact {
	email: string;
	website?: string;
}

// type tanımı yapara & ile her iki model üzerinde nesnelerin propertylerini Person tipi olarak birleştiridik.
// arayüzden birden fazla interface ait property ihtiyacımı varsa type tanımı yaparak birleştirebiliriz.
// type1 & type2 (intersect) iki tipin birleşimi
// let variable = string | number; // tip atanırken ya string tipinde olur yada number tipinde olur (Union Type)
export type Person = IPerson & IContact;

// deafult da ts de üyeler access modifier private,public,protected tanımlanmadığı sürece public kabul edilir.
export abstract class FormControl {
	readonly text: string;

	constructor(text: string) {
		debugger;
		this.text = text;
	}

	abstract validate(): void;

	// virtual tanımlanmış base method
	do(): void {}
}

export interface IClickable {
	click(): void;
}

// extends keyword ile kalıtım aldık
// implements ile interface üzerinden özellikleri uyguladık.
// ts enum değerleri string bir karşılık alabilir illaki int bir sayı vermemize gerek yok
export enum ButtonTypes {
	Circle = 'circle',
	Outline = 'outline',
	RoundedCorner = 'rounded',
}

// static class ButtonTypes {
//   static const string Circle= 'circle';
// }

// ButtonTypes.Circle;

type backgroundColor = 'red' | 'blue' | 'gray' | 'yellow';
export class Button extends FormControl implements IClickable {
	//TypeScript String Literal Types
	// c# da olmayan bir özellik
	bgColor: backgroundColor = 'red';
	type!: ButtonTypes; // type sonuna ! koyduğumuzda bu tipe default bir değer ataması yapmadığımız şuan için type undefined olarak tanımlandığı anlamına gelir.(Tek satırda Union Type yazdık)
	type2: ButtonTypes | undefined; // ya button tipindedir yada undefined tanımsızdır. undefined değişken bir değer ataması yapılmadığı anlamına gelir. // yukarıdaki ! yazım şekli ile bu yazım şekli arasında bir fark yok. sadece uzun hali. (Union Type)
	constructor(text: string) {
		debugger;
		super(text); // base class FormControlün constructor'a text değerini gönderdi.
	}

	click(): void {
		alert('Tıklandı');
	}

	// ovveride ettik
	validate(): void {
		throw new Error('Method not implemented.');
	}

	// buttonda basedeki do ile aynı isimde bir method tanımladık ovveride ettik
	override do(): void {
		debugger;
		// kendi logic işlemlerimizi yapıp
		// base.do methodunda tetikledik.
		super.do();
	}
}

function AppTS() {
	let num: number | string = '324324'; // union type birleşik tip
	let nums: Array<number> = [1, 2];

	const add = (a: number, b: number): number => a + b;
	const p: Person = {
		firstname: 'Ali',
		lastname: 'Can',
		email: 'ali@test.com',
	};

	//function kullanırken opsiyonel parametreler sonda tanımlanmalıdır
	// opsiyonel bir değerden sonra default atanımş bir değeri tanımlayabiliriz.
	// d:number = 10 default değer atama kullanım şekli
	const avg = (a: number, b: number, c?: number, d: number = 10): number => {
		if (c === undefined) {
			return (a + b + d) / 3;
		} else {
			return (a + b + c + d) / 4;
		}
	};

	avg(3, 2); // 5
	// opsiyonel bir değerden önce default parametre tanımı yapılabilir.
	const avg2 = (a: number, b: number, d: number = 10, c?: number): number => {
		if (c === undefined) {
			return (a + b + d) / 2;
		} else {
			return (a + b + c + d) / 4;
		}
	};

	// sonsuz sayıda parametre ile çalışacak isek bu durumda rest operator kullanırız.
	// params string[] numbers c# daki karşılığı
	const avg3 = (...params: number[]): number => {
		console.log('params', params);
		return params[0];
	};

	avg3(1, 2, 4, 5, 6, 7, 8, 9); // 1

	const btn = new Button('btn1');
	// btn.Text = 'ww4324';
	btn.type = ButtonTypes.Circle;
	btn.bgColor = 'yellow';
	btn.click();
	btn.do();

	// const f = new FormControl();

	return (
		<div className='App'>
			<header className='App-header'>
				<img
					src={logo}
					className='App-logo'
					alt='logo'
				/>
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default AppTS;
