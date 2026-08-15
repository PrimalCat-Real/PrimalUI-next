# План изучения Metal FX на Three.js TSL и React Three Fiber

## Цель

Реализовать современный liquid / metal эффект через Three.js TSL и React Three Fiber.

Финальная форма:

```tsx
<MetalFx>
  <Button>Start</Button>
</MetalFx>
```

Техническая цель:

- писать shader-логику через TSL, а не строковый GLSL;
- понимать, как эта логика превращается в GPU shader;
- собрать reusable React-компонент;
- применить эффект вокруг DOM UI;
- использовать нашу лавандовую палитру.

GLSL все равно понадобится как язык чтения чужих shader-референсов, потому что большинство примеров, включая `metal-fx`, Shadertoy и старые Three.js материалы, написаны на GLSL. Но основной путь реализации будет через TSL.

## 1. Ментальная модель shader-а

Сначала нужно понять не синтаксис, а модель.

Shader отвечает на вопрос:

```txt
какой цвет должен быть у этого пикселя?
```

Каждый пиксель получает координаты, время, параметры материала и считает цвет независимо от других пикселей.

Базовая цепочка будущего эффекта:

```txt
uv -> waves -> noise -> domain warp -> palette -> contrast -> glow -> mask
```

Что нужно понять:

- `uv` координаты идут от `0.0` до `1.0`;
- `time` двигает формулы;
- `noise` добавляет органику;
- `domain warp` искажает координаты;
- palette mapping превращает число в цвет;
- mask ограничивает эффект областью вокруг UI.

Мини-цель:

Уметь объяснить, почему один и тот же shader может выглядеть по-разному при изменении `time`, `scale`, `intensity` и палитры.

## 2. Three.js TSL база

TSL, Three Shading Language, позволяет писать shader-граф через JS / TS API.

Вместо строкового GLSL:

```glsl
vec3 color = mix(colorA, colorB, value);
```

мы идем к node-style записи:

```ts
const color = mix(colorA, colorB, value);
```

Изучить:

- `three/tsl`;
- node values;
- `uniform`;
- `uv`;
- `time`;
- `vec2`, `vec3`, `vec4`;
- `float`;
- `color`;
- `mix`;
- `sin`, `cos`;
- `length`;
- `smoothstep`;
- `clamp`;
- `pow`;
- `Fn`.

Мини-цель:

Сделать TSL material, где цвет plane зависит от `uv`.

Пример результата:

```txt
левый край темный, правый край розовый, верх уходит в голубой
```

## 3. React Three Fiber как оболочка

R3F здесь нужен не для сложной 3D-сцены, а как удобная React-обертка над Three.js.

Изучить:

- `Canvas`;
- `mesh`;
- `planeGeometry`;
- material props;
- `useFrame`;
- `useMemo`;
- refs на material;
- responsive sizing canvas-а.

Мини-цель:

Собрать простой компонент:

```tsx
const ShaderPlane = () => (
  <mesh>
    <planeGeometry args={[2, 2]} />
    <meshBasicNodeMaterial colorNode={...} />
  </mesh>
);
```

Важно:

React state не должен обновляться каждый кадр ради shader-анимации. Для времени и GPU-параметров использовать uniforms / TSL time, а не `setState`.

## 4. Первый TSL эффект: animated waves

Сначала делаем не металл, а управляемое движение.

Идея:

```txt
uv.x + time -> sin -> число от -1 до 1 -> цвет
```

Изучить:

- как TSL выражает `sin`;
- как масштабировать координаты;
- как добавлять `time`;
- как нормализовать значение из `-1..1` в `0..1`.

Мини-цель:

Сделать анимированные цветовые волны на плоскости.

Что должно получиться:

- движение плавное;
- скорость регулируется;
- scale регулирует частоту полос;
- цвет берется из нашей палитры.

## 5. Палитра в TSL

Нам нужна не случайная RGB-каша, а управляемая лавандовая система.

Базовая палитра:

- `#090B0E` background;
- `#FE73EA` hot lavender;
- `#FEABF3` soft pink;
- `#B0D9ED` icy blue;
- `#96C0EA` blue;
- `#F5DFFB` pale glow.

Задача:

Сделать функцию, которая берет число `value` от `0.0` до `1.0` и возвращает цвет.

Простая версия:

```txt
0.00 -> background
0.25 -> blue
0.50 -> lavender
0.75 -> pink
1.00 -> pale glow
```

Мини-цель:

Сделать reusable palette function на TSL-нодах.

## 6. Noise в современном подходе

Liquid metal невозможен без органики. Для нее нужен noise.

Здесь есть два пути:

1. Использовать готовые TSL noise helpers, если они есть и подходят.
2. Написать или портировать noise-функцию в TSL.

Что изучить:

- value noise;
- simplex noise как концепт;
- зачем noise возвращает псевдослучайное, но плавное значение;
- почему `random()` недостаточно;
- чем noise отличается от обычного `sin`.

Мини-цель:

Получить animated noise texture на plane.

Ожидаемый результат:

```txt
мягкие живые облака, а не полосы и не пиксельный рандом
```

## 7. FBM

FBM, fractional brownian motion, это несколько слоев noise с разным масштабом и вкладом.

Идея:

```txt
noise(uv * 1.0) * 0.5
+ noise(uv * 2.0) * 0.25
+ noise(uv * 4.0) * 0.125
+ noise(uv * 8.0) * 0.0625
```

Что изучить:

- octaves;
- amplitude;
- frequency;
- lacunarity;
- gain.

