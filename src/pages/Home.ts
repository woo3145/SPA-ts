export interface Component {
  setTitle(title: string): void;
  getHtml(): Promise<string>;
}

export class Home implements Component {
  setTitle(title: string) {
    document.title = title;
  }

  async getHtml(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`<h1>Home</h1>`);
    });
  }
}
