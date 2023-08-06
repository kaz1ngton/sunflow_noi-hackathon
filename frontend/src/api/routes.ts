const serverUrl = import.meta.env.VITE_SERVER_URL

export const routes = {
  predict: `${serverUrl}/predict`,
} as const
