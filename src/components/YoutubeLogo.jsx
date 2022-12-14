import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const YoutubeLogo = () => {
	const theme = useTheme();

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="90" height="20" version="1.2" viewBox="0 0 90 20">
			<g>
				<path
					d="M28.7 10s0 4.7-.6 6.9c-.3 1.2-1.3 2.2-2.5 2.5-2.3.6-11.3.6-11.3.6s-8.9 0-11.2-.6C1.9 19.1.9 18.1.6 16.9 0 14.7 0 10 0 10s0-4.6.6-6.9C.9 1.9 1.9.9 3.1.6 5.4 0 14.3 0 14.3 0s9 0 11.3.6c1.2.3 2.2 1.3 2.5 2.5.6 2.3.6 6.9.6 6.9z"
					className="s0" style={{fill: '#FF0000'}}
				></path>
				<path d="M11.5 5.7l7.4 4.3-7.4 4.3z" className="s1" style={{fill: '#FFF'}}></path>
			</g>
			<g>
				<g>
					<path
						fillRule="evenodd"
						d="M41.6 18.2q-.8-.5-1.2-1.8-.3-1.2-.3-3.2v-1.8q0-2 .4-3.2.4-1.3 1.3-1.8.8-.6 2.3-.6 1.3 0 2.2.6.8.6 1.2 1.8.4 1.2.4 3.2v1.8q0 2-.3 3.2-.4 1.3-1.3 1.8-.8.6-2.3.6-1.5 0-2.4-.6zm3.2-2q.3-.6.3-2v-3.9q0-1.3-.3-1.9c-.1-.5-.4-.7-.8-.7q-.6 0-.8.7-.2.6-.2 1.9v3.9q0 1.4.2 2 .2.6.8.6.6.1.8-.6zM85.3 13.9v1.8q.1.6.3.9.2.2.7.2.7 0 .9-.4.2-.5.3-1.7l2.4.1v.5q0 1.7-.9 2.6-1 .8-2.7.8-2.1 0-2.9-1.3-.9-1.3-.9-4v-2.2q0-2.8.9-4.1.9-1.3 3-1.3 1.4 0 2.2.5.8.5 1.1 1.7.3 1.1.3 3.1v2.1h-4.7zm.3-5.9q-.2.3-.3.9v2.7h2v-.9-1.8q-.1-.7-.3-.9-.3-.3-.7-.3-.5 0-.7.3z"
						className="s2" style={{fill: theme.palette.text.primary}}
					></path>
					<path
						d="M34.7 13L31.5 1.4h2.8l1.2 5.3q.4 1.9.6 3.3h.1q.1-1 .6-3.3L38 1.4h2.8L37.6 13v5.6h-2.8V13zM57.1 6v12.6h-2.2l-.3-1.5h-.1q-.9 1.7-2.7 1.7-1.2 0-1.8-.8-.6-.8-.6-2.6V6h2.8v9.2q0 .9.2 1.2.2.4.6.4.4 0 .7-.2.4-.2.5-.6V6zM71.6 6v12.6h-2.2l-.3-1.5q-.9 1.7-2.7 1.7-1.3 0-1.9-.8-.6-.8-.6-2.6V6h2.9v9.2q0 .9.1 1.2.2.4.7.4.3 0 .7-.2.3-.2.5-.6V6z"
						className="s2" style={{fill: theme.palette.text.primary}}
					></path>
					<path d="M64.8 3.7H62v14.9h-2.8V3.7h-2.8V1.4h8.4z" className="s2" style={{fill: theme.palette.text.primary}}></path>
					<path
						fillRule="evenodd"
						d="M81.2 11.4v1.9q0 2.8-.6 4.2-.7 1.3-2.2 1.3c-.5 0-1-.2-1.4-.4q-.7-.4-1-1h-.1l-.3 1.2h-2.3V.8H76v6.6h.1q.3-.7 1-1.2.7-.4 1.5-.4 1 0 1.5.5.6.6.9 1.7.2 1.2.2 3.4zm-2.8 1.8v-1.7q0-1.4-.1-2.3-.1-.7-.3-1.1-.2-.3-.7-.3-.4 0-.7.3-.4.4-.5.9v7.1q.1.3.4.5.3.1.7.1.4 0 .7-.3.2-.3.4-1.1.1-.8.1-2.1z"
						className="s2" style={{fill: theme.palette.text.primary}}
					></path>
				</g>
			</g>
		</svg>
	);
};

export default YoutubeLogo;
