# @self-kit/icons

Данный пакет предназначен для использования иконок. При билде пакета генерируются иконки из директорий с файлами **svg**:

- `themed-assets` - иконки, цвет которых зависит от темы или может быть установлен через css.
- `custom-assets` - иконки, цвет которых нельзя изменить, и он не зависит от темы.

Для каждой директории существует своя генерация: `yarn generate-themed-icons` и `yarn generate-custom-icons`

Чтобы сгенерировать все иконки, необходимо запустить команду `yarn svgr`.

Сгенерированные **tsx-иконки** будут находится в следующих директориях:

- `generated-themed-icons`
- `generated-custom-icons`
