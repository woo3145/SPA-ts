import { Component } from './Home';

export class Settings implements Component {
  setTitle(title: string) {
    document.title = title;
  }

  async getHtml(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`<h1>Settings</h1>`);
    });
  }
}
