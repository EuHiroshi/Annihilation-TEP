export class Utils {
  createUrlFetch(url) {
    const url_base = 'http://gateway.marvel.com/';
    const public_key = '7ec0cb897cd564e56236c3bbfc8c6908';
    const hash = '910bb832797084d86d0b946c19530bba';

    return `${url_base}v1/public/series/3613/${url}?ts=1&apikey=${public_key}&hash=${hash}`;
  }
}
