export function fixUrl(url: string) {
  // Hilangkan backslash \ dan normalisasi double slash
  const cleaned = url.replace(/\\/g, '').replace(/([^:]\/)\/+/g, '$1');

  try {
    const parsed = new URL(cleaned);
    const params = parsed.searchParams;

    // Encode bagian path query secara aman
    if (params.has('path')) {
      params.set('path', encodeURIComponent(params.get('path')!));
    }

    parsed.search = params.toString();
    return parsed.toString();
  } catch (error) {
    console.error('Invalid URL:', error);
    return url;
  }
}
