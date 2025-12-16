import { AvailableLocale, LocaleService } from './../../services/locale.service';
import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page.component',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {
  LocaleService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('héctor');
  nameUpper = signal('HECTOR');
  fullName = signal('HéCTOr MeDEL nEGRete');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick');
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  changeLocale(locale: AvailableLocale) {
    console.log({ locale });
    this.LocaleService.changeLocale(locale);
    // console.log('🚀 ~ BasicPageComponent ~ changeLocale ~ locale:', locale);
  }
}
