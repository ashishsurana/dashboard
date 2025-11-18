export type Status = "NEW" | "BLOCKED" | "COMPLETED" | "IN_PROGRESS";
export type Category = "A" | "B" | "C" | "D";

export interface IData {
  id: string;
  title: string;
  category: "A" | "B" | "C" | "D";
  status: "NEW" | "BLOCKED" | "COMPLETED" | "IN_PROGRESS";
  date: number;
  amount: number;
}
export const data: IData[] = [
  ...Array.from({ length: 100 }, (_, i) => {
    const categories = ["A", "B", "C", "D"] as const;
    const statuses = ["NEW", "BLOCKED", "COMPLETED", "IN_PROGRESS"] as const;
    // Generate a random integer between min and max, inclusive
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    // Date: last 30 days from now
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const randomOffset = Math.random() * thirtyDays;
    const date = Math.floor(now - randomOffset);

    return {
      id: `ITEM-${(i + 1).toString().padStart(4, "0")}`,
      title: `Sample Item ${i + 1}`,
      category: categories[randomInt(0, categories.length - 1)],
      status: statuses[randomInt(0, statuses.length - 1)],
      date,
      amount: randomInt(1, 1000),
    };
  }),
];
