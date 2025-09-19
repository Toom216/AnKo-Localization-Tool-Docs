const translations = {
    'ru': {
        'page_title': 'Документация по инструменту локализации для Unity',
        'toc_title': 'Оглавление',
        'toc_search_placeholder': 'Фильтр по содержанию...',
        // H1 Nav
        'nav_introduction': '1. Введение',
        'nav_quick_start': '2. Быстрый старт и настройка',
        'nav_components': '3. Основные компоненты',
        'nav_loc_tool_window': '4. Окно "Localization Tool"',
        'nav_translation_editor': '5. Редактор переводов',
        'nav_usage_examples': '6. Примеры использования',
        'nav_important_notes': '7. Важные нюансы и предупреждения',
        'nav_extending': '8. Расширение функционала',
        // H2 Nav
        'nav_key_features': 'Ключевые возможности',
        'nav_installation': '2.1. Установка',
        'nav_initial_setup': '2.2. Первоначальная настройка',
        'nav_localizedtext': '3.1. LocalizedText',
        'nav_localizedasset': '3.2. LocalizedAsset',
        'nav_localizedprefab': '3.3. LocalizedPrefab',
        'nav_uitklocalization': '3.4. UITKLocalization',
        'nav_localizeddropdown': '3.5. LocalizedDropdown',
        'nav_localizedbehaviour': '3.6. LocalizedBehaviour',
        'nav_context_menu': '3.7. Контекстное меню',
        'nav_in_editor_preview': '4.1. Предпросмотр в редакторе',
        'nav_tab_settings': '4.2. Вкладка "Settings"',
        'nav_tab_content': '4.3. Вкладка "Content"',
        'nav_tab_actions': '4.4. Вкладка "Actions"',
        'nav_tab_assets': '4.5. Вкладка "Assets"',
        'nav_tab_report': '4.6. Вкладка "Report"',
        'nav_example_components': '6.1. Готовые компоненты',
        'nav_example_attribute': '6.2. Атрибут [LocalizableField]',
        'nav_example_function': '6.3. Функция _()',
        'nav_example_plurals': '6.4. Множественное число и род',
        'nav_custom_parser': '8.1. Создание парсера',
        // Main Content
        'h1_introduction': '<span class="emoji">🚀</span> Введение',
        'p_intro_1': 'Этот инструмент представляет собой комплексное решение для локализации игр и приложений в Unity. Он позволяет автоматизировать процесс сбора текста и ассетов, управлять переводами через мощный интерфейс, интегрироваться с сервисами машинного перевода и динамически обновлять локализованный контент в игре.',
        'h2_key_features': 'Ключевые возможности',
        'li_feature_1': '<strong>Продвинутый парсинг:</strong> Автоматическое сканирование сцен, префабов, UI Toolkit (UXML) и C# скриптов, включая поля, отмеченные атрибутом <code>[LocalizableField]</code>, а также вложенные классы и списки.',
        'li_feature_2': '<strong>Локализация любых ассетов:</strong> Управление спрайтами, аудио, префабами, материалами и т.д.',
        'li_feature_3': '<strong>Мощный редактор переводов:</strong> Централизованный интерфейс с автосохранением, полной поддержкой Undo/Redo и умной группировкой ключей.',
        'li_feature_4': '<strong>Машинный перевод:</strong> Интеграция с DeepL, Google Translate и Microsoft Translator с гибкими настройками (размер пакета, количество повторных попыток) для каждого сервиса.',
        'li_feature_5': '<strong>Гибкий импорт/экспорт:</strong> Поддержка CSV, XML, YAML, XLIFF и прямой импорт из Google Sheets.',
        'li_feature_6': '<strong>Live Preview в редакторе:</strong> Предпросмотр любого языка, не запуская игру.',
        'li_feature_7': '<strong>Поддержка Plural & Gender:</strong> Корректная обработка форм множественного числа (с правилами для славянских, арабского и других языков) и рода.',
        'li_feature_8': '<strong>Полная поддержка RTL:</strong> Корректное отображение языков с написанием справа налево.',
        'li_feature_9': '<strong>Live Updates:</strong> Загрузка актуальных переводов с удаленного сервера при старте игры.',
        'li_feature_10': '<strong>Менеджер бэкапов:</strong> Встроенный инструмент для создания и восстановления резервных копий.',
        'placeholder_gif_features': '[--- МЕСТО ДЛЯ GIF: Демонстрация ключевых возможностей в действии ---]',
        'h1_quick_start': '<span class="emoji">🛠️</span> Быстрый старт и настройка',
        'h2_installation': '2.1. Установка',
        'li_install_1': 'Скопируйте ассет в папку вашего проекта Unity.',
        'li_install_2': 'Инструмент автоматически проверит наличие необходимых зависимостей. В появившемся диалоговом окне установщика подтвердите установку.',
        'li_install_3': 'Обязательные зависимости (<code>Newtonsoft Json</code>, <code>Editor Coroutines</code>) необходимы для базовой работы.',
        'li_install_4': 'Опциональные зависимости (<code>Arabic Support</code>, <code>CsvHelper</code>, <code>YamlDotNet</code>) включают дополнительные функции.',
        'li_install_5': 'Нажмите <strong>Install Selected</strong>, чтобы установить рекомендуемые пакеты.',
        'li_install_6': 'После установки откройте главное окно инструмента через меню <strong>Tools -> Localization Tool</strong>.',
        'placeholder_img_installer': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Скриншот окна установщика зависимостей ---]',
        'h2_initial_setup': '2.2. Первоначальная настройка',
        'li_setup_1': '<strong>Создание настроек:</strong> При первом открытии инструмент создаст файл настроек <code>LocalizationSettings.asset</code> в папке <code>Assets/Resources</code>.',
        'li_setup_2': '<strong>Настройка языков:</strong> На вкладке <strong>Settings</strong> в секции <strong>Language Management</strong> убедитесь, что ваш основной язык (например, <code>en</code> — английский) выбран как <strong>Source Language</strong>. Включите (<strong>Enabled</strong>) все языки, которые вы планируете поддерживать.',
        'li_setup_3': '<strong>Указание контента для парсинга:</strong> На вкладке <strong>Content</strong> добавьте все сцены для анализа в список <strong>Scenes to Parse</strong>. Если вы используете префабы с текстом, убедитесь, что папки с ними добавлены в <strong>Prefab Folders</strong>.',
        'li_setup_4': '<strong>Первый запуск парсера:</strong> Перейдите на вкладку <strong>Actions</strong> и нажмите кнопку <code>Update Keys</code>. Инструмент просканирует ваш проект, создаст файлы с переводами и автоматически добавит необходимые компоненты (<code>LocalizedText</code>, <code>LocalizedAsset</code> и т.д.) на игровые объекты.',
        'placeholder_gif_setup': '[--- МЕСТО ДЛЯ GIF: Пошаговая первоначальная настройка ---]',
        'h1_components': '<span class="emoji">🧩</span> Основные компоненты (назначаются автоматически)',
        'warning_box_components': '<strong>Важное замечание:</strong> Все описанные ниже компоненты добавляются на игровые объекты автоматически в процессе парсинга (когда вы нажимаете кнопку <code>Update Keys</code>). Вам не нужно добавлять их вручную.',
        'p_components_intro': 'Эти компоненты — "мост" между вашими объектами в сцене и базой данных переводов. Они "слушают" смену языка и автоматически подставляют нужный текст или ассет.',
        'h2_localizedtext': '3.1. LocalizedText',
        'p_localizedtext_1': 'Основной компонент для отображения переведенного текста. Устанавливается на объекты с <code>Text</code>, <code>TMP_Text</code> и <code>TextMesh</code>.',
        'li_localizedtext_1': '<code>localizationKey</code>: Ключ, по которому находится перевод. Генерируется автоматически.',
        'li_localizedtext_2': '<code>isStyleOnly</code>: Если <code>true</code>, компонент будет применять только стили (шрифт, RTL), но не менять сам текст. Полезно для элементов, текст которых управляется другим скриптом (например, <code>LanguageSelector</code>).',
        'li_localizedtext_3': '<code>originalSourceText</code>: Исходный текст на базовом языке. Используется как резервный вариант.',
        'h2_localizedasset': '3.2. LocalizedAsset',
        'p_localizedasset_1': 'Используется для подмены ассетов (<code>Sprite</code>, <code>AudioClip</code>, <code>Material</code> и т.д.). Он автоматически определяет тип целевого компонента на объекте (<code>Image</code>, <code>AudioSource</code>) и подменяет его ресурс.',
        'p_localizedasset_2': 'Для компонентов с опцией <strong>Play on Awake</strong> (таких как <code>AudioSource</code>, <code>VideoPlayer</code>), <code>LocalizedAsset</code> корректно перехватывает автозапуск, подменяет ассет и затем запускает воспроизведение, чтобы избежать проигрывания нелокализованного контента.',
        'h2_localizedprefab': '3.3. LocalizedPrefab',
        'p_localizedprefab_1': 'Компонент для локализации целых префабов. Он работает неразрушающим образом: не изменяет исходный префаб, а создает экземпляр локализованной версии как дочерний объект, отключая все скрипты (<code>MonoBehaviour</code>), рендереры (<code>Renderer</code>) и коллайдеры (<code>Collider</code>) на оригинальном объекте. Это предотвращает двойное выполнение логики и появление визуальных артефактов. Для корректной работы в рантайме его порядок выполнения установлен на -100 (<code>[DefaultExecutionOrder(-100)]</code>), чтобы он срабатывал раньше других скриптов.',
        'h2_uitklocalization': '3.4. UITKLocalization',
        'p_uitklocalization_1': 'Добавляется на объекты с <code>UIDocument</code> и управляет локализацией всех текстовых элементов внутри UI Toolkit документа (UXML).',
        'h2_localizeddropdown': '3.5. LocalizedDropdown',
        'p_localizeddropdown_1': 'Добавляется на <code>Dropdown</code> и <code>TMP_Dropdown</code> для перевода их вариантов.',
        'h2_localizedbehaviour': '3.6. LocalizedBehaviour',
        'p_localizedbehaviour_1': 'Служебный компонент, который позволяет вашим скриптам реагировать на смену языка. Он автоматически находит и вызывает методы, помеченные атрибутом <code>[OnLanguageChange]</code>.',
        'h2_context_menu': '3.7. Контекстное меню "Analyze for Localization"',
        'p_context_menu_1': 'Для быстрого добавления <code>LocalizedAsset</code> на объект, вы можете кликнуть правой кнопкой мыши по нужному компоненту (например, <code>Image</code>, <code>AudioSource</code>) в инспекторе и выбрать <strong>Analyze for Localization</strong>. Инструмент сам добавит и настроит компонент. (Это необязательно, но можно использовать для мануального добавления).',
        'placeholder_img_context_menu': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Контекстное меню "Analyze for Localization" ---]',
        'h1_loc_tool_window': '<span class="emoji">🖼️</span> Окно "Localization Tool"',
        'h2_in_editor_preview': '4.1. Предпросмотр в редакторе (In-Editor Preview)',
        'p_preview_1': 'Прямо под заголовком находится выпадающий список <strong>Preview Language</strong>. Эта мощная функция позволяет увидеть, как будет выглядеть локализация на любом языке прямо в окне <strong>Scene</strong>, не запуская игру.',
        'placeholder_gif_preview': '[--- МЕСТО ДЛЯ GIF: Демонстрация работы Live Preview ---]',
        'li_preview_1': '<strong>Как это работает:</strong> Выберите язык из списка, и инструмент мгновенно применит соответствующие переводы, шрифты, RTL-настройки и ассеты ко всем локализуемым объектам на активной сцене.',
        'li_preview_2': '<strong>Плейсхолдеры:</strong> Если на вкладке <strong>Settings</strong> выбран стиль плейсхолдеров (например, <strong>Accents</strong> или <strong>Brackets</strong>), то в режиме превью вместо реальных переводов будут отображаться эти плейсхолдеры. Это идеально подходит для тестирования верстки и поиска нелокализованных элементов.',
        'li_preview_3': '<strong>Безопасность:</strong> Все изменения, внесенные в режиме превью, являются временными. Инструмент автоматически вернет все в исходное состояние при выборе "<strong>Revert to Original</strong>", закрытии окна, смене сцены или перед сохранением сцены/префаба (благодаря компоненту <code>LocalizationPreviewProtector</code>).',
        'li_preview_4': '<strong>Защита от сбоев:</strong> Встроенная система <code>PreviewCrashProtector</code> автоматически восстановит исходное состояние объектов, если редактор Unity закроется аварийно во время активного превью.',
        'h2_tab_settings': '4.2. Вкладка "Settings" (Настройки)',
        'p_settings_1': 'Ваш центр управления. Здесь вы определяете глобальные правила для всего процесса локализации.',
        'placeholder_img_settings': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Скриншот вкладки "Settings" ---]',
        'li_settings_1': '<strong>Key Generation Mode:</strong> Выберите, как будут создаваться ключи.<ul><li><code>UseTextAsKey</code>: Ключом становится сам текст. Идеально для прототипов. Минус: если изменить исходный текст, ключ изменится, и все его переводы будут потеряны.</li><li><code>AutoGenerateKeysOnly</code>: Ключ генерируется на основе иерархии и имени объекта. Надежно для продакшена. Плюс: переводы не ломаются при изменении текста.</li><li><code>UseTextAsKeyWithCustomPriority</code> и <code>AutoGenerateWithCustomKeys</code>: Гибридные режимы, позволяющие задавать кастомные ключи в коде через атрибут <code>[LocalizableField("my_custom_key")]</code>.</li><li><strong>Безопасная миграция:</strong> Вы можете сменить режим в любой момент. Инструмент автоматически перенесет все существующие переводы на новую систему ключей.</li></ul>',
        'li_settings_2': '<strong>Language Management:</strong> Настройте список языков. Для языков с особыми символами назначьте соответствующий <strong>Font Asset</strong>. Включите опцию <strong>RTL</strong> для языков с письмом справа налево.',
        'li_settings_3': '<strong>General Settings:</strong><ul><li><code>Parse Prefabs</code>: Включает парсинг префабов.</li><li><code>Split files by language</code>: Определяет, как хранить переводы (один большой файл или по файлу на язык).</li><li><code>Translations Path</code>: Путь для хранения файлов <code>.json</code> с переводами. Важно: папка должна находиться внутри <code>Assets/StreamingAssets/</code>.</li></ul>',
        'li_settings_4': '<strong>Debugging & Testing:</strong><ul><li><code>Placeholder Style</code>: Выберите стиль для отображения плейсхолдеров в режиме превью.</li></ul>',
        'li_settings_5': '<strong>Live Updates:</strong> Настройки для загрузки переводов с удаленного сервера.',
        'li_settings_6': '<strong>Runtime API Key:</strong> Секция для безопасного хранения API ключа, который может понадобиться в скомпилированной игре (хранится в зашифрованном виде).',
        'h2_tab_content': '4.3. Вкладка "Content" (Контент)',
        'p_content_1': 'Здесь вы сообщаете инструменту, где именно искать текст.',
        'placeholder_img_content': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Скриншот вкладки "Content" ---]',
        'li_content_1': '<strong>Scenes to Parse:</strong> Перетащите сюда все сцены для анализа.',
        'li_content_2': '<strong>Prefab Folders:</strong> Укажите папки с префабами.',
        'li_content_3': '<strong>Dynamic Texts:</strong> Впишите сюда строки, которые создаются исключительно в коде (например, "Game Over").',
        'li_content_4': '<strong>Parsing Ignores:</strong> Укажите скрипты, компоненты или объекты для игнорирования.',
        'li_content_5': '<strong>Pin:</strong> Эта функция позволяет "закрепить" объект из сцены в списке игнорирования. Вместо временной ссылки на объект, инструмент сохранит его полный путь в иерархии, делая игнорирование постоянным между сессиями (но учтите, что переименование объекта или его родителя сломает эту связь).',
        'h2_tab_actions': '4.4. Вкладка "Actions" (Действия)',
        'p_actions_1': 'Главная рабочая вкладка.',
        'placeholder_img_actions': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Скриншот вкладки "Actions" ---]',
        'li_actions_1': '<strong>Update Keys:</strong> Запускает парсер, который обновляет ваши файлы переводов.',
        'li_actions_2': '<strong>Open Translation Editor:</strong> Открывает отдельное, более удобное окно для редактирования всех переводов.',
        'li_actions_3': '<strong>Data Management:</strong> Используйте для обмена данными с переводчиками (Export/Import в CSV/XML/YAML/XLIFF, импорт из Google Sheets).',
        'li_actions_4': '<strong>Auto-Translation:</strong> Автоматически заполняет все пустые строки переводов. Новые настройки позволяют управлять размером пакета (<strong>Batch Size</strong>) и политикой повторных попыток (<strong>Retry Policy</strong>) для каждого сервиса (DeepL, Google, Microsoft) отдельно. Инструмент отслеживает количество переведенных символов и предупреждает о возможном превышении лимита.',
        'li_actions_5': '<strong>Danger Zone:</strong> Содержит кнопки для полного удаления всех компонентов локализации из проекта. Используйте с осторожностью!',
        'h2_tab_assets': '4.5. Вкладка "Assets" (Ассеты)',
        'p_assets_1': 'Эта вкладка полностью посвящена локализации нетекстовых ресурсов.',
        'placeholder_img_assets': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Скриншот вкладки "Assets" ---]',
        'li_assets_1': '<strong>Создайте структуру папок (опционально):</strong> В секции <strong>2. Asset Folder Generation</strong> нажмите <strong>Create Asset Folders Now</strong>.',
        'li_assets_2': '<strong>Настройте категории и правила именования:</strong> В секции <strong>3. Asset Categories & Scanning</strong> убедитесь, что правило <strong>Naming Rule</strong> (<code>{key}_{lang}</code>) соответствует вашим файлам (например, <code>button_ok_en.png</code>).',
        'li_assets_3': '<strong>Разместите ваши ассеты:</strong> Положите локализованные ассеты в папки.',
        'li_assets_4': '<strong>Просканируйте ассеты:</strong> В секции <strong>4. Automation</strong> нажмите <strong>Scan Assets & Update Tables</strong>. Процесс очистки стал безопаснее: теперь удаляются только старые файлы таблиц (<code>.asset</code>), а не вся папка.',
        'li_assets_5': '<strong>Привяжите ассеты к объектам:</strong> Нажмите <strong>Analyze Project & Attach Components</strong>.',
        'h2_tab_report': '4.6. Вкладка "Report" (Отчет)',
        'p_report_1': 'После каждого парсинга этот отчет показывает полную картину состояния вашей локализации.',
        'placeholder_img_report': '[--- МЕСТО ДЛЯ ИЗОБРАЖЕНИЯ: Скриншот вкладки "Report" ---]',
        'li_report_1': '<strong>Категории:</strong> All Keys (все ключи), Added (новые), Updated (текст изменился), Removed (удаленные), Duplicates (дубликаты), Migrated (перенесенные), Skipped (неизменные).',
        'li_report_2': '<strong>Продвинутый поиск:</strong> Нажмите кнопку <strong>Find</strong> напротив любой записи, чтобы мгновенно найти соответствующий объект в проекте. Поиск работает асинхронно, не блокируя редактор, и ищет по всем сценам и префабам. Если ключ используется в нескольких местах, появится выпадающий список со всеми источниками.',
        'h1_translation_editor': '<span class="emoji">📝</span> Редактор переводов ("Translation Table Editor")',
        'p_editor_1': 'Открывается через <strong>Tools -> Localization -> Translation Table Editor</strong>. Это основной инструмент для ручного редактирования переводов.',
        'placeholder_gif_editor': '[--- МЕСТО ДЛЯ GIF: Работа в редакторе переводов ---]',
        'li_editor_1': '<strong>Умная группировка:</strong> Ключи для множественного числа и рода (например, <code>apple_count_one</code>, <code>apple_count_few</code>) автоматически объединяются в сворачиваемые группы.',
        'li_editor_2': '<strong>Продвинутое редактирование:</strong> Кликните на ячейку, чтобы открыть всплывающее окно <strong>MultiLineEditWindow</strong>. Оно показывает исходный текст для сравнения, позволяет быстро его скопировать и в реальном времени проверяет совпадение плейсхолдеров (например, <code>{username}</code>), подсвечивая недостающие или лишние.',
        'li_editor_3': '<strong>Валидация плейсхолдеров через комментарии:</strong> Вы можете явно указать, какие плейсхолдеры должны быть в переводе, добавив в комментарий к ключу специальную директиву, например: <code>@placeholders: {username}, {score}</code>. <strong>MultiLineEditWindow</strong> будет использовать этот список как основной источник правды.',
        'li_editor_4': '<strong>Навигация и управление:</strong> Перемещайтесь по таблице скроллбарами или зажав среднюю кнопку мыши. Изменяйте ширину колонок, перетаскивая разделители. Сохраняйте изменения по <code>Ctrl+S</code>.',
        'li_editor_5': '<strong>Полный Undo/Redo:</strong> Весь стек действий (изменение текста, добавление/удаление ключей) полностью поддерживается через <code>Ctrl+Z</code> / <code>Ctrl+Y</code>.',
        'li_editor_6': '<strong>Резервные копии и автосохранение:</strong> Используйте кнопку <strong>Manage Backups</strong>. Инструмент также автоматически сохраняет вашу сессию каждые несколько минут. При аварийном закрытии будет предложено восстановить изменения.',
        'h1_usage_examples': '<span class="emoji">💡</span> Примеры использования',
        'h2_example_components': '6.1. Готовые компоненты и примеры',
        'p_example_components_1': 'Проект содержит готовые к использованию скрипты, которые служат отличными примерами.',
        'li_example_components_1': '<strong><code>LanguageSelector.cs</code>:</strong> Готовый компонент для создания UI выпадающего списка для смены языка. Он автоматически находит все доступные языки и управляет их переключением.<br><strong>Как использовать:</strong> Просто добавьте компонент <code>LanguageSelector</code> на вашу сцену (например, на пустой GameObject) и укажите в инспекторе ваш <code>TMP_Dropdown</code>.',
        'li_example_components_2': '<strong>Примеры в коде:</strong> Для изучения продвинутых техник, таких как работа с <code>[LocalizableField]</code>, функцией <code>_()</code>, множественным числом и родом, изучите файлы <code>StatPurchaseTest.cs</code> и <code>TestLocalization.cs</code>. Они наглядно демонстрируют реализацию всех основных возможностей инструмента в коде.',
        'h2_example_attribute': '6.2. Атрибут [LocalizableField]',
        'p_example_attribute_1': 'Предпочтительный способ для текстов, которые являются частью конфигурации компонента в инспекторе. Парсер теперь умеет работать со строками, списками/массивами строк и даже полями внутри вложенных <code>[System.Serializable]</code> классов.',
        'code_example_attribute': `using Ankonoanko.Localization; // Required for [LocalizableField]
using UnityEngine;
using System.Collections.Generic;
public class QuestManager : MonoBehaviour
{
    // The parser will find this field and create a key for it
    [LocalizableField]
    private string defaultQuestFailedMessage = "You have failed the quest.";
    
    // You can set a custom key
    [LocalizableField("custom_quest_start_dialog")]
    public string startDialog = "Are you ready for an adventure?";
    
    // Works with lists
    [LocalizableField]
    private List<string> missionObjectives = new List<string> { "Find the treasure" };
    
    // And even with nested classes!
    [System.Serializable]
    public class ItemInfo
    {
        [LocalizableField] public string Name;
        [LocalizableField] public string Description;
    }
    
    [LocalizableField]
    private ItemInfo magicSword;
}`,
        'h2_example_function': '6.3. Функция _() и атрибут [OnLanguageChange]',
        'p_example_function_1': 'Используйте функцию <code>_()</code> для динамического текста, который меняется в ходе игры. Метод, обновляющий UI, следует пометить атрибутом <code>[OnLanguageChange]</code>, чтобы он вызывался автоматически при смене языка. Для этого на объект будет автоматически добавлен компонент <code>LocalizedBehaviour</code>.',
        'code_example_function': `// To use the short _() call, add these lines
using static Ankonoanko.Localization.LocalizationManager;
using Ankonoanko.Localization; // Required for [OnLanguageChange]
using UnityEngine;
using TMPro;
using System.Collections.Generic;
public class PlayerHUD : MonoBehaviour
{
    [SerializeField] private TMP_Text scoreText;
    private int score = 100;
    private string playerName = "Alex";
    
    void Start()
    {
        UpdateUI(); // Initial update
    }
    
    // This method will be called automatically when the language changes
    [OnLanguageChange]
    void UpdateUI()
    {
        // 1. Indexed placeholders (like in string.Format)
        // Key: "score_label", Text in file: "Score: {0}"
        scoreText.text = _("score_label", score); // Result: "Score: 100"
        
        // 2. Named placeholders (recommended for readability)
        // Key: "welcome_message", Text: "Welcome, {username}!"
        string welcomeText = _("welcome_message", new { username = playerName });
        
        // For complex cases or high performance
        var args = new Dictionary<string, object> { { "username", playerName } };
        string welcomeText2 = _("welcome_message", args);
    }
}`,
        'h2_example_plurals': '6.4. Множественное число и род',
        'p_example_plurals_1': 'Инструмент теперь использует более точные правила для разных языковых групп.',
        'code_example_plurals': `using static Ankonoanko.Localization.LocalizationManager;
using Ankonoanko.Localization;
using UnityEngine;
public class ItemCounter : MonoBehaviour
{
    void DisplayItemCount(int count)
    {
        // Keys: "apple_count_one", "apple_count_few", "apple_count_many"
        // Texts: "{0} яблоко", "{0} яблока", "{0} яблок"
        string appleText = _("apple_count", count); 
        Debug.Log(appleText); // Automatically selects the correct form
    }
    
    void GreetUser(Gender userGender)
    {
        // Keys: "user_greeted_male", "user_greeted_female"
        // Texts: "Он пришел.", "Она пришла."
        string greeting = _("user_greeted", userGender);
        Debug.Log(greeting);
    }
}`,
        'h1_important_notes': '<span class="emoji">⚠️</span> Важные нюансы и предупреждения',
        'li_notes_1': '<strong>Резервные копии:</strong> Перед глобальными операциями (<code>Update Keys</code>, импорт данных) всегда создавайте резервную копию через <strong>Translation Table Editor -> Manage Backups</strong>.',
        'li_notes_2': '<strong>Безопасность API ключей:</strong> Ключ для работы в редакторе хранится локально на вашей машине (в <code>EditorPrefs</code>) и не попадает в репозиторий. Для ключей, которые нужны в билде игры, используйте секцию <strong>Runtime API Key</strong>.',
        'li_notes_3': '<strong>Папка <code>StreamingAssets</code>:</strong> Файлы переводов должны находиться в подпапке <code>Assets/StreamingAssets/</code>, чтобы они были включены в сборку игры.',
        'li_notes_4': '<strong>"Защита от дурака":</strong> Инструмент автоматически защищает вас от случайного сохранения временных данных из режима превью в сцену или префаб.',
        'li_notes_5': '<strong>Производительность:</strong> Вызов <code>_()</code> является быстрым, но в циклах, которые выполняются каждый кадр (например, в <code>Update</code>), старайтесь кэшировать результат в переменную.',
        'li_notes_6': '<strong>Исключение <code>LanguageSelector</code> из парсинга:</strong> Объект с компонентом <code>LanguageSelector</code> и его <code>TMP_Dropdown</code> необходимо добавить в список <strong>Ignore Specific Objects</strong> на вкладке <strong>Content</strong>. Это нужно, чтобы парсер не создавал лишние ключи для вариантов в дропдауне, так как скрипт <code>LanguageSelector</code> заполняет их динамически во время выполнения. Игнорирование предотвращает конфликты и сохраняет чистоту в файлах переводов.',
        'li_notes_7': '<strong>Шрифты для <code>LanguageSelector</code>:</strong> Чтобы выбранный язык в <code>TMP_Dropdown</code> корректно обновлял свой шрифт, вручную добавьте на дочерний объект <strong>Label</strong> у Dropdown пустой компонент <code>LocalizedText</code> и включите у него галочку <code>isStyleOnly</code>.',
        'h1_extending': '<span class="emoji">🧬</span> Расширение функционала',
        'h2_custom_parser': '8.1. Создание кастомного парсера',
        'p_custom_parser_1': 'Вы можете легко расширить систему для поддержки кастомных компонентов, создав свой класс-парсер.',
        'li_custom_parser_1': 'Создайте новый C# скрипт в папке <strong>Editor</strong> вашего проекта.',
        'li_custom_parser_2': 'Скопируйте в него приведенный ниже шаблон.',
        'li_custom_parser_3': 'Измените логику, чтобы она соответствовала вашему компоненту.',
        'code_custom_parser': `#if UNITY_EDITOR
using System.Collections.Generic;
using UnityEngine;
using Ankonoanko.Localization;
// TEMPLATE for creating a parser for a custom component.
public class CustomComponentParser_Template : ITextComponentParser
{
    public IEnumerable<(string text, string key, string source)> Parse(
        GameObject gameObject,
        LocalizationSettings settings)
    {
        // 1. Check if the object has the custom component we need.
        var component = gameObject.GetComponent<AwesomeComponentFromAssetStore>();
        if (component == null)
        {
            yield break; // Exit if the component is not found
        }
        
        // 2. Get the text from the custom component's fields.
        string titleText = component.Title;
        
        // 3. Check if the text is valid for localization.
        if (TextParser.IsValidLocalizableText(titleText))
        {
            // 4. Generate a key and source using helpers from TextParser.
            string key = TextParser.GenerateKeyForObject(gameObject, titleText, settings.keyGenerationMode);
            string source = TextParser.GetSourceStringForObject(gameObject);
            
            // 5. Return the result.
            yield return (titleText, key, source);
        }
        
        // 6. Repeat for other fields...
        // (you can add a suffix to make keys unique)
        string descriptionText = component.Description;
        if (TextParser.IsValidLocalizableText(descriptionText))
        {
            string key = TextParser.GenerateKeyForObject(gameObject, descriptionText, settings.keyGenerationMode) + "_description";
            string source = TextParser.GetSourceStringForObject(gameObject);
            yield return (descriptionText, key, source);
        }
    }
}
#endif`
    },
    'en': {
        'page_title': 'Unity Localization Tool Documentation',
        'toc_title': 'Table of Contents',
        'toc_search_placeholder': 'Filter content...',
        // H1 Nav
        'nav_introduction': '1. Introduction',
        'nav_quick_start': '2. Quick Start and Setup',
        'nav_components': '3. Core Components',
        'nav_loc_tool_window': '4. "Localization Tool" Window',
        'nav_translation_editor': '5. Translation Editor',
        'nav_usage_examples': '6. Usage Examples',
        'nav_important_notes': '7. Important Notes and Warnings',
        'nav_extending': '8. Extending Functionality',
        // H2 Nav
        'nav_key_features': 'Key Features',
        'nav_installation': '2.1. Installation',
        'nav_initial_setup': '2.2. Initial Setup',
        'nav_localizedtext': '3.1. LocalizedText',
        'nav_localizedasset': '3.2. LocalizedAsset',
        'nav_localizedprefab': '3.3. LocalizedPrefab',
        'nav_uitklocalization': '3.4. UITKLocalization',
        'nav_localizeddropdown': '3.5. LocalizedDropdown',
        'nav_localizedbehaviour': '3.6. LocalizedBehaviour',
        'nav_context_menu': '3.7. Context Menu',
        'nav_in_editor_preview': '4.1. In-Editor Preview',
        'nav_tab_settings': '4.2. "Settings" Tab',
        'nav_tab_content': '4.3. "Content" Tab',
        'nav_tab_actions': '4.4. "Actions" Tab',
        'nav_tab_assets': '4.5. "Assets" Tab',
        'nav_tab_report': '4.6. "Report" Tab',
        'nav_example_components': '6.1. Ready-made components',
        'nav_example_attribute': '6.2. [LocalizableField] Attribute',
        'nav_example_function': '6.3. _() Function',
        'nav_example_plurals': '6.4. Plurals and Gender',
        'nav_custom_parser': '8.1. Creating a Parser',
        // Main Content
        'h1_introduction': '<span class="emoji">🚀</span> Introduction',
        'p_intro_1': 'This tool is a comprehensive solution for localizing games and applications in Unity. It allows for the automation of text and asset collection, management of translations through a powerful interface, integration with machine translation services, and dynamic updating of localized content in-game.',
        'h2_key_features': 'Key Features',
        'li_feature_1': '<strong>Advanced Parsing:</strong> Automatic scanning of scenes, prefabs, UI Toolkit (UXML), and C# scripts, including fields marked with the <code>[LocalizableField]</code> attribute, as well as nested classes and lists.',
        'li_feature_2': '<strong>Localization of Any Asset:</strong> Manage sprites, audio, prefabs, materials, etc.',
        'li_feature_3': '<strong>Powerful Translation Editor:</strong> A centralized interface with auto-saving, full Undo/Redo support, and smart key grouping.',
        'li_feature_4': '<strong>Machine Translation:</strong> Integration with DeepL, Google Translate, and Microsoft Translator with flexible settings (batch size, retry count) for each service.',
        'li_feature_5': '<strong>Flexible Import/Export:</strong> Support for CSV, XML, YAML, XLIFF, and direct import from Google Sheets.',
        'li_feature_6': '<strong>Live Preview in Editor:</strong> Preview any language without running the game.',
        'li_feature_7': '<strong>Plural & Gender Support:</strong> Correct handling of plural forms (with rules for Slavic, Arabic, and other languages) and gender.',
        'li_feature_8': '<strong>Full RTL Support:</strong> Correct display of right-to-left languages.',
        'li_feature_9': '<strong>Live Updates:</strong> Download the latest translations from a remote server at game start.',
        'li_feature_10': '<strong>Backup Manager:</strong> An integrated tool for creating and restoring backups.',
        'placeholder_gif_features': '[--- GIF PLACEHOLDER: Demonstration of key features in action ---]',
        'h1_quick_start': '<span class="emoji">🛠️</span> Quick Start and Setup',
        'h2_installation': '2.1. Installation',
        'li_install_1': 'Copy the asset into your Unity project folder.',
        'li_install_2': 'The tool will automatically check for necessary dependencies. In the installer dialog box that appears, confirm the installation.',
        'li_install_3': 'Required dependencies (<code>Newtonsoft Json</code>, <code>Editor Coroutines</code>) are necessary for basic functionality.',
        'li_install_4': 'Optional dependencies (<code>Arabic Support</code>, <code>CsvHelper</code>, <code>YamlDotNet</code>) enable additional features.',
        'li_install_5': 'Click <strong>Install Selected</strong> to install the recommended packages.',
        'li_install_6': 'After installation, open the main tool window via the menu <strong>Tools -> Localization Tool</strong>.',
        'placeholder_img_installer': '[--- IMAGE PLACEHOLDER: Screenshot of the dependency installer window ---]',
        'h2_initial_setup': '2.2. Initial Setup',
        'li_setup_1': '<strong>Create Settings:</strong> On first open, the tool will create a <code>LocalizationSettings.asset</code> file in the <code>Assets/Resources</code> folder.',
        'li_setup_2': '<strong>Configure Languages:</strong> In the <strong>Settings</strong> tab, under the <strong>Language Management</strong> section, ensure your primary language (e.g., <code>en</code> for English) is selected as the <strong>Source Language</strong>. Enable all languages you plan to support.',
        'li_setup_3': '<strong>Specify Content for Parsing:</strong> In the <strong>Content</strong> tab, add all scenes to be analyzed to the <strong>Scenes to Parse</strong> list. If you use prefabs with text, make sure their folders are added to <strong>Prefab Folders</strong>.',
        'li_setup_4': '<strong>First Parser Run:</strong> Go to the <strong>Actions</strong> tab and click the <code>Update Keys</code> button. The tool will scan your project, create translation files, and automatically add the necessary components (<code>LocalizedText</code>, <code>LocalizedAsset</code>, etc.) to your game objects.',
        'placeholder_gif_setup': '[--- GIF PLACEHOLDER: Step-by-step initial setup ---]',
        'h1_components': '<span class="emoji">🧩</span> Core Components (assigned automatically)',
        'warning_box_components': '<strong>Important Note:</strong> All components described below are added to game objects automatically during the parsing process (when you click the <code>Update Keys</code> button). You do not need to add them manually.',
        'p_components_intro': 'These components are the "bridge" between your objects in the scene and the translation database. They "listen" for language changes and automatically substitute the correct text or asset.',
        'h2_localizedtext': '3.1. LocalizedText',
        'p_localizedtext_1': 'The main component for displaying translated text. It is placed on objects with <code>Text</code>, <code>TMP_Text</code>, and <code>TextMesh</code>.',
        'li_localizedtext_1': '<code>localizationKey</code>: The key used to find the translation. Generated automatically.',
        'li_localizedtext_2': '<code>isStyleOnly</code>: If <code>true</code>, the component will only apply styles (font, RTL) but not change the text itself. Useful for elements whose text is managed by another script (e.g., <code>LanguageSelector</code>).',
        'li_localizedtext_3': '<code>originalSourceText</code>: The source text in the base language. Used as a fallback.',
        'h2_localizedasset': '3.2. LocalizedAsset',
        'p_localizedasset_1': 'Used for swapping assets (<code>Sprite</code>, <code>AudioClip</code>, <code>Material</code>, etc.). It automatically detects the type of the target component on the object (<code>Image</code>, <code>AudioSource</code>) and replaces its resource.',
        'p_localizedasset_2': 'For components with the <strong>Play on Awake</strong> option (like <code>AudioSource</code>, <code>VideoPlayer</code>), <code>LocalizedAsset</code> correctly intercepts the auto-play, swaps the asset, and then starts playback to avoid playing non-localized content.',
        'h2_localizedprefab': '3.3. LocalizedPrefab',
        'p_localizedprefab_1': 'A component for localizing entire prefabs. It operates non-destructively: it does not modify the original prefab but creates an instance of the localized version as a child object, disabling all scripts (<code>MonoBehaviour</code>), renderers (<code>Renderer</code>), and colliders (<code>Collider</code>) on the original object. This prevents duplicate logic execution and visual artifacts. For correct runtime operation, its execution order is set to -100 (<code>[DefaultExecutionOrder(-100)]</code>) to ensure it runs before other scripts.',
        'h2_uitklocalization': '3.4. UITKLocalization',
        'p_uitklocalization_1': 'Added to objects with a <code>UIDocument</code> to manage the localization of all text elements within a UI Toolkit document (UXML).',
        'h2_localizeddropdown': '3.5. LocalizedDropdown',
        'p_localizeddropdown_1': 'Added to <code>Dropdown</code> and <code>TMP_Dropdown</code> to translate their options.',
        'h2_localizedbehaviour': '3.6. LocalizedBehaviour',
        'p_localizedbehaviour_1': 'A utility component that allows your scripts to react to language changes. It automatically finds and calls methods marked with the <code>[OnLanguageChange]</code> attribute.',
        'h2_context_menu': '3.7. "Analyze for Localization" Context Menu',
        'p_context_menu_1': 'To quickly add a <code>LocalizedAsset</code> to an object, you can right-click on the desired component (e.g., <code>Image</code>, <code>AudioSource</code>) in the inspector and select <strong>Analyze for Localization</strong>. The tool will add and configure the component for you. (This is optional but can be used for manual addition).',
        'placeholder_img_context_menu': '[--- IMAGE PLACEHOLDER: "Analyze for Localization" context menu ---]',
        'h1_loc_tool_window': '<span class="emoji">🖼️</span> "Localization Tool" Window',
        'h2_in_editor_preview': '4.1. In-Editor Preview',
        'p_preview_1': 'Directly under the title is the <strong>Preview Language</strong> dropdown list. This powerful feature allows you to see what the localization will look like in any language directly in the <strong>Scene</strong> window, without running the game.',
        'placeholder_gif_preview': '[--- GIF PLACEHOLDER: Live Preview demonstration ---]',
        'li_preview_1': '<strong>How it works:</strong> Select a language from the list, and the tool will instantly apply the corresponding translations, fonts, RTL settings, and assets to all localizable objects in the active scene.',
        'li_preview_2': '<strong>Placeholders:</strong> If a placeholder style (e.g., <strong>Accents</strong> or <strong>Brackets</strong>) is selected in the <strong>Settings</strong> tab, these placeholders will be displayed in preview mode instead of actual translations. This is ideal for testing layout and finding non-localized elements.',
        'li_preview_3': '<strong>Safety:</strong> All changes made in preview mode are temporary. The tool will automatically revert everything to its original state when you select "<strong>Revert to Original</strong>", close the window, change scenes, or before saving a scene/prefab (thanks to the <code>LocalizationPreviewProtector</code> component).',
        'li_preview_4': '<strong>Crash Protection:</strong> A built-in <code>PreviewCrashProtector</code> system will automatically restore the original state of objects if the Unity editor closes unexpectedly while a preview is active.',
        'h2_tab_settings': '4.2. "Settings" Tab',
        'p_settings_1': 'Your control center. Here, you define the global rules for the entire localization process.',
        'placeholder_img_settings': '[--- IMAGE PLACEHOLDER: Screenshot of the "Settings" tab ---]',
        'li_settings_1': '<strong>Key Generation Mode:</strong> Choose how keys are created.<ul><li><code>UseTextAsKey</code>: The text itself becomes the key. Ideal for prototypes. Downside: if you change the source text, the key changes, and all its translations will be lost.</li><li><code>AutoGenerateKeysOnly</code>: The key is generated based on the object\'s hierarchy and name. Reliable for production. Upside: translations do not break when the text changes.</li><li><code>UseTextAsKeyWithCustomPriority</code> and <code>AutoGenerateWithCustomKeys</code>: Hybrid modes that allow you to set custom keys in code via the <code>[LocalizableField("my_custom_key")]</code> attribute.</li><li><strong>Safe Migration:</strong> You can change the mode at any time. The tool will automatically migrate all existing translations to the new key system.</li></ul>',
        'li_settings_2': '<strong>Language Management:</strong> Configure the list of languages. For languages with special characters, assign a corresponding <strong>Font Asset</strong>. Enable the <strong>RTL</strong> option for right-to-left languages.',
        'li_settings_3': '<strong>General Settings:</strong><ul><li><code>Parse Prefabs</code>: Enables prefab parsing.</li><li><code>Split files by language</code>: Determines how to store translations (one large file or one file per language).</li><li><code>Translations Path</code>: The path for storing <code>.json</code> translation files. Important: the folder must be inside <code>Assets/StreamingAssets/</code>.</li></ul>',
        'li_settings_4': '<strong>Debugging & Testing:</strong><ul><li><code>Placeholder Style</code>: Choose the style for displaying placeholders in preview mode.</li></ul>',
        'li_settings_5': '<strong>Live Updates:</strong> Settings for downloading translations from a remote server.',
        'li_settings_6': '<strong>Runtime API Key:</strong> A section for securely storing an API key that may be needed in the compiled game (stored in encrypted form).',
        'h2_tab_content': '4.3. "Content" Tab',
        'p_content_1': 'Here you tell the tool where exactly to look for text.',
        'placeholder_img_content': '[--- IMAGE PLACEHOLDER: Screenshot of the "Content" tab ---]',
        'li_content_1': '<strong>Scenes to Parse:</strong> Drag and drop all scenes for analysis here.',
        'li_content_2': '<strong>Prefab Folders:</strong> Specify folders containing prefabs.',
        'li_content_3': '<strong>Dynamic Texts:</strong> Enter strings here that are created exclusively in code (e.g., "Game Over").',
        'li_content_4': '<strong>Parsing Ignores:</strong> Specify scripts, components, or objects to ignore.',
        'li_content_5': '<strong>Pin:</strong> This feature allows you to "pin" an object from the scene to the ignore list. Instead of a temporary reference, the tool saves its full path in the hierarchy, making the ignore persistent between sessions (but note that renaming the object or its parent will break this link).',
        'h2_tab_actions': '4.4. "Actions" Tab',
        'p_actions_1': 'The main work tab.',
        'placeholder_img_actions': '[--- IMAGE PLACEHOLDER: Screenshot of the "Actions" tab ---]',
        'li_actions_1': '<strong>Update Keys:</strong> Runs the parser that updates your translation files.',
        'li_actions_2': '<strong>Open Translation Editor:</strong> Opens a separate, more convenient window for editing all translations.',
        'li_actions_3': '<strong>Data Management:</strong> Use for exchanging data with translators (Export/Import to CSV/XML/YAML/XLIFF, import from Google Sheets).',
        'li_actions_4': '<strong>Auto-Translation:</strong> Automatically fills all empty translation strings. New settings allow you to manage the batch size (<strong>Batch Size</strong>) and retry policy (<strong>Retry Policy</strong>) for each service (DeepL, Google, Microsoft) separately. The tool tracks the number of translated characters and warns about potentially exceeding limits.',
        'li_actions_5': '<strong>Danger Zone:</strong> Contains buttons for completely removing all localization components from the project. Use with caution!',
        'h2_tab_assets': '4.5. "Assets" Tab',
        'p_assets_1': 'This tab is entirely dedicated to localizing non-textual resources.',
        'placeholder_img_assets': '[--- IMAGE PLACEHOLDER: Screenshot of the "Assets" tab ---]',
        'li_assets_1': '<strong>Create folder structure (optional):</strong> In section <strong>2. Asset Folder Generation</strong>, click <strong>Create Asset Folders Now</strong>.',
        'li_assets_2': '<strong>Configure categories and naming rules:</strong> In section <strong>3. Asset Categories & Scanning</strong>, ensure the <strong>Naming Rule</strong> (<code>{key}_{lang}</code>) matches your files (e.g., <code>button_ok_en.png</code>).',
        'li_assets_3': '<strong>Place your assets:</strong> Put localized assets in the folders.',
        'li_assets_4': '<strong>Scan assets:</strong> In section <strong>4. Automation</strong>, click <strong>Scan Assets & Update Tables</strong>. The cleanup process is now safer: only old table files (<code>.asset</code>) are deleted, not the entire folder.',
        'li_assets_5': '<strong>Link assets to objects:</strong> Click <strong>Analyze Project & Attach Components</strong>.',
        'h2_tab_report': '4.6. "Report" Tab',
        'p_report_1': 'After each parsing, this report provides a complete picture of your localization status.',
        'placeholder_img_report': '[--- IMAGE PLACEHOLDER: Screenshot of the "Report" tab ---]',
        'li_report_1': '<strong>Categories:</strong> All Keys, Added, Updated (text changed), Removed, Duplicates, Migrated, Skipped (unchanged).',
        'li_report_2': '<strong>Advanced Search:</strong> Click the <strong>Find</strong> button next to any entry to instantly find the corresponding object in the project. The search works asynchronously, without blocking the editor, and searches across all scenes and prefabs. If a key is used in multiple places, a dropdown list with all sources will appear.',
        'h1_translation_editor': '<span class="emoji">📝</span> Translation Table Editor',
        'p_editor_1': 'Opened via <strong>Tools -> Localization -> Translation Table Editor</strong>. This is the primary tool for manually editing translations.',
        'placeholder_gif_editor': '[--- GIF PLACEHOLDER: Working in the translation editor ---]',
        'li_editor_1': '<strong>Smart Grouping:</strong> Keys for plurals and gender (e.g., <code>apple_count_one</code>, <code>apple_count_few</code>) are automatically combined into collapsible groups.',
        'li_editor_2': '<strong>Advanced Editing:</strong> Click on a cell to open the <strong>MultiLineEditWindow</strong> popup. It shows the source text for comparison, allows you to quickly copy it, and validates placeholder matching (e.g., <code>{username}</code>) in real-time, highlighting missing or extra ones.',
        'li_editor_3': '<strong>Placeholder Validation via Comments:</strong> You can explicitly specify which placeholders should be in the translation by adding a special directive in the key\'s comment, for example: <code>@placeholders: {username}, {score}</code>. The <strong>MultiLineEditWindow</strong> will use this list as the primary source of truth.',
        'li_editor_4': '<strong>Navigation and Management:</strong> Navigate the table with scrollbars or by holding the middle mouse button. Change column widths by dragging the dividers. Save changes with <code>Ctrl+S</code>.',
        'li_editor_5': '<strong>Full Undo/Redo:</strong> The entire action stack (text changes, adding/deleting keys) is fully supported via <code>Ctrl+Z</code> / <code>Ctrl+Y</code>.',
        'li_editor_6': '<strong>Backups and Autosave:</strong> Use the <strong>Manage Backups</strong> button. The tool also automatically saves your session every few minutes. In case of a crash, you will be prompted to restore changes.',
        'h1_usage_examples': '<span class="emoji">💡</span> Usage Examples',
        'h2_example_components': '6.1. Ready-made components and examples',
        'p_example_components_1': 'The project includes ready-to-use scripts that serve as excellent examples.',
        'li_example_components_1': '<strong><code>LanguageSelector.cs</code>:</strong> A ready-made component for creating a UI dropdown list for language switching. It automatically finds all available languages and manages their switching.<br><strong>How to use:</strong> Simply add the <code>LanguageSelector</code> component to your scene (e.g., on an empty GameObject) and specify your <code>TMP_Dropdown</code> in the inspector.',
        'li_example_components_2': '<strong>Code Examples:</strong> To learn advanced techniques like working with <code>[LocalizableField]</code>, the <code>_()</code> function, plurals, and gender, study the files <code>StatPurchaseTest.cs</code> and <code>TestLocalization.cs</code>. They clearly demonstrate the implementation of all the main features of the tool in code.',
        'h2_example_attribute': '6.2. [LocalizableField] Attribute',
        'p_example_attribute_1': 'The preferred method for texts that are part of a component\'s configuration in the inspector. The parser can now work with strings, lists/arrays of strings, and even fields within nested <code>[System.Serializable]</code> classes.',
        'code_example_attribute': `using Ankonoanko.Localization; // Required for [LocalizableField]
using UnityEngine;
using System.Collections.Generic;
public class QuestManager : MonoBehaviour
{
    // The parser will find this field and create a key for it
    [LocalizableField]
    private string defaultQuestFailedMessage = "You have failed the quest.";
    
    // You can set a custom key
    [LocalizableField("custom_quest_start_dialog")]
    public string startDialog = "Are you ready for an adventure?";
    
    // Works with lists
    [LocalizableField]
    private List<string> missionObjectives = new List<string> { "Find the treasure" };
    
    // And even with nested classes!
    [System.Serializable]
    public class ItemInfo
    {
        [LocalizableField] public string Name;
        [LocalizableField] public string Description;
    }
    
    [LocalizableField]
    private ItemInfo magicSword;
}`,
        'h2_example_function': '6.3. _() Function and [OnLanguageChange] Attribute',
        'p_example_function_1': 'Use the <code>_()</code> function for dynamic text that changes during the game. The method that updates the UI should be marked with the <code>[OnLanguageChange]</code> attribute to be called automatically when the language changes. A <code>LocalizedBehaviour</code> component will be added to the object automatically for this purpose.',
        'code_example_function': `// To use the short _() call, add these lines
using static Ankonoanko.Localization.LocalizationManager;
using Ankonoanko.Localization; // Required for [OnLanguageChange]
using UnityEngine;
using TMPro;
using System.Collections.Generic;
public class PlayerHUD : MonoBehaviour
{
    [SerializeField] private TMP_Text scoreText;
    private int score = 100;
    private string playerName = "Alex";
    
    void Start()
    {
        UpdateUI(); // Initial update
    }
    
    // This method will be called automatically when the language changes
    [OnLanguageChange]
    void UpdateUI()
    {
        // 1. Indexed placeholders (like in string.Format)
        // Key: "score_label", Text in file: "Score: {0}"
        scoreText.text = _("score_label", score); // Result: "Score: 100"
        
        // 2. Named placeholders (recommended for readability)
        // Key: "welcome_message", Text: "Welcome, {username}!"
        string welcomeText = _("welcome_message", new { username = playerName });
        
        // For complex cases or high performance
        var args = new Dictionary<string, object> { { "username", playerName } };
        string welcomeText2 = _("welcome_message", args);
    }
}`,
        'h2_example_plurals': '6.4. Plurals and Gender',
        'p_example_plurals_1': 'The tool now uses more precise rules for different language groups.',
        'code_example_plurals': `using static Ankonoanko.Localization.LocalizationManager;
using Ankonoanko.Localization;
using UnityEngine;
public class ItemCounter : MonoBehaviour
{
    void DisplayItemCount(int count)
    {
        // Keys: "apple_count_one", "apple_count_few", "apple_count_many"
        // Texts: "{0} apple", "{0} apples", "{0} apples"
        string appleText = _("apple_count", count); 
        Debug.Log(appleText); // Automatically selects the correct form
    }
    
    void GreetUser(Gender userGender)
    {
        // Keys: "user_greeted_male", "user_greeted_female"
        // Texts: "He has arrived.", "She has arrived."
        string greeting = _("user_greeted", userGender);
        Debug.Log(greeting);
    }
}`,
        'h1_important_notes': '<span class="emoji">⚠️</span> Important Notes and Warnings',
        'li_notes_1': '<strong>Backups:</strong> Before global operations (<code>Update Keys</code>, data import), always create a backup via <strong>Translation Table Editor -> Manage Backups</strong>.',
        'li_notes_2': '<strong>API Key Security:</strong> The API key for editor use is stored locally on your machine (in <code>EditorPrefs</code>) and is not committed to the repository. For keys needed in the game build, use the <strong>Runtime API Key</strong> section.',
        'li_notes_3': '<strong><code>StreamingAssets</code> Folder:</strong> Translation files must be located in a subfolder of <code>Assets/StreamingAssets/</code> to be included in the game build.',
        'li_notes_4': '<strong>"Foolproof" Protection:</strong> The tool automatically protects you from accidentally saving temporary data from preview mode into a scene or prefab.',
        'li_notes_5': '<strong>Performance:</strong> The <code>_()</code> call is fast, but in loops that run every frame (e.g., in <code>Update</code>), try to cache the result in a variable.',
        'li_notes_6': '<strong>Excluding <code>LanguageSelector</code> from Parsing:</strong> The object with the <code>LanguageSelector</code> component and its <code>TMP_Dropdown</code> must be added to the <strong>Ignore Specific Objects</strong> list in the <strong>Content</strong> tab. This is necessary to prevent the parser from creating unnecessary keys for the dropdown options, as the <code>LanguageSelector</code> script populates them dynamically at runtime. Ignoring them prevents conflicts and keeps the translation files clean.',
        'li_notes_7': '<strong>Fonts for <code>LanguageSelector</code>:</strong> To ensure the selected language in the <code>TMP_Dropdown</code> correctly updates its font, manually add an empty <code>LocalizedText</code> component to the child <strong>Label</strong> object of the Dropdown and check the <code>isStyleOnly</code> box.',
        'h1_extending': '<span class="emoji">🧬</span> Extending Functionality',
        'h2_custom_parser': '8.1. Creating a Custom Parser',
        'p_custom_parser_1': 'You can easily extend the system to support custom components by creating your own parser class.',
        'li_custom_parser_1': 'Create a new C# script in the <strong>Editor</strong> folder of your project.',
        'li_custom_parser_2': 'Copy the template below into it.',
        'li_custom_parser_3': 'Modify the logic to match your component.',
        'code_custom_parser': `#if UNITY_EDITOR
using System.Collections.Generic;
using UnityEngine;
using Ankonoanko.Localization;
// TEMPLATE for creating a parser for a custom component.
public class CustomComponentParser_Template : ITextComponentParser
{
    public IEnumerable<(string text, string key, string source)> Parse(
        GameObject gameObject,
        LocalizationSettings settings)
    {
        // 1. Check if the object has the custom component we need.
        var component = gameObject.GetComponent<AwesomeComponentFromAssetStore>();
        if (component == null)
        {
            yield break; // Exit if the component is not found
        }
        
        // 2. Get the text from the custom component's fields.
        string titleText = component.Title;
        
        // 3. Check if the text is valid for localization.
        if (TextParser.IsValidLocalizableText(titleText))
        {
            // 4. Generate a key and source using helpers from TextParser.
            string key = TextParser.GenerateKeyForObject(gameObject, titleText, settings.keyGenerationMode);
            string source = TextParser.GetSourceStringForObject(gameObject);
            
            // 5. Return the result.
            yield return (titleText, key, source);
        }
        
        // 6. Repeat for other fields...
        // (you can add a suffix to make keys unique)
        string descriptionText = component.Description;
        if (TextParser.IsValidLocalizableText(descriptionText))
        {
            string key = TextParser.GenerateKeyForObject(gameObject, descriptionText, settings.keyGenerationMode) + "_description";
            string source = TextParser.GetSourceStringForObject(gameObject);
            yield return (descriptionText, key, source);
        }
    }
}
#endif`
    },
    // Other languages are shortened for brevity but would follow the same structure.
    'de': {
        'page_title': 'Unity Lokalisierungs-Tool Dokumentation',
        'toc_title': 'Inhaltsverzeichnis',
        'toc_search_placeholder': 'Inhalt filtern...',
        'nav_introduction': '1. Einleitung',
        'nav_quick_start': '2. Schnellstart und Einrichtung'
    },
    'es': {
        'page_title': 'Documentación de la Herramienta de Localización de Unity',
        'toc_title': 'Tabla de Contenidos',
        'toc_search_placeholder': 'Filtrar contenido...',
        'nav_introduction': '1. Introducción',
        'nav_quick_start': '2. Inicio Rápido y Configuración'
    },
    'zh': {
        'page_title': 'Unity 本地化工具文档',
        'toc_title': '目录',
        'toc_search_placeholder': '筛选内容...',
        'nav_introduction': '1. 简介',
        'nav_quick_start': '2. 快速入门和设置'
    },
     'hi': {
        'page_title': 'Unity स्थानीयकरण उपकरण दस्तावेज़ीकरण',
        'toc_title': 'विषय-सूची',
        'toc_search_placeholder': 'सामग्री फ़िल्टर करें...',
        'nav_introduction': '1. परिचय',
        'nav_quick_start': '2. त्वरित आरंभ और सेटअप'
    }
};
