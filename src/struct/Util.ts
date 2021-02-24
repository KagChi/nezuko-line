import snek from 'node-superfetch'
export default class Util {
  static randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static shuffle(array: string[]) {
    const arr = array.slice(0);
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  static async hastebin(text: string) {
    const { body } = await snek.post("https://bin.nezukochan.xyz/documents")
    
      .send(text);
    return `https://bin.nezukochan.xyz/${(body as any).key}`;
  }
  static chunk(array: any[], chunkSize: number) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
  }
  static trimArray(array: any[], length = 10) {
    const len = array.length - length;
    const temp = array.slice(0, length);
    temp.push(`...${len} more.`);
    return temp;
  }
  static decodeHtmlEntities(text: string) {
    return text.replace(/&#(\d+);/g, (rep, code) => String.fromCharCode(code));
  }
  
  static chunks(args: any) {
    const [arr, len] = args;
    const rest = [];
    for (let i = 0; i < arr.length; i += len)
        rest.push(arr.slice(i, i + len));
    return rest;
  }
  static async scrapeSubreddit(subreddit: string) {
    subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
    const { body } = await snek.get(`https://imgur.com/r/${subreddit}/hot.json`);
    if (!(body as any).data) return undefined;
    const img = (body as any).data[Math.floor(Math.random() * (body as any).data.length)];
    return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
  }
}
