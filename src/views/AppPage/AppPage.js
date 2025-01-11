import React, { useEffect } from 'react';
import './AppPage.styles.css'; // Убедитесь, что файл существует

function App() {
	useEffect(() => {
		let deferredPrompt;

		const handleBeforeInstallPrompt = e => {
			e.preventDefault();
			deferredPrompt = e;

			const installButton = document.getElementById('install-button');
			if (installButton) {
				installButton.style.display = 'block';
				installButton.addEventListener('click', () => {
					deferredPrompt.prompt();
					deferredPrompt.userChoice.then(choiceResult => {
						if (choiceResult.outcome === 'accepted') {
							console.log('User accepted the install prompt');
						} else {
							console.log('User dismissed the install prompt');
						}
						deferredPrompt = null;
					});
				});
			}
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			);
		};
	}, []);

	return (
		<div style={{ color: '#d7ebbe', backgroundColor: '#256068' }}>
			<h1>
				SpotBot приложение для поиска свободного места находится в разработке
			</h1>
		</div>
	);
}

export default App;
