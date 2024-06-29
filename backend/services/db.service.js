import fs from 'fs';

const dbPath = './storage/db.json';

export const readOrders = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

export const writeOrders = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dbPath, jsonData, 'utf8');
};
