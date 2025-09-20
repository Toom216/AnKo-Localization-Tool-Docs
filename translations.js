const translations = { 
    'ru': {
        'page_title': 'Документация по инструменту локализации для Unity',
        'toc_title': 'Оглавление',
        'toc_search_placeholder': 'Поиск по документации...',
        'nav_introduction': '1. Введение',
        'nav_quick_start': '2. Быстрый старт',
        'nav_components': '3. Основные компоненты',
        'nav_loc_tool_window': '4. Окно "Localization Tool"',
        'nav_translation_editor': '5. Редактор переводов',
        'nav_usage_examples': '6. Примеры использования',
        'nav_important_notes': '7. Важные нюансы',
        'nav_extending': '8. Расширение функционала',
        'nav_faq': '9. FAQ и Решение проблем',
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
        'nav_faq_installation': '9.1. Установка и Быстрый старт',
        'nav_faq_components': '9.2. Основные компоненты',
        'nav_faq_window': '9.3. Окно "Localization Tool"',
        'nav_faq_window_actions': '9.3. Окно "Localization Tool" - Вкладка "Actions"',
        'nav_faq_window_assets': '9.3. Окно "Localization Tool" - Вкладка "Assets"',
        'nav_faq_window_report': '9.3. Окно "Localization Tool" - Вкладка "Report"',
        'nav_faq_editor': '9.4. Редактор переводов',
        'nav_faq_examples': '9.5. Примеры использования и работа с кодом',
        'nav_faq_notes': '9.6. Важные нюансы и предупреждения',
        'nav_faq_extending': '9.7. Расширение функционала',
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
        'h1_quick_start': '<span class="emoji">🛠️</span> Быстрый старт и настройка',
        'h2_installation': '2.1. Установка',
        'li_install_1': 'Скопируйте ассет в папку вашего проекта Unity.',
        'li_install_2': 'Инструмент автоматически проверит наличие необходимых зависимостей. В появившемся диалоговом окне установщика подтвердите установку.',
        'li_install_3': 'Обязательные зависимости (<code>Newtonsoft Json</code>, <code>Editor Coroutines</code>) необходимы для базовой работы.',
        'li_install_4': 'Опциональные зависимости (<code>Arabic Support</code>, <code>CsvHelper</code>, <code>YamlDotNet</code>) включают дополнительные функции.',
        'li_install_5': 'Нажмите <strong>Install Selected</strong>, чтобы установить рекомендуемые пакеты.',
        'li_install_6': 'После установки откройте главное окно инструмента через меню <strong>Tools -> Localization Tool</strong>.',
        'h2_initial_setup': '2.2. Первоначальная настройка',
        'li_setup_1': '<strong>Создание настроек:</strong> При первом открытии инструмент создаст файл настроек <code>LocalizationSettings.asset</code> в папке <code>Assets/Resources</code>.',
        'li_setup_2': '<strong>Настройка языков:</strong> На вкладке <strong>Settings</strong> в секции <strong>Language Management</strong> убедитесь, что ваш основной язык (например, <code>en</code> — английский) выбран как <strong>Source Language</strong>. Включите (<strong>Enabled</strong>) все языки, которые вы планируете поддерживать.',
        'li_setup_3': '<strong>Указание контента для парсинга:</strong> На вкладке <strong>Content</strong> добавьте все сцены для анализа в список <strong>Scenes to Parse</strong>. Если вы используете префабы с текстом, убедитесь, что папки с ними добавлены в <strong>Prefab Folders</strong>.',
        'li_setup_4': '<strong>Первый запуск парсера:</strong> Перейдите на вкладку <strong>Actions</strong> и нажмите кнопку <code>Update Keys</code>. Инструмент просканирует ваш проект, создаст файлы с переводами и автоматически добавит необходимые компоненты (<code>LocalizedText</code>, <code>LocalizedAsset</code> и т.д.) на игровые объекты.',
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
        'h1_loc_tool_window': '<span class="emoji">🖼️</span> Окно "Localization Tool"',
        'h2_in_editor_preview': '4.1. Предпросмотр в редакторе (In-Editor Preview)',
        'p_preview_1': 'Прямо под заголовком находится выпадающий список <strong>Preview Language</strong>. Эта мощная функция позволяет увидеть, как будет выглядеть локализация на любом языке прямо в окне <strong>Scene</strong>, не запуская игру.',
        'li_preview_1': '<strong>Как это работает:</strong> Выберите язык из списка, и инструмент мгновенно применит соответствующие переводы, шрифты, RTL-настройки и ассеты ко всем локализуемым объектам на активной сцене.',
        'li_preview_2': '<strong>Плейсхолдеры:</strong> Если на вкладке <strong>Settings</strong> выбран стиль плейсхолдеров (например, <strong>Accents</strong> или <strong>Brackets</strong>), то в режиме превью вместо реальных переводов будут отображаться эти плейсхолдеры. Это идеально подходит для тестирования верстки и поиска нелокализованных элементов.',
        'li_preview_3': '<strong>Безопасность:</strong> Все изменения, внесенные в режиме превью, являются временными. Инструмент автоматически вернет все в исходное состояние при выборе "<strong>Revert to Original</strong>", закрытии окна, смене сцены или перед сохранением сцены/префаба (благодаря компоненту <code>LocalizationPreviewProtector</code>).',
        'li_preview_4': '<strong>Защита от сбоев:</strong> Встроенная система <code>PreviewCrashProtector</code> автоматически восстановит исходное состояние объектов, если редактор Unity закроется аварийно во время активного превью.',
        'h2_tab_settings': '4.2. Вкладка "Settings" (Настройки)',
        'p_settings_1': 'Ваш центр управления. Здесь вы определяете глобальные правила для всего процесса локализации.',
        'li_settings_1': '<strong>Key Generation Mode:</strong> Выберите, как будут создаваться ключи.<ul><li><code>UseTextAsKey</code>: Ключом становится сам текст. Идеально для прототипов. Минус: если изменить исходный текст, ключ изменится, и все его переводы будут потеряны.</li><li><code>AutoGenerateKeysOnly</code>: Ключ генерируется на основе иерархии и имени объекта. Надежно для продакшена. Плюс: переводы не ломаются при изменении текста.</li><li><code>UseTextAsKeyWithCustomPriority</code> и <code>AutoGenerateWithCustomKeys</code>: Гибридные режимы, позволяющие задавать кастомные ключи в коде через атрибут <code>[LocalizableField("my_custom_key")]</code>.</li><li><strong>Безопасная миграция:</strong> Вы можете сменить режим в любой момент. Инструмент автоматически перенесет все существующие переводы на новую систему ключей.</li></ul>',
        'li_settings_2': '<strong>Language Management:</strong> Настройте список языков. Для языков с особыми символами назначьте соответствующий <strong>Font Asset</strong>. Включите опцию <strong>RTL</strong> для языков с письмом справа налево.',
        'li_settings_3': '<strong>General Settings:</strong><ul><li><code>Parse Prefabs</code>: Включает парсинг префабов.</li><li><code>Split files by language</code>: Определяет, как хранить переводы (один большой файл или по файлу на язык).</li><li><code>Translations Path</code>: Путь для хранения файлов <code>.json</code> с переводами. Важно: папка должна находиться внутри <code>Assets/StreamingAssets/</code>.</li></ul>',
        'li_settings_4': '<strong>Debugging & Testing:</strong><ul><li><code>Placeholder Style</code>: Выберите стиль для отображения плейсхолдеров в режиме превью.</li></ul>',
        'li_settings_5': '<strong>Live Updates:</strong> Настройки для загрузки переводов с удаленного сервера.',
        'li_settings_6': '<strong>Runtime API Key:</strong> Секция для безопасного хранения API ключа, который может понадобиться в скомпилированной игре (хранится в зашифрованном виде).',
        'h2_tab_content': '4.3. Вкладка "Content" (Контент)',
        'p_content_1': 'Здесь вы сообщаете инструменту, где именно искать текст.',
        'li_content_1': '<strong>Scenes to Parse:</strong> Перетащите сюда все сцены для анализа.',
        'li_content_2': '<strong>Prefab Folders:</strong> Укажите папки с префабами.',
        'li_content_3': '<strong>Dynamic Texts:</strong> Впишите сюда строки, которые создаются исключительно в коде (например, "Game Over").',
        'li_content_4': '<strong>Parsing Ignores:</strong> Укажите скрипты, компоненты или объекты для игнорирования.',
        'li_content_5': '<strong>Pin:</strong> Эта функция позволяет "закрепить" объект из сцены в списке игнорирования. Вместо временной ссылки на объект, инструмент сохранит его полный путь в иерархии, делая игнорирование постоянным между сессиями (но учтите, что переименование объекта или его родителя сломает эту связь).',
        'h2_tab_actions': '4.4. Вкладка "Actions" (Действия)',
        'p_actions_1': 'Главная рабочая вкладка.',
        'li_actions_1': '<strong>Update Keys:</strong> Запускает парсер, который обновляет ваши файлы переводов.',
        'li_actions_2': '<strong>Open Translation Editor:</strong> Открывает отдельное, более удобное окно для редактирования всех переводов.',
        'li_actions_3': '<strong>Data Management:</strong> Используйте для обмена данными с переводчиками (Export/Import в CSV/XML/YAML/XLIFF, импорт из Google Sheets).',
        'li_actions_4': '<strong>Auto-Translation:</strong> Автоматически заполняет все пустые строки переводов. Новые настройки позволяют управлять размером пакета (<strong>Batch Size</strong>) и политикой повторных попыток (<strong>Retry Policy</strong>) для каждого сервиса (DeepL, Google, Microsoft) отдельно. Инструмент отслеживает количество переведенных символов и предупреждает о возможном превышении лимита.',
        'li_actions_5': '<strong>Danger Zone:</strong> Содержит кнопки для полного удаления всех компонентов локализации из проекта. Используйте с осторожностью!',
        'h2_tab_assets': '4.5. Вкладка "Assets" (Ассеты)',
        'p_assets_1': 'Эта вкладка полностью посвящена локализации нетекстовых ресурсов.',
        'li_assets_1': '<strong>Создайте структуру папок (опционально):</strong> В секции <strong>2. Asset Folder Generation</strong> нажмите <strong>Create Asset Folders Now</strong>.',
        'li_assets_2': '<strong>Настройте категории и правила именования:</strong> В секции <strong>3. Asset Categories & Scanning</strong> убедитесь, что правило <strong>Naming Rule</strong> (<code>{key}_{lang}</code>) соответствует вашим файлам (например, <code>button_ok_en.png</code>).',
        'li_assets_3': '<strong>Разместите ваши ассеты:</strong> Положите локализованные ассеты в папки.',
        'li_assets_4': '<strong>Просканируйте ассеты:</strong> В секции <strong>4. Automation</strong> нажмите <strong>Scan Assets & Update Tables</strong>. Процесс очистки стал безопаснее: теперь удаляются только старые файлы таблиц (<code>.asset</code>), а не вся папка.',
        'li_assets_5': '<strong>Привяжите ассеты к объектам:</strong> Нажмите <strong>Analyze Project & Attach Components</strong>.',
        'h2_tab_report': '4.6. Вкладка "Report" (Отчет)',
        'p_report_1': 'После каждого парсинга этот отчет показывает полную картину состояния вашей локализации.',
        'li_report_1': '<strong>Категории:</strong> All Keys (все ключи), Added (новые), Updated (текст изменился), Removed (удаленные), Duplicates (дубликаты), Migrated (перенесенные), Skipped (неизменные).',
        'li_report_2': '<strong>Продвинутый поиск:</strong> Нажмите кнопку <strong>Find</strong> напротив любой записи, чтобы мгновенно найти соответствующий объект в проекте. Поиск работает асинхронно, не блокируя редактор, и ищет по всем сценам и префабам. Если ключ используется в нескольких местах, появится выпадающий список со всеми источниками.',
        'h1_translation_editor': '<span class="emoji">📝</span> Редактор переводов ("Translation Table Editor")',
        'p_editor_1': 'Открывается через <strong>Tools -> Localization -> Translation Table Editor</strong>. Это основной инструмент для ручного редактирования переводов.',
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
    // Парсер найдет это поле и создаст для него ключ
    [LocalizableField]
    private string defaultQuestFailedMessage = "You have failed the quest.";
    
    // Можно задать собственный ключ
    [LocalizableField("custom_quest_start_dialog")]
    public string startDialog = "Are you ready for an adventure?";
    
    // Работает со списками
    [LocalizableField]
    private List<string> missionObjectives = new List<string> { "Find the treasure" };
    
    // И даже с вложенными классами!
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
        'code_example_function': `// Чтобы использовать короткий вызов _(), добавьте эти строки
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
        UpdateUI(); // Первоначальное обновление
    }
    
    // Этот метод будет вызван автоматически при смене языка
    [OnLanguageChange]
    void UpdateUI()
    {
        // 1. Индексные плейсхолдеры (как в string.Format)
        // Ключ: "score_label", Текст в файле: "Score: {0}"
        scoreText.text = _("score_label", score); // Результат: "Score: 100"
        
        // 2. Именованные плейсхолдеры (рекомендуется для читаемости)
        // Ключ: "welcome_message", Текст: "Welcome, {username}!"
        string welcomeText = _("welcome_message", new { username = playerName });
        
        // Для сложных случаев или высокой производительности
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
        // Ключи: "apple_count_one", "apple_count_few", "apple_count_many"
        // Тексты: "{0} яблоко", "{0} яблока", "{0} яблок"
        string appleText = _("apple_count", count); 
        Debug.Log(appleText); // Автоматически выберет правильную форму
    }
    
    void GreetUser(Gender userGender)
    {
        // Ключи: "user_greeted_male", "user_greeted_female"
        // Тексты: "Он пришел.", "Она пришла."
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

// ШАБЛОН для создания парсера для кастомного компонента.
public class CustomComponentParser_Template : ITextComponentParser
{
    public IEnumerable<(string text, string key, string source)> Parse(
        GameObject gameObject,
        LocalizationSettings settings)
    {
        // 1. Проверяем, есть ли на объекте нужный нам кастомный компонент.
        var component = gameObject.GetComponent<AwesomeComponentFromAssetStore>();
        if (component == null)
        {
            yield break; // Выходим, если компонента нет
        }
        
        // 2. Получаем текст из полей кастомного компонента.
        string titleText = component.Title;
        
        // 3. Проверяем, является ли текст валидным для локализации.
        if (TextParser.IsValidLocalizableText(titleText))
        {
            // 4. Генерируем ключ и источник, используя хелперы из TextParser.
            string key = TextParser.GenerateKeyForObject(gameObject, titleText, settings.keyGenerationMode);
            string source = TextParser.GetSourceStringForObject(gameObject);
            
            // 5. Возвращаем результат.
            yield return (titleText, key, source);
        }
        
        // 6. Повторяем для других полей...
        // (можно добавить суффикс, чтобы ключи были уникальными)
        string descriptionText = component.Description;
        if (TextParser.IsValidLocalizableText(descriptionText))
        {
            string key = TextParser.GenerateKeyForObject(gameObject, descriptionText, settings.keyGenerationMode) + "_description";
            string source = TextParser.GetSourceStringForObject(gameObject);
            yield return (descriptionText, key, source);
        }
    }
}
#endif`,
        
        'h1_faq': '<span class="emoji">❓</span> FAQ и Решение проблем',
        'h2_faq_installation': '9.1. Установка и Быстрый старт',
        'q_faq_installation_1': 'Что произойдет, если в моем проекте уже есть пакет com.unity.nuget.newtonsoft-json от другого ассета? Попытается ли установщик зависимостей его обновить или проигнорирует?',
        'a_faq_installation_1': 'Установщик проверяет наличие типа Newtonsoft.Json.JsonConvert. Если тип существует, он считает зависимость удовлетворенной и не будет пытаться установить или обновить пакет. Это сделано для предотвращения конфликтов версий.',
        'q_faq_installation_2': 'Я случайно нажал "Skip for Now" и поставил галочку "Don\'t ask again" для опциональных зависимостей (например, для поддержки CSV). Как мне снова вызвать окно установщика, чтобы их установить?',
        'a_faq_installation_2': 'Вы можете в любой момент вызвать проверку зависимостей вручную через меню Tools -> Localization -> Check Dependencies. Это сбросит флаг "Don\'t ask again" и снова покажет окно со всеми недостающими опциональными пакетами.',
        'q_faq_installation_3': 'Инструмент не создал LocalizationSettings.asset в Assets/Resources. Почему это могло произойти и могу ли я создать его вручную через меню Assets -> Create?',
        'a_faq_installation_3': 'Это может произойти, если у вас нет папки Assets/Resources. Инструмент попытается ее создать, но права доступа к файловой системе могут помешать. Да, вы можете создать ассет вручную: кликните правой кнопкой мыши в папке Resources, выберите Create -> Localization -> Settings. Инструмент автоматически найдет его.',
        'q_faq_installation_4': 'Могу ли я переместить файл LocalizationSettings.asset в другую папку Resources, например Assets/MyGame/Resources? Будет ли инструмент его находить?',
        'a_faq_installation_4': 'Да. Инструмент использует Resources.Load(), который ищет ассет по имени во всех папках с названием Resources в вашем проекте. Главное, чтобы файл сохранял свое имя LocalizationSettings.asset.',
        'q_faq_installation_5': 'Установщик зависимостей завис или выдал ошибку. Могу ли я установить зависимости (Newtonsoft Json, Editor Coroutines) вручную через Unity Package Manager?',
        'a_faq_installation_5': 'Да. Вы можете открыть Window -> Package Manager, нажать на "+" и выбрать "Add package by name...". Введите имена пакетов: com.unity.nuget.newtonsoft-json и com.unity.editorcoroutines.',
        
        'h2_faq_components': '9.2. Основные компоненты',
        'q_faq_components_1': 'Компонент LocalizedPrefab отключает MonoBehaviour на оригинальном объекте. Что если на оригинальном объекте есть скрипт, который в Awake() создает другие объекты или подписывается на события? Будет ли этот код выполнен?',
        'a_faq_components_1': 'Нет, не будет. Отключение MonoBehaviour предотвращает вызов всех "магических" методов Unity, включая Awake(), OnEnable() и Start(). Это сделано намеренно, чтобы избежать двойного выполнения логики. Вся инициализация должна происходить в скриптах на локализованных версиях префаба.',
        'q_faq_components_2': 'Если на оригинальном префабе (LocalizedPrefab) есть компонент Rigidbody или другой физический компонент, будет ли он отключен? Повлияет ли это на физику, если локализованный префаб его не имеет?',
        'a_faq_components_2': 'Компонент LocalizedPrefab отключает только компоненты типа Renderer, Collider и MonoBehaviour. Rigidbody и другие физические компоненты останутся активными. Это может привести к нежелательному поведению (например, падению невидимого объекта). Рекомендуется, чтобы на "пустышке" не было активных физических компонентов, либо чтобы они также присутствовали и на локализованном префабе.',
        'q_faq_components_3': 'Компонент LocalizedAsset хранит имя целевого компонента как строку (_targetComponentTypeName). Что произойдет, если я переименую скрипт кастомного компонента или перемещу его в другую сборку (Assembly Definition)? Перестанет ли LocalizedAsset работать для него?',
        'a_faq_components_3': 'Да, перестанет. Компонент хранит полное имя типа, включая пространство имен и сборку. При переименовании скрипта или его перемещении в другой .asmdef это имя изменится, и LocalizedAsset не сможет найти целевой компонент. Вам нужно будет запустить повторный анализ через Analyze Project & Attach Components, чтобы он обновил имя.',
        'q_faq_components_4': 'Если на одном GameObject висят два компонента Image, как LocalizedAsset поймет, какой из них нужно локализовать? Будет ли он работать с обоими или только с первым найденным?',
        'a_faq_components_4': 'LocalizedAsset создается для конкретного экземпляра компонента. В коде он хранит ссылку на этот компонент. Если вы вручную добавите второй LocalizedAsset и через контекстное меню "Analyze for Localization" укажете второй Image, то у вас будет два LocalizedAsset, каждый из которых будет управлять своим Image. Автоматический анализатор создаст компонент только для первого найденного Image с локализуемым ассетом.',
        'q_faq_components_5': 'В документации указано, что LocalizedPrefab имеет порядок выполнения -100. Что если у меня есть другой скрипт с порядком выполнения -110, который в Awake() пытается найти дочерний объект, создаваемый LocalizedPrefab? Успеет ли LocalizedPrefab создать свой экземпляр?',
        'a_faq_components_5': 'Да, успеет. LocalizedPrefab создает экземпляр локализованного префаба в своем методе OnEnable(). Порядок выполнения Unity гарантирует, что все методы Awake() выполняются до всех методов OnEnable(). Таким образом, ваш скрипт с порядком -110 выполнит свой Awake(), затем LocalizedPrefab с порядком -100 выполнит свой Awake(), и только после этого в порядке выполнения будут вызваны их методы OnEnable(). Ваш скрипт не найдет объект, так как он еще не будет создан.',
        'q_faq_components_6': 'Компонент LocalizedText имеет опцию isStyleOnly. Если я включу ее, а затем в коде вызову myLocalizedText.SetFormattedText("new_key"), изменится ли текст или только стиль (шрифт/RTL)?',
        'a_faq_components_6': 'Изменится и ключ, и текст. Вызов SetFormattedText программно переопределяет поведение isStyleOnly для этого конкретного обновления. Опция isStyleOnly предназначена для того, чтобы компонент не реагировал на глобальную смену языка, но он всегда будет реагировать на прямое изменение ключа через код.',
        'q_faq_components_7': 'LocalizedBehaviour автоматически находит методы с атрибутом [OnLanguageChange]. Будет ли он находить private и protected методы, или они должны быть public?',
        'a_faq_components_7': 'Он найдет методы с любым модификатором доступа (public, private, protected, internal). Рефлексия в Unity позволяет обнаруживать все методы экземпляра независимо от их уровня доступа.',
        'q_faq_components_8': 'Компонент LocalizedAsset перехватывает Play on Awake. Что произойдет, если на том же объекте есть другой скрипт, который в Awake() или Start() пытается получить доступ к ассету (например, audioSource.clip.length) до того, как LocalizedAsset его подменит? Возможен ли NullReferenceException или использование старого ассета?',
        'a_faq_components_8': 'Возможна работа со старым (нелокализованным) ассетом. LocalizedAsset выполняет подмену в своем OnEnable(). Методы Awake() всех скриптов выполняются до OnEnable(). Если ваш скрипт в Awake() обратится к audioSource.clip, он получит исходный клип. Если же он обратится в Start(), то результат будет зависеть от порядка выполнения скриптов. Чтобы гарантировать доступ к локализованному ассету, либо установите вашему скрипту более поздний порядок выполнения, либо получайте доступ к ассету в методе, помеченном [OnLanguageChange].',

        'h2_faq_window': '9.3. Окно "Localization Tool"',
        'h3_faq_window_preview': 'In-Editor Preview',
        'q_faq_window_preview_1': 'Я открыл префаб в режиме Prefab Mode, применил In-Editor Preview и нажал Ctrl+S. Сохранятся ли временные preview-данные в ассете префаба? Как LocalizationPreviewProtector обрабатывает этот случай?',
        'a_faq_window_preview_1': 'Нет, не сохранятся. LocalizationPreviewProtector перехватывает событие сохранения ассета (OnWillSaveAssets) и автоматически вызывает RevertEditorPreview() до того, как Unity запишет изменения на диск. Таким образом, префаб будет сохранен в своем исходном, нелокализованном состоянии.',
        'q_faq_window_preview_2': 'Если я включу In-Editor Preview и редактор Unity аварийно завершит работу, а файл Temp/localization_preview_recovery.json окажется поврежден (например, пустой или с некорректным JSON), что произойдет при следующем запуске?',
        'a_faq_window_preview_2': 'PreviewCrashProtector обернут в try-catch блок. Если десериализация JSON не удастся, в консоль будет выведена ошибка о невозможности восстановления, и процесс тихо завершится. Ваша сцена останется в том "сломанном" состоянии, в котором она была на момент сбоя. В этом случае вам нужно будет вручную выбрать "Revert to Original" в окне инструмента, чтобы принудительно откатить изменения.',
        'q_faq_window_preview_3': 'В режиме In-Editor Preview для LocalizedPrefab создается временный экземпляр. Будут ли на этом экземпляре выполняться методы Awake() и Start()? Может ли это вызвать ошибки, если они не рассчитаны на работу в Edit Mode?',
        'a_faq_window_preview_3': 'Да, будут. PrefabUtility.InstantiatePrefab в Edit Mode вызывает Awake() и OnEnable(). Если в этих методах есть логика, которая не должна выполняться в редакторе (например, доступ к синглтонам, которые существуют только в Play Mode), это может вызвать ошибки. Рекомендуется использовать if (Application.isPlaying) или #if UNITY_EDITOR для защиты такого кода.',

        'h3_faq_window_settings': 'Вкладка "Settings"',
        'q_faq_window_settings_1': 'Я могу сменить Key Generation Mode с UseTextAsKey на AutoGenerateKeysOnly в середине проекта. Что именно произойдет с моими существующими переводами? Они будут сопоставлены с новыми ключами?',
        'a_faq_window_settings_1': 'Да, будут. При смене режима инструмент выполняет "безопасную миграцию": он заново парсит весь проект, создает новые ключи по новым правилам, но при этом сопоставляет старые и новые ключи через исходный текст. Затем он переносит все ваши существующие переводы и комментарии со старых ключей на новые. Ваши переводы не будут потеряны.',
        'q_faq_window_settings_2': 'Если я добавлю в список Supported Languages язык с кодом, для которого нет правил плюрализации (например, "kz" для казахского), какое правило будет использоваться по умолчанию?',
        'a_faq_window_settings_2': 'Будет использоваться правило DefaultPluralRule, которое подходит для английского и большинства европейских языков (формы для "один" и "другие").',
        'q_faq_window_settings_3': 'Что если я укажу Translations Path не в StreamingAssets, а в обычной папке Assets/MyTranslations? Будут ли файлы json включены в билд игры?',
        'a_faq_window_settings_3': 'Нет, не будут. Только ассеты, находящиеся в папке StreamingAssets или Resources, гарантированно включаются в сборку. Если вы укажете другой путь, локализация будет работать в редакторе, но не будет работать в скомпилированной игре, так как файлы переводов не попадут в билд.',
        'q_faq_window_settings_4': 'API-ключ для авто-перевода хранится в EditorPrefs. Если я работаю над проектом на двух разных компьютерах, мне нужно вводить ключ на каждой машине отдельно?',
        'a_faq_window_settings_4': 'Да. EditorPrefs — это локальное хранилище для каждого компьютера. Вам нужно будет ввести API-ключ на каждой машине, с которой вы планируете использовать функцию авто-перевода.',
        
        'h3_faq_window_content': 'Вкладка "Content"',
        'q_faq_window_content_1': 'Что если я добавлю в Scenes to Parse сцену, которая не включена в Build Settings? Повлияет ли это на что-то, кроме самого процесса парсинга?',
        'a_faq_window_content_1': 'Нет, не повлияет. Список Scenes to Parse используется исключительно для того, чтобы инструмент знал, какие сцены нужно открыть и проанализировать на наличие текста. Это никак не связано со сценами, которые попадут в финальный билд вашей игры.',
        'q_faq_window_content_2': 'Я добавил объект в Ignore Specific Objects (временный список). Если я сделаю из этого объекта префаб, будет ли экземпляр этого префаба также игнорироваться?',
        'a_faq_window_content_2': 'Нет, не будет. Временный список хранит прямую ссылку на объект в сцене. Когда вы создаете префаб, это новый ассет. Его экземпляры — это другие объекты, и на них правило игнорирования не распространится. Для постоянного игнорирования префабов их нужно добавлять в список игнорирования как ассет префаба.',
        'q_faq_window_content_3': 'Если я добавлю в Parsing Ignores -> Ignore Component Types компонент TMPro.TMP_Text, но при этом на сцене есть объект с LocalizedText, который уже ссылается на этот TMP_Text, что произойдет при следующем Update Keys? Ключ будет удален?',
        'a_faq_window_content_3': 'Да, будет. При нажатии Update Keys парсер заново сканирует весь проект. Он увидит, что тип TMPro.TMP_Text нужно игнорировать, и не сгенерирует для него ключ. В процессе сверки старых и новых ключей он определит, что старый ключ больше не используется, и пометит его как "Removed".',
        'q_faq_window_content_4': 'В документации сказано, что "Pin" сохраняет полный путь к объекту и сломается при переименовании. А если я сделаю из объекта префаб, а потом переименую исходный объект — "Pin" продолжит работать для экземпляров префаба?',
        'a_faq_window_content_4': 'Нет, не продолжит. "Pin" сохраняет абсолютный путь в иерархии сцены на момент нажатия кнопки (например, Canvas/Panel/Button). Этот путь никак не связан с логикой префабов. Экземпляры префаба будут иметь такой же путь, но если вы переименуете родительский объект в сцене, "Pin" перестанет работать как для оригинала, так и для экземпляров.',
        'q_faq_window_content_5': 'Если я использую "Pin" для дочернего объекта внутри экземпляра префаба, какой путь будет сохранен: относительно корня префаба или корня сцены? Будет ли он работать в других сценах?',
        'a_faq_window_content_5': 'Будет сохранен полный путь от корня сцены. Например, MyPrefab(Clone)/Content/Icon. Этот "закрепленный" путь будет работать только в той сцене, где вы его создали. В других сценах такой путь, скорее всего, не будет найден.',
// --- Section Titles ---
        'h3_faq_window_actions': 'Вкладка "Actions"',
        'h3_faq_window_assets': 'Вкладка "Assets"',
        'h3_faq_window_report': 'Вкладка "Report"',
        'h2_faq_editor': '9.4. Редактор переводов',
        'h2_faq_examples': '9.5. Примеры использования и работа с кодом',
        'h2_faq_notes': '9.6. Важные нюансы и предупреждения',
        'h2_faq_extending': '9.7. Расширение функционала',

        // --- FAQ: Window - Actions ---
        'q_faq_window_actions_1': 'Что произойдет, если во время пакетного авто-перевода пропадет интернет-соединение? Инструмент попытается повторить неудачный пакет (batch) согласно настройкам Retry Policy или процесс прервется полностью?',
        'a_faq_window_actions_1': 'Инструмент попытается повторить отправку именно того пакета, который не удался, согласно настройкам Retry Policy (количество попыток и задержка). Если все попытки для этого пакета закончатся неудачей, процесс перевода для текущего языка прервется, и в консоль будет выведена ошибка. Перевод для следующих языков в очереди не начнется.',
        'q_faq_window_actions_2': 'Если я импортирую CSV-файл, в котором есть ключи, уже существующие в проекте, но с пустыми значениями для некоторых языков, эти пустые значения заменят мои существующие переводы или будут проигнорированы?',
        'a_faq_window_actions_2': 'Пустые значения заменят существующие переводы. Процесс импорта рассматривает CSV-файл как "источник правды". Если для ключа welcome_message в колонке ru стоит пустое значение, то текущий русский перевод для этого ключа будет затерт.',
        'q_faq_window_actions_3': 'Секция "Danger Zone" позволяет удалить все компоненты. Удалит ли она компоненты с префабов, которые находятся в папках, не указанных в Prefab Folders на вкладке Content?',
        'a_faq_window_actions_3': 'Да, удалит. Функции из "Danger Zone" сканируют все префабы в проекте (AssetDatabase.FindAssets("t:Prefab")), а не только те, что указаны в списке для парсинга, чтобы обеспечить максимально полную очистку.',
        'q_faq_window_actions_4': 'При импорте из Google Sheets, как правильно оформить колонку с комментариями, чтобы работала валидация плейсхолдеров через директиву @placeholders:?',
        'a_faq_window_actions_4': 'В вашей таблице Google Sheets колонка должна иметь заголовок Developer Notes. В ячейках этой колонки вы можете писать комментарии как обычно. Чтобы указать плейсхолдеры, просто добавьте строку вида @placeholders: {username}, {score} в текст комментария. Инструмент автоматически распознает эту директиву при импорте.',
        'q_faq_window_actions_5': 'Может ли инструмент импортировать данные с нескольких листов (sheets) одного документа Google Sheets, или он работает только с одним листом по GID?',
        'a_faq_window_actions_5': 'Инструмент работает только с одним листом за раз. URL для импорта включает параметр gid=..., который однозначно указывает на конкретный лист в документе. Чтобы импортировать данные с другого листа, вам нужно скопировать его URL (с другим gid) и выполнить импорт повторно.',

        // --- FAQ: Window - Assets ---
        'q_faq_window_assets_1': 'Что если у меня есть два ассета с одинаковым ключом, но разным типом в одной и той же папке сканирования (например, sound_effect_en.mp3 и sound_effect_en.wav)? Какой из них попадет в таблицу ассетов?',
        'a_faq_window_assets_1': 'Сканер ассетов загружает их с указанием ожидаемого типа (AssetDatabase.LoadAssetAtPath(path, expectedType)). Для категории AudioClip он будет искать и загружать только файлы, которые Unity распознает как AudioClip. Если оба файла являются валидными аудиоклипами, то в таблицу попадет тот, который будет обработан последним, фактически перезаписав предыдущий. Рекомендуется избегать таких дубликатов.',
        'q_faq_window_assets_2': 'Если я нажму Scan Assets & Analyze Project, а на сцене есть объект Image, для которого уже есть локализованный спрайт, но на самом объекте Image еще нет компонента LocalizedAsset, добавит ли инструмент компонент и автоматически подставит ключ?',
        'a_faq_window_assets_2': 'Да, именно так он и работает. "Analyze Project" находит компонент Image, смотрит на имя назначенного ему спрайта (например, icon_play_en), извлекает из него ключ (icon_play) и язык (en), а затем добавляет на этот GameObject компонент LocalizedAsset и вписывает в него ключ icon_play.',
        'q_faq_window_assets_3': 'Могу ли я использовать одно и то же правило Naming Rule для разных категорий ассетов, если у них разные Scan Folder? Не вызовет ли это конфликтов?',
        'a_faq_window_assets_3': 'Да, можете. Конфликтов не будет, так как для каждой категории создается своя таблица ассетов (LocalizedAssetTable). Ключи из категории "Sprites" не пересекаются с ключами из категории "AudioClips", даже если они называются одинаково.',
        'q_faq_window_assets_4': 'Если локализуемый ассет (например, button_ok_en.png) находится не в корне Scan Folder, а во вложенной папке, найдет ли его сканер?',
        'a_faq_window_assets_4': 'Да, найдет. Сканер использует опцию SearchOption.AllDirectories, что означает, что он будет рекурсивно проверять все вложенные папки внутри указанной вами Scan Folder.',

        // --- FAQ: Window - Report ---
        'q_faq_window_report_1': 'Кнопка "Find" ищет объект асинхронно. Что если я запущу поиск, а затем сразу же нажму Update Keys? Прервется ли поиск?',
        'a_faq_window_report_1': 'Да, прервется. Любое новое действие, требующее блокировки UI (как Update Keys), остановит текущую корутину поиска. Появится диалоговое окно, предлагающее остановить текущий поиск, чтобы начать новый.',
        'q_faq_window_report_2': 'Если ключ используется в нескольких местах (например, на двух разных кнопках в разных сценах), как это будет отображено в отчете в категории "Duplicates"?',
        'a_faq_window_report_2': 'В категории "Duplicates" будут показаны все источники для данного ключа. Вы увидите одну запись для ключа, а в поле "Source" будут перечислены все пути (и в сцене 1, и в сцене 2). Кнопка "Find" в этом случае откроет выпадающий список, позволяя вам выбрать, к какому именно объекту перейти.',
        'q_faq_window_report_3': 'Если я нажму "Find" для ключа, который используется только в коде (через функцию _()), что произойдет? Сможет ли инструмент найти и подсветить C# скрипт?',
        'a_faq_window_report_3': 'Да. Система поиска специально обучена распознавать источники вида script MyScript.cs. При нажатии "Find" она выполнит поиск ассета MyScript.cs в проекте и подсветит (пропингует) его в окне Project.',

        // --- FAQ: Editor ---
        'q_faq_editor_1': 'Что имеет больший приоритет для валидации плейсхолдеров: директива @placeholders: в комментарии или плейсхолдеры, найденные в тексте исходного языка? Например, если в исходном тексте есть {name}, а в комментарии написано @placeholders: {username}.',
        'a_faq_editor_1': 'Приоритет имеет директива @placeholders: в комментарии. Она рассматривается как явное указание разработчика и "источник правды". В вашем примере редактор будет требовать наличия {username} в переводе и проигнорирует {name} из исходного текста.',
        'q_faq_editor_2': 'Если я допущу опечатку в директиве (например, @placeholder: вместо @placeholders:), будет ли она проигнорирована или инструмент выдаст предупреждение?',
        'a_faq_editor_2': 'Она будет просто проигнорирована. Инструмент ищет точное совпадение @placeholders:. Если директива написана с ошибкой, она будет считаться частью обычного комментария, и валидация будет работать по старинке — на основе плейсхолдеров из исходного текста.',
        'q_faq_editor_3': 'Система автосохранения создает файлы в папке Backups/AutoSaves. Будут ли эти файлы автоматически удаляться после успешного ручного сохранения или закрытия окна?',
        'a_faq_editor_3': 'Да. При успешном ручном сохранении или штатном закрытии окна (когда вы сохраняете изменения) все файлы автосохранения удаляются, чтобы не предлагать восстановление при следующем запуске. Они остаются только в случае аварийного завершения работы редактора.',
        'q_faq_editor_4': 'Если я изменю ширину колонок в редакторе, эти настройки сохранятся между сессиями Unity?',
        'a_faq_editor_4': 'Да. Ширина колонок сохраняется в EditorPrefs каждый раз, когда вы закрываете окно редактора переводов, и будет восстановлена при следующем открытии.',
        'q_faq_editor_5': 'Поддерживает ли всплывающее окно редактирования текста (MultiLineEditWindow) свой собственный стек операций Undo/Redo (через Ctrl+Z) для изменений, сделанных внутри него?',
        'a_faq_editor_5': 'Да. MultiLineEditWindow имеет свой собственный, временный стек Undo/Redo, который работает, пока окно открыто. Это позволяет вам отменять и возвращать изменения текста внутри этого окна. Как только вы сохраняете результат (закрывая окно), это изменение записывается как единое действие в глобальный стек Undo/Redo основного редактора.',

        // --- FAQ: Examples & Code ---
        'q_faq_examples_1': 'Что произойдет, если имена свойств в анонимном типе, переданном в функцию _(), не совпадут с плейсхолдерами в строке? Например, _("Hello, {username}", new { user_name = "Bob" }). Будет ли ошибка или плейсхолдер просто не заменится?',
        'a_faq_examples_1': 'Ошибки не будет. Плейсхолдер {username} просто не будет заменен, и в результате вы получите строку "Hello, {username}". Замена происходит только при точном совпадении имен.',
        'q_faq_examples_2': 'Атрибут [LocalizableField] работает для private полей. Будет ли он работать для static полей?',
        'a_faq_examples_2': 'Да, будет. Парсер использует рефлексию для поиска полей с флагами BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static, поэтому он найдет и обработает статические поля.',
        'q_faq_examples_3': 'Если я повешу атрибут [OnLanguageChange] на метод с параметрами (например, void UpdateUI(string newLang)), что произойдет? Будет ли ошибка компиляции или предупреждение в рантайме?',
        'a_faq_examples_3': 'Ошибки компиляции не будет, но в консоли Unity при запуске появится предупреждение от LocalizedBehaviour. Он сообщит, что нашел метод с атрибутом, но проигнорировал его, так как метод имеет параметры. Вызываться такой метод не будет.',
        'q_faq_examples_4': 'Я использую _("apple_count", count). Если для текущего языка нет ключа apple_count_one (для count = 1), какую форму выберет система? Будет ли она использовать apple_count_other как запасной вариант?',
        'a_faq_examples_4': 'Да. Если конкретная форма (_one, _few и т.д.) не найдена, система в качестве запасного варианта попытается использовать ключ с суффиксом _other. Если и он не найден, будет использован перевод для базового ключа apple_count.',
        'q_faq_examples_5': 'Функция _("key", new { username = "Alex" }) использует анонимный тип. Не создаст ли это избыточную "нагрузку" на сборщик мусора (GC) при частом вызове в методе Update() по сравнению с передачей заранее созданного словаря Dictionary<string, object>?',
        'a_faq_examples_5': 'Да, создаст. Каждый вызов new { ... } приводит к выделению памяти в управляемой куче, что создает дополнительную работу для сборщика мусора. Для текста, который обновляется каждый кадр (в Update или LateUpdate), значительно производительнее будет создать Dictionary<string, object> один раз в Start(), а в Update() только обновлять значения в нем и передавать его в функцию _().',
        
        // --- FAQ: Notes ---
        'q_faq_notes_1': 'В документации рекомендуется добавлять LanguageSelector в список игнорирования. Что конкретно сломается, если я забуду это сделать? Будут ли создаваться лишние ключи для опций "Option A, Option B"?',
        'a_faq_notes_1': 'Да. Если не добавить LanguageSelector в игнор, парсер обработает его TMP_Dropdown как обычный выпадающий список. Он найдет стандартные опции "Option A, Option B, Option C", которые Unity создает по умолчанию, и добавит для них ключи в ваши файлы переводов. Это "замусорит" ваши файлы ненужными ключами, так как LanguageSelector все равно удалит эти опции в рантайме и создаст свои.',
        'q_faq_notes_2': 'Если я забуду добавить пустой LocalizedText с галочкой isStyleOnly на Label внутри TMP_Dropdown, который используется в LanguageSelector, шрифт не будет меняться? Почему это необходимо?',
        'a_faq_notes_2': 'Да, шрифт не будет меняться. Это необходимо, потому что LanguageSelector напрямую меняет свойство label.text. Без LocalizedText на этом объекте система локализации не знает, что этому элементу нужно применять стили (шрифт, RTL) при смене языка. Пустой LocalizedText с isStyleOnly служит "маркером" для системы, говоря: "Следи за этим объектом и применяй к нему стили, но не трогай его текст".',
        'q_faq_notes_3': 'Вызов _() в методе Update() не рекомендуется. Но что если мне нужно обновлять текст каждый кадр (например, таймер)? Какой самый производительный способ это сделать, кэшируя только форматную строку?',
        'a_faq_notes_3': 'Самый производительный подход — кэшировать форматную строку в Start() или в методе [OnLanguageChange], а в Update() использовать обычный string.Format. Пример: private string timerFormat; [OnLanguageChange] void UpdateTimerFormat() { timerFormat = _("timer_format"); } void Update() { myTextComponent.text = string.Format(timerFormat, timeLeft); } Это позволяет избежать поиска ключа в словаре каждый кадр, что значительно быстрее.',

        // --- FAQ: Extending ---
        'q_faq_extending_1': 'Мой кастомный парсер будет вызываться автоматически после каждого Update Keys? Нужно ли мне где-то его регистрировать, или достаточно просто наличия класса, реализующего ITextComponentParser, в проекте?',
        'a_faq_extending_1': 'Достаточно просто наличия класса. При запуске TextParser использует рефлексию, чтобы найти все классы в проекте, которые реализуют интерфейс ITextComponentParser, и автоматически вызывает их метод Parse() для каждого GameObject. Никакой ручной регистрации не требуется.',
        'q_faq_extending_2': 'Что если в моем кастомном парсере произойдет исключение (exception)? Прервет ли это весь процесс парсинга или инструмент безопасно продолжит работу с другими парсерами?',
        'a_faq_extending_2': 'Основной цикл парсинга обернут в try-catch. Если ваш парсер выбросит исключение, ошибка будет выведена в консоль Unity, но процесс не прервется. Инструмент продолжит работу со следующим GameObject и вызовет другие парсеры.'
    },
    'en': {
        'page_title': 'Unity Localization Tool Documentation',
        'toc_title': 'Table of Contents',
        'toc_search_placeholder': 'Search documentation...',
        'nav_introduction': '1. Introduction',
        'nav_quick_start': '2. Quick Start',
        'nav_components': '3. Core Components',
        'nav_loc_tool_window': '4. "Localization Tool" Window',
        'nav_translation_editor': '5. Translation Editor',
        'nav_usage_examples': '6. Usage Examples',
        'nav_important_notes': '7. Important Notes',
        'nav_extending': '8. Extending Functionality',
        'nav_faq': '9. FAQ & Troubleshooting',
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
        'nav_example_components': '6.1. Ready-made Components',
        'nav_example_attribute': '6.2. [LocalizableField] Attribute',
        'nav_example_function': '6.3. _() Function',
        'nav_example_plurals': '6.4. Plurals & Gender',
        'nav_custom_parser': '8.1. Creating a Parser',
        'nav_faq_installation': '9.1. Installation & Quick Start',
        'nav_faq_components': '9.2. Core Components',
        'nav_faq_window': '9.3. "Localization Tool" Window',
        // --- Navigation ---
        'nav_faq_window_actions': '9.3. "Localization Tool" Window - "Actions" Tab',
        'nav_faq_window_assets': '9.3. "Localization Tool" Window - "Assets" Tab',
        'nav_faq_window_report': '9.3. "Localization Tool" Window - "Report" Tab',
        'nav_faq_editor': '9.4. Translation Editor',
        'nav_faq_examples': '9.5. Usage Examples & Code',
        'nav_faq_notes': '9.6. Important Nuances & Warnings',
        'nav_faq_extending': '9.7. Extending Functionality',
        'h1_introduction': '<span class="emoji">🚀</span> Introduction',
        'p_intro_1': 'This tool is a comprehensive solution for localizing games and applications in Unity. It automates the process of collecting text and assets, managing translations through a powerful interface, integrating with machine translation services, and dynamically updating localized content in the game.',
        'h2_key_features': 'Key Features',
        'li_feature_1': '<strong>Advanced Parsing:</strong> Automatic scanning of scenes, prefabs, UI Toolkit (UXML), and C# scripts, including fields marked with the <code>[LocalizableField]</code> attribute, as well as nested classes and lists.',
        'li_feature_2': '<strong>Localization of Any Asset:</strong> Manage sprites, audio, prefabs, materials, etc.',
        'li_feature_3': '<strong>Powerful Translation Editor:</strong> A centralized interface with auto-saving, full Undo/Redo support, and smart key grouping.',
        'li_feature_4': '<strong>Machine Translation:</strong> Integration with DeepL, Google Translate, and Microsoft Translator with flexible settings (batch size, number of retries) for each service.',
        'li_feature_5': '<strong>Flexible Import/Export:</strong> Support for CSV, XML, YAML, XLIFF, and direct import from Google Sheets.',
        'li_feature_6': '<strong>In-Editor Live Preview:</strong> Preview any language without running the game.',
        'li_feature_7': '<strong>Plural & Gender Support:</strong> Correct handling of plural forms (with rules for Slavic, Arabic, and other languages) and gender.',
        'li_feature_8': '<strong>Full RTL Support:</strong> Correct display of right-to-left languages.',
        'li_feature_9': '<strong>Live Updates:</strong> Load up-to-date translations from a remote server at game start.',
        'li_feature_10': '<strong>Backup Manager:</strong> A built-in tool for creating and restoring backups.',
        'h1_quick_start': '<span class="emoji">🛠️</span> Quick Start and Setup',
        'h2_installation': '2.1. Installation',
        'li_install_1': 'Copy the asset into your Unity project folder.',
        'li_install_2': 'The tool will automatically check for necessary dependencies. Confirm the installation in the dialog box that appears.',
        'li_install_3': 'Required dependencies (<code>Newtonsoft Json</code>, <code>Editor Coroutines</code>) are necessary for basic functionality.',
        'li_install_4': 'Optional dependencies (<code>Arabic Support</code>, <code>CsvHelper</code>, <code>YamlDotNet</code>) enable additional features.',
        'li_install_5': 'Click <strong>Install Selected</strong> to install the recommended packages.',
        'li_install_6': 'After installation, open the main tool window via the <strong>Tools -> Localization Tool</strong> menu.',
        'h2_initial_setup': '2.2. Initial Setup',
        'li_setup_1': '<strong>Create Settings:</strong> On first open, the tool will create a <code>LocalizationSettings.asset</code> file in the <code>Assets/Resources</code> folder.',
        'li_setup_2': '<strong>Configure Languages:</strong> In the <strong>Settings</strong> tab under <strong>Language Management</strong>, ensure your main language (e.g., <code>en</code> for English) is selected as the <strong>Source Language</strong>. Enable all languages you plan to support.',
        'li_setup_3': '<strong>Specify Content for Parsing:</strong> In the <strong>Content</strong> tab, add all scenes for analysis to the <strong>Scenes to Parse</strong> list. If you use prefabs with text, make sure their folders are added to <strong>Prefab Folders</strong>.',
        'li_setup_4': '<strong>First Parser Run:</strong> Go to the <strong>Actions</strong> tab and click the <code>Update Keys</code> button. The tool will scan your project, create translation files, and automatically add the necessary components (<code>LocalizedText</code>, <code>LocalizedAsset</code>, etc.) to game objects.',
        'h1_components': '<span class="emoji">🧩</span> Core Components (assigned automatically)',
        'warning_box_components': '<strong>Important Note:</strong> All components described below are added to game objects automatically during parsing (when you click the <code>Update Keys</code> button). You do not need to add them manually.',
        'p_components_intro': 'These components are the "bridge" between your objects in the scene and the translation database. They "listen" for language changes and automatically substitute the correct text or asset.',
        'h2_localizedtext': '3.1. LocalizedText',
        'p_localizedtext_1': 'The main component for displaying translated text. It is placed on objects with <code>Text</code>, <code>TMP_Text</code>, and <code>TextMesh</code>.',
        'li_localizedtext_1': '<code>localizationKey</code>: The key used to find the translation. Generated automatically.',
        'li_localizedtext_2': '<code>isStyleOnly</code>: If <code>true</code>, the component will only apply styles (font, RTL) but will not change the text itself. Useful for elements whose text is managed by another script (e.g., <code>LanguageSelector</code>).',
        'li_localizedtext_3': '<code>originalSourceText</code>: The original text in the base language. Used as a fallback.',
        'h2_localizedasset': '3.2. LocalizedAsset',
        'p_localizedasset_1': 'Used to swap assets (<code>Sprite</code>, <code>AudioClip</code>, <code>Material</code>, etc.). It automatically detects the target component type on the object (<code>Image</code>, <code>AudioSource</code>) and replaces its resource.',
        'p_localizedasset_2': 'For components with the <strong>Play on Awake</strong> option (like <code>AudioSource</code>, <code>VideoPlayer</code>), <code>LocalizedAsset</code> correctly intercepts the auto-play, swaps the asset, and then starts playback to avoid playing unlocalized content.',
        'h2_localizedprefab': '3.3. LocalizedPrefab',
        'p_localizedprefab_1': 'A component for localizing entire prefabs. It works non-destructively: it does not modify the original prefab but creates an instance of the localized version as a child object, disabling all scripts (<code>MonoBehaviour</code>), renderers (<code>Renderer</code>), and colliders (<code>Collider</code>) on the original object. This prevents dual logic execution and visual artifacts. For correct runtime operation, its execution order is set to -100 (<code>[DefaultExecutionOrder(-100)]</code>) to ensure it runs before other scripts.',
        'h2_uitklocalization': '3.4. UITKLocalization',
        'p_uitklocalization_1': 'Added to objects with a <code>UIDocument</code> and manages the localization of all text elements within the UI Toolkit document (UXML).',
        'h2_localizeddropdown': '3.5. LocalizedDropdown',
        'p_localizeddropdown_1': 'Added to <code>Dropdown</code> and <code>TMP_Dropdown</code> to translate their options.',
        'h2_localizedbehaviour': '3.6. LocalizedBehaviour',
        'p_localizedbehaviour_1': 'A utility component that allows your scripts to react to language changes. It automatically finds and calls methods marked with the <code>[OnLanguageChange]</code> attribute.',
        'h2_context_menu': '3.7. "Analyze for Localization" Context Menu',
        'p_context_menu_1': 'To quickly add a <code>LocalizedAsset</code> to an object, you can right-click on the desired component (e.g., <code>Image</code>, <code>AudioSource</code>) in the inspector and select <strong>Analyze for Localization</strong>. The tool will add and configure the component itself. (This is optional but can be used for manual addition).',
        'h1_loc_tool_window': '<span class="emoji">🖼️</span> "Localization Tool" Window',
        'h2_in_editor_preview': '4.1. In-Editor Preview',
        'p_preview_1': 'Directly below the header is the <strong>Preview Language</strong> dropdown list. This powerful feature allows you to see how the localization will look in any language directly in the <strong>Scene</strong> window, without running the game.',
        'li_preview_1': '<strong>How it works:</strong> Select a language from the list, and the tool will instantly apply the corresponding translations, fonts, RTL settings, and assets to all localizable objects in the active scene.',
        'li_preview_2': '<strong>Placeholders:</strong> If a placeholder style (e.g., <strong>Accents</strong> or <strong>Brackets</strong>) is selected in the <strong>Settings</strong> tab, these placeholders will be displayed in preview mode instead of actual translations. This is ideal for testing layout and finding unlocalized elements.',
        'li_preview_3': '<strong>Safety:</strong> All changes made in preview mode are temporary. The tool will automatically revert everything to its original state when you select "<strong>Revert to Original</strong>", close the window, change scenes, or before saving a scene/prefab (thanks to the <code>LocalizationPreviewProtector</code> component).',
        'li_preview_4': '<strong>Crash Protection:</strong> The built-in <code>PreviewCrashProtector</code> system will automatically restore the original state of objects if the Unity editor crashes while a preview is active.',
        'h2_tab_settings': '4.2. "Settings" Tab',
        'p_settings_1': 'Your control center. Here you define global rules for the entire localization process.',
        'li_settings_1': '<strong>Key Generation Mode:</strong> Choose how keys will be created.<ul><li><code>UseTextAsKey</code>: The text itself becomes the key. Ideal for prototypes. Downside: if you change the source text, the key changes, and all its translations will be lost.</li><li><code>AutoGenerateKeysOnly</code>: The key is generated based on the object\'s hierarchy and name. Reliable for production. Upside: translations do not break when the text is changed.</li><li><code>UseTextAsKeyWithCustomPriority</code> and <code>AutoGenerateWithCustomKeys</code>: Hybrid modes that allow you to set custom keys in code via the <code>[LocalizableField("my_custom_key")]</code> attribute.</li><li><strong>Safe Migration:</strong> You can change the mode at any time. The tool will automatically migrate all existing translations to the new key system.</li></ul>',
        'li_settings_2': '<strong>Language Management:</strong> Configure the list of languages. For languages with special characters, assign the appropriate <strong>Font Asset</strong>. Enable the <strong>RTL</strong> option for right-to-left languages.',
        'li_settings_3': '<strong>General Settings:</strong><ul><li><code>Parse Prefabs</code>: Enables prefab parsing.</li><li><code>Split files by language</code>: Determines how to store translations (one large file or one file per language).</li><li><code>Translations Path</code>: The path for storing <code>.json</code> translation files. Important: the folder must be inside <code>Assets/StreamingAssets/</code>.</li></ul>',
        'li_settings_4': '<strong>Debugging & Testing:</strong><ul><li><code>Placeholder Style</code>: Choose the style for displaying placeholders in preview mode.</li></ul>',
        'li_settings_5': '<strong>Live Updates:</strong> Settings for loading translations from a remote server.',
        'li_settings_6': '<strong>Runtime API Key:</strong> A section for securely storing an API key that may be needed in the compiled game (stored in encrypted form).',
        'h2_tab_content': '4.3. "Content" Tab',
        'p_content_1': 'Here you tell the tool where exactly to look for text.',
        'li_content_1': '<strong>Scenes to Parse:</strong> Drag and drop all scenes for analysis here.',
        'li_content_2': '<strong>Prefab Folders:</strong> Specify folders with prefabs.',
        'li_content_3': '<strong>Dynamic Texts:</strong> Enter strings that are created exclusively in code here (e.g., "Game Over").',
        'li_content_4': '<strong>Parsing Ignores:</strong> Specify scripts, components, or objects to ignore.',
        'li_content_5': '<strong>Pin:</strong> This feature allows you to "pin" an object from the scene to the ignore list. Instead of a temporary reference to the object, the tool will save its full path in the hierarchy, making the ignore persistent between sessions (but note that renaming the object or its parent will break this link).',
        'h2_tab_actions': '4.4. "Actions" Tab',
        'p_actions_1': 'The main work tab.',
        'li_actions_1': '<strong>Update Keys:</strong> Runs the parser, which updates your translation files.',
        'li_actions_2': '<strong>Open Translation Editor:</strong> Opens a separate, more convenient window for editing all translations.',
        'li_actions_3': '<strong>Data Management:</strong> Use for exchanging data with translators (Export/Import to CSV/XML/YAML/XLIFF, import from Google Sheets).',
        'li_actions_4': '<strong>Auto-Translation:</strong> Automatically fills all empty translation strings. New settings allow you to manage the batch size (<strong>Batch Size</strong>) and retry policy (<strong>Retry Policy</strong>) for each service (DeepL, Google, Microsoft) separately. The tool tracks the number of translated characters and warns about potential limit overruns.',
        'li_actions_5': '<strong>Danger Zone:</strong> Contains buttons for completely removing all localization components from the project. Use with caution!',
        'h2_tab_assets': '4.5. "Assets" Tab',
        'p_assets_1': 'This tab is entirely dedicated to localizing non-text resources.',
        'li_assets_1': '<strong>Create a folder structure (optional):</strong> In section <strong>2. Asset Folder Generation</strong>, click <strong>Create Asset Folders Now</strong>.',
        'li_assets_2': '<strong>Configure categories and naming rules:</strong> In section <strong>3. Asset Categories & Scanning</strong>, make sure the <strong>Naming Rule</strong> (<code>{key}_{lang}</code>) matches your files (e.g., <code>button_ok_en.png</code>).',
        'li_assets_3': '<strong>Place your assets:</strong> Put the localized assets in the folders.',
        'li_assets_4': '<strong>Scan assets:</strong> In section <strong>4. Automation</strong>, click <strong>Scan Assets & Update Tables</strong>. The cleanup process has become safer: now only old table files (<code>.asset</code>) are deleted, not the entire folder.',
        'li_assets_5': '<strong>Link assets to objects:</strong> Click <strong>Analyze Project & Attach Components</strong>.',
        'h2_tab_report': '4.6. "Report" Tab',
        'p_report_1': 'After each parsing, this report shows the full picture of your localization status.',
        'li_report_1': '<strong>Categories:</strong> All Keys, Added, Updated (text changed), Removed, Duplicates, Migrated, Skipped (unchanged).',
        'li_report_2': '<strong>Advanced Find:</strong> Click the <strong>Find</strong> button next to any entry to instantly find the corresponding object in the project. The search works asynchronously, not blocking the editor, and searches across all scenes and prefabs. If a key is used in multiple places, a dropdown list with all sources will appear.',
        'h1_translation_editor': '<span class="emoji">📝</span> Translation Table Editor',
        'p_editor_1': 'Opens via <strong>Tools -> Localization -> Translation Table Editor</strong>. This is the main tool for manually editing translations.',
        'li_editor_1': '<strong>Smart Grouping:</strong> Keys for plurals and gender (e.g., <code>apple_count_one</code>, <code>apple_count_few</code>) are automatically combined into collapsible groups.',
        'li_editor_2': '<strong>Advanced Editing:</strong> Click on a cell to open the <strong>MultiLineEditWindow</strong> popup. It shows the source text for comparison, allows you to quickly copy it, and checks for placeholder mismatches (e.g., <code>{username}</code>) in real time, highlighting missing or extra ones.',
        'li_editor_3': '<strong>Placeholder Validation via Comments:</strong> You can explicitly specify which placeholders should be in the translation by adding a special directive to the key\'s comment, for example: <code>@placeholders: {username}, {score}</code>. The <strong>MultiLineEditWindow</strong> will use this list as the primary source of truth.',
        'li_editor_4': '<strong>Navigation and Management:</strong> Navigate the table with scrollbars or by holding the middle mouse button. Change column widths by dragging the separators. Save changes with <code>Ctrl+S</code>.',
        'li_editor_5': '<strong>Full Undo/Redo:</strong> The entire stack of actions (text changes, adding/deleting keys) is fully supported via <code>Ctrl+Z</code> / <code>Ctrl+Y</code>.',
        'li_editor_6': '<strong>Backups and Autosave:</strong> Use the <strong>Manage Backups</strong> button. The tool also automatically saves your session every few minutes. In case of a crash, you will be prompted to restore your changes.',
        'h1_usage_examples': '<span class="emoji">💡</span> Usage Examples',
        'h2_example_components': '6.1. Ready-made Components and Examples',
        'p_example_components_1': 'The project includes ready-to-use scripts that serve as excellent examples.',
        'li_example_components_1': '<strong><code>LanguageSelector.cs</code>:</strong> A ready-made component for creating a UI dropdown list for language switching. It automatically finds all available languages and manages their switching.<br><strong>How to use:</strong> Simply add the <code>LanguageSelector</code> component to your scene (e.g., on an empty GameObject) and specify your <code>TMP_Dropdown</code> in the inspector.',
        'li_example_components_2': '<strong>Code Examples:</strong> To learn advanced techniques such as working with <code>[LocalizableField]</code>, the <code>_()</code> function, plurals, and gender, study the <code>StatPurchaseTest.cs</code> and <code>TestLocalization.cs</code> files. They clearly demonstrate the implementation of all the main features of the tool in code.',
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
        'p_example_function_1': 'Use the <code>_()</code> function for dynamic text that changes during gameplay. The method that updates the UI should be marked with the <code>[OnLanguageChange]</code> attribute so that it is called automatically when the language is changed. A <code>LocalizedBehaviour</code> component will be automatically added to the object for this purpose.',
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
        'p_example_plurals_1': 'The tool now uses more accurate rules for different language groups.',
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
        'li_notes_2': '<strong>API Key Security:</strong> The key for working in the editor is stored locally on your machine (in <code>EditorPrefs</code>) and does not get into the repository. For keys needed in the game build, use the <strong>Runtime API Key</strong> section.',
        'li_notes_3': '<strong><code>StreamingAssets</code> Folder:</strong> Translation files must be in a subfolder of <code>Assets/StreamingAssets/</code> to be included in the game build.',
        'li_notes_4': '<strong>"Fool-proofing":</strong> The tool automatically protects you from accidentally saving temporary data from preview mode into a scene or prefab.',
        'li_notes_5': '<strong>Performance:</strong> The <code>_()</code> call is fast, but in loops that run every frame (e.g., in <code>Update</code>), try to cache the result in a variable.',
        'li_notes_6': '<strong>Excluding <code>LanguageSelector</code> from parsing:</strong> The object with the <code>LanguageSelector</code> component and its <code>TMP_Dropdown</code> must be added to the <strong>Ignore Specific Objects</strong> list in the <strong>Content</strong> tab. This is necessary to prevent the parser from creating extra keys for the dropdown options, as the <code>LanguageSelector</code> script populates them dynamically at runtime. Ignoring prevents conflicts and keeps the translation files clean.',
        'li_notes_7': '<strong>Fonts for <code>LanguageSelector</code>:</strong> For the selected language in the <code>TMP_Dropdown</code> to correctly update its font, manually add an empty <code>LocalizedText</code> component to the child <strong>Label</strong> object of the Dropdown and check the <code>isStyleOnly</code> box.',
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
            // 4. Generate the key and source using helpers from TextParser.
            string key = TextParser.GenerateKeyForObject(gameObject, titleText, settings.keyGenerationMode);
            string source = TextParser.GetSourceStringForObject(gameObject);
            
            // 5. Return the result.
            yield return (titleText, key, source);
        }
        
        // 6. Repeat for other fields...
        // (a suffix can be added to make keys unique)
        string descriptionText = component.Description;
        if (TextParser.IsValidLocalizableText(descriptionText))
        {
            string key = TextParser.GenerateKeyForObject(gameObject, descriptionText, settings.keyGenerationMode) + "_description";
            string source = TextParser.GetSourceStringForObject(gameObject);
            yield return (descriptionText, key, source);
        }
    }
}
#endif`,
        'h1_faq': '<span class="emoji">❓</span> FAQ & Troubleshooting',
        'h2_faq_installation': '9.1. Installation & Quick Start',
        'q_faq_installation_1': 'What happens if my project already has the com.unity.nuget.newtonsoft-json package from another asset? Will the dependency installer try to update or ignore it?',
        'a_faq_installation_1': 'The installer checks for the existence of the Newtonsoft.Json.JsonConvert type. If the type exists, it considers the dependency satisfied and will not attempt to install or update the package. This is done to prevent version conflicts.',
        'q_faq_installation_2': 'I accidentally clicked "Skip for Now" and checked "Don\'t ask again" for optional dependencies (e.g., for CSV support). How can I bring up the installer window again to install them?',
        'a_faq_installation_2': 'You can manually trigger a dependency check at any time via the Tools -> Localization -> Check Dependencies menu. This will reset the "Don\'t ask again" flag and show the window with all missing optional packages again.',
        'q_faq_installation_3': 'The tool did not create LocalizationSettings.asset in Assets/Resources. Why might this have happened, and can I create it manually via the Assets -> Create menu?',
        'a_faq_installation_3': 'This can happen if you do not have an Assets/Resources folder. The tool will try to create it, but file system permissions might prevent it. Yes, you can create the asset manually: right-click in the Resources folder, select Create -> Localization -> Settings. The tool will find it automatically.',
        'q_faq_installation_4': 'Can I move the LocalizationSettings.asset file to another Resources folder, for example, Assets/MyGame/Resources? Will the tool still find it?',
        'a_faq_installation_4': 'Yes. The tool uses Resources.Load(), which searches for an asset by name in all folders named Resources in your project. The important thing is that the file keeps its name LocalizationSettings.asset.',
        'q_faq_installation_5': 'The dependency installer froze or gave an error. Can I install the dependencies (Newtonsoft Json, Editor Coroutines) manually through the Unity Package Manager?',
        'a_faq_installation_5': 'Yes. You can open Window -> Package Manager, click the "+" icon, and select "Add package by name...". Enter the package names: com.unity.nuget.newtonsoft-json and com.unity.editorcoroutines.',
        
        'h2_faq_components': '9.2. Core Components',
        'q_faq_components_1': 'The LocalizedPrefab component disables MonoBehaviours on the original object. What if the original object has a script that creates other objects or subscribes to events in Awake()? Will this code be executed?',
        'a_faq_components_1': 'No, it will not. Disabling a MonoBehaviour prevents all of Unity\'s "magic" methods from being called, including Awake(), OnEnable(), and Start(). This is intentional to avoid duplicate logic execution. All initialization should occur in scripts on the localized versions of the prefab.',
        'q_faq_components_2': 'If the original prefab (LocalizedPrefab) has a Rigidbody or another physics component, will it be disabled? Will this affect physics if the localized prefab does not have it?',
        'a_faq_components_2': 'The LocalizedPrefab component only disables components of type Renderer, Collider, and MonoBehaviour. Rigidbody and other physics components will remain active. This could lead to unwanted behavior (e.g., an invisible object falling). It is recommended that the "dummy" object has no active physics components, or that they are also present on the localized prefab.',
        'q_faq_components_3': 'The LocalizedAsset component stores the target component name as a string (_targetComponentTypeName). What happens if I rename a custom component script or move it to another assembly (Assembly Definition)? Will LocalizedAsset stop working for it?',
        'a_faq_components_3': 'Yes, it will stop working. The component stores the full type name, including the namespace and assembly. Renaming the script or moving it to another .asmdef will change this name, and LocalizedAsset will not be able to find the target component. You will need to run another analysis via Analyze Project & Attach Components for it to update the name.',
        'q_faq_components_4': 'If there are two Image components on the same GameObject, how does LocalizedAsset know which one to localize? Will it work with both or only the first one it finds?',
        'a_faq_components_4': 'A LocalizedAsset is created for a specific component instance. It holds a reference to that component in code. If you manually add a second LocalizedAsset and use the "Analyze for Localization" context menu to target the second Image, you will have two LocalizedAsset components, each managing its own Image. The automatic analyzer will only create a component for the first Image with a localizable asset it finds.',
        'q_faq_components_5': 'The documentation states that LocalizedPrefab has an execution order of -100. What if I have another script with an execution order of -110 that tries to find a child object created by LocalizedPrefab in its Awake()? Will LocalizedPrefab have instantiated its instance in time?',
        'a_faq_components_5': 'Yes, it will. LocalizedPrefab creates the instance of the localized prefab in its OnEnable() method. Unity\'s execution order guarantees that all Awake() methods are executed before all OnEnable() methods. Thus, your script with order -110 will execute its Awake(), then LocalizedPrefab with order -100 will execute its Awake(), and only after that will their OnEnable() methods be called in order. Your script will not find the object because it will not have been created yet.',
        'q_faq_components_6': 'The LocalizedText component has an isStyleOnly option. If I enable it and then call myLocalizedText.SetFormattedText("new_key") in code, will the text change, or only the style (font/RTL)?',
        'a_faq_components_6': 'Both the key and the text will change. Calling SetFormattedText programmatically overrides the isStyleOnly behavior for that specific update. The isStyleOnly option is intended to prevent the component from reacting to global language changes, but it will always react to a direct key change through code.',
        'q_faq_components_7': 'LocalizedBehaviour automatically finds methods with the [OnLanguageChange] attribute. Will it find private and protected methods, or must they be public?',
        'a_faq_components_7': 'It will find methods with any access modifier (public, private, protected, internal). Reflection in Unity allows for the discovery of all instance methods regardless of their access level.',
        'q_faq_components_8': 'The LocalizedAsset component intercepts Play on Awake. What happens if another script on the same object tries to access the asset (e.g., audioSource.clip.length) in Awake() or Start() before LocalizedAsset has swapped it? Is a NullReferenceException or usage of the old asset possible?',
        'a_faq_components_8': 'Usage of the old (unlocalized) asset is possible. LocalizedAsset performs the swap in its OnEnable(). The Awake() methods of all scripts are executed before OnEnable(). If your script accesses audioSource.clip in Awake(), it will get the original clip. If it accesses it in Start(), the result will depend on the script execution order. To guarantee access to the localized asset, either set a later execution order for your script or access the asset in a method marked with [OnLanguageChange].',
        
        'h2_faq_window': '9.3. "Localization Tool" Window',
        'h3_faq_window_preview': 'In-Editor Preview',
        'q_faq_window_preview_1': 'I opened a prefab in Prefab Mode, applied the In-Editor Preview, and pressed Ctrl+S. Will the temporary preview data be saved to the prefab asset? How does LocalizationPreviewProtector handle this case?',
        'a_faq_window_preview_1': 'No, it will not be saved. LocalizationPreviewProtector intercepts the asset saving event (OnWillSaveAssets) and automatically calls RevertEditorPreview() before Unity writes the changes to disk. Thus, the prefab will be saved in its original, unlocalized state.',
        'q_faq_window_preview_2': 'If I enable In-Editor Preview and the Unity editor crashes, and the Temp/localization_preview_recovery.json file gets corrupted (e.g., empty or invalid JSON), what will happen on the next launch?',
        'a_faq_window_preview_2': 'PreviewCrashProtector is wrapped in a try-catch block. If JSON deserialization fails, an error will be logged to the console about the inability to recover, and the process will terminate quietly. Your scene will remain in the "broken" state it was in at the time of the crash. In this case, you will need to manually select "Revert to Original" in the tool window to force a rollback of the changes.',
        'q_faq_window_preview_3': 'In In-Editor Preview mode for LocalizedPrefab, a temporary instance is created. Will the Awake() and Start() methods be executed on this instance? Could this cause errors if they are not designed to run in Edit Mode?',
        'a_faq_window_preview_3': 'Yes, they will. PrefabUtility.InstantiatePrefab in Edit Mode calls Awake() and OnEnable(). If these methods contain logic that should not run in the editor (e.g., accessing singletons that only exist in Play Mode), it could cause errors. It is recommended to use if (Application.isPlaying) or #if UNITY_EDITOR to protect such code.',

        'h3_faq_window_settings': '"Settings" Tab',
        'q_faq_window_settings_1': 'I can change the Key Generation Mode from UseTextAsKey to AutoGenerateKeysOnly mid-project. What exactly will happen to my existing translations? Will they be mapped to the new keys?',
        'a_faq_window_settings_1': 'Yes, they will. When changing the mode, the tool performs a "safe migration": it re-parses the entire project, creates new keys according to the new rules, but maps the old and new keys through the original text. It then transfers all your existing translations and comments from the old keys to the new ones. Your translations will not be lost.',
        'q_faq_window_settings_2': 'If I add a language with a code that has no pluralization rules (e.g., "kz" for Kazakh) to the Supported Languages list, which rule will be used by default?',
        'a_faq_window_settings_2': 'The DefaultPluralRule will be used, which is suitable for English and most European languages (forms for "one" and "other").',
        'q_faq_window_settings_3': 'What if I specify the Translations Path not in StreamingAssets, but in a regular folder like Assets/MyTranslations? Will the json files be included in the game build?',
        'a_faq_window_settings_3': 'No, they will not. Only assets located in a StreamingAssets or Resources folder are guaranteed to be included in the build. If you specify a different path, localization will work in the editor but will not work in the compiled game, as the translation files will not be part of the build.',
        'q_faq_window_settings_4': 'The auto-translation API key is stored in EditorPrefs. If I am working on the project on two different computers, do I need to enter the key on each machine separately?',
        'a_faq_window_settings_4': 'Yes. EditorPrefs is local storage for each computer. You will need to enter the API key on each machine from which you plan to use the auto-translate feature.',
        
        'h3_faq_window_content': '"Content" Tab',
        'q_faq_window_content_1': 'What if I add a scene to Scenes to Parse that is not included in the Build Settings? Will this affect anything other than the parsing process itself?',
        'a_faq_window_content_1': 'No, it will not. The Scenes to Parse list is used exclusively to let the tool know which scenes to open and analyze for text. It is in no way related to the scenes that will end up in the final build of your game.',
        'q_faq_window_content_2': 'I added an object to Ignore Specific Objects (the temporary list). If I make a prefab out of this object, will the instance of this prefab also be ignored?',
        'a_faq_window_content_2': 'No, it will not. The temporary list stores a direct reference to the object in the scene. When you create a prefab, it is a new asset. Its instances are different objects, and the ignore rule will not apply to them. To permanently ignore prefabs, they must be added to the ignore list as a prefab asset.',
        'q_faq_window_content_3': 'If I add the TMPro.TMP_Text component to Parsing Ignores -> Ignore Component Types, but there is an object in the scene with a LocalizedText that already references this TMP_Text, what will happen on the next Update Keys? Will the key be deleted?',
        'a_faq_window_content_3': 'Yes, it will. When you click Update Keys, the parser rescans the entire project. It will see that the TMPro.TMP_Text type should be ignored and will not generate a key for it. During the process of comparing old and new keys, it will determine that the old key is no longer used and will mark it as "Removed".',
        'q_faq_window_content_4': 'The documentation says that "Pin" saves the full path to the object and will break if it is renamed. What if I make a prefab from the object and then rename the original object — will "Pin" continue to work for the prefab instances?',
        'a_faq_window_content_4': 'No, it will not. "Pin" saves the absolute path in the scene hierarchy at the moment the button is clicked (e.g., Canvas/Panel/Button). This path is not related to prefab logic. Prefab instances will have the same path, but if you rename the parent object in the scene, "Pin" will stop working for both the original and the instances.',
        'q_faq_window_content_5': 'If I use "Pin" for a child object inside a prefab instance, what path will be saved: relative to the prefab root or the scene root? Will it work in other scenes?',
        'a_faq_window_content_5': 'The full path from the scene root will be saved. For example, MyPrefab(Clone)/Content/Icon. This "pinned" path will only work in the scene where you created it. In other scenes, such a path is unlikely to be found.',
        // --- Section Titles ---
        'h3_faq_window_actions': '"Actions" Tab',
        'h3_faq_window_assets': '"Assets" Tab',
        'h3_faq_window_report': '"Report" Tab',
        'h2_faq_editor': '9.4. Translation Editor',
        'h2_faq_examples': '9.5. Usage Examples & Code',
        'h2_faq_notes': '9.6. Important Nuances & Warnings',
        'h2_faq_extending': '9.7. Extending Functionality',

        // --- FAQ: Window - Actions ---
        'q_faq_window_actions_1': 'What happens if the internet connection is lost during a batch auto-translation? Will the tool retry the failed batch according to the Retry Policy, or will the process be completely interrupted?',
        'a_faq_window_actions_1': 'The tool will attempt to resend the exact batch that failed, according to the Retry Policy settings (number of attempts and delay). If all attempts for this batch fail, the translation process for the current language will be interrupted, and an error will be logged to the console. Translation for the next languages in the queue will not start.',
        'q_faq_window_actions_2': 'If I import a CSV file that contains keys that already exist in the project but with empty values for some languages, will these empty values replace my existing translations or be ignored?',
        'a_faq_window_actions_2': 'Empty values will replace existing translations. The import process considers the CSV file as the "source of truth". If the value for the key welcome_message in the ru column is empty, the current Russian translation for this key will be overwritten.',
        'q_faq_window_actions_3': 'The "Danger Zone" section allows deleting all components. Will it remove components from prefabs that are in folders not specified in the Prefab Folders on the Content tab?',
        'a_faq_window_actions_3': 'Yes, it will. The functions in the "Danger Zone" scan all prefabs in the project (AssetDatabase.FindAssets("t:Prefab")), not just those specified in the parsing list, to ensure the most complete cleanup possible.',
        'q_faq_window_actions_4': 'When importing from Google Sheets, how should I format the comments column for placeholder validation using the @placeholders: directive to work?',
        'a_faq_window_actions_4': 'In your Google Sheets document, the column must be titled "Developer Notes". In the cells of this column, you can write comments as usual. To specify placeholders, simply add a line like @placeholders: {username}, {score} in the comment text. The tool will automatically recognize this directive upon import.',
        'q_faq_window_actions_5': 'Can the tool import data from multiple sheets of a single Google Sheets document, or does it only work with one sheet per GID?',
        'a_faq_window_actions_5': 'The tool only works with one sheet at a time. The import URL includes a gid=... parameter, which uniquely identifies a specific sheet in the document. To import data from another sheet, you need to copy its URL (with a different gid) and perform the import again.',

        // --- FAQ: Window - Assets ---
        'q_faq_window_assets_1': 'What if I have two assets with the same key but different types in the same scan folder (e.g., sound_effect_en.mp3 and sound_effect_en.wav)? Which one will end up in the asset table?',
        'a_faq_window_assets_1': 'The asset scanner loads them specifying the expected type (AssetDatabase.LoadAssetAtPath(path, expectedType)). For the AudioClip category, it will only search for and load files that Unity recognizes as AudioClips. If both files are valid audio clips, the one that is processed last will be included in the table, effectively overwriting the previous one. It is recommended to avoid such duplicates.',
        'q_faq_window_assets_2': 'If I click Scan Assets & Analyze Project, and there is an Image object in the scene for which a localized sprite already exists, but the Image object itself does not yet have a LocalizedAsset component, will the tool add the component and automatically insert the key?',
        'a_faq_window_assets_2': 'Yes, that is exactly how it works. "Analyze Project" finds the Image component, looks at the name of the sprite assigned to it (e.g., icon_play_en), extracts the key (icon_play) and language (en) from it, and then adds a LocalizedAsset component to that GameObject and writes the key icon_play into it.',
        'q_faq_window_assets_3': 'Can I use the same Naming Rule for different asset categories if they have different Scan Folders? Will this cause conflicts?',
        'a_faq_window_assets_3': 'Yes, you can. There will be no conflicts, as a separate asset table (LocalizedAssetTable) is created for each category. Keys from the "Sprites" category do not overlap with keys from the "AudioClips" category, even if they are named the same.',
        'q_faq_window_assets_4': 'If a localizable asset (e.g., button_ok_en.png) is not in the root of the Scan Folder, but in a subfolder, will the scanner find it?',
        'a_faq_window_assets_4': 'Yes, it will. The scanner uses the SearchOption.AllDirectories option, which means it will recursively check all subfolders within the Scan Folder you specify.',

        // --- FAQ: Window - Report ---
        'q_faq_window_report_1': 'The "Find" button searches for the object asynchronously. What if I start a search and then immediately click Update Keys? Will the search be interrupted?',
        'a_faq_window_report_1': 'Yes, it will be interrupted. Any new action that requires UI blocking (like Update Keys) will stop the current search coroutine. A dialog box will appear, prompting you to stop the current search to start a new one.',
        'q_faq_window_report_2': 'If a key is used in multiple places (e.g., on two different buttons in different scenes), how will this be displayed in the report under the "Duplicates" category?',
        'a_faq_window_report_2': 'The "Duplicates" category will show all sources for that key. You will see one entry for the key, and the "Source" field will list all paths (in scene 1 and scene 2). The "Find" button in this case will open a dropdown list, allowing you to choose which object to navigate to.',
        'q_faq_window_report_3': 'If I click "Find" for a key that is only used in code (via the _() function), what will happen? Will the tool be able to find and highlight the C# script?',
        'a_faq_window_report_3': 'Yes. The search system is specifically trained to recognize sources like script MyScript.cs. When you click "Find", it will search for the MyScript.cs asset in the project and highlight (ping) it in the Project window.',

        // --- FAQ: Editor ---
        'q_faq_editor_1': 'What has higher priority for placeholder validation: the @placeholders: directive in the comment or the placeholders found in the source language text? For example, if the source text has {name} and the comment says @placeholders: {username}.',
        'a_faq_editor_1': 'The @placeholders: directive in the comment has priority. It is considered an explicit instruction from the developer and the "source of truth". In your example, the editor will require {username} in the translation and will ignore {name} from the source text.',
        'q_faq_editor_2': 'If I make a typo in the directive (e.g., @placeholder: instead of @placeholders:), will it be ignored or will the tool issue a warning?',
        'a_faq_editor_2': 'It will simply be ignored. The tool looks for an exact match of @placeholders:. If the directive is misspelled, it will be treated as part of a regular comment, and validation will work the old way - based on the placeholders from the source text.',
        'q_faq_editor_3': 'The autosave system creates files in the Backups/AutoSaves folder. Will these files be automatically deleted after a successful manual save or closing the window?',
        'a_faq_editor_3': 'Yes. Upon a successful manual save or normal window closure (when you save changes), all autosave files are deleted to avoid prompting for recovery on the next launch. They only remain in case of an editor crash.',
        'q_faq_editor_4': 'If I change the column widths in the editor, will these settings be saved between Unity sessions?',
        'a_faq_editor_4': 'Yes. Column widths are saved to EditorPrefs each time you close the translation editor window and will be restored the next time you open it.',
        'q_faq_editor_5': 'Does the text editing popup window (MultiLineEditWindow) support its own Undo/Redo stack (via Ctrl+Z) for changes made within it?',
        'a_faq_editor_5': 'Yes. The MultiLineEditWindow has its own temporary Undo/Redo stack that works while the window is open. This allows you to undo and redo text changes within that window. Once you save the result (by closing the window), this change is recorded as a single action in the global Undo/Redo stack of the main editor.',

        // --- FAQ: Examples & Code ---
        'q_faq_examples_1': 'What happens if the property names in the anonymous type passed to the _() function do not match the placeholders in the string? For example, _("Hello, {username}", new { user_name = "Bob" }). Will there be an error, or will the placeholder simply not be replaced?',
        'a_faq_examples_1': 'There will be no error. The {username} placeholder will simply not be replaced, and you will get the string "Hello, {username}" as a result. Replacement only occurs with an exact name match.',
        'q_faq_examples_2': 'The [LocalizableField] attribute works for private fields. Will it work for static fields?',
        'a_faq_examples_2': 'Yes, it will. The parser uses reflection to find fields with the flags BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static, so it will find and process static fields.',
        'q_faq_examples_3': 'If I put the [OnLanguageChange] attribute on a method with parameters (e.g., void UpdateUI(string newLang)), what will happen? Will there be a compile error or a runtime warning?',
        'a_faq_examples_3': 'There will be no compile error, but a warning from LocalizedBehaviour will appear in the Unity console at runtime. It will report that it found a method with the attribute but ignored it because the method has parameters. Such a method will not be called.',
        'q_faq_examples_4': 'I am using _("apple_count", count). If there is no key apple_count_one for the current language (for count = 1), which form will the system choose? Will it use apple_count_other as a fallback?',
        'a_faq_examples_4': 'Yes. If a specific form (_one, _few, etc.) is not found, the system will try to use the key with the _other suffix as a fallback. If that is also not found, the translation for the base key apple_count will be used.',
        'q_faq_examples_5': 'The function _("key", new { username = "Alex" }) uses an anonymous type. Won\'t this create an excessive "load" on the garbage collector (GC) with frequent calls in an Update() method compared to passing a pre-created Dictionary<string, object>?',
        'a_faq_examples_5': 'Yes, it will. Each call to new { ... } allocates memory on the managed heap, which creates extra work for the garbage collector. For text that is updated every frame (in Update or LateUpdate), it is significantly more performant to create a Dictionary<string, object> once in Start(), and only update its values in Update() before passing it to the _() function.',

        // --- FAQ: Notes ---
        'q_faq_notes_1': 'The documentation recommends adding LanguageSelector to the ignore list. What exactly will break if I forget to do this? Will extra keys be created for "Option A, Option B"?',
        'a_faq_notes_1': 'Yes. If you don\'t add LanguageSelector to the ignore list, the parser will treat its TMP_Dropdown as a regular dropdown. It will find the default "Option A, Option B, Option C" that Unity creates and add keys for them to your translation files. This will clutter your files with unnecessary keys, as LanguageSelector will remove these options at runtime and create its own anyway.',
        'q_faq_notes_2': 'If I forget to add an empty LocalizedText with the isStyleOnly checkbox enabled on the Label inside the TMP_Dropdown used by LanguageSelector, will the font not change? Why is this necessary?',
        'a_faq_notes_2': 'Yes, the font will not change. This is necessary because LanguageSelector directly changes the label.text property. Without a LocalizedText on this object, the localization system does not know that this element needs styles (font, RTL) applied when the language changes. An empty LocalizedText with isStyleOnly serves as a "marker" for the system, saying: "Watch this object and apply styles to it, but don\'t touch its text".',
        'q_faq_notes_3': 'Calling _() in the Update() method is not recommended. But what if I need to update text every frame (e.g., a timer)? What is the most performant way to do this, caching only the format string?',
        'a_faq_notes_3': 'The most performant approach is to cache the format string in Start() or in an [OnLanguageChange] method, and use regular string.Format in Update(). Example: private string timerFormat; [OnLanguageChange] void UpdateTimerFormat() { timerFormat = _("timer_format"); } void Update() { myTextComponent.text = string.Format(timerFormat, timeLeft); } This avoids looking up the key in the dictionary every frame, which is significantly faster.',

        // --- FAQ: Extending ---
        'q_faq_extending_1': 'Will my custom parser be called automatically after every Update Keys? Do I need to register it somewhere, or is it enough to just have a class that implements ITextComponentParser in the project?',
        'a_faq_extending_1': 'Just having the class is enough. When TextParser runs, it uses reflection to find all classes in the project that implement the ITextComponentParser interface and automatically calls their Parse() method for each GameObject. No manual registration is required.',
        'q_faq_extending_2': 'What if an exception occurs in my custom parser? Will it interrupt the entire parsing process, or will the tool safely continue with other parsers?',
        'a_faq_extending_2': 'The main parsing loop is wrapped in a try-catch block. If your parser throws an exception, the error will be logged to the Unity console, but the process will not be interrupted. The tool will continue with the next GameObject and call other parsers.'
    }
};
