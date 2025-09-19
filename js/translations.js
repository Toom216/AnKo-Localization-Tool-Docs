const translations = {
    'ru': {
        'page_title': 'Документация по инструменту локализации для Unity',
        'toc_title': 'Оглавление',
        'nav_introduction': '1. Введение',
        'nav_quick_start': '2. Быстрый старт и настройка',
        'nav_components': '3. Основные компоненты',
        'nav_loc_tool_window': '4. Окно "Localization Tool"',
        'nav_translation_editor': '5. Редактор переводов',
        'nav_usage_examples': '6. Примеры использования',
        'nav_important_notes': '7. Важные нюансы и предупреждения',
        'nav_extending': '8. Расширение функционала',
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
#endif`
    },
    'en': {
        'page_title': 'Unity Localization Tool Documentation',
        'toc_title': 'Table of Contents',
        // ... ЗАПОЛНИТЕ ПЕРЕВОДЫ ЗДЕСЬ ...
        // Пример:
        // 'nav_introduction': '1. Introduction',
        // 'h1_introduction': '<span class="emoji">🚀</span> Introduction',
        // 'p_intro_1': 'This tool is a comprehensive solution for localizing games and applications...',
    }
};
