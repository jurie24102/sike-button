export function isMobile(userAgent) {
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
}
