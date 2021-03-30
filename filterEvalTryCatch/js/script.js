// Функция которое отвечае за проверку по данным введёное в инпут и сравнением с типом данных.
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

// Функция отвечающая за первичное состояние результата до нажатии кнопки Фильтрования.
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
// Функция отвечающая за появление результата и вывода диалога взависимости от содержания (Ок, error или когда ещё нету результата).
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// Функция отвечающая за первичное состояние результата до нажатии кнопки.
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		// Условие при котором будет выводиться текст в результат.
		if (spanSelector) {
			// Вывод текста на страницу в зависимости от showError или showResults.
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// Функция которая покажет ошибку.
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// Функция которая покажет если нету ошибок. 
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// Функция которая не показывает результат.
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// Фукция которая отработает тип с данными.
	tryFilterByType = (type, values) => {
		// Метод защищает работу всего кода, вслучае если в try произойдёт ошибка, код продолжит свою работу.
		try {
			// Отработка вывода результата взависимости когда будет необходимый тип или отсутствие его.
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
// При ошибке в try, запуститься функция showError которая покажет ошибку. 
			showError(`Ошибка: ${e}`);
		}
	};
// Перменная которую получаем для кнопки.
const filterButton = document.querySelector('#filter-btn');
// Кнопка filterButton которая запускает событие click (Нажатие).
filterButton.addEventListener('click', e => {
	// Селект в котором выбираем нам тип на проверку.
	const typeInput = document.querySelector('#type');
	// Инпут в которой вводим данные.
	const dataInput = document.querySelector('#data');
// Условие при котором не должно отрабатывать при пустом инпуте (строке ввода).
	if (dataInput.value === '') {
		// Появления валидации которую мы получим если вдруг будет пустой инпут.
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// Сработает фукнция которая не покажет результат.
		showNoResults();
		// Обратное условие при котором не сработает всё то что перечисленно выше в if.
	} else {
		// Если не сработает dataInput.setCustomValidity('Поле не должно быть пустым!'); то должно сработать dataInput.setCustomValidity('');
		dataInput.setCustomValidity('');
		// Если событие не обрабатывается как надо, то его действие по умолчанию не должно выполниться как обычно (Обычно перезагружается страница).
		e.preventDefault();
		// Фукция которая отработает тип с данными которые получаем через выбранный нам select и ввод в input.
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

