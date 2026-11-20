// Данные вакансий вынесены в JSON — редактируются через админку (/admin),
// которая коммитит изменения в этот файл через GitHub API.
// Формат карточки: см. существующие записи. cities: ["msk" | "spb"] для фильтра.
import vacanciesData from './vacancies.json';

export const vacancies = vacanciesData;
