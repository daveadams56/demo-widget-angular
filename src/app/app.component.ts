import { Component, OnInit } from '@angular/core';
import Widget, {
  configuration,
  component,
  journey,
  user,
} from '@forgerock/login-widget';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo-widget-angular';
  userInfo: any;

  ngOnInit() {
    // Initiate all the Widget modules
    const config = configuration();

    // Get the element in your HTML into which you will mount the widget
    const widgetRootEl = document.getElementById('widget-root') as HTMLElement;

    // Instantiate Widget with the `new` keyword
    new Widget({
      target: widgetRootEl,
    });

    config.set({
      forgerock: {
        // Minimum required configuration:
        serverConfig: {
          baseUrl: 'https://example.forgeblocks.com/am',
          timeout: 3000,
        },
        // Optional configuration:
        clientId: 'WebLoginWidgetClient', // The default is `WebLoginWidgetClient`
        realmPath: 'alpha', // This is the default if not specified
        redirectUri: window.location.href, // This is the default if not specified
        scope: 'openid profile email', // This is the default if not specified
      },
    });
  }

  login() {
    // Assign the component function
    const componentEvents = component();

    componentEvents.open();

    // Assign the journey function
    const journeyEvents = journey();

    journeyEvents.start();

    const unsubComponentEvents = journeyEvents.subscribe((event) => {
      if (this.userInfo !== event.user.response) {
        this.userInfo = event.user.response;
      }
    });
  }

  logout() {
    user.logout();
  }
}
