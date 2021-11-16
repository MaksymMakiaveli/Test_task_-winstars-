export const concatActions = <S1 extends string, S2 extends string>(
  s1: S1,
  s2: S2
) => (s1 + s2) as `${S1}${S2}`;

export function objectToArray<T>(obj: T): T[] {
  const array: any = [];
  Object.values(obj).forEach((arr) => {
    array.push(arr);
  });
  return array;
}
