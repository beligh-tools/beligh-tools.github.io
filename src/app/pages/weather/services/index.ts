import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

const dayjsInstance = dayjs();
export type Dayjs = typeof dayjsInstance;
export { dayjs };

export * from './db';
export * from './countries';
export * from './weather.service';
