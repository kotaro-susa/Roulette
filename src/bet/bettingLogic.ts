// ロジックは全てここに記述する

// ルーレットのどこに入るのかを判定
export const generateRandomRouletteResult = (): {
  number: number;
  color: string;
} => {
  const numPockets = 37;
  let color: string;
  //   数値を生成
  const result = Math.floor(Math.random() * numPockets);
  // 数値に応じて、色を判定
  if (result === 0) {
    color = 'green';
  } else if (
    [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ].includes(result)
  ) {
    color = 'red';
  } else {
    color = 'black';
  }

  return { number: result, color: color };
};

// 色に応じた払い戻し
// ユーザーの賭けた色(color)と金額(stakes)と入った場所(cachedRandomNumber)を受け取り、判定
// 当たりなら2倍、外れなら0を返す
export const calculateColorpayout = (
  color: string,
  stakes: number,
  LuckeyColor: string,
): number => {
  if (LuckeyColor === 'green') {
    return 0;
  } else if (color === LuckeyColor) {
    return stakes * 2;
  } else {
    return 0;
  }
};

// 偶数か奇数かに応じた払い戻し
// ユーザーの賭けた数値(number)と金額(stakes)と入った場所(cachedRandomNumber)を受け取り、判定
// 当たりなら2倍、外れなら0を返す
export const calculateEvenOddpayout = (
  number: number,
  stakes: number,
  LuckeyNumber: number,
): number => {
  if (LuckeyNumber === 0) {
    return 0;
  } else if (number % 2 === LuckeyNumber % 2) {
    return stakes * 2;
  } else {
    return 0;
  }
};

// 数値に賭けた場合の払い戻し
// ユーザーの賭けた数値が当たった数値と同じであれば、払い戻し
// 当たりなら36倍、外れなら0
export const betOnSingleNumber = (
  number: number,
  stakes: number,
  LuckeyNumber: number,
): number => {
  if (number === LuckeyNumber) {
    return stakes * 36;
  } else {
    return 0;
  }
};
