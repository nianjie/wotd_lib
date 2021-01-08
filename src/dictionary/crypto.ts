export const crypto = {
  /**
   * A replacement for Nodejs.crypto#randomInt().
   * @param min 
   * @param max 
   */
  randomInt(min: number, max: number): number {
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
}