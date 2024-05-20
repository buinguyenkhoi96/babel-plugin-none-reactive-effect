import fs from 'fs';

const logs = [];

const logger = (fileName) => {

  return (log) => {
    logs.push(log);
    fs.writeFileSync(`logs/${fileName}.json`, JSON.stringify(logs, null, 2));
  };
};

export default logger;
