/**
 * Функция для отправки метрик производительности приложения.
 * @param {Function} onPerfEntry - Callback-функция для обработки метрик.
 */
const reportWebVitals = onPerfEntry => {
	if (onPerfEntry && typeof onPerfEntry === 'function') {
		import('web-vitals')
			.then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
				// Отправляем метрики производительности в указанный callback
				getCLS(onPerfEntry);
				getFID(onPerfEntry);
				getFCP(onPerfEntry);
				getLCP(onPerfEntry);
				getTTFB(onPerfEntry);
			})
			.catch(error => {
				console.error('Ошибка при загрузке web-vitals:', error);
			});
	}
};

export default reportWebVitals;
