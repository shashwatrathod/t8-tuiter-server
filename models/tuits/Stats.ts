/**
 * @typedef Stats captures the stats of a tuit
 *
 * @property {number} replies number of replies to this tuit
 * @property {number} retuits number of retuits that this tuit received
 * @property {number} likes number of likes received by this tuit
 */
export default interface Stats {
  replies?: number;
  retuits: number;
  likes: number;
}
