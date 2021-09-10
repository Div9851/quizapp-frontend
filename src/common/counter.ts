const DirectionValues = {
  Up: "up",
  Down: "down",
} as const;

type Direction = typeof DirectionValues[keyof typeof DirectionValues];

class Counter {
  value: number;
  endValue: number;
  locked: boolean;
  direction: Direction;
  onFinished?: () => void;

  constructor(
    value: number = 0,
    endValue: number = 0,
    direction: Direction = "up",
    locked: boolean = false,
    onFinished?: () => void
  ) {
    this.value = value;
    this.endValue = endValue;
    this.direction = direction;
    this.locked = locked;
    this.onFinished = onFinished;
  }

  tick(): Counter {
    if (this.locked) return { ...this, tick: this.tick };
    const nextValue =
      this.direction === "up"
        ? Math.min(this.value + 1, this.endValue)
        : Math.max(this.value - 1, this.endValue);
    if (nextValue === this.endValue && this.onFinished) this.onFinished();
    return { ...this, value: nextValue, tick: this.tick };
  }
}

export { Counter };
