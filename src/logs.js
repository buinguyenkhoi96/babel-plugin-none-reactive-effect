import fs from 'fs';

const DEBUG = false;

const logger = (fileName) => {
  const logs = [];

  return (log) => {
    logs.push(log);
    fs.writeFileSync(`logs/${fileName}.json`, JSON.stringify(logs, null, 2));
  };
};

export default logger;
