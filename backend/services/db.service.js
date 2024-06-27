import fs from 'fs';

const dbPath = './storage/db.json';

export const readOrders = () => {
  // const path = "../storage/db.s"
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

export const writeOrders = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dbPath, jsonData, 'utf8');
};

export const addOrder = (customerId, newOrder) => {
  const data = readOrders();

  const user = data.users.find((user) => user.customerId === customerId);

  if (user) {
    user.orders.push(newOrder);
  } else {
    data.users.push({
      customerId,
      name: 'New User',
      email: 'newuser@example.com',
      orders: [newOrder],
    });
  }

  writeOrders(data);
};
