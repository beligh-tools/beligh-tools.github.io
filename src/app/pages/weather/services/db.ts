import {createDbWorker} from 'sql.js-httpvfs';
import dayjs, {Dayjs} from 'dayjs';
import {SplitFileConfig} from 'sql.js-httpvfs/dist/sqlite.worker';

const workerUrl = new URL(
  'sql.js-httpvfs/dist/sqlite.worker.js',
  import.meta.url,
);

const wasmUrl = new URL(
  'sql.js-httpvfs/dist/sql-wasm.wasm',
  import.meta.url,
);

const config: SplitFileConfig = {
  from: 'jsonconfig',
  configUrl: '/assets/weather/config.json'
};

let maxBytesToRead = 10 * 1024 * 1024;

export async function workerConfig() {
  const worker: any  = await createDbWorker(
    [config],
    workerUrl.toString(),
    wasmUrl.toString(),
    maxBytesToRead
  );
  return worker;
}

export async function getCountryData(country: string) {
  const worker: any = await workerConfig();
  let dates = [];
  for (let i = 1833; i <= 2023; i++) {
    dates.push('\'' + dayjs().format(i + '-MM-DD') + '\'');
  }
  return worker.db.exec(`select * from stats where country = ? AND date IN (${dates.join(', ')})`, [country]);
}

export async function getDailyCountryData(country: string, date: Dayjs) {
  const worker: any = await workerConfig();
  return worker.db.exec(`select * from stats where country = ? AND date = ?`, [country, date.format('YYYY-MM-DD')]);
}
