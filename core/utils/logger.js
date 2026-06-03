function getTimestamp() {
  return new Date().toISOString();
}

export function log(message) {
  console.log(`[${getTimestamp()}] ${message}`);
}

export function error(message) {
  console.error(`[${getTimestamp()}] ❌ ${message}`);
}

export function success(message) {
  console.log(`[${getTimestamp()}] ✅ ${message}`);
}
