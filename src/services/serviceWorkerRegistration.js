const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		window.location.hostname === '[::1]' ||
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
		),
);

export function register(config) {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
		if (publicUrl.origin !== window.location.origin) {
			// Если PUBLIC_URL отличается от текущего origin, завершить процесс.
			return;
		}

		window.addEventListener('load', () => {
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

			if (isLocalhost) {
				// Проверка Service Worker в localhost
				checkValidServiceWorker(swUrl, config);
				navigator.serviceWorker.ready.then(() => {
					console.log(
						'Это приложение работает в кэш-режиме. Подробнее: https://cra.link/PWA',
					);
				});
			} else {
				// Регистрация Service Worker для production
				registerValidSW(swUrl, config);
			}
		});
	}
}

function registerValidSW(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl)
		.then(registration => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}

				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							console.log(
								'Новое содержимое доступно, но приложение работает офлайн.',
							);

							// Опциональное уведомление пользователю
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}

							const userAcceptsUpdate = window.confirm(
								'Доступна новая версия приложения. Перезагрузить страницу, чтобы обновить?',
							);
							if (userAcceptsUpdate) {
								window.location.reload();
							}
						} else {
							console.log('Контент закеширован для оффлайн-использования.');
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch(error => {
			console.error('Ошибка при регистрации Service Worker:', error);
		});
}

function checkValidServiceWorker(swUrl, config) {
	fetch(swUrl, {
		headers: { 'Service-Worker': 'script' },
	})
		.then(response => {
			const contentType = response.headers.get('content-type');
			if (
				response.status === 404 ||
				(contentType != null && contentType.indexOf('javascript') === -1)
			) {
				navigator.serviceWorker.ready.then(registration => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				registerValidSW(swUrl, config);
			}
		})
		.catch(() => {
			console.warn(
				'Нет подключения к интернету. Приложение работает в оффлайн-режиме.',
			);
		});
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready
			.then(registration => {
				registration.unregister();
			})
			.catch(error => {
				console.error('Ошибка при аннулировании Service Worker:', error);
			});
	}
}
