import { Component } from './Home';

export class Posts implements Component {
  setTitle(title: string) {
    document.title = title;
  }

  async getHtml(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`<h1>Posts</h1>`);
    });
  }
}
