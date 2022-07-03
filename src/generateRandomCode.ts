const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateRandomCode (length: number = 6): string {
    let result: string = String(length);
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };