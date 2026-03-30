declare global {
  var evHistory: any[];
}

if (!global.evHistory) {
  global.evHistory = [];
}

export const getEvHistory = () => global.evHistory;
export const addEvHistory = (item: any) => global.evHistory.push(item);
