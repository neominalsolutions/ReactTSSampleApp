import React, { ReactNode } from 'react';

export type FooterProps = {
	children?: ReactNode;
};

function Footer({ children }: FooterProps) {
	return <>{children}</>;
}

export default Footer;

// Footer içinde <p></p> JSX element göndermek isityorum. Bu durumda footer component içerisine dışarıdan bir html append etmek için children:ReactNode yöntemini kullanırız. bu sayede react dışarıdan gönderilen jsx dosyanı kendi componeti içine yedirir.
