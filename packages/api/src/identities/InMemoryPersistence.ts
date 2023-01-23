export default class InMemoryPerisentence<TData> {
  private data: null | TData;
  private flag: string;
  constructor(flag: string) {
    this.flag = flag;
    this.data = null;
  }
  store(data: TData) {
    this.data = data;
  }
  get() {
    if (!this.data) throw new Error("No in-memory " + this.flag + " data");
    return this.data;
  }
}
