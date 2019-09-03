import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta) {
  }

  generateTags(config) {
    // default values
    config = {
      title: 'Spoteasy',
      description: 'Explore your neighbourhood fashion',
      image: 'https://spoteasy/assets/logo.png',
      slug: '',
      ...config
    };

    this.meta.updateTag({name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({name: 'twitter:site', content: '@spoteasy'});
    this.meta.updateTag({name: 'twitter:title', content: config.title});
    this.meta.updateTag({name: 'twitter:description', content: config.description});
    this.meta.updateTag({name: 'twitter:image', content: config.image});

    this.meta.updateTag({property: 'og:type', content: 'article'});
    this.meta.updateTag({property: 'og:site_name', content: 'Spoteasy'});
    this.meta.updateTag({property: 'og:title', content: config.title});
    this.meta.updateTag({property: 'og:description', content: config.description});
    this.meta.updateTag({property: 'og:image', content: config.image});
    this.meta.updateTag({property: 'og:url', content: `https://spoteasy.in/${config.slug}`});
  }
}
