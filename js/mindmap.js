import { DOM } from './dom.js';
import { LanguageHandler } from './languageHandler.js';

/**
 * Manages the mind map functionality using the vis.js library.
 * It provides a visual, interactive graph of the documentation structure.
 */
export const MindMap = {
    network: null,
    storageKey: 'mindmapNodePositions',
    presetStorageKey: 'mindmapCurrentPreset', // Key for saving the selected preset
    currentPreset: 'full_view',
    fullNodesDataSet: null,
    fullEdgesDataSet: null,

    /**
     * Defines different views (presets) for the mind map.
     * Each preset contains a list of node IDs to display.
     */
    presets: {
        'full_view': {
            name: 'Full View',
            nameKey: 'mindmap_preset_full',
            nodes: null // null means all nodes are visible
        },
        'quick_start': {
            name: 'Quick Start',
            nameKey: 'mindmap_preset_quick_start',
            nodes: [
                'hub', 'pillar_setup', 'setup_install', 'setup_initial',
                'tab_settings', 'tab_content', 'tab_actions', 'pillar_translation',
                'pillar_automation', 'comp_text', 'note_streaming_assets'
            ]
        },
        'developer_flow': {
            name: 'Developer Workflow',
            nameKey: 'mindmap_preset_dev',
            nodes: [
                'hub', 'pillar_automation', 'comp_text', 'comp_asset', 'comp_prefab', 'comp_behaviour',
                'pillar_integration', 'integ_attribute', 'integ_function', 'integ_plurals',
                'pillar_advanced', 'extend_parser', 'pillar_notes', 'note_api_keys',
                'note_lang_selector', 'faq_components', 'faq_extending'
            ]
        },
        'translator_flow': {
            name: 'Translator Workflow',
            nameKey: 'mindmap_preset_translator',
            nodes: [
                'hub', 'pillar_management', 'tab_actions', 'pillar_translation',
                'note_backups', 'faq_editor'
            ]
        }
    },


    /**
     * The data structure for the mind map, defining nodes and their connections.
     */
    mindMapData: {
        nodes: [
            // Level 0: Central Hub
            { id: 'hub', labelKey: 'page_title', href: '#introduction', group: 'level0', level: 0 },

            // Level 1: Main Pillars of the documentation
            { id: 'pillar_intro', labelKey: 'nav_introduction', href: '#introduction', group: 'level1', level: 1 },
            { id: 'pillar_setup', labelKey: 'h1_quick_start', href: '#quick-start', group: 'level1', level: 1 },
            { id: 'pillar_automation', labelKey: 'h1_components', href: '#core-components', group: 'level1', level: 1 },
            { id: 'pillar_management', labelKey: 'h1_loc_tool_window', href: '#localization-tool-window', group: 'level1', level: 1 },
            { id: 'pillar_translation', labelKey: 'h1_translation_editor', href: '#translation-editor', group: 'level1', level: 1 },
            { id: 'pillar_integration', labelKey: 'h1_usage_examples', href: '#usage-examples', group: 'level1', level: 1 },
            { id: 'pillar_advanced', labelKey: 'h1_extending', href: '#extending-functionality', group: 'level1', level: 1 },
            { id: 'pillar_notes', labelKey: 'h1_important_notes', href: '#important-notes', group: 'level1', level: 1 },
            { id: 'pillar_faq', labelKey: 'h1_faq', href: '#faq', group: 'level1', level: 1 },

            // Level 2: Sub-sections
            { id: 'setup_install', labelKey: 'h2_installation', href: '#installation', group: 'level2', level: 2 },
            { id: 'setup_initial', labelKey: 'h2_initial_setup', href: '#initial-setup', group: 'level2', level: 2 },
            { id: 'comp_text', labelKey: 'h2_localizedtext', href: '#localized-text', group: 'level2', level: 2 },
            { id: 'comp_asset', labelKey: 'h2_localizedasset', href: '#localized-asset', group: 'level2', level: 2 },
            { id: 'comp_prefab', labelKey: 'h2_localizedprefab', href: '#localized-prefab', group: 'level2', level: 2 },
            { id: 'comp_uitk', labelKey: 'h2_uitklocalization', href: '#uitk-localization', group: 'level2', level: 2 },
            { id: 'comp_dropdown', labelKey: 'h2_localizeddropdown', href: '#localized-dropdown', group: 'level2', level: 2 },
            { id: 'comp_behaviour', labelKey: 'h2_localizedbehaviour', href: '#localized-behaviour', group: 'level2', level: 2 },
            { id: 'tab_preview', labelKey: 'h2_in_editor_preview', href: '#in-editor-preview', group: 'level2', level: 2 },
            { id: 'tab_settings', labelKey: 'h2_tab_settings', href: '#settings-tab', group: 'level2', level: 2 },
            { id: 'tab_content', labelKey: 'h2_tab_content', href: '#content-tab', group: 'level2', level: 2 },
            { id: 'tab_actions', labelKey: 'h2_tab_actions', href: '#actions-tab', group: 'level2', level: 2 },
            { id: 'tab_assets', labelKey: 'h2_tab_assets', href: '#assets-tab', group: 'level2', level: 2 },
            { id: 'tab_report', labelKey: 'h2_tab_report', href: '#report-tab', group: 'level2', level: 2 },
            { id: 'integ_attribute', labelKey: 'h2_example_attribute', href: '#localizable-field-attribute', group: 'level2', level: 2 },
            { id: 'integ_function', labelKey: 'h2_example_function', href: '#onlanguagechange-function', group: 'level2', level: 2 },
            { id: 'integ_plurals', labelKey: 'h2_example_plurals', href: '#plurals-and-gender', group: 'level2', level: 2 },
            { id: 'extend_parser', labelKey: 'h2_custom_parser', href: '#custom-parser', group: 'level2', level: 2 },
            { id: 'faq_install', labelKey: 'nav_faq_installation', href: '#faq-installation', group: 'level2', level: 2 },
            { id: 'faq_components', labelKey: 'nav_faq_components', href: '#faq-components', group: 'level2', level: 2 },
            { id: 'faq_window', labelKey: 'nav_faq_window', href: '#faq-window', group: 'level2', level: 2 },
            { id: 'faq_editor', labelKey: 'nav_faq_editor', href: '#faq-editor', group: 'level2', level: 2 },
            { id: 'faq_extending', labelKey: 'nav_faq_extending', href: '#faq-extending', group: 'level2', level: 2 },

            // Level 3: Details
            { id: 'note_backups', labelKey: 'li_notes_1', href: '#important-notes', group: 'level3', level: 3 },
            { id: 'note_lang_selector', labelKey: 'li_notes_6', href: '#important-notes', group: 'level3', level: 3 },
            { id: 'note_streaming_assets', labelKey: 'li_notes_3', href: '#important-notes', group: 'level3', level: 3 },
            { id: 'note_api_keys', labelKey: 'li_notes_2', href: '#important-notes', group: 'level3', level: 3 },
            { id: 'example_lang_selector', labelKey: 'li_example_components_1', href: '#ready-made-components', group: 'level3', level: 3 }
        ],
        edges: [
            // --- Hierarchical Connections (Core Structure) ---
            // Level 0 -> 1
            { from: 'hub', to: 'pillar_intro' },
            { from: 'hub', to: 'pillar_setup' },
            { from: 'hub', to: 'pillar_automation' },
            { from: 'hub', to: 'pillar_management' },
            { from: 'hub', to: 'pillar_translation' },
            { from: 'hub', to: 'pillar_integration' },
            { from: 'hub', to: 'pillar_advanced' },
            { from: 'hub', to: 'pillar_notes' },
            { from: 'hub', to: 'pillar_faq' },

            // Level 1 -> 2
            { from: 'pillar_setup', to: 'setup_install' }, { from: 'pillar_setup', to: 'setup_initial' },
            { from: 'pillar_automation', to: 'comp_text' }, { from: 'pillar_automation', to: 'comp_asset' }, { from: 'pillar_automation', to: 'comp_prefab' }, { from: 'pillar_automation', to: 'comp_uitk' }, { from: 'pillar_automation', to: 'comp_dropdown' }, { from: 'pillar_automation', to: 'comp_behaviour' },
            { from: 'pillar_management', to: 'tab_preview' }, { from: 'pillar_management', to: 'tab_settings' }, { from: 'pillar_management', to: 'tab_content' }, { from: 'pillar_management', to: 'tab_actions' }, { from: 'pillar_management', to: 'tab_assets' }, { from: 'pillar_management', to: 'tab_report' },
            { from: 'pillar_integration', to: 'example_lang_selector' }, { from: 'pillar_integration', to: 'integ_attribute' }, { from: 'pillar_integration', to: 'integ_function' }, { from: 'pillar_integration', to: 'integ_plurals' },
            { from: 'pillar_advanced', to: 'extend_parser' },
            { from: 'pillar_faq', to: 'faq_install' }, { from: 'pillar_faq', to: 'faq_components' }, { from: 'pillar_faq', to: 'faq_window' }, { from: 'pillar_faq', to: 'faq_editor' }, { from: 'pillar_faq', to: 'faq_extending' },

            // Level 1 -> 3 (Direct details)
            { from: 'pillar_notes', to: 'note_backups' }, { from: 'pillar_notes', to: 'note_api_keys' }, { from: 'pillar_notes', to: 'note_streaming_assets' }, { from: 'pillar_notes', to: 'note_lang_selector' },

            // --- Logical Connections (Relationships & Workflows) ---

            // Quick Start Workflow
            { from: 'setup_initial', to: 'tab_settings', labelKey: 'mindmap_edge_configure' },
            { from: 'tab_settings', to: 'tab_content', labelKey: 'mindmap_edge_specify_content' },
            { from: 'tab_content', to: 'tab_actions', labelKey: 'mindmap_edge_parse_project' },

            // Tool Window Workflow & Interactions
            { from: 'tab_actions', to: 'pillar_automation', labelKey: 'mindmap_edge_creates_components' },
            { from: 'tab_actions', to: 'tab_report', labelKey: 'mindmap_edge_generates' },
            { from: 'tab_actions', to: 'pillar_translation', labelKey: 'mindmap_edge_opens' },
            { from: 'tab_assets', to: 'comp_asset', labelKey: 'mindmap_edge_manages_assets' },
            { from: 'tab_settings', to: 'integ_plurals', labelKey: 'mindmap_edge_defines_rules' },
            { from: 'tab_report', to: 'pillar_automation', labelKey: 'mindmap_edge_reports_on' },

            // Code Integration Relationships
            { from: 'comp_behaviour', to: 'integ_function', labelKey: 'mindmap_edge_enables_reaction' }, // [OnLanguageChange] methods use _()
            { from: 'integ_attribute', to: 'pillar_automation', labelKey: 'mindmap_edge_processed_by' },
            { from: 'integ_plurals', to: 'pillar_translation', labelKey: 'mindmap_edge_edited_in' },
            { from: 'extend_parser', to: 'pillar_automation', labelKey: 'mindmap_edge_extends' },

            // Notes -> Relevant Section
            { from: 'note_lang_selector', to: 'example_lang_selector', labelKey: 'mindmap_edge_warns_about' },
            { from: 'note_streaming_assets', to: 'tab_settings', labelKey: 'mindmap_edge_relates_to' },
            { from: 'note_api_keys', to: 'tab_settings', labelKey: 'mindmap_edge_relates_to' },
            { from: 'note_backups', to: 'pillar_translation', labelKey: 'mindmap_edge_recommends_for' },

            // Cross-referencing to FAQ
            { from: 'pillar_automation', to: 'faq_components', labelKey: 'mindmap_edge_see_faq' },
            { from: 'pillar_management', to: 'faq_window', labelKey: 'mindmap_edge_see_faq' },
            { from: 'pillar_setup', to: 'faq_install', labelKey: 'mindmap_edge_see_faq' },
            { from: 'pillar_advanced', to: 'faq_extending', labelKey: 'mindmap_edge_see_faq' },
            { from: 'pillar_translation', to: 'faq_editor', labelKey: 'mindmap_edge_see_faq' },
        ]
    },

    /**
     * Initializes the MindMap module by binding events.
     */
    init() {
        this.populatePresetSelector();
        this.bindEvents();
    },

    /**
     * Populates the preset selector dropdown with options.
     */
    populatePresetSelector() {
        const selector = document.getElementById('mindmap-preset-selector');
        if (!selector) return;
        selector.innerHTML = '';
        const translations = LanguageHandler.translationsCache[localStorage.getItem('language') || 'en'] || {};
        for (const key in this.presets) {
            const preset = this.presets[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = translations[preset.nameKey] || preset.name;
            selector.appendChild(option);
        }
    },


    /**
     * Wraps a string to a new line if it exceeds a maximum width.
     * @param {string} str The string to wrap.
     * @param {number} maxWidth The maximum number of characters per line.
     * @returns {string} The wrapped string.
     */
    wordWrap(str, maxWidth = 25) {
        const newLineStr = "\n";
        let res = '';
        while (str.length > maxWidth) {
            let found = false;
            // Find the last space within the maximum width
            for (let i = maxWidth - 1; i >= 0; i--) {
                if (/\s/.test(str[i])) {
                    res += str.slice(0, i) + newLineStr;
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
            // If no space is found, hard break the word
            if (!found) {
                res += str.slice(0, maxWidth) + newLineStr;
                str = str.slice(maxWidth);
            }
        }
        return res + str;
    },

    /**
     * Generates and displays the mind map network based on the current preset.
     */
    generateAndShow() {
        if (this.network) {
            // If a network already exists, just update visibility
            this.applyPreset(this.currentPreset);
            return;
        }

        // --- First time generation ---
        DOM.mindmapContainer.innerHTML = '';
        const { nodes, edges } = this.transformData();

        this.fullNodesDataSet = new vis.DataSet(nodes);
        this.fullEdgesDataSet = new vis.DataSet(edges);

        const hasSavedPositions = this.loadPositions(this.fullNodesDataSet);
        const options = this.getOptions(hasSavedPositions);

        this.network = new vis.Network(DOM.mindmapContainer, { nodes: this.fullNodesDataSet, edges: this.fullEdgesDataSet }, options);
        this.bindNetworkEvents();
        
        // Apply the current preset after initial generation
        this.applyPreset(this.currentPreset);
    },
    
    /**
     * Applies the selected preset by showing/hiding nodes and edges.
     * @param {string} presetKey - The key of the preset to apply.
     */
    applyPreset(presetKey) {
        if (!this.network || !this.fullNodesDataSet) return;

        const selectedPreset = this.presets[presetKey];
        const visibleNodeIds = selectedPreset?.nodes ? new Set(selectedPreset.nodes) : null;
        
        // Update nodes: set hidden property
        const nodeUpdates = this.fullNodesDataSet.getIds().map(id => ({
            id,
            hidden: visibleNodeIds ? !visibleNodeIds.has(id) : false
        }));
        this.fullNodesDataSet.update(nodeUpdates);

        // Update edges: set hidden property
        const edgeUpdates = this.fullEdgesDataSet.map(edge => ({
            id: edge.id,
            hidden: visibleNodeIds ? (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) : false
        }));
        this.fullEdgesDataSet.update(edgeUpdates);
    },

    /**
     * Transforms the raw mindMapData into a format usable by vis.js,
     * applying language translations.
     * @returns {{nodes: Array, edges: Array}} The formatted nodes and edges.
     */
    transformData() {
        const translations = LanguageHandler.translationsCache[localStorage.getItem('language') || 'en'] || {};

        const nodes = this.mindMapData.nodes.map(node => {
            const tempDiv = document.createElement('div');
            let titleKey = node.labelKey;
            if (!/^(li_|nav_|page_)/.test(titleKey)) {
                titleKey = titleKey.replace(/^h[1-2]_/, 'nav_');
            }
            tempDiv.innerHTML = translations[titleKey] || node.id;
            const cleanText = tempDiv.textContent.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim().replace(/^\d+\.\s*/, '');
            return { ...node, label: this.wordWrap(cleanText) };
        });

        // Add IDs to edges and translate labels if they have a key
        const edges = this.mindMapData.edges.map((edge, index) => {
            const newEdge = { ...edge, id: edge.id || `edge-${index}` };
            if (edge.labelKey && translations[edge.labelKey]) {
                newEdge.label = translations[edge.labelKey];
            }
            return newEdge;
        });

        return { nodes, edges };
    },

    /**
     * Saves the current positions of all nodes to localStorage.
     */
    savePositions() {
        if (this.network) {
            this.network.storePositions(); // Use built-in function to save positions
            localStorage.setItem(this.storageKey, JSON.stringify(this.network.getPositions()));
        }
    },

    /**
     * Loads node positions from localStorage and applies them.
     * @param {vis.DataSet} nodesDataSet The DataSet to update.
     * @returns {boolean} True if positions were loaded, false otherwise.
     */
    loadPositions(nodesDataSet) {
        try {
            const savedPositions = localStorage.getItem(this.storageKey);
            if (savedPositions) {
                const positions = JSON.parse(savedPositions);
                const updates = [];
                nodesDataSet.getIds().forEach(id => {
                    if (positions[id]) {
                        updates.push({ id: id, x: positions[id].x, y: positions[id].y });
                    }
                });
                nodesDataSet.update(updates);
                return true;
            }
        } catch (e) {
            console.error("Failed to load mind map positions:", e);
        }
        return false;
    },

    /**
     * Clears saved positions and regenerates the map with default layout.
     */
    resetView() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.presetStorageKey); // Also clear saved preset
        // Destroy and fully regenerate the network
        if (this.network) {
            this.network.destroy();
            this.network = null;
            this.fullNodesDataSet = null;
            this.fullEdgesDataSet = null;
        }
        this.open(); // Re-open to apply default state
    },

    /**
     * Gets the configuration options for the vis.js network.
     * @param {boolean} hasSavedPositions - If true, physics stabilization will be disabled on load.
     * @returns {object} The options object for vis.js.
     */
    getOptions(hasSavedPositions = false) {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        const colors = {
            font: isDarkMode ? '#c9d1d9' : '#3d3d3d',
            edge: isDarkMode ? '#484f58' : '#cccccc',
            light: {
                level0: { bg: '#4a90e2', border: '#4a90e2', font: '#ffffff' },
                level1: { bg: '#e7f3ff', border: '#8ab4f8' },
                level2: { bg: '#f1f8e9', border: '#a5d6a7' },
                level3: { bg: '#fafafa', border: '#e0e0e0', font: '#757575' },
            },
            dark: {
                level0: { bg: '#8ab4f8', border: '#8ab4f8', font: '#202124' },
                level1: { bg: '#2d333b', border: '#58a6ff' },
                level2: { bg: '#22272e', border: '#484f58' },
                level3: { bg: '#161b22', border: '#30363d', font: '#8b949e' },
            }
        };
        const themeColors = isDarkMode ? colors.dark : colors.light;

        return {
            interaction: { hover: true },
            physics: {
                enabled: !hasSavedPositions,
                barnesHut: {
                    gravitationalConstant: -30000,
                    centralGravity: 0.2,
                    springLength: 250,
                    springConstant: 0.02,
                    damping: 0.2,
                    avoidOverlap: 0.7
                },
                stabilization: {
                    enabled: !hasSavedPositions,
                    iterations: 400,
                    fit: true,
                    updateInterval: 20
                }
            },
            layout: {
                hierarchical: false
            },
            nodes: {
                shape: 'box',
                margin: { top: 12, right: 18, bottom: 12, left: 18 },
                font: { multi: true, color: colors.font, face: 'sans-serif' },
                borderWidth: 1,
                shadow: {
                    enabled: true,
                    color: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)',
                    size: 5,
                    y: 2
                },
            },
            edges: {
                color: { color: colors.edge, highlight: themeColors.level0.border },
                font: { align: 'top', color: themeColors.level3.font, size: 11 },
                width: 1,
                arrows: { to: { enabled: true, scaleFactor: 0.7 } },
                smooth: {
                    type: 'cubicBezier',
                    forceDirection: 'vertical',
                    roundness: 0.4
                }
            },
            groups: {
                level0: { color: { background: themeColors.level0.bg, border: themeColors.level0.border }, font: { color: themeColors.level0.font, size: 18, bold: { size: 18 } }, borderWidth: 1.5 },
                level1: { color: { background: themeColors.level1.bg, border: themeColors.level1.border }, font: { size: 16 } },
                level2: { color: { background: themeColors.level2.bg, border: themeColors.level2.border }, font: { size: 14 } },
                level3: { color: { background: themeColors.level3.bg, border: themeColors.level3.border }, font: { size: 12, color: themeColors.level3.font } }
            }
        };
    },

    /**
     * Binds event listeners to the network itself (clicks, drags).
     */
    bindNetworkEvents() {
        this.network.on('click', (params) => {
            if (params.nodes.length > 0) {
                const node = this.network.body.data.nodes.get(params.nodes[0]);
                if (node?.href) {
                    const targetElement = document.querySelector(node.href);
                    if (targetElement) {
                        this.close();
                        setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                    }
                }
            }
        });

        this.network.on('stabilizationIterationsDone', () => {
            this.savePositions();
            this.network.setOptions({ physics: false });
        });

        // When user starts dragging, re-enable physics
        this.network.on('dragStart', () => {
            this.network.setOptions({ physics: true });
        });

        // When user stops dragging, save positions and disable physics again
        this.network.on('dragEnd', () => {
            this.savePositions();
            this.network.setOptions({ physics: false });
        });
    },

    /**
     * Binds event listeners to DOM elements (buttons, overlay).
     */
    bindEvents() {
        DOM.mindmapToggle.addEventListener('click', () => this.open());
        DOM.mindmapClose.addEventListener('click', () => this.close());
        DOM.mindmapOverlay.addEventListener('click', (e) => {
            if (e.target === DOM.mindmapOverlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.mindmapOverlay.classList.contains('show')) this.close();
        });
        const resetButton = document.getElementById('mindmap-reset');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetView());
        }
        const presetSelector = document.getElementById('mindmap-preset-selector');
        if (presetSelector) {
            presetSelector.addEventListener('change', (e) => {
                this.currentPreset = e.target.value;
                localStorage.setItem(this.presetStorageKey, this.currentPreset); // Save on change
                this.applyPreset(this.currentPreset);
            });
        }
    },

    /**
     * Opens the mind map overlay.
     */
    open() {
        DOM.mindmapOverlay.classList.add('show');
        document.body.classList.add('mindmap-active');
        
        // Load saved preset or default to full_view
        this.currentPreset = localStorage.getItem(this.presetStorageKey) || 'full_view';
        const presetSelector = document.getElementById('mindmap-preset-selector');
        if (presetSelector) {
            presetSelector.value = this.currentPreset;
        }

        setTimeout(() => this.generateAndShow(), 50);
    },

    /**
     * Closes the mind map overlay.
     */
    close() {
        DOM.mindmapOverlay.classList.remove('show');
        document.body.classList.remove('mindmap-active');
        if (this.network) {
            setTimeout(() => {
                this.network.destroy();
                this.network = null;
                this.fullNodesDataSet = null;
                this.fullEdgesDataSet = null;
            }, 300);
        }
    }
};

