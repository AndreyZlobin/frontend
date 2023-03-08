# @self-kit/ui

Пакет содержит все необходимые фичи для построения интерфейсов приложений Self-kit.

# Migration guide

## 1.0.0 -> 2.0.0

### Deps
Теперь пакет ```@self-kit/ui``` аккумулирует и реэкспортит пакеты:
- ```@self-kit/fonts```
- ```@self-kit/illustrations```
- ```@self-kit/icons```
- ```@self-kit/form```
- ```@self-kit/components```

Необходимо заменить зависимости:
```json
{
  ...
  "@self-kit/icons": "^1.19.4",
  "@self-kit/form": "^1.19.4",
  "@self-kit/fonts": "^1.19.4",
  "@self-kit/ui": "^1.19.4",
  ...
}
```

На:
```json
{
  ...
  "@self-kit/ui": "^1.19.4",
  ...
}
```

### global.d.ts

Заменить файл ```global.d.ts```: <br>
```global.d.ts```
```ts
/// <reference types="@self-kit/ui/declaration/emotion" />
/// <reference types="@self-kit/ui/declaration/mui-material" />
/// <reference types="@emotion/react/types/css-prop" />
```

На: <br>
```global.d.ts```
```ts
/// <reference types="@self-kit/ui/declarations" />
```

### fonts
Пакет ```@self-kit/fonts``` включен в пакет ```@self-kit/ui```.

Необходимо заменить импорты:
```ts
import UbuntuBoldWoff from '@self-kit/fonts/UbuntuBold.woff';
import UbuntuBoldWoff2 from '@self-kit/fonts/UbuntuBold.woff2';
```

На:
```ts
import UbuntuBoldWoff from '@self-kit/ui/fonts/UbuntuBold.woff';
import UbuntuBoldWoff2 from '@self-kit/ui/fonts/UbuntuBold.woff2';
```

И внести соответвующие правки в конфиг сборщика для того, чтобы @self-kit/ui/fonts обрабатывались как шрифты.

### illustrations
Пакет ```@self-kit/illustrations``` включен в пакет ```@self-kit/ui```.

Необходимо заменить импорты:
```ts
import certImgSrc from '@self-kit/illustrations/cert.svg';
```

На:
```ts
import certImgSrc from '@self-kit/ui/illustrations/cert.svg';
```

И внести соответвующие правки в конфиг сборщика для того, чтобы @self-kit/ui/fonts обрабатывались как шрифты.

### @self-kit/form 
Все элементы пакета ```@self-kit/form``` получили префиксы form.
Весь ```@self-kit/form``` теперь экспортируется из ```@self-kit/ui```.

```ts
import { useForm, useFormWatch, useFormController } from '@self-kit/ui';
```

### @self-kit/icons
Весь ```@self-kit/icons``` теперь экспортируется из ```@self-kit/ui```.

```ts
import { QuitOutlineMd } from '@self-kit/ui';
```

### DatePickerProvider
Компонент был удален, используйте ConfigProvider.