Мини-цель:

Сделать TSL-функцию `fbm`, которую можно переиспользовать в shader-е.

## 8. Domain warping

Это ключевой шаг для liquid-ощущения.

Обычный noise:

```txt
value = fbm(uv)
```

Warped noise:

```txt
offset = vec2(fbm(uv + time), fbm(uv - time))
warpedUv = uv + offset * distortion
value = fbm(warpedUv)
```

Смысл:

Мы искажаем координаты перед тем, как считать финальное значение. Поэтому картинка не просто шумит, а будто течет и заворачивается.

Мини-цель:

Сделать TSL-функцию `warpUv`, которая принимает:

- `uv`;
- `time`;
- `scale`;
- `distortion`;

и возвращает искаженные координаты.

## 9. Fake metal

Этот эффект не обязан быть физически корректным металлом. Нам нужна визуальная имитация.

Компоненты fake metal:

- сильный contrast;
- яркие highlights;
- темные провалы;
- переливчатая палитра;
- мягкий glow;
- vignette;
- ощущение отражения.

Что изучить:

- contrast curve;
- `pow`;
- `smoothstep`;
- highlight mask;
- additive glow;
- gamma correction.

Мини-цель:

Преобразовать `value` из noise / warp так, чтобы картинка выглядела не как облако, а как жидкий металл.

## 10. Маска вокруг UI

Shader сам по себе рисует прямоугольник. Нам нужно применить его вокруг UI-элемента.

Начальный подход:

- DOM-элемент остается настоящим DOM;
- R3F canvas лежит absolute внутри wrapper-а;
- shader рисуется как фон;
- поверх лежит button / card / nav;
- CSS mask или border mask оставляет эффект только вокруг рамки.

Почему не рендерить кнопку внутри Three.js:

- хуже accessibility;
- сложнее focus;
- сложнее hover / active состояния;
- сложнее интеграция с shadcn / обычным React UI.

Мини-цель:

Сделать `MetalFxFrame`, который визуально оборачивает обычный DOM-children.

## 11. React API компонента

Финальный компонент должен быть управляемым через props.

Пример API:

```tsx
<MetalFxFrame
  intensity={0.8}
  speed={0.6}
  scale={3}
  distortion={0.35}
  radius="999px"
>
  <Button>Start</Button>
</MetalFxFrame>
```

Изучить:

- где хранить default props;
- как передавать значения в uniforms;
- как не пересоздавать material без причины;
- как сделать `className` для wrapper-а;
- как не ломать children.

Мини-цель:

Сделать компонент, которым можно обернуть кнопку, карточку или nav item.

## 12. Производительность

Эффект красивый, но он не должен съедать интерфейс.

Изучить:

- canvas resolution scale;
- device pixel ratio;
- ограничение FPS;
- shared renderer против canvas на каждый элемент;
- отключение эффекта вне viewport;
- `prefers-reduced-motion`;
- когда использовать static fallback.

Первый production-friendly вариант:

- один canvas на один крупный блок;
- не использовать эффект на десятках мелких элементов;
- ограничить resolution;
- отключать или упрощать на слабых устройствах.

## 13. Чтение GLSL-референсов

Даже если пишем на TSL, нужно уметь читать GLSL.

Цель не писать GLSL руками, а переводить идеи.

Что уметь переводить:

```glsl
vec2 uv = vUv;
```

в TSL-логику с `uv()`.

```glsl
float value = sin(uv.x * 10.0 + time);
```

в TSL-ноды с `sin`, `mul`, `add`.

```glsl
vec3 col = mix(a, b, value);
```

в TSL `mix`.

Мини-цель:

Брать кусок GLSL из `metal-fx` или Shadertoy и понимать, как повторить его в TSL.

## 14. Финальный учебный проект

Собрать `LavenderMetalFx`.

Состав:

1. `LavenderMetalShader`
2. `metalPalette`
3. `fbm`
4. `warpUv`
5. `fakeMetal`
6. `MetalFxCanvas`
7. `MetalFxFrame`
8. примеры использования:
   - button
   - nav pill
   - card border

Проверить:

- desktop;
- mobile;
- dark background `#090B0E`;
- hover state;
- reduced motion;
- FPS;
- отсутствие layout shift.

## Порядок практики

### Неделя 1

- ментальная модель shader-а;
- Three.js TSL basics;
- R3F Canvas;
- plane с `uv` gradient;
- animated waves.

### Неделя 2

- TSL palette function;
- noise;
- FBM;
- первые organic patterns.

### Неделя 3

- domain warping;
- fake metal highlights;
- glow;
- vignette;
- лавандовая палитра.

### Неделя 4

- `MetalFxFrame`;
- CSS masking around DOM;
- props API;
- optimization;
- применение в UI проекта.

## Что не учить сразу

Пока не нужно углубляться в:

- real PBR materials;
- ray marching;
- compute shaders;
- WebGPU напрямую;
- advanced postprocessing pipeline;
- физически корректный металл.

TSL сам по себе уже ведет в сторону современного Three.js и WebGPU-friendly подхода. Поэтому сначала строим практический liquid metal эффект, а потом уже расширяем знания.

## Главная идея

`metal-fx` выглядит сложно не из-за одного магического приема. Эффект собирается из понятной цепочки:

```txt
uv -> animated waves -> noise -> fbm -> domain warp -> palette -> fake metal -> mask -> React component
```

В этом плане GLSL остается языком чтения референсов, а реализация делается через Three.js TSL и React Three Fiber.