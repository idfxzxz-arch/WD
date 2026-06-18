const rawBasePath = import.meta.env.VITE_PRIVATE_BASE_PATH || "/wd-ops"

export const PRIVATE_BASE_PATH = rawBasePath.startsWith("/")
  ? rawBasePath.replace(/\/+$/, "")
  : `/${rawBasePath.replace(/\/+$/, "")}`

export const privateLoginPath = `${PRIVATE_BASE_PATH}/entry`

export function privatePath(path = "") {
  const cleanPath = String(path).replace(/^\/+/, "")
  return cleanPath ? `${PRIVATE_BASE_PATH}/${cleanPath}` : PRIVATE_BASE_PATH
}
